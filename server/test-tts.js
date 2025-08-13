// Google Cloud TTSの利用可能な音声を確認するテストスクリプト
import { TextToSpeechClient } from '@google-cloud/text-to-speech';
import 'dotenv/config';

const client = new TextToSpeechClient();

async function listVoices() {
  try {
    const [result] = await client.listVoices();
    const thaiVoices = result.voices?.filter(voice => 
      voice.languageCodes?.includes('th-TH') || voice.languageCodes?.includes('th')
    );
    
    console.log('🎵 利用可能なタイ語音声:');
    thaiVoices?.forEach(voice => {
      console.log(`  - ${voice.name} (${voice.ssmlGender})`);
    });
    
    console.log('\n🧪 Standard音声でのテスト実行...');
    await testTTS();
    
  } catch (error) {
    console.error('❌ 音声リスト取得エラー:', error.message);
  }
}

async function testTTS() {
  try {
    const request = {
      input: { text: 'สวัสดีครับ' },
      voice: {
        languageCode: 'th-TH',
        name: 'th-TH-Standard-A',
        ssmlGender: 'NEUTRAL'
      },
      audioConfig: {
        audioEncoding: 'MP3',
        sampleRateHertz: 22050
      }
    };

    const [response] = await client.synthesizeSpeech(request);
    if (response.audioContent) {
      console.log('✅ TTS テスト成功! 音声データサイズ:', response.audioContent.length, 'bytes');
    }
  } catch (error) {
    console.error('❌ TTS テストエラー:', error.message);
  }
}

listVoices();