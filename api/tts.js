/**
 * Google Cloud TTS API エンドポイント
 * タイ語テキストを高品質な音声に変換
 */
import { TextToSpeechClient } from '@google-cloud/text-to-speech';

export default async function handler(req, res) {
  // CORSヘッダーの設定
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // OPTIONSリクエスト（プリフライト）の処理
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // POSTメソッドのみ許可
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      error: 'Method not allowed',
      allowedMethods: ['POST']
    });
  }

  try {
    const { text, options = {}, voice = 'chirp3hd-a', quality = 'premium' } = req.body;

    if (!text) {
      return res.status(400).json({ 
        error: 'Missing required parameter: text' 
      });
    }

    // Google Cloud TTSクライアントの初期化
    const ttsClient = new TextToSpeechClient();

    // Google Cloud TTS API リクエストペイロード
    const voiceMapping = {
      'chirp3hd-a': 'th-TH-Chirp3-HD-Achernar',
      'chirp3hd-c': 'th-TH-Chirp3-HD-Bellatrix',
      'neural2-a': 'th-TH-Standard-A',
      'neural2-c': 'th-TH-Standard-B',
      'standard-a': 'th-TH-Standard-A', // fallback
      'standard-b': 'th-TH-Standard-B'  // fallback
    };
    const voiceName = voiceMapping[voice] || 'th-TH-Chirp3-HD-Achernar'; // デフォルトはChirp3HD

    const ttsPayload = {
      input: { text },
      voice: {
        languageCode: 'th-TH',
        name: voiceName
      },
      audioConfig: {
        audioEncoding: 'MP3',
        speakingRate: options.rate || 1.0,
        pitch: options.pitch || 0.0,
        volumeGainDb: options.volumeGain || 0.0,
        sampleRateHertz: quality === 'premium' ? 48000 : 24000 // Chirp3HDは48kHz, Standardは24kHz
      }
    };
    
    console.log('🎤 TTS Request:', {
      text: text.substring(0, 30) + '...',
      voice: voiceName,
      languageCode: 'th-TH',
      audioEncoding: 'MP3'
    });

    // Google Cloud TTS API 呼び出し
    const [response] = await ttsClient.synthesizeSpeech(ttsPayload);
    
    if (!response.audioContent) {
      console.error('❌ No audio content in TTS response');
      return res.status(500).json({ 
        error: 'Invalid TTS response: no audio content' 
      });
    }

    console.log('✅ TTS synthesis successful');

    // Base64エンコードされた音声データを返す
    return res.status(200).json({
      audioContent: response.audioContent.toString('base64'),
      metadata: {
        voice: ttsPayload.voice,
        audioConfig: ttsPayload.audioConfig,
        textLength: text.length
      }
    });

  } catch (error) {
    console.error('❌ TTS endpoint error:', error);
    
    let errorMessage = 'Internal server error';
    let statusCode = 500;

    if (error.code === 7) {
      errorMessage = 'Permission denied. Check API key and permissions.';
      statusCode = 403;
    } else if (error.code === 3) {
      errorMessage = 'Invalid argument. Check request payload.';
      statusCode = 400;
    } else if (error.code === 5) {
      errorMessage = 'Authentication failure. Check credentials.';
      statusCode = 401;
    }

    return res.status(statusCode).json({ 
      error: errorMessage,
      details: error.message 
    });
  }
}