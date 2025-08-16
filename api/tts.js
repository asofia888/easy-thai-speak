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
    
    if (!apiKey) {
      console.error('❌ Google Cloud API key not found');
      return res.status(500).json({ 
        error: 'TTS service configuration error' 
      });
    }

    // Google Cloud TTS API リクエストペイロード
    const ttsPayload = {
      input: { text },
      voice: {
        languageCode: 'th-TH',
        name: `th-TH-Neural2-${voice.split('-').pop()}` // chirp3hd-a -> th-TH-Neural2-a
      },
      audioConfig: {
        audioEncoding: 'MP3',
        speakingRate: options.rate || 1.0,
        pitch: options.pitch || 0.0,
        volumeGainDb: options.volumeGain || 0.0,
        sampleRateHertz: quality === 'premium' ? 24000 : 16000
      }
    };

    console.log('🔊 Calling Google Cloud TTS API for:', text.substring(0, 30) + '...');

    // Google Cloud TTS API 呼び出し
    const response = await fetch(
      `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(ttsPayload)
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Google Cloud TTS API error:', response.status, errorText);
      return res.status(response.status).json({ 
        error: 'Google Cloud TTS API error',
        details: errorText
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