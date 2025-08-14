// シンプルなTTSバックエンドAPI
// 環境変数 GOOGLE_APPLICATION_CREDENTIALS と GOOGLE_CLOUD_PROJECT を使用

// @ts-check
import express from 'express';
import bodyParser from 'body-parser';
import { TextToSpeechClient } from '@google-cloud/text-to-speech';
import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json({ limit: '1mb' }));

// ヘルスチェック
app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

// TTSエンドポイント
app.post('/api/tts', async (req, res) => {
  try {
    const { text, options, voice, quality } = req.body || {};
    console.log('🔍 TTS Request:', { text: text?.substring(0, 20) + '...', voice, quality, options });
    
    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Invalid text' });
    }

    const client = await getTTSClient();

    const audioConfig = {
      audioEncoding: 'MP3',
      sampleRateHertz: quality === 'premium' ? 24000 : 22050,
      pitch: options?.pitch ?? 0.0,
      speakingRate: options?.speed ?? 0.9,
      effectsProfileId: [getEffectsProfile(options?.effectsProfile)]
    };

    const sanitizedVoice = sanitizeVoice(voice);
    console.log('🎵 Selected Voice:', sanitizedVoice);
    
    const request = {
      input: options?.useSSML ? { ssml: createSSML(text, options) } : { text },
      voice: sanitizedVoice,
      audioConfig
    };

    const [response] = await client.synthesizeSpeech(request);
    if (!response.audioContent) {
      return res.status(500).json({ error: 'No audio content' });
    }

    const base64 = Buffer.from(response.audioContent).toString('base64');
    res.json({ audioContentBase64: base64 });
  } catch (err) {
    console.error('TTS API error:', err);
    res.status(500).send(err?.message || 'TTS error');
  }
});

app.listen(port, () => {
  console.log(`[server] TTS API listening on http://localhost:${port}`);
});

function getEffectsProfile(profile) {
  const profiles = {
    headphone: 'headphone-class-device',
    phone: 'telephony-class-application',
    speaker: 'wearable-class-device'
  };
  return profiles[profile] || profiles.headphone;
}

function sanitizeVoice(requested) {
  const fallback = {
    languageCode: 'th-TH',
    name: 'th-TH-Standard-A',
    ssmlGender: 'NEUTRAL'
  };

  const allowed = new Set([
    'th-TH-Standard-A',
    'th-TH-Standard-B'
  ]);

  if (requested && typeof requested === 'string' && allowed.has(requested)) {
    return { languageCode: 'th-TH', name: requested, ssmlGender: 'NEUTRAL' };
  }
  return fallback;
}

function escapeForSSML(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function createSSML(text, options) {
  const escapedText = escapeForSSML(text);
  switch (options?.emphasis) {
    case 'tone':
      return `<speak><prosody rate="0.8" pitch="+2st">${escapedText}</prosody></speak>`;
    case 'clarity':
      return `<speak><prosody rate="0.7">${escapedText}</prosody></speak>`;
    default:
      return `<speak>${escapedText}</speak>`;
  }
}

async function getTTSClient() {
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    return new TextToSpeechClient();
  }

  const candidate = path.resolve(process.cwd(), 'keys', 'google-cloud-key.json');
  if (fs.existsSync(candidate)) {
    console.warn('[server] GOOGLE_APPLICATION_CREDENTIALS not set. Using local key file for development:', candidate);
    return new TextToSpeechClient({ keyFilename: candidate });
  }

  console.error('[server] No credentials configured. Set GOOGLE_APPLICATION_CREDENTIALS or place keys/google-cloud-key.json');
  return new TextToSpeechClient();
}

