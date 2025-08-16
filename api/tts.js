/**
 * Google Cloud TTS API エンドポイント
 * タイ語テキストを高品質な音声に変換
 */

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

    // Google Cloud TTS API の設定
    const apiKey = process.env.GOOGLE_CLOUD_API_KEY;
    
    console.log('🔍 Environment check:', {
      hasApiKey: !!apiKey,
      nodeEnv: process.env.NODE_ENV,
      apiKeyPrefix: apiKey ? apiKey.substring(0, 10) + '...' : 'undefined'
    });
    
    if (!apiKey) {
      console.error('❌ Google Cloud API key not found');
      console.error('Available env vars:', Object.keys(process.env).filter(key => key.includes('GOOGLE')));
      return res.status(500).json({ 
        error: 'TTS service configuration error',
        details: 'Google Cloud API key not configured'
      });
    }

    // Google Cloud TTS API リクエストペイロード
    // タイ語のサポートされている音声名を使用
    const voiceName = voice === 'chirp3hd-a' ? 'th-TH-Neural2-A' : 'th-TH-Neural2-C';
    
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
        sampleRateHertz: quality === 'premium' ? 24000 : 16000
      }
    };
    
    console.log('🎤 TTS Request:', {
      text: text.substring(0, 30) + '...',
      voice: voiceName,
      languageCode: 'th-TH',
      audioEncoding: 'MP3'
    });

    console.log('🔊 Calling Google Cloud TTS API for:', text.substring(0, 30) + '...');

    // Google Cloud TTS API 呼び出し（APIキー認証）
    const endpoint = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`;
    
    console.log('🌐 API Endpoint:', endpoint.replace(apiKey, '***'));
    
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(ttsPayload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Google Cloud TTS API error:', {
        status: response.status,
        statusText: response.statusText,
        errorText,
        url: response.url
      });
      
      let errorMessage = 'Google Cloud TTS API error';
      if (response.status === 400) {
        errorMessage = 'Invalid request to TTS API';
      } else if (response.status === 401) {
        errorMessage = 'Unauthorized - Check API key';
      } else if (response.status === 403) {
        errorMessage = 'Forbidden - API key may not have TTS permissions';
      } else if (response.status === 429) {
        errorMessage = 'Too many requests - Rate limit exceeded';
      }
      
      return res.status(response.status).json({ 
        error: errorMessage,
        details: errorText,
        status: response.status
      });
    }

    const data = await response.json();
    
    if (!data.audioContent) {
      console.error('❌ No audio content in TTS response');
      return res.status(500).json({ 
        error: 'Invalid TTS response: no audio content' 
      });
    }

    console.log('✅ TTS synthesis successful');

    // Base64エンコードされた音声データを返す
    return res.status(200).json({
      audioContent: data.audioContent,
      metadata: {
        voice: ttsPayload.voice,
        audioConfig: ttsPayload.audioConfig,
        textLength: text.length
      }
    });

  } catch (error) {
    console.error('❌ TTS endpoint error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      details: error.message 
    });
  }
}