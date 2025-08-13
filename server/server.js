// シンプルなTTSバックエンドAPI
// 環境変数 GOOGLE_APPLICATION_CREDENTIALS と GOOGLE_CLOUD_PROJECT を使用

// @ts-check
import express from 'express';
import bodyParser from 'body-parser';
import { TextToSpeechClient } from '@google-cloud/text-to-speech';
import 'dotenv/config';

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

    const client = new TextToSpeechClient();

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
    name: 'th-TH-Chirp3-HD-Achernar', // 女性のChirp3-HD音声
    ssmlGender: 'FEMALE'
  };

  // 利用可能な音声のマッピング
  const voiceMap = {
    'neural2-a': 'th-TH-Chirp3-HD-Achernar',    // 女性
    'neural2-c': 'th-TH-Chirp3-HD-Charon',      // 男性
    'th-TH-Neural2-A': 'th-TH-Chirp3-HD-Achernar',
    'th-TH-Neural2-C': 'th-TH-Neural2-C',       // 実際のNeural2
    'th-TH-Standard-A': 'th-TH-Standard-A'
  };

  if (requested && voiceMap[requested]) {
    const voiceName = voiceMap[requested];
    const gender = voiceName.includes('Achernar') || voiceName.includes('Aoede') ? 'FEMALE' : 'MALE';
    return { 
      languageCode: 'th-TH', 
      name: voiceName, 
      ssmlGender: gender 
    };
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

