import { ConversationLine } from '../types';

/**
 * 定型会話データ - 教科書スタイル
 * 生成AIではなく、タイ語教育の専門家が作成した優れた会話を提供します
 */

// ====== 初級会話 (Beginner) ======

// b-greetings-status: 挨拶と近況確認
export const beginnerGreetingsStatus: ConversationLine[] = [
  {
    speaker: 'A',
    thai: 'สวัสดีครับ',
    pronunciation: 'sà-wàt-dii khráp',
    japanese: 'こんにちは',
    words: [
      { thai: 'สวัสดี', pronunciation: 'sà-wàt-dii', japanese: 'こんにちは' },
      { thai: 'ครับ', pronunciation: 'khráp', japanese: '(男性の丁寧語)' },
    ],
    grammarPoint: {
      title: '丁寧語の語尾「ครับ/ค่ะ」',
      explanation: 'タイ語では文末に丁寧語の語尾を付けます。男性は「ครับ(khráp)」、女性は「ค่ะ(khâ)」を使います。',
      examples: [
        { thai: 'ขอบคุณครับ', pronunciation: 'khɔ̀ɔp-khun khráp', japanese: 'ありがとうございます(男性)' },
        { thai: 'ขอบคุณค่ะ', pronunciation: 'khɔ̀ɔp-khun khâ', japanese: 'ありがとうございます(女性)' },
      ]
    }
  },
  {
    speaker: 'B',
    thai: 'สวัสดีค่ะ',
    pronunciation: 'sà-wàt-dii khâ',
    japanese: 'こんにちは',
    words: [
      { thai: 'สวัสดี', pronunciation: 'sà-wàt-dii', japanese: 'こんにちは' },
      { thai: 'ค่ะ', pronunciation: 'khâ', japanese: '(女性の丁寧語)' },
    ]
  },
  {
    speaker: 'A',
    thai: 'สบายดีไหมครับ',
    pronunciation: 'sà-baai dii mǎi khráp',
    japanese: '元気ですか',
    words: [
      { thai: 'สบายดี', pronunciation: 'sà-baai dii', japanese: '元気' },
      { thai: 'ไหม', pronunciation: 'mǎi', japanese: '〜ですか(疑問詞)' },
      { thai: 'ครับ', pronunciation: 'khráp', japanese: '(男性の丁寧語)' },
    ],
    grammarPoint: {
      title: '疑問文の作り方「〜ไหม」',
      explanation: '肯定文の最後に「ไหม(mǎi)」を付けると疑問文になります。',
      examples: [
        { thai: 'ชอบไหม', pronunciation: 'chɔ̂ɔp mǎi', japanese: '好きですか' },
        { thai: 'เป็นไหม', pronunciation: 'pen mǎi', japanese: 'できますか' },
      ]
    }
  },
  {
    speaker: 'B',
    thai: 'สบายดีค่ะ ขอบคุณค่ะ',
    pronunciation: 'sà-baai dii khâ khɔ̀ɔp-khun khâ',
    japanese: '元気です、ありがとうございます',
    words: [
      { thai: 'สบายดี', pronunciation: 'sà-baai dii', japanese: '元気' },
      { thai: 'ค่ะ', pronunciation: 'khâ', japanese: '(女性の丁寧語)' },
      { thai: 'ขอบคุณ', pronunciation: 'khɔ̀ɔp-khun', japanese: 'ありがとう' },
      { thai: 'ค่ะ', pronunciation: 'khâ', japanese: '(女性の丁寧語)' },
    ]
  },
  {
    speaker: 'A',
    thai: 'วันนี้อากาศดีนะครับ',
    pronunciation: 'wan-níi aa-gàat dii ná khráp',
    japanese: '今日はいい天気ですね',
    words: [
      { thai: 'วันนี้', pronunciation: 'wan-níi', japanese: '今日' },
      { thai: 'อากาศ', pronunciation: 'aa-gàat', japanese: '天気' },
      { thai: 'ดี', pronunciation: 'dii', japanese: '良い' },
      { thai: 'นะ', pronunciation: 'ná', japanese: '〜ね(確認・同意)' },
      { thai: 'ครับ', pronunciation: 'khráp', japanese: '(男性の丁寧語)' },
    ]
  },
  {
    speaker: 'B',
    thai: 'ดีมากค่ะ',
    pronunciation: 'dii mâak khâ',
    japanese: 'とてもいいですね',
    words: [
      { thai: 'ดี', pronunciation: 'dii', japanese: '良い' },
      { thai: 'มาก', pronunciation: 'mâak', japanese: 'とても' },
      { thai: 'ค่ะ', pronunciation: 'khâ', japanese: '(女性の丁寧語)' },
    ]
  },
];

// b-self-introduction: 自己紹介と基本情報
export const beginnerSelfIntroduction: ConversationLine[] = [
  {
    speaker: 'A',
    thai: 'คุณชื่ออะไรครับ',
    pronunciation: 'khun chʉ̂ʉ à-rai khráp',
    japanese: 'お名前は何ですか',
    words: [
      { thai: 'คุณ', pronunciation: 'khun', japanese: 'あなた' },
      { thai: 'ชื่อ', pronunciation: 'chʉ̂ʉ', japanese: '名前' },
      { thai: 'อะไร', pronunciation: 'à-rai', japanese: '何' },
      { thai: 'ครับ', pronunciation: 'khráp', japanese: '(男性の丁寧語)' },
    ]
  },
  {
    speaker: 'B',
    thai: 'ดิฉันชื่อเมย์ค่ะ',
    pronunciation: 'dì-chǎn chʉ̂ʉ May khâ',
    japanese: '私の名前はメイです',
    words: [
      { thai: 'ดิฉัน', pronunciation: 'dì-chǎn', japanese: '私(女性・丁寧)' },
      { thai: 'ชื่อ', pronunciation: 'chʉ̂ʉ', japanese: '名前' },
      { thai: 'เมย์', pronunciation: 'May', japanese: 'メイ' },
      { thai: 'ค่ะ', pronunciation: 'khâ', japanese: '(女性の丁寧語)' },
    ],
    grammarPoint: {
      title: '一人称代名詞',
      explanation: 'タイ語の「私」は性別や場面で使い分けます。女性丁寧:ดิฉัน、女性カジュアル:ฉัน、男性丁寧:ผม、男性カジュアル:ผม',
      examples: [
        { thai: 'ผมชื่อทาโร่', pronunciation: 'phǒm chʉ̂ʉ Taroo', japanese: '私(男性)の名前はタロウです' },
        { thai: 'ฉันอายุ 25 ปี', pronunciation: 'chǎn aa-yú 25 pii', japanese: '私(女性カジュアル)は25歳です' },
      ]
    }
  },
  {
    speaker: 'A',
    thai: 'คุณเมย์มาจากไหนครับ',
    pronunciation: 'khun May maa jàak nǎi khráp',
    japanese: 'メイさんはどこから来ましたか',
    words: [
      { thai: 'คุณเมย์', pronunciation: 'khun May', japanese: 'メイさん' },
      { thai: 'มา', pronunciation: 'maa', japanese: '来る' },
      { thai: 'จาก', pronunciation: 'jàak', japanese: '〜から' },
      { thai: 'ไหน', pronunciation: 'nǎi', japanese: 'どこ' },
      { thai: 'ครับ', pronunciation: 'khráp', japanese: '(男性の丁寧語)' },
    ]
  },
  {
    speaker: 'B',
    thai: 'ดิฉันมาจากญี่ปุ่นค่ะ',
    pronunciation: 'dì-chǎn maa jàak Yîi-pùn khâ',
    japanese: '私は日本から来ました',
    words: [
      { thai: 'ดิฉัน', pronunciation: 'dì-chǎn', japanese: '私(女性・丁寧)' },
      { thai: 'มา', pronunciation: 'maa', japanese: '来る' },
      { thai: 'จาก', pronunciation: 'jàak', japanese: '〜から' },
      { thai: 'ญี่ปุ่น', pronunciation: 'Yîi-pùn', japanese: '日本' },
      { thai: 'ค่ะ', pronunciation: 'khâ', japanese: '(女性の丁寧語)' },
    ]
  },
  {
    speaker: 'A',
    thai: 'ตอนนี้คุณอยู่ที่ไหนครับ',
    pronunciation: 'tɔɔn-níi khun yùu thîi nǎi khráp',
    japanese: '今はどこに住んでいますか',
    words: [
      { thai: 'ตอนนี้', pronunciation: 'tɔɔn-níi', japanese: '今' },
      { thai: 'คุณ', pronunciation: 'khun', japanese: 'あなた' },
      { thai: 'อยู่', pronunciation: 'yùu', japanese: 'いる、住む' },
      { thai: 'ที่', pronunciation: 'thîi', japanese: '〜で(場所)' },
      { thai: 'ไหน', pronunciation: 'nǎi', japanese: 'どこ' },
      { thai: 'ครับ', pronunciation: 'khráp', japanese: '(男性の丁寧語)' },
    ]
  },
  {
    speaker: 'B',
    thai: 'ดิฉันอยู่ที่กรุงเทพค่ะ',
    pronunciation: 'dì-chǎn yùu thîi Grung-thêep khâ',
    japanese: '私はバンコクに住んでいます',
    words: [
      { thai: 'ดิฉัน', pronunciation: 'dì-chǎn', japanese: '私(女性・丁寧)' },
      { thai: 'อยู่', pronunciation: 'yùu', japanese: 'いる、住む' },
      { thai: 'ที่', pronunciation: 'thîi', japanese: '〜で(場所)' },
      { thai: 'กรุงเทพ', pronunciation: 'Grung-thêep', japanese: 'バンコク' },
      { thai: 'ค่ะ', pronunciation: 'khâ', japanese: '(女性の丁寧語)' },
    ]
  },
  {
    speaker: 'A',
    thai: 'คุณทำงานอะไรครับ',
    pronunciation: 'khun tham-ngaan à-rai khráp',
    japanese: 'どんなお仕事をしていますか',
    words: [
      { thai: 'คุณ', pronunciation: 'khun', japanese: 'あなた' },
      { thai: 'ทำงาน', pronunciation: 'tham-ngaan', japanese: '働く、仕事をする' },
      { thai: 'อะไร', pronunciation: 'à-rai', japanese: '何' },
      { thai: 'ครับ', pronunciation: 'khráp', japanese: '(男性の丁寧語)' },
    ]
  },
  {
    speaker: 'B',
    thai: 'ดิฉันเป็นครูค่ะ',
    pronunciation: 'dì-chǎn pen khruu khâ',
    japanese: '私は先生です',
    words: [
      { thai: 'ดิฉัน', pronunciation: 'dì-chǎn', japanese: '私(女性・丁寧)' },
      { thai: 'เป็น', pronunciation: 'pen', japanese: '〜である' },
      { thai: 'ครู', pronunciation: 'khruu', japanese: '先生' },
      { thai: 'ค่ะ', pronunciation: 'khâ', japanese: '(女性の丁寧語)' },
    ]
  },
];

// b-shopping-basic: ショッピング基礎
export const beginnerShoppingBasic: ConversationLine[] = [
  {
    speaker: '客',
    thai: 'นี่ราคาเท่าไหร่ครับ',
    pronunciation: 'nîi raa-khaa thâo-rài khráp',
    japanese: 'これはいくらですか',
    words: [
      { thai: 'นี่', pronunciation: 'nîi', japanese: 'これ' },
      { thai: 'ราคา', pronunciation: 'raa-khaa', japanese: '価格' },
      { thai: 'เท่าไหร่', pronunciation: 'thâo-rài', japanese: 'いくら' },
      { thai: 'ครับ', pronunciation: 'khráp', japanese: '(男性の丁寧語)' },
    ]
  },
  {
    speaker: '店員',
    thai: 'อันนี้หนึ่งร้อยบาทค่ะ',
    pronunciation: 'an-níi nʉ̀ng-rɔ́ɔi bàat khâ',
    japanese: 'これは100バーツです',
    words: [
      { thai: 'อันนี้', pronunciation: 'an-níi', japanese: 'これ' },
      { thai: 'หนึ่งร้อย', pronunciation: 'nʉ̀ng-rɔ́ɔi', japanese: '100' },
      { thai: 'บาท', pronunciation: 'bàat', japanese: 'バーツ' },
      { thai: 'ค่ะ', pronunciation: 'khâ', japanese: '(女性の丁寧語)' },
    ]
  },
  {
    speaker: '客',
    thai: 'มีสีอื่นไหมครับ',
    pronunciation: 'mii sǐi ʉ̀ʉn mǎi khráp',
    japanese: '他の色はありますか',
    words: [
      { thai: 'มี', pronunciation: 'mii', japanese: 'ある、持っている' },
      { thai: 'สี', pronunciation: 'sǐi', japanese: '色' },
      { thai: 'อื่น', pronunciation: 'ʉ̀ʉn', japanese: '他の' },
      { thai: 'ไหม', pronunciation: 'mǎi', japanese: '〜ですか' },
      { thai: 'ครับ', pronunciation: 'khráp', japanese: '(男性の丁寧語)' },
    ]
  },
  {
    speaker: '店員',
    thai: 'มีค่ะ มีสีแดงกับสีน้ำเงินค่ะ',
    pronunciation: 'mii khâ mii sǐi-dɛɛng gàp sǐi-náam-ngəən khâ',
    japanese: 'あります、赤と青があります',
    words: [
      { thai: 'มี', pronunciation: 'mii', japanese: 'ある' },
      { thai: 'ค่ะ', pronunciation: 'khâ', japanese: '(女性の丁寧語)' },
      { thai: 'สีแดง', pronunciation: 'sǐi-dɛɛng', japanese: '赤色' },
      { thai: 'กับ', pronunciation: 'gàp', japanese: '〜と' },
      { thai: 'สีน้ำเงิน', pronunciation: 'sǐi-náam-ngəən', japanese: '青色' },
    ]
  },
  {
    speaker: '客',
    thai: 'เอาสีน้ำเงินครับ',
    pronunciation: 'ao sǐi-náam-ngəən khráp',
    japanese: '青色をください',
    words: [
      { thai: 'เอา', pronunciation: 'ao', japanese: '取る、欲しい' },
      { thai: 'สีน้ำเงิน', pronunciation: 'sǐi-náam-ngəən', japanese: '青色' },
      { thai: 'ครับ', pronunciation: 'khráp', japanese: '(男性の丁寧語)' },
    ]
  },
  {
    speaker: '店員',
    thai: 'หนึ่งร้อยบาทค่ะ',
    pronunciation: 'nʉ̀ng-rɔ́ɔi bàat khâ',
    japanese: '100バーツです',
    words: [
      { thai: 'หนึ่งร้อย', pronunciation: 'nʉ̀ng-rɔ́ɔi', japanese: '100' },
      { thai: 'บาท', pronunciation: 'bàat', japanese: 'バーツ' },
      { thai: 'ค่ะ', pronunciation: 'khâ', japanese: '(女性の丁寧語)' },
    ]
  },
];

// b-restaurant-basics: レストランでの基本会話
export const beginnerRestaurantBasics: ConversationLine[] = [
  {
    speaker: '店員',
    thai: 'สั่งอะไรดีคะ',
    pronunciation: 'sàng à-rai dii khá',
    japanese: '何にしますか',
    words: [
      { thai: 'สั่ง', pronunciation: 'sàng', japanese: '注文する' },
      { thai: 'อะไร', pronunciation: 'à-rai', japanese: '何' },
      { thai: 'ดี', pronunciation: 'dii', japanese: '良い' },
      { thai: 'คะ', pronunciation: 'khá', japanese: '(女性の丁寧語・疑問)' },
    ]
  },
  {
    speaker: '客',
    thai: 'มีอะไรแนะนำไหมครับ',
    pronunciation: 'mii à-rai nɛ́-nam mǎi khráp',
    japanese: 'おすすめは何ですか',
    words: [
      { thai: 'มี', pronunciation: 'mii', japanese: 'ある' },
      { thai: 'อะไร', pronunciation: 'à-rai', japanese: '何' },
      { thai: 'แนะนำ', pronunciation: 'nɛ́-nam', japanese: 'おすすめ' },
      { thai: 'ไหม', pronunciation: 'mǎi', japanese: '〜ですか' },
      { thai: 'ครับ', pronunciation: 'khráp', japanese: '(男性の丁寧語)' },
    ]
  },
  {
    speaker: '店員',
    thai: 'ผัดไทยอร่อยมากค่ะ',
    pronunciation: 'phàt-thai à-rɔ̀i mâak khâ',
    japanese: 'パッタイがとても美味しいです',
    words: [
      { thai: 'ผัดไทย', pronunciation: 'phàt-thai', japanese: 'パッタイ' },
      { thai: 'อร่อย', pronunciation: 'à-rɔ̀i', japanese: '美味しい' },
      { thai: 'มาก', pronunciation: 'mâak', japanese: 'とても' },
      { thai: 'ค่ะ', pronunciation: 'khâ', japanese: '(女性の丁寧語)' },
    ]
  },
  {
    speaker: '客',
    thai: 'งั้นขอผัดไทยหนึ่งจานครับ',
    pronunciation: 'ngán khɔ̌ɔ phàt-thai nʉ̀ng jaan khráp',
    japanese: 'では、パッタイを一皿ください',
    words: [
      { thai: 'งั้น', pronunciation: 'ngán', japanese: 'では、それなら' },
      { thai: 'ขอ', pronunciation: 'khɔ̌ɔ', japanese: '〜をお願いします' },
      { thai: 'ผัดไทย', pronunciation: 'phàt-thai', japanese: 'パッタイ' },
      { thai: 'หนึ่ง', pronunciation: 'nʉ̀ng', japanese: '1' },
      { thai: 'จาน', pronunciation: 'jaan', japanese: '皿(類別詞)' },
      { thai: 'ครับ', pronunciation: 'khráp', japanese: '(男性の丁寧語)' },
    ]
  },
  {
    speaker: '店員',
    thai: 'รับอะไรดื่มไหมคะ',
    pronunciation: 'ráp à-rai dʉ̀ʉm mǎi khá',
    japanese: '飲み物は何にしますか',
    words: [
      { thai: 'รับ', pronunciation: 'ráp', japanese: '受け取る、注文する' },
      { thai: 'อะไร', pronunciation: 'à-rai', japanese: '何' },
      { thai: 'ดื่ม', pronunciation: 'dʉ̀ʉm', japanese: '飲む' },
      { thai: 'ไหม', pronunciation: 'mǎi', japanese: '〜ですか' },
      { thai: 'คะ', pronunciation: 'khá', japanese: '(女性の丁寧語・疑問)' },
    ]
  },
  {
    speaker: '客',
    thai: 'ขอน้ำเปล่าครับ',
    pronunciation: 'khɔ̌ɔ náam-plào khráp',
    japanese: 'お水をください',
    words: [
      { thai: 'ขอ', pronunciation: 'khɔ̌ɔ', japanese: '〜をお願いします' },
      { thai: 'น้ำเปล่า', pronunciation: 'náam-plào', japanese: '水' },
      { thai: 'ครับ', pronunciation: 'khráp', japanese: '(男性の丁寧語)' },
    ]
  },
];

// ====== 中級会話 (Intermediate) ======

// i-transport-taxi: タクシーに乗る
export const intermediateTaxi: ConversationLine[] = [
  {
    speaker: '客',
    thai: 'ไปสนามบินสุวรรณภูมิครับ',
    pronunciation: 'pai sà-nǎam-bin Sù-wan-ná-phuum khráp',
    japanese: 'スワンナプーム空港に行ってください',
    words: [
      { thai: 'ไป', pronunciation: 'pai', japanese: '行く' },
      { thai: 'สนามบิน', pronunciation: 'sà-nǎam-bin', japanese: '空港' },
      { thai: 'สุวรรณภูมิ', pronunciation: 'Sù-wan-ná-phuum', japanese: 'スワンナプーム' },
      { thai: 'ครับ', pronunciation: 'khráp', japanese: '(男性の丁寧語)' },
    ]
  },
  {
    speaker: '運転手',
    thai: 'ตกลงครับ ใช้มิเตอร์นะครับ',
    pronunciation: 'tòk-long khráp chái mí-təə ná khráp',
    japanese: 'わかりました、メーターを使いますね',
    words: [
      { thai: 'ตกลง', pronunciation: 'tòk-long', japanese: '了解、同意する' },
      { thai: 'ครับ', pronunciation: 'khráp', japanese: '(男性の丁寧語)' },
      { thai: 'ใช้', pronunciation: 'chái', japanese: '使う' },
      { thai: 'มิเตอร์', pronunciation: 'mí-təə', japanese: 'メーター' },
      { thai: 'นะ', pronunciation: 'ná', japanese: '〜ね(確認)' },
    ]
  },
  {
    speaker: '客',
    thai: 'ไปทางด่วนได้ไหมครับ',
    pronunciation: 'pai thaang-dùan dâi mǎi khráp',
    japanese: '高速道路で行けますか',
    words: [
      { thai: 'ไป', pronunciation: 'pai', japanese: '行く' },
      { thai: 'ทางด่วน', pronunciation: 'thaang-dùan', japanese: '高速道路' },
      { thai: 'ได้', pronunciation: 'dâi', japanese: 'できる' },
      { thai: 'ไหม', pronunciation: 'mǎi', japanese: '〜ですか' },
      { thai: 'ครับ', pronunciation: 'khráp', japanese: '(男性の丁寧語)' },
    ],
    grammarPoint: {
      title: '可能性を表す「ได้」',
      explanation: '動詞の後に「ได้(dâi)」を置くと「〜できる」という可能の意味になります。',
      examples: [
        { thai: 'พูดภาษาไทยได้', pronunciation: 'phûut phaa-sǎa-thai dâi', japanese: 'タイ語が話せる' },
        { thai: 'กินเผ็ดได้ไหม', pronunciation: 'gin phèt dâi mǎi', japanese: '辛いのを食べられますか' },
      ]
    }
  },
  {
    speaker: '運転手',
    thai: 'ได้ครับ แต่ต้องเสียค่าทางด่วนนะครับ',
    pronunciation: 'dâi khráp tɛ̀ɛ tɔ̂ng sǐa khâa-thaang-dùan ná khráp',
    japanese: 'はい、でも高速料金がかかりますよ',
    words: [
      { thai: 'ได้', pronunciation: 'dâi', japanese: 'できる' },
      { thai: 'ครับ', pronunciation: 'khráp', japanese: '(男性の丁寧語)' },
      { thai: 'แต่', pronunciation: 'tɛ̀ɛ', japanese: 'しかし' },
      { thai: 'ต้อง', pronunciation: 'tɔ̂ng', japanese: '〜しなければならない' },
      { thai: 'เสีย', pronunciation: 'sǐa', japanese: '支払う、失う' },
      { thai: 'ค่าทางด่วน', pronunciation: 'khâa-thaang-dùan', japanese: '高速料金' },
      { thai: 'นะ', pronunciation: 'ná', japanese: '〜ね(確認)' },
    ]
  },
  {
    speaker: '客',
    thai: 'ไม่เป็นไรครับ',
    pronunciation: 'mâi-pen-rai khráp',
    japanese: '問題ありません',
    words: [
      { thai: 'ไม่เป็นไร', pronunciation: 'mâi-pen-rai', japanese: '大丈夫、問題ない' },
      { thai: 'ครับ', pronunciation: 'khráp', japanese: '(男性の丁寧語)' },
    ]
  },
  {
    speaker: '運転手',
    thai: 'คุณต้องไปเที่ยวบินกี่โมงครับ',
    pronunciation: 'khun tɔ̂ng pai thîao-bin gìi moong khráp',
    japanese: '何時のフライトですか',
    words: [
      { thai: 'คุณ', pronunciation: 'khun', japanese: 'あなた' },
      { thai: 'ต้อง', pronunciation: 'tɔ̂ng', japanese: '〜しなければならない' },
      { thai: 'ไป', pronunciation: 'pai', japanese: '行く' },
      { thai: 'เที่ยวบิน', pronunciation: 'thîao-bin', japanese: 'フライト' },
      { thai: 'กี่โมง', pronunciation: 'gìi moong', japanese: '何時' },
      { thai: 'ครับ', pronunciation: 'khráp', japanese: '(男性の丁寧語)' },
    ]
  },
  {
    speaker: '客',
    thai: 'สามทุ่มครับ ยังมีเวลาอีกสองชั่วโมง',
    pronunciation: 'sǎam thûm khráp yang mii wee-laa ìik sɔ̌ɔng chûa-moong',
    japanese: '午後9時です。まだ2時間あります',
    words: [
      { thai: 'สามทุ่ม', pronunciation: 'sǎam thûm', japanese: '午後9時' },
      { thai: 'ครับ', pronunciation: 'khráp', japanese: '(男性の丁寧語)' },
      { thai: 'ยัง', pronunciation: 'yang', japanese: 'まだ' },
      { thai: 'มี', pronunciation: 'mii', japanese: 'ある' },
      { thai: 'เวลา', pronunciation: 'wee-laa', japanese: '時間' },
      { thai: 'อีก', pronunciation: 'ìik', japanese: 'さらに、もう' },
      { thai: 'สองชั่วโมง', pronunciation: 'sɔ̌ɔng chûa-moong', japanese: '2時間' },
    ]
  },
  {
    speaker: '運転手',
    thai: 'ทันสบายครับ ไปถึงประมาณชั่วโมงนึงครับ',
    pronunciation: 'than sà-baai khráp pai thʉ̌ng prà-maan chûa-moong nʉng khráp',
    japanese: '余裕で間に合いますよ。約1時間で着きます',
    words: [
      { thai: 'ทัน', pronunciation: 'than', japanese: '間に合う' },
      { thai: 'สบาย', pronunciation: 'sà-baai', japanese: '快適、余裕' },
      { thai: 'ครับ', pronunciation: 'khráp', japanese: '(男性の丁寧語)' },
      { thai: 'ไปถึง', pronunciation: 'pai thʉ̌ng', japanese: '到着する' },
      { thai: 'ประมาณ', pronunciation: 'prà-maan', japanese: 'およそ' },
      { thai: 'ชั่วโมงนึง', pronunciation: 'chûa-moong nʉng', japanese: '1時間' },
    ]
  },
];

// i-restaurant-requests: レストランでのリクエスト
export const intermediateRestaurantRequests: ConversationLine[] = [
  {
    speaker: '客',
    thai: 'ขอดูเมนูหน่อยครับ',
    pronunciation: 'khɔ̌ɔ duu mee-nuu nɔ̀i khráp',
    japanese: 'メニューを見せてください',
    words: [
      { thai: 'ขอ', pronunciation: 'khɔ̌ɔ', japanese: '〜をお願いします' },
      { thai: 'ดู', pronunciation: 'duu', japanese: '見る' },
      { thai: 'เมนู', pronunciation: 'mee-nuu', japanese: 'メニュー' },
      { thai: 'หน่อย', pronunciation: 'nɔ̀i', japanese: 'ちょっと(柔らかい依頼)' },
      { thai: 'ครับ', pronunciation: 'khráp', japanese: '(男性の丁寧語)' },
    ],
    grammarPoint: {
      title: '丁寧な依頼表現「หน่อย」',
      explanation: '動詞の後に「หน่อย(nɔ̀i)」を付けると、「ちょっと〜してください」という柔らかい依頼表現になります。',
      examples: [
        { thai: 'รอหน่อยนะ', pronunciation: 'rɔɔ nɔ̀i ná', japanese: 'ちょっと待ってね' },
        { thai: 'ช่วยหน่อยได้ไหม', pronunciation: 'chûai nɔ̀i dâi mǎi', japanese: 'ちょっと手伝ってもらえますか' },
      ]
    }
  },
  {
    speaker: '店員',
    thai: 'ค่ะ เชิญค่ะ',
    pronunciation: 'khâ chəən khâ',
    japanese: 'はい、どうぞ',
    words: [
      { thai: 'ค่ะ', pronunciation: 'khâ', japanese: '(女性の丁寧語)' },
      { thai: 'เชิญ', pronunciation: 'chəən', japanese: 'どうぞ' },
    ]
  },
  {
    speaker: '客',
    thai: 'ต้มยำกุ้งรสชาติเป็นอย่างไรครับ',
    pronunciation: 'tôm-yam-gûng rót-châat pen yàang-rai khráp',
    japanese: 'トムヤムクンの味はどんな感じですか',
    words: [
      { thai: 'ต้มยำกุ้ง', pronunciation: 'tôm-yam-gûng', japanese: 'トムヤムクン' },
      { thai: 'รสชาติ', pronunciation: 'rót-châat', japanese: '味' },
      { thai: 'เป็น', pronunciation: 'pen', japanese: '〜である' },
      { thai: 'อย่างไร', pronunciation: 'yàang-rai', japanese: 'どのように' },
      { thai: 'ครับ', pronunciation: 'khráp', japanese: '(男性の丁寧語)' },
    ]
  },
  {
    speaker: '店員',
    thai: 'รสเปรื้อยเผ็ดนิดหน่อยค่ะ',
    pronunciation: 'rót-prʉ́ai phèt nít-nɔ̀i khâ',
    japanese: '酸っぱ辛い味で、少し辛いです',
    words: [
      { thai: 'รส', pronunciation: 'rót', japanese: '味' },
      { thai: 'เปรื้อย', pronunciation: 'prʉ́ai', japanese: '酸っぱい' },
      { thai: 'เผ็ด', pronunciation: 'phèt', japanese: '辛い' },
      { thai: 'นิดหน่อย', pronunciation: 'nít-nɔ̀i', japanese: '少し' },
      { thai: 'ค่ะ', pronunciation: 'khâ', japanese: '(女性の丁寧語)' },
    ]
  },
  {
    speaker: '客',
    thai: 'ทำไม่เผ็ดได้ไหมครับ',
    pronunciation: 'tham mâi-phèt dâi mǎi khráp',
    japanese: '辛くないようにできますか',
    words: [
      { thai: 'ทำ', pronunciation: 'tham', japanese: '作る' },
      { thai: 'ไม่เผ็ด', pronunciation: 'mâi-phèt', japanese: '辛くない' },
      { thai: 'ได้', pronunciation: 'dâi', japanese: 'できる' },
      { thai: 'ไหม', pronunciation: 'mǎi', japanese: '〜ですか' },
      { thai: 'ครับ', pronunciation: 'khráp', japanese: '(男性の丁寧語)' },
    ]
  },
  {
    speaker: '店員',
    thai: 'ได้ค่ะ หรือจะทำเผ็ดน้อยก็ได้ค่ะ',
    pronunciation: 'dâi khâ rʉ̌ʉ jà tham phèt-nɔ́ɔi gɔ̂ dâi khâ',
    japanese: 'できます、または少し辛くすることもできます',
    words: [
      { thai: 'ได้', pronunciation: 'dâi', japanese: 'できる' },
      { thai: 'ค่ะ', pronunciation: 'khâ', japanese: '(女性の丁寧語)' },
      { thai: 'หรือ', pronunciation: 'rʉ̌ʉ', japanese: 'または' },
      { thai: 'จะ', pronunciation: 'jà', japanese: '〜する(未来)' },
      { thai: 'ทำ', pronunciation: 'tham', japanese: '作る' },
      { thai: 'เผ็ดน้อย', pronunciation: 'phèt-nɔ́ɔi', japanese: '少し辛い' },
      { thai: 'ก็ได้', pronunciation: 'gɔ̂ dâi', japanese: '〜でもいい' },
    ]
  },
  {
    speaker: '客',
    thai: 'งั้นขอเผ็ดน้อยครับ',
    pronunciation: 'ngán khɔ̌ɔ phèt-nɔ́ɔi khráp',
    japanese: 'では少し辛くしてください',
    words: [
      { thai: 'งั้น', pronunciation: 'ngán', japanese: 'では' },
      { thai: 'ขอ', pronunciation: 'khɔ̌ɔ', japanese: '〜をお願いします' },
      { thai: 'เผ็ดน้อย', pronunciation: 'phèt-nɔ́ɔi', japanese: '少し辛い' },
      { thai: 'ครับ', pronunciation: 'khráp', japanese: '(男性の丁寧語)' },
    ]
  },
  {
    speaker: '店員',
    thai: 'รับทราบค่ะ',
    pronunciation: 'ráp-sâap khâ',
    japanese: '承知しました',
    words: [
      { thai: 'รับทราบ', pronunciation: 'ráp-sâap', japanese: '承知する' },
      { thai: 'ค่ะ', pronunciation: 'khâ', japanese: '(女性の丁寧語)' },
    ]
  },
];

// ====== 上級会話 (Advanced) ======

// a-renting-apartment: アパートを借りる
export const advancedRentingApartment: ConversationLine[] = [
  {
    speaker: '客',
    thai: 'ผมกำลังมองหาคอนโดให้เช่าอยู่ครับ',
    pronunciation: 'phǒm gam-lang mɔɔng-hǎa khɔn-doo hâi-châo yùu khráp',
    japanese: '賃貸マンションを探しているのですが',
    words: [
      { thai: 'ผม', pronunciation: 'phǒm', japanese: '私(男性)' },
      { thai: 'กำลัง', pronunciation: 'gam-lang', japanese: '〜している(進行形)' },
      { thai: 'มองหา', pronunciation: 'mɔɔng-hǎa', japanese: '探す' },
      { thai: 'คอนโด', pronunciation: 'khɔn-doo', japanese: 'マンション' },
      { thai: 'ให้เช่า', pronunciation: 'hâi-châo', japanese: '賃貸の' },
      { thai: 'อยู่', pronunciation: 'yùu', japanese: '〜している(継続)' },
      { thai: 'ครับ', pronunciation: 'khráp', japanese: '(男性の丁寧語)' },
    ],
    grammarPoint: {
      title: '進行形「กำลัง〜อยู่」',
      explanation: '「กำลัง(gam-lang)」+動詞+「อยู่(yùu)」で「今〜している最中だ」という進行形を表します。',
      examples: [
        { thai: 'กำลังกินข้าวอยู่', pronunciation: 'gam-lang gin khâao yùu', japanese: 'ご飯を食べているところです' },
        { thai: 'กำลังเรียนภาษาไทยอยู่', pronunciation: 'gam-lang riian phaa-sǎa-thai yùu', japanese: 'タイ語を勉強しているところです' },
      ]
    }
  },
  {
    speaker: '不動産屋',
    thai: 'คุณต้องการห้องขนาดเท่าไหร่ครับ',
    pronunciation: 'khun tɔ̂ng-gaan hɔ̂ng khà-nàat thâo-rài khráp',
    japanese: 'どのくらいの広さの部屋をお探しですか',
    words: [
      { thai: 'คุณ', pronunciation: 'khun', japanese: 'あなた' },
      { thai: 'ต้องการ', pronunciation: 'tɔ̂ng-gaan', japanese: '必要とする、欲しい' },
      { thai: 'ห้อง', pronunciation: 'hɔ̂ng', japanese: '部屋' },
      { thai: 'ขนาด', pronunciation: 'khà-nàat', japanese: '大きさ、サイズ' },
      { thai: 'เท่าไหร่', pronunciation: 'thâo-rài', japanese: 'どのくらい' },
      { thai: 'ครับ', pronunciation: 'khráp', japanese: '(男性の丁寧語)' },
    ]
  },
  {
    speaker: '客',
    thai: 'ห้องนอนหนึ่งห้องก็พอครับ งบประมาณประมาณหนึ่งหมื่นบาท',
    pronunciation: 'hɔ̂ng-nɔɔn nʉ̀ng hɔ̂ng gɔ̂ phɔɔ khráp ngóp-prà-maan prà-maan nʉ̀ng-mʉ̀ʉn bàat',
    japanese: '1ベッドルームで十分です。予算は1万バーツくらいです',
    words: [
      { thai: 'ห้องนอน', pronunciation: 'hɔ̂ng-nɔɔn', japanese: '寝室' },
      { thai: 'หนึ่งห้อง', pronunciation: 'nʉ̀ng hɔ̂ng', japanese: '1部屋' },
      { thai: 'ก็พอ', pronunciation: 'gɔ̂ phɔɔ', japanese: '〜で十分' },
      { thai: 'ครับ', pronunciation: 'khráp', japanese: '(男性の丁寧語)' },
      { thai: 'งบประมาณ', pronunciation: 'ngóp-prà-maan', japanese: '予算' },
      { thai: 'ประมาณ', pronunciation: 'prà-maan', japanese: 'およそ' },
      { thai: 'หนึ่งหมื่นบาท', pronunciation: 'nʉ̀ng-mʉ̀ʉn bàat', japanese: '1万バーツ' },
    ]
  },
  {
    speaker: '不動産屋',
    thai: 'มีห้องที่เหมาะสมอยู่หลายห้องครับ แถวไหนดีครับ',
    pronunciation: 'mii hɔ̂ng thîi mɔ̀-sǒm yùu lǎai hɔ̂ng khráp thɛ̌ɛo nǎi dii khráp',
    japanese: 'ぴったりの部屋がいくつかあります。どのエリアがいいですか',
    words: [
      { thai: 'มี', pronunciation: 'mii', japanese: 'ある' },
      { thai: 'ห้อง', pronunciation: 'hɔ̂ng', japanese: '部屋' },
      { thai: 'ที่', pronunciation: 'thîi', japanese: '〜という(関係詞)' },
      { thai: 'เหมาะสม', pronunciation: 'mɔ̀-sǒm', japanese: '適切な' },
      { thai: 'อยู่', pronunciation: 'yùu', japanese: 'ある、いる' },
      { thai: 'หลายห้อง', pronunciation: 'lǎai hɔ̂ng', japanese: '多くの部屋' },
      { thai: 'แถว', pronunciation: 'thɛ̌ɛo', japanese: 'エリア、辺り' },
      { thai: 'ไหน', pronunciation: 'nǎi', japanese: 'どこ' },
      { thai: 'ดี', pronunciation: 'dii', japanese: '良い' },
    ]
  },
  {
    speaker: '客',
    thai: 'ต้องการอยู่ใกล้รถไฟฟ้า เดินทางไปออฟฟิศสะดวกครับ',
    pronunciation: 'tɔ̂ng-gaan yùu glâi rót-fai-fáa dəən-thaang pai ɔ́ɔf-fít sà-dùak khráp',
    japanese: 'BTSの近くがいいです。オフィスへの通勤が便利なので',
    words: [
      { thai: 'ต้องการ', pronunciation: 'tɔ̂ng-gaan', japanese: '必要とする' },
      { thai: 'อยู่', pronunciation: 'yùu', japanese: '住む' },
      { thai: 'ใกล้', pronunciation: 'glâi', japanese: '近い' },
      { thai: 'รถไฟฟ้า', pronunciation: 'rót-fai-fáa', japanese: 'BTS(スカイトレイン)' },
      { thai: 'เดินทาง', pronunciation: 'dəən-thaang', japanese: '移動する、通勤する' },
      { thai: 'ไป', pronunciation: 'pai', japanese: '行く' },
      { thai: 'ออฟฟิศ', pronunciation: 'ɔ́ɔf-fít', japanese: 'オフィス' },
      { thai: 'สะดวก', pronunciation: 'sà-dùak', japanese: '便利' },
    ]
  },
  {
    speaker: '不動産屋',
    thai: 'มีคอนโดใกล้สถานีอโศกครับ ห้องสวย เฟอร์นิเจอร์ครบ',
    pronunciation: 'mii khɔn-doo glâi sà-thǎa-nii À-sòok khráp hɔ̂ng sǔai fəə-ní-jəə khrôp',
    japanese: 'アソーク駅近くのマンションがあります。きれいな部屋で、家具付きです',
    words: [
      { thai: 'มี', pronunciation: 'mii', japanese: 'ある' },
      { thai: 'คอนโด', pronunciation: 'khɔn-doo', japanese: 'マンション' },
      { thai: 'ใกล้', pronunciation: 'glâi', japanese: '近い' },
      { thai: 'สถานี', pronunciation: 'sà-thǎa-nii', japanese: '駅' },
      { thai: 'อโศก', pronunciation: 'À-sòok', japanese: 'アソーク' },
      { thai: 'ห้องสวย', pronunciation: 'hɔ̂ng sǔai', japanese: 'きれいな部屋' },
      { thai: 'เฟอร์นิเจอร์', pronunciation: 'fəə-ní-jəə', japanese: '家具' },
      { thai: 'ครบ', pronunciation: 'khrôp', japanese: '揃っている、完備' },
    ]
  },
  {
    speaker: '客',
    thai: 'ค่าเช่าเท่าไหร่ครับ มีค่าใช้จ่ายอื่นอีกไหม',
    pronunciation: 'khâa-châo thâo-rài khráp mii khâa-chái-jàai ʉ̀ʉn ìik mǎi',
    japanese: '家賃はいくらですか。他に費用はかかりますか',
    words: [
      { thai: 'ค่าเช่า', pronunciation: 'khâa-châo', japanese: '家賃' },
      { thai: 'เท่าไหร่', pronunciation: 'thâo-rài', japanese: 'いくら' },
      { thai: 'ครับ', pronunciation: 'khráp', japanese: '(男性の丁寧語)' },
      { thai: 'มี', pronunciation: 'mii', japanese: 'ある' },
      { thai: 'ค่าใช้จ่าย', pronunciation: 'khâa-chái-jàai', japanese: '費用' },
      { thai: 'อื่น', pronunciation: 'ʉ̀ʉn', japanese: '他の' },
      { thai: 'อีก', pronunciation: 'ìik', japanese: 'さらに' },
      { thai: 'ไหม', pronunciation: 'mǎi', japanese: '〜ですか' },
    ]
  },
  {
    speaker: '不動産屋',
    thai: 'เดือนละเก้าพันห้าร้อยครับ ค่าน้ำค่าไฟแยกจ่ายนะครับ',
    pronunciation: 'dʉan-lá gâao-phan hâa-rɔ́ɔi khráp khâa-náam khâa-fai yɛ̂ɛk-jàai ná khráp',
    japanese: '月9,500バーツです。水道光熱費は別払いです',
    words: [
      { thai: 'เดือนละ', pronunciation: 'dʉan-lá', japanese: '月あたり' },
      { thai: 'เก้าพันห้าร้อย', pronunciation: 'gâao-phan hâa-rɔ́ɔi', japanese: '9,500' },
      { thai: 'ครับ', pronunciation: 'khráp', japanese: '(男性の丁寧語)' },
      { thai: 'ค่าน้ำค่าไฟ', pronunciation: 'khâa-náam khâa-fai', japanese: '水道光熱費' },
      { thai: 'แยกจ่าย', pronunciation: 'yɛ̂ɛk-jàai', japanese: '別払い' },
      { thai: 'นะ', pronunciation: 'ná', japanese: '〜ね(確認)' },
    ]
  },
];

// a-job-interview: 就職の面接
export const advancedJobInterview: ConversationLine[] = [
  {
    speaker: '面接官',
    thai: 'เล่าให้ฟังหน่อยครับว่าทำไมถึงสนใจตำแหน่งนี้',
    pronunciation: 'lâo hâi fang nɔ̀i khráp wâa tham-mai thʉ̌ng sǒn-jai tam-nɛ̀ng níi',
    japanese: 'この職種に興味を持った理由を教えてください',
    words: [
      { thai: 'เล่าให้ฟัง', pronunciation: 'lâo hâi fang', japanese: '話して聞かせる' },
      { thai: 'หน่อย', pronunciation: 'nɔ̀i', japanese: 'ちょっと' },
      { thai: 'ครับ', pronunciation: 'khráp', japanese: '(男性の丁寧語)' },
      { thai: 'ว่า', pronunciation: 'wâa', japanese: '〜ということ' },
      { thai: 'ทำไม', pronunciation: 'tham-mai', japanese: 'なぜ' },
      { thai: 'ถึง', pronunciation: 'thʉ̌ng', japanese: '〜に至る' },
      { thai: 'สนใจ', pronunciation: 'sǒn-jai', japanese: '興味がある' },
      { thai: 'ตำแหน่ง', pronunciation: 'tam-nɛ̀ng', japanese: '職位、ポジション' },
      { thai: 'นี้', pronunciation: 'níi', japanese: 'この' },
    ]
  },
  {
    speaker: '応募者',
    thai: 'เพราะผมมีความสนใจในด้านการตลาดดิจิทัลมาตลอดครับ',
    pronunciation: 'phrɔ́ phǒm mii khwaam-sǒn-jai nai dâan gaan-tà-làat dì-jì-than maa tà-lɔ̀ɔt khráp',
    japanese: 'デジタルマーケティング分野にずっと興味があったからです',
    words: [
      { thai: 'เพราะ', pronunciation: 'phrɔ́', japanese: 'なぜなら' },
      { thai: 'ผม', pronunciation: 'phǒm', japanese: '私(男性)' },
      { thai: 'มี', pronunciation: 'mii', japanese: 'ある、持つ' },
      { thai: 'ความสนใจ', pronunciation: 'khwaam-sǒn-jai', japanese: '興味' },
      { thai: 'ใน', pronunciation: 'nai', japanese: '〜において' },
      { thai: 'ด้าน', pronunciation: 'dâan', japanese: '分野、側面' },
      { thai: 'การตลาดดิจิทัล', pronunciation: 'gaan-tà-làat dì-jì-than', japanese: 'デジタルマーケティング' },
      { thai: 'มาตลอด', pronunciation: 'maa tà-lɔ̀ɔt', japanese: 'ずっと' },
    ],
    grammarPoint: {
      title: '理由を表す「เพราะ」',
      explanation: '「เพราะ(phrɔ́)」は「なぜなら〜だから」という理由を表す接続詞です。文頭または文中で使用します。',
      examples: [
        { thai: 'ไม่ไปเพราะฝนตก', pronunciation: 'mâi pai phrɔ́ fǒn tòk', japanese: '雨が降っているので行かない' },
        { thai: 'เพราะชอบจึงเรียน', pronunciation: 'phrɔ́ chɔ̂ɔp jʉng riian', japanese: '好きだから勉強する' },
      ]
    }
  },
  {
    speaker: '面接官',
    thai: 'คุณเคยทำงานในสายงานนี้มาก่อนไหมครับ',
    pronunciation: 'khun khəəi tham-ngaan nai sǎai-ngaan níi maa gɔ̀ɔn mǎi khráp',
    japanese: 'この分野で働いた経験はありますか',
    words: [
      { thai: 'คุณ', pronunciation: 'khun', japanese: 'あなた' },
      { thai: 'เคย', pronunciation: 'khəəi', japanese: '〜したことがある(経験)' },
      { thai: 'ทำงาน', pronunciation: 'tham-ngaan', japanese: '働く' },
      { thai: 'ใน', pronunciation: 'nai', japanese: '〜において' },
      { thai: 'สายงาน', pronunciation: 'sǎai-ngaan', japanese: '職種、分野' },
      { thai: 'นี้', pronunciation: 'níi', japanese: 'この' },
      { thai: 'มาก่อน', pronunciation: 'maa gɔ̀ɔn', japanese: '以前に' },
      { thai: 'ไหม', pronunciation: 'mǎi', japanese: '〜ですか' },
    ]
  },
  {
    speaker: '応募者',
    thai: 'เคยครับ ผมทำงานที่บริษัทโฆษณามาสามปีครับ',
    pronunciation: 'khəəi khráp phǒm tham-ngaan thîi bɔɔ-rì-sàt khoo-sà-nǎa maa sǎam pii khráp',
    japanese: 'はい、広告会社で3年間働いていました',
    words: [
      { thai: 'เคย', pronunciation: 'khəəi', japanese: '〜したことがある' },
      { thai: 'ครับ', pronunciation: 'khráp', japanese: '(男性の丁寧語)' },
      { thai: 'ผม', pronunciation: 'phǒm', japanese: '私(男性)' },
      { thai: 'ทำงาน', pronunciation: 'tham-ngaan', japanese: '働く' },
      { thai: 'ที่', pronunciation: 'thîi', japanese: '〜で(場所)' },
      { thai: 'บริษัท', pronunciation: 'bɔɔ-rì-sàt', japanese: '会社' },
      { thai: 'โฆษณา', pronunciation: 'khoo-sà-nǎa', japanese: '広告' },
      { thai: 'มา', pronunciation: 'maa', japanese: '〜してきた' },
      { thai: 'สามปี', pronunciation: 'sǎam pii', japanese: '3年' },
    ]
  },
  {
    speaker: '面接官',
    thai: 'จุดแข็งของคุณคืออะไรครับ',
    pronunciation: 'jùt-khɛ̌ng khɔ̌ɔng khun khʉʉ à-rai khráp',
    japanese: 'あなたの強みは何ですか',
    words: [
      { thai: 'จุดแข็ง', pronunciation: 'jùt-khɛ̌ng', japanese: '強み' },
      { thai: 'ของ', pronunciation: 'khɔ̌ɔng', japanese: '〜の' },
      { thai: 'คุณ', pronunciation: 'khun', japanese: 'あなた' },
      { thai: 'คือ', pronunciation: 'khʉʉ', japanese: '〜である' },
      { thai: 'อะไร', pronunciation: 'à-rai', japanese: '何' },
      { thai: 'ครับ', pronunciation: 'khráp', japanese: '(男性の丁寧語)' },
    ]
  },
  {
    speaker: '応募者',
    thai: 'ผมมีความคิดสร้างสรรค์และสามารถทำงานเป็นทีมได้ดีครับ',
    pronunciation: 'phǒm mii khwaam-khít sâang-sǎn lɛ́ sǎa-mâat tham-ngaan pen thiim dâi dii khráp',
    japanese: '私は創造性があり、チームで働くのが得意です',
    words: [
      { thai: 'ผม', pronunciation: 'phǒm', japanese: '私(男性)' },
      { thai: 'มี', pronunciation: 'mii', japanese: '持つ' },
      { thai: 'ความคิดสร้างสรรค์', pronunciation: 'khwaam-khít sâang-sǎn', japanese: '創造性' },
      { thai: 'และ', pronunciation: 'lɛ́', japanese: 'そして' },
      { thai: 'สามารถ', pronunciation: 'sǎa-mâat', japanese: '〜できる' },
      { thai: 'ทำงาน', pronunciation: 'tham-ngaan', japanese: '働く' },
      { thai: 'เป็นทีม', pronunciation: 'pen thiim', japanese: 'チームで' },
      { thai: 'ได้ดี', pronunciation: 'dâi dii', japanese: '上手にできる' },
    ]
  },
  {
    speaker: '面接官',
    thai: 'คุณคาดหวังเงินเดือนเท่าไหร่ครับ',
    pronunciation: 'khun khâat-wǎng ngəən-dʉan thâo-rài khráp',
    japanese: '希望給与はいくらですか',
    words: [
      { thai: 'คุณ', pronunciation: 'khun', japanese: 'あなた' },
      { thai: 'คาดหวัง', pronunciation: 'khâat-wǎng', japanese: '期待する、希望する' },
      { thai: 'เงินเดือน', pronunciation: 'ngəən-dʉan', japanese: '給料' },
      { thai: 'เท่าไหร่', pronunciation: 'thâo-rài', japanese: 'いくら' },
      { thai: 'ครับ', pronunciation: 'khráp', japanese: '(男性の丁寧語)' },
    ]
  },
  {
    speaker: '応募者',
    thai: 'ผมคาดหวังเงินเดือนประมาณสี่หมื่นบาทครับ แต่ยินดีพิจารณาตามข้อเสนอของบริษัทครับ',
    pronunciation: 'phǒm khâat-wǎng ngəən-dʉan prà-maan sìi-mʉ̀ʉn bàat khráp tɛ̀ɛ yin-dii phí-jaa-rá-naa taam khɔ̂ɔ-sà-nə̌ə khɔ̌ɔng bɔɔ-rì-sàt khráp',
    japanese: '4万バーツくらいを希望していますが、会社の提示に応じて検討いたします',
    words: [
      { thai: 'ผม', pronunciation: 'phǒm', japanese: '私(男性)' },
      { thai: 'คาดหวัง', pronunciation: 'khâat-wǎng', japanese: '期待する' },
      { thai: 'เงินเดือน', pronunciation: 'ngəən-dʉan', japanese: '給料' },
      { thai: 'ประมาณ', pronunciation: 'prà-maan', japanese: 'およそ' },
      { thai: 'สี่หมื่นบาท', pronunciation: 'sìi-mʉ̀ʉn bàat', japanese: '4万バーツ' },
      { thai: 'แต่', pronunciation: 'tɛ̀ɛ', japanese: 'しかし' },
      { thai: 'ยินดี', pronunciation: 'yin-dii', japanese: '喜んで' },
      { thai: 'พิจารณา', pronunciation: 'phí-jaa-rá-naa', japanese: '検討する' },
      { thai: 'ตาม', pronunciation: 'taam', japanese: '〜に従って' },
      { thai: 'ข้อเสนอ', pronunciation: 'khɔ̂ɔ-sà-nə̌ə', japanese: '提案' },
      { thai: 'ของ', pronunciation: 'khɔ̌ɔng', japanese: '〜の' },
      { thai: 'บริษัท', pronunciation: 'bɔɔ-rì-sàt', japanese: '会社' },
    ]
  },
];

// a-opening-bank-account: 銀行口座の開設
export const advancedOpeningBankAccount: ConversationLine[] = [
  {
    speaker: '客',
    thai: 'ผมต้องการเปิดบัญชีเงินฝากครับ',
    pronunciation: 'phǒm tɔ̂ng-gaan pə̀ət ban-chii ngəən-fàak khráp',
    japanese: '預金口座を開設したいのですが',
    words: [
      { thai: 'ผม', pronunciation: 'phǒm', japanese: '私(男性)' },
      { thai: 'ต้องการ', pronunciation: 'tɔ̂ng-gaan', japanese: '必要とする、欲しい' },
      { thai: 'เปิด', pronunciation: 'pə̀ət', japanese: '開く' },
      { thai: 'บัญชี', pronunciation: 'ban-chii', japanese: '口座' },
      { thai: 'เงินฝาก', pronunciation: 'ngəən-fàak', japanese: '預金' },
    ]
  },
  {
    speaker: '行員',
    thai: 'ได้ครับ มีเอกสารอะไรบ้างครับ',
    pronunciation: 'dâi khráp mii èek-gà-sǎan à-rai bâang khráp',
    japanese: 'はい、どんな書類をお持ちですか',
    words: [
      { thai: 'ได้', pronunciation: 'dâi', japanese: 'できる' },
      { thai: 'มี', pronunciation: 'mii', japanese: 'ある、持っている' },
      { thai: 'เอกสาร', pronunciation: 'èek-gà-sǎan', japanese: '書類' },
      { thai: 'อะไรบ้าง', pronunciation: 'à-rai bâang', japanese: '何か(複数)' },
    ]
  },
  {
    speaker: '客',
    thai: 'มีพาสปอร์ตกับวีซ่าครับ',
    pronunciation: 'mii phaas-pɔ̀ɔt gàp wii-sâa khráp',
    japanese: 'パスポートとビザがあります',
    words: [
      { thai: 'มี', pronunciation: 'mii', japanese: 'ある' },
      { thai: 'พาสปอร์ต', pronunciation: 'phaas-pɔ̀ɔt', japanese: 'パスポート' },
      { thai: 'กับ', pronunciation: 'gàp', japanese: 'と' },
      { thai: 'วีซ่า', pronunciation: 'wii-sâa', japanese: 'ビザ' },
    ]
  },
  {
    speaker: '行員',
    thai: 'ต้องฝากเงินขั้นต่ำห้าพันบาทครับ',
    pronunciation: 'tɔ̂ng fàak-ngəən khân-tàm hâa-phan bàat khráp',
    japanese: '最低5000バーツの預金が必要です',
    words: [
      { thai: 'ต้อง', pronunciation: 'tɔ̂ng', japanese: '〜しなければならない' },
      { thai: 'ฝากเงิน', pronunciation: 'fàak-ngəən', japanese: '預金する' },
      { thai: 'ขั้นต่ำ', pronunciation: 'khân-tàm', japanese: '最低' },
      { thai: 'ห้าพันบาท', pronunciation: 'hâa-phan bàat', japanese: '5000バーツ' },
    ]
  },
];

// a-business-meeting: ビジネス会議
export const advancedBusinessMeeting: ConversationLine[] = [
  {
    speaker: '議長',
    thai: 'วันนี้เราจะหารือเรื่องโครงการใหม่ครับ',
    pronunciation: 'wan-níi rao jà hǎa-rʉʉ rʉ̂ang khroo ng-gaan mài khráp',
    japanese: '今日は新プロジェクトについて議論します',
    words: [
      { thai: 'วันนี้', pronunciation: 'wan-níi', japanese: '今日' },
      { thai: 'เรา', pronunciation: 'rao', japanese: '私たち' },
      { thai: 'จะ', pronunciation: 'jà', japanese: '〜する(未来)' },
      { thai: 'หารือ', pronunciation: 'hǎa-rʉʉ', japanese: '議論する' },
      { thai: 'เรื่อง', pronunciation: 'rʉ̂ang', japanese: '〜の件' },
      { thai: 'โครงการใหม่', pronunciation: 'khroo ng-gaan mài', japanese: '新プロジェクト' },
    ]
  },
  {
    speaker: '参加者A',
    thai: 'ผมขอเสนอแนวคิดหนึ่งครับ',
    pronunciation: 'phǒm khɔ̌ɔ-sà-nə̌ə nɛɛo-khít nʉ̀ng khráp',
    japanese: '一つ提案があります',
    words: [
      { thai: 'ผม', pronunciation: 'phǒm', japanese: '私(男性)' },
      { thai: 'ขอเสนอ', pronunciation: 'khɔ̌ɔ-sà-nə̌ə', japanese: '提案する' },
      { thai: 'แนวคิด', pronunciation: 'nɛɛo-khít', japanese: 'アイデア、考え' },
      { thai: 'หนึ่ง', pronunciation: 'nʉ̀ng', japanese: '一つ' },
    ]
  },
  {
    speaker: '議長',
    thai: 'เชิญพูดได้เลยครับ',
    pronunciation: 'chəən phûut dâi ləəi khráp',
    japanese: 'どうぞお話しください',
    words: [
      { thai: 'เชิญ', pronunciation: 'chəən', japanese: 'どうぞ' },
      { thai: 'พูด', pronunciation: 'phûut', japanese: '話す' },
      { thai: 'ได้เลย', pronunciation: 'dâi ləəi', japanese: 'どうぞ' },
    ]
  },
  {
    speaker: '参加者A',
    thai: 'ผมคิดว่าเราควรเน้นการตลาดออนไลน์มากขึ้นครับ',
    pronunciation: 'phǒm khít wâa rao khuuan nén gaan-tà-làat ɔɔn-lai mâak-khʉ̂n khráp',
    japanese: 'オンラインマーケティングにもっと力を入れるべきだと思います',
    words: [
      { thai: 'ผม', pronunciation: 'phǒm', japanese: '私(男性)' },
      { thai: 'คิดว่า', pronunciation: 'khít wâa', japanese: '〜と思う' },
      { thai: 'เรา', pronunciation: 'rao', japanese: '私たち' },
      { thai: 'ควร', pronunciation: 'khuuan', japanese: '〜すべきだ' },
      { thai: 'เน้น', pronunciation: 'nén', japanese: '強調する、力を入れる' },
      { thai: 'การตลาดออนไลน์', pronunciation: 'gaan-tà-làat ɔɔn-lai', japanese: 'オンラインマーケティング' },
      { thai: 'มากขึ้น', pronunciation: 'mâak-khʉ̂n', japanese: 'もっと多く' },
    ]
  },
];

// a-discussing-news: ニュースについて議論する
export const advancedDiscussingNews: ConversationLine[] = [
  {
    speaker: 'A',
    thai: 'คุณเห็นข่าวเมื่อเช้าไหมครับ',
    pronunciation: 'khun hěn khàao mʉ̂a-cháao mǎi khráp',
    japanese: '今朝のニュースを見ましたか',
    words: [
      { thai: 'คุณ', pronunciation: 'khun', japanese: 'あなた' },
      { thai: 'เห็น', pronunciation: 'hěn', japanese: '見る' },
      { thai: 'ข่าว', pronunciation: 'khàao', japanese: 'ニュース' },
      { thai: 'เมื่อเช้า', pronunciation: 'mʉ̂a-cháao', japanese: '今朝' },
      { thai: 'ไหม', pronunciation: 'mǎi', japanese: '〜ですか' },
    ]
  },
  {
    speaker: 'B',
    thai: 'เห็นค่ะ เรื่องอะไรคะ',
    pronunciation: 'hěn khâ rʉ̂ang à-rai khá',
    japanese: '見ました、何の件ですか',
    words: [
      { thai: 'เห็น', pronunciation: 'hěn', japanese: '見る' },
      { thai: 'เรื่อง', pronunciation: 'rʉ̂ang', japanese: '〜の件' },
      { thai: 'อะไร', pronunciation: 'à-rai', japanese: '何' },
    ]
  },
  {
    speaker: 'A',
    thai: 'เรื่องเศรษฐกิจครับ ผมคิดว่าน่าสนใจมาก',
    pronunciation: 'rʉ̂ang sèet-thà-gìt khráp phǒm khít wâa nâa-sǒn-jai mâak',
    japanese: '経済の件です、とても興味深いと思いました',
    words: [
      { thai: 'เรื่อง', pronunciation: 'rʉ̂ang', japanese: '〜の件' },
      { thai: 'เศรษฐกิจ', pronunciation: 'sèet-thà-gìt', japanese: '経済' },
      { thai: 'ผม', pronunciation: 'phǒm', japanese: '私(男性)' },
      { thai: 'คิดว่า', pronunciation: 'khít wâa', japanese: '〜と思う' },
      { thai: 'น่าสนใจ', pronunciation: 'nâa-sǒn-jai', japanese: '興味深い' },
      { thai: 'มาก', pronunciation: 'mâak', japanese: 'とても' },
    ]
  },
  {
    speaker: 'B',
    thai: 'ฉันเห็นด้วยค่ะ มันจะส่งผลกระทบต่อหลายคนเลย',
    pronunciation: 'chǎn hěn-dûai khâ man jà sòng-phǒn-grà-thóp tɔ̀ɔ lǎai khon ləəi',
    japanese: '賛成です、多くの人に影響を与えるでしょう',
    words: [
      { thai: 'ฉัน', pronunciation: 'chǎn', japanese: '私' },
      { thai: 'เห็นด้วย', pronunciation: 'hěn-dûai', japanese: '賛成する' },
      { thai: 'มัน', pronunciation: 'man', japanese: 'それ' },
      { thai: 'จะ', pronunciation: 'jà', japanese: '〜でしょう' },
      { thai: 'ส่งผลกระทบ', pronunciation: 'sòng-phǒn-grà-thóp', japanese: '影響を与える' },
      { thai: 'ต่อ', pronunciation: 'tɔ̀ɔ', japanese: '〜に対して' },
      { thai: 'หลายคน', pronunciation: 'lǎai khon', japanese: '多くの人' },
    ]
  },
];

// a-thai-culture: タイの文化について話す
export const advancedThaiCulture: ConversationLine[] = [
  {
    speaker: 'A',
    thai: 'คุณรู้จักประเพณีสงกรานต์ไหมครับ',
    pronunciation: 'khun rúu-jàk prà-phee-nii Sǒng-graan mǎi khráp',
    japanese: 'ソンクラーンの伝統をご存知ですか',
    words: [
      { thai: 'คุณ', pronunciation: 'khun', japanese: 'あなた' },
      { thai: 'รู้จัก', pronunciation: 'rúu-jàk', japanese: '知っている' },
      { thai: 'ประเพณี', pronunciation: 'prà-phee-nii', japanese: '伝統、習慣' },
      { thai: 'สงกรานต์', pronunciation: 'Sǒng-graan', japanese: 'ソンクラーン' },
      { thai: 'ไหม', pronunciation: 'mǎi', japanese: '〜ですか' },
    ]
  },
  {
    speaker: 'B',
    thai: 'รู้ค่ะ เป็นเทศกาลปีใหม่ไทยใช่ไหมคะ',
    pronunciation: 'rúu khâ pen thêet-sà-gaan pii-mài thai châi mǎi khá',
    japanese: '知っています、タイの正月ですよね',
    words: [
      { thai: 'รู้', pronunciation: 'rúu', japanese: '知っている' },
      { thai: 'เป็น', pronunciation: 'pen', japanese: '〜である' },
      { thai: 'เทศกาล', pronunciation: 'thêet-sà-gaan', japanese: '祭り、フェスティバル' },
      { thai: 'ปีใหม่ไทย', pronunciation: 'pii-mài thai', japanese: 'タイの正月' },
      { thai: 'ใช่ไหม', pronunciation: 'châi mǎi', japanese: '〜ですよね' },
    ]
  },
  {
    speaker: 'A',
    thai: 'ถูกต้องครับ เป็นวันที่สำคัญมากสำหรับคนไทย',
    pronunciation: 'thùuk-tɔ̂ng khráp pen wan thîi sǎm-khan mâak sǎm-ràp khon-thai',
    japanese: '正解です、タイ人にとってとても重要な日です',
    words: [
      { thai: 'ถูกต้อง', pronunciation: 'thùuk-tɔ̂ng', japanese: '正しい' },
      { thai: 'เป็น', pronunciation: 'pen', japanese: '〜である' },
      { thai: 'วันที่สำคัญ', pronunciation: 'wan thîi sǎm-khan', japanese: '重要な日' },
      { thai: 'มาก', pronunciation: 'mâak', japanese: 'とても' },
      { thai: 'สำหรับ', pronunciation: 'sǎm-ràp', japanese: '〜のために' },
      { thai: 'คนไทย', pronunciation: 'khon-thai', japanese: 'タイ人' },
    ]
  },
  {
    speaker: 'B',
    thai: 'ช่วงนั้นคนไทยทำอะไรกันบ้างคะ',
    pronunciation: 'chûang nán khon-thai tham à-rai gan bâang khá',
    japanese: 'その時期、タイ人は何をしますか',
    words: [
      { thai: 'ช่วงนั้น', pronunciation: 'chûang nán', japanese: 'その時期' },
      { thai: 'คนไทย', pronunciation: 'khon-thai', japanese: 'タイ人' },
      { thai: 'ทำ', pronunciation: 'tham', japanese: 'する' },
      { thai: 'อะไร', pronunciation: 'à-rai', japanese: '何' },
      { thai: 'กันบ้าง', pronunciation: 'gan bâang', japanese: '一緒に(複数)' },
    ]
  },
];

// a-expressing-emotions: 感情や意見を詳しく表現する
export const advancedExpressingEmotions: ConversationLine[] = [
  {
    speaker: 'A',
    thai: 'ผมรู้สึกเสียใจมากเลยครับ',
    pronunciation: 'phǒm rúu-sʉ̀k sǐa-jai mâak ləəi khráp',
    japanese: 'とても悲しいです',
    words: [
      { thai: 'ผม', pronunciation: 'phǒm', japanese: '私(男性)' },
      { thai: 'รู้สึก', pronunciation: 'rúu-sʉ̀k', japanese: '感じる' },
      { thai: 'เสียใจ', pronunciation: 'sǐa-jai', japanese: '悲しい' },
      { thai: 'มากเลย', pronunciation: 'mâak ləəi', japanese: 'とても' },
    ]
  },
  {
    speaker: 'B',
    thai: 'เกิดอะไรขึ้นหรอคะ',
    pronunciation: 'gə̀ət à-rai khʉ̂n rɔ̌ɔ khá',
    japanese: '何があったのですか',
    words: [
      { thai: 'เกิด', pronunciation: 'gə̀ət', japanese: '起こる' },
      { thai: 'อะไร', pronunciation: 'à-rai', japanese: '何' },
      { thai: 'ขึ้น', pronunciation: 'khʉ̂n', japanese: '上がる、起こる' },
      { thai: 'หรอ', pronunciation: 'rɔ̌ɔ', japanese: '〜ですか(口語)' },
    ]
  },
  {
    speaker: 'A',
    thai: 'โครงการที่ผมทำหนักมานานล้มเหลวครับ',
    pronunciation: 'khroo ng-gaan thîi phǒm tham nàk maa naan lóm-lěw khráp',
    japanese: '長い間頑張ってきたプロジェクトが失敗しました',
    words: [
      { thai: 'โครงการ', pronunciation: 'khroo ng-gaan', japanese: 'プロジェクト' },
      { thai: 'ที่', pronunciation: 'thîi', japanese: '〜という' },
      { thai: 'ผม', pronunciation: 'phǒm', japanese: '私(男性)' },
      { thai: 'ทำหนัก', pronunciation: 'tham nàk', japanese: '頑張る' },
      { thai: 'มานาน', pronunciation: 'maa naan', japanese: '長い間' },
      { thai: 'ล้มเหลว', pronunciation: 'lóm-lěw', japanese: '失敗する' },
    ]
  },
  {
    speaker: 'B',
    thai: 'เข้าใจความรู้สึกค่ะ แต่อย่าท้อนะคะ',
    pronunciation: 'khâo-jai khwaam-rúu-sʉ̀k khâ tɛ̀ɛ yàa thɔ́ɔ ná khá',
    japanese: 'お気持ちわかります、でも諦めないでくださいね',
    words: [
      { thai: 'เข้าใจ', pronunciation: 'khâo-jai', japanese: '理解する' },
      { thai: 'ความรู้สึก', pronunciation: 'khwaam-rúu-sʉ̀k', japanese: '気持ち' },
      { thai: 'แต่', pronunciation: 'tɛ̀ɛ', japanese: 'しかし' },
      { thai: 'อย่าท้อ', pronunciation: 'yàa thɔ́ɔ', japanese: '諦めないで' },
      { thai: 'นะคะ', pronunciation: 'ná khá', japanese: '〜ね(女性)' },
    ]
  },
];

// a-making-complaint: クレームを入れる
export const advancedMakingComplaint: ConversationLine[] = [
  {
    speaker: '客',
    thai: 'ขอโทษครับ ผมมีปัญหากับสินค้าที่ซื้อไปครับ',
    pronunciation: 'khɔ̌ɔ-thôot khráp phǒm mii pan-hǎa gàp sǐn-kháa thîi sʉ́ʉ pai khráp',
    japanese: 'すみません、購入した商品に問題があります',
    words: [
      { thai: 'ขอโทษ', pronunciation: 'khɔ̌ɔ-thôot', japanese: 'すみません' },
      { thai: 'ผม', pronunciation: 'phǒm', japanese: '私(男性)' },
      { thai: 'มี', pronunciation: 'mii', japanese: 'ある' },
      { thai: 'ปัญหา', pronunciation: 'pan-hǎa', japanese: '問題' },
      { thai: 'กับ', pronunciation: 'gàp', japanese: '〜に関して' },
      { thai: 'สินค้า', pronunciation: 'sǐn-kháa', japanese: '商品' },
      { thai: 'ที่ซื้อไป', pronunciation: 'thîi sʉ́ʉ pai', japanese: '購入した' },
    ]
  },
  {
    speaker: '店員',
    thai: 'เสียใจด้วยค่ะ เกิดปัญหาอะไรคะ',
    pronunciation: 'sǐa-jai dûai khâ gə̀ət pan-hǎa à-rai khá',
    japanese: '申し訳ございません、どのような問題ですか',
    words: [
      { thai: 'เสียใจด้วย', pronunciation: 'sǐa-jai dûai', japanese: '残念です' },
      { thai: 'เกิด', pronunciation: 'gə̀ət', japanese: '起こる' },
      { thai: 'ปัญหา', pronunciation: 'pan-hǎa', japanese: '問題' },
      { thai: 'อะไร', pronunciation: 'à-rai', japanese: '何' },
    ]
  },
  {
    speaker: '客',
    thai: 'สินค้าชำรุดครับ ผมต้องการเปลี่ยนหรือคืนเงิน',
    pronunciation: 'sǐn-kháa cham-rút khráp phǒm tɔ̂ng-gaan plìian rʉ̌ʉ khəən-ngəən',
    japanese: '商品が壊れています、交換か返金をお願いしたいのですが',
    words: [
      { thai: 'สินค้า', pronunciation: 'sǐn-kháa', japanese: '商品' },
      { thai: 'ชำรุด', pronunciation: 'cham-rút', japanese: '壊れている' },
      { thai: 'ผม', pronunciation: 'phǒm', japanese: '私(男性)' },
      { thai: 'ต้องการ', pronunciation: 'tɔ̂ng-gaan', japanese: '欲しい' },
      { thai: 'เปลี่ยน', pronunciation: 'plìian', japanese: '交換する' },
      { thai: 'หรือ', pronunciation: 'rʉ̌ʉ', japanese: 'または' },
      { thai: 'คืนเงิน', pronunciation: 'khəən-ngəən', japanese: '返金' },
    ]
  },
  {
    speaker: '店員',
    thai: 'ได้ค่ะ ขอดูใบเสร็จหน่อยได้ไหมคะ',
    pronunciation: 'dâi khâ khɔ̌ɔ duu bai-sèt nɔ̀i dâi mǎi khá',
    japanese: 'はい、レシートを見せていただけますか',
    words: [
      { thai: 'ได้', pronunciation: 'dâi', japanese: 'できる' },
      { thai: 'ขอ', pronunciation: 'khɔ̌ɔ', japanese: '〜をお願いします' },
      { thai: 'ดู', pronunciation: 'duu', japanese: '見る' },
      { thai: 'ใบเสร็จ', pronunciation: 'bai-sèt', japanese: 'レシート' },
      { thai: 'หน่อย', pronunciation: 'nɔ̀i', japanese: 'ちょっと' },
      { thai: 'ได้ไหมคะ', pronunciation: 'dâi mǎi khá', japanese: '〜できますか(女性)' },
    ]
  },
];

// i-asking-directions: 道を尋ねる
export const intermediateAskingDirections: ConversationLine[] = [
  {
    speaker: '旅行者',
    thai: 'ขอโทษครับ สถานีรถไฟฟ้าอยู่ที่ไหนครับ',
    pronunciation: 'khɔ̌ɔ-thôot khráp sà-thǎa-nii rót-fai-fáa yùu thîi-nǎi khráp',
    japanese: 'すみません、BTS駅はどこですか',
    words: [
      { thai: 'ขอโทษ', pronunciation: 'khɔ̌ɔ-thôot', japanese: 'すみません' },
      { thai: 'ครับ', pronunciation: 'khráp', japanese: '(男性の丁寧語)' },
      { thai: 'สถานีรถไฟฟ้า', pronunciation: 'sà-thǎa-nii rót-fai-fáa', japanese: 'BTS駅' },
      { thai: 'อยู่', pronunciation: 'yùu', japanese: 'ある' },
      { thai: 'ที่ไหน', pronunciation: 'thîi-nǎi', japanese: 'どこ' },
    ]
  },
  {
    speaker: '地元の人',
    thai: 'เดินตรงไปประมาณห้านาทีครับ จะเห็นอยู่ทางซ้ายมือ',
    pronunciation: 'dəən trong pai prà-maan hâa naa-thii khráp jà hěn yùu thaang sáai-mʉʉ',
    japanese: 'まっすぐ5分ほど歩くと、左手に見えます',
    words: [
      { thai: 'เดิน', pronunciation: 'dəən', japanese: '歩く' },
      { thai: 'ตรงไป', pronunciation: 'trong pai', japanese: 'まっすぐ行く' },
      { thai: 'ประมาณ', pronunciation: 'prà-maan', japanese: 'およそ' },
      { thai: 'ห้านาที', pronunciation: 'hâa naa-thii', japanese: '5分' },
      { thai: 'จะ', pronunciation: 'jà', japanese: '〜でしょう' },
      { thai: 'เห็น', pronunciation: 'hěn', japanese: '見える' },
      { thai: 'อยู่', pronunciation: 'yùu', japanese: 'ある' },
      { thai: 'ทางซ้ายมือ', pronunciation: 'thaang sáai-mʉʉ', japanese: '左手に' },
    ]
  },
  {
    speaker: '旅行者',
    thai: 'ต้องข้ามถนนไหมครับ',
    pronunciation: 'tɔ̂ng khâam thà-nǒn mǎi khráp',
    japanese: '道を渡る必要がありますか',
    words: [
      { thai: 'ต้อง', pronunciation: 'tɔ̂ng', japanese: '〜しなければならない' },
      { thai: 'ข้าม', pronunciation: 'khâam', japanese: '渡る' },
      { thai: 'ถนน', pronunciation: 'thà-nǒn', japanese: '道路' },
      { thai: 'ไหม', pronunciation: 'mǎi', japanese: '〜ですか' },
    ]
  },
  {
    speaker: '地元の人',
    thai: 'ไม่ต้องครับ เดินไปฝั่งเดียวกันเลย',
    pronunciation: 'mâi-tɔ̂ng khráp dəən pai fàng-diiao-gan ləəi',
    japanese: 'いいえ、同じ側をそのまま歩いてください',
    words: [
      { thai: 'ไม่ต้อง', pronunciation: 'mâi-tɔ̂ng', japanese: '〜する必要がない' },
      { thai: 'เดินไป', pronunciation: 'dəən pai', japanese: '歩いて行く' },
      { thai: 'ฝั่งเดียวกัน', pronunciation: 'fàng-diiao-gan', japanese: '同じ側' },
      { thai: 'เลย', pronunciation: 'ləəi', japanese: 'そのまま' },
    ]
  },
];

// i-shopping-advanced: 買い物での交渉
export const intermediateShoppingAdvanced: ConversationLine[] = [
  {
    speaker: '客',
    thai: 'ลดได้ไหมครับ',
    pronunciation: 'lót dâi mǎi khráp',
    japanese: '値引きできますか',
    words: [
      { thai: 'ลด', pronunciation: 'lót', japanese: '値引きする' },
      { thai: 'ได้ไหม', pronunciation: 'dâi mǎi', japanese: '〜できますか' },
      { thai: 'ครับ', pronunciation: 'khráp', japanese: '(男性の丁寧語)' },
    ]
  },
  {
    speaker: '店員',
    thai: 'ซื้อหลายชิ้นลดให้นะคะ',
    pronunciation: 'sʉ́ʉ lǎai chín lót hâi ná khá',
    japanese: 'たくさん買ってくれたら値引きしますよ',
    words: [
      { thai: 'ซื้อ', pronunciation: 'sʉ́ʉ', japanese: '買う' },
      { thai: 'หลายชิ้น', pronunciation: 'lǎai chín', japanese: 'たくさん' },
      { thai: 'ลดให้', pronunciation: 'lót hâi', japanese: '値引きしてあげる' },
      { thai: 'นะคะ', pronunciation: 'ná khá', japanese: '〜ね(女性)' },
    ],
    grammarPoint: {
      title: '条件を表す構文',
      explanation: '「〜したら〜する」という条件表現は、2つの文を並べることで表現できます。',
      examples: [
        { thai: 'ซื้อมากลดให้', pronunciation: 'sʉ́ʉ mâak lót hâi', japanese: 'たくさん買ったら値引きする' },
        { thai: 'มาเช้ามีของสด', pronunciation: 'maa cháao mii khɔ̌ɔng-sòt', japanese: '朝来たら新鮮なものがある' },
      ]
    }
  },
  {
    speaker: '客',
    thai: 'ซื้อสามชิ้นลดเท่าไหร่ครับ',
    pronunciation: 'sʉ́ʉ sǎam chín lót thâo-rài khráp',
    japanese: '3つ買ったらいくら値引きしてくれますか',
    words: [
      { thai: 'ซื้อ', pronunciation: 'sʉ́ʉ', japanese: '買う' },
      { thai: 'สามชิ้น', pronunciation: 'sǎam chín', japanese: '3つ' },
      { thai: 'ลด', pronunciation: 'lót', japanese: '値引きする' },
      { thai: 'เท่าไหร่', pronunciation: 'thâo-rài', japanese: 'いくら' },
    ]
  },
  {
    speaker: '店員',
    thai: 'ลดให้สิบเปอร์เซ็นต์ค่ะ',
    pronunciation: 'lót hâi sìp pəə-sen khâ',
    japanese: '10%値引きします',
    words: [
      { thai: 'ลดให้', pronunciation: 'lót hâi', japanese: '値引きしてあげる' },
      { thai: 'สิบเปอร์เซ็นต์', pronunciation: 'sìp pəə-sen', japanese: '10パーセント' },
    ]
  },
];

// i-hotel-checkin: ホテルでチェックイン
export const intermediateHotelCheckin: ConversationLine[] = [
  {
    speaker: '客',
    thai: 'ผมจองห้องไว้ครับ',
    pronunciation: 'phǒm jɔɔng hɔ̂ng wái khráp',
    japanese: '部屋を予約しています',
    words: [
      { thai: 'ผม', pronunciation: 'phǒm', japanese: '私(男性)' },
      { thai: 'จอง', pronunciation: 'jɔɔng', japanese: '予約する' },
      { thai: 'ห้อง', pronunciation: 'hɔ̂ng', japanese: '部屋' },
      { thai: 'ไว้', pronunciation: 'wái', japanese: '〜しておく' },
      { thai: 'ครับ', pronunciation: 'khráp', japanese: '(男性の丁寧語)' },
    ]
  },
  {
    speaker: 'スタッフ',
    thai: 'ขอดูพาสปอร์ตหน่อยได้ไหมคะ',
    pronunciation: 'khɔ̌ɔ duu phaas-pɔ̀ɔt nɔ̀i dâi mǎi khá',
    japanese: 'パスポートを見せていただけますか',
    words: [
      { thai: 'ขอ', pronunciation: 'khɔ̌ɔ', japanese: '〜をお願いします' },
      { thai: 'ดู', pronunciation: 'duu', japanese: '見る' },
      { thai: 'พาสปอร์ต', pronunciation: 'phaas-pɔ̀ɔt', japanese: 'パスポート' },
      { thai: 'หน่อย', pronunciation: 'nɔ̀i', japanese: 'ちょっと' },
      { thai: 'ได้ไหมคะ', pronunciation: 'dâi mǎi khá', japanese: '〜できますか(女性)' },
    ]
  },
  {
    speaker: '客',
    thai: 'ห้องมีวิวทะเลไหมครับ',
    pronunciation: 'hɔ̂ng mii wiw thá-lee mǎi khráp',
    japanese: '部屋は海の景色が見えますか',
    words: [
      { thai: 'ห้อง', pronunciation: 'hɔ̂ng', japanese: '部屋' },
      { thai: 'มี', pronunciation: 'mii', japanese: 'ある' },
      { thai: 'วิว', pronunciation: 'wiw', japanese: '景色' },
      { thai: 'ทะเล', pronunciation: 'thá-lee', japanese: '海' },
      { thai: 'ไหม', pronunciation: 'mǎi', japanese: '〜ですか' },
    ]
  },
  {
    speaker: 'スタッフ',
    thai: 'มีค่ะ ห้องของคุณอยู่ชั้นสิบสองค่ะ',
    pronunciation: 'mii khâ hɔ̂ng khɔ̌ɔng khun yùu chán sìp-sɔ̌ɔng khâ',
    japanese: 'はい、お部屋は12階です',
    words: [
      { thai: 'มี', pronunciation: 'mii', japanese: 'ある' },
      { thai: 'ห้องของคุณ', pronunciation: 'hɔ̂ng khɔ̌ɔng khun', japanese: 'あなたの部屋' },
      { thai: 'อยู่', pronunciation: 'yùu', japanese: 'ある' },
      { thai: 'ชั้น', pronunciation: 'chán', japanese: '階' },
      { thai: 'สิบสอง', pronunciation: 'sìp-sɔ̌ɔng', japanese: '12' },
    ]
  },
];

// i-health-symptoms: 体調を伝える
export const intermediateHealthSymptoms: ConversationLine[] = [
  {
    speaker: '患者',
    thai: 'ผมรู้สึกไม่สบายครับ',
    pronunciation: 'phǒm rúu-sʉ̀k mâi-sà-baai khráp',
    japanese: '具合が悪いです',
    words: [
      { thai: 'ผม', pronunciation: 'phǒm', japanese: '私(男性)' },
      { thai: 'รู้สึก', pronunciation: 'rúu-sʉ̀k', japanese: '感じる' },
      { thai: 'ไม่สบาย', pronunciation: 'mâi-sà-baai', japanese: '具合が悪い' },
      { thai: 'ครับ', pronunciation: 'khráp', japanese: '(男性の丁寧語)' },
    ]
  },
  {
    speaker: '医師',
    thai: 'มีอาการอะไรบ้างครับ',
    pronunciation: 'mii aa-gaan à-rai bâang khráp',
    japanese: 'どんな症状がありますか',
    words: [
      { thai: 'มี', pronunciation: 'mii', japanese: 'ある' },
      { thai: 'อาการ', pronunciation: 'aa-gaan', japanese: '症状' },
      { thai: 'อะไรบ้าง', pronunciation: 'à-rai bâang', japanese: '何か(複数)' },
      { thai: 'ครับ', pronunciation: 'khráp', japanese: '(男性の丁寧語)' },
    ]
  },
  {
    speaker: '患者',
    thai: 'ปวดหัวและมีไข้ครับ',
    pronunciation: 'pùat-hǔa lɛ́ mii khâi khráp',
    japanese: '頭痛と熱があります',
    words: [
      { thai: 'ปวดหัว', pronunciation: 'pùat-hǔa', japanese: '頭痛' },
      { thai: 'และ', pronunciation: 'lɛ́', japanese: 'そして' },
      { thai: 'มีไข้', pronunciation: 'mii khâi', japanese: '熱がある' },
    ]
  },
  {
    speaker: '医師',
    thai: 'ตั้งแต่เมื่อไหร่ครับ',
    pronunciation: 'tâng-tɛ̀ɛ mʉ̂a-rài khráp',
    japanese: 'いつからですか',
    words: [
      { thai: 'ตั้งแต่', pronunciation: 'tâng-tɛ̀ɛ', japanese: '〜から' },
      { thai: 'เมื่อไหร่', pronunciation: 'mʉ̂a-rài', japanese: 'いつ' },
    ]
  },
  {
    speaker: '患者',
    thai: 'เมื่อวานนี้ครับ',
    pronunciation: 'mʉ̂a-waan-níi khráp',
    japanese: '昨日からです',
    words: [
      { thai: 'เมื่อวาน', pronunciation: 'mʉ̂a-waan', japanese: '昨日' },
      { thai: 'นี้', pronunciation: 'níi', japanese: 'この' },
    ]
  },
];

// i-hobbies: 趣味について話す
export const intermediateHobbies: ConversationLine[] = [
  {
    speaker: 'A',
    thai: 'วันหยุดคุณชอบทำอะไรครับ',
    pronunciation: 'wan-yùt khun chɔ̂ɔp tham à-rai khráp',
    japanese: '休日は何をするのが好きですか',
    words: [
      { thai: 'วันหยุด', pronunciation: 'wan-yùt', japanese: '休日' },
      { thai: 'คุณ', pronunciation: 'khun', japanese: 'あなた' },
      { thai: 'ชอบ', pronunciation: 'chɔ̂ɔp', japanese: '好き' },
      { thai: 'ทำ', pronunciation: 'tham', japanese: 'する' },
      { thai: 'อะไร', pronunciation: 'à-rai', japanese: '何' },
    ]
  },
  {
    speaker: 'B',
    thai: 'ฉันชอบออกกำลังกายค่ะ โดยเฉพาะวิ่ง',
    pronunciation: 'chǎn chɔ̂ɔp ɔ̀ɔk-gam-lang-gaai khâ doo-chà-phɔ́ wîng',
    japanese: '運動が好きです、特にランニングが',
    words: [
      { thai: 'ฉัน', pronunciation: 'chǎn', japanese: '私' },
      { thai: 'ชอบ', pronunciation: 'chɔ̂ɔp', japanese: '好き' },
      { thai: 'ออกกำลังกาย', pronunciation: 'ɔ̀ɔk-gam-lang-gaai', japanese: '運動する' },
      { thai: 'โดยเฉพาะ', pronunciation: 'doo-chà-phɔ́', japanese: '特に' },
      { thai: 'วิ่ง', pronunciation: 'wîng', japanese: '走る' },
    ]
  },
  {
    speaker: 'A',
    thai: 'วิ่งบ่อยแค่ไหนครับ',
    pronunciation: 'wîng bɔ̀ɔi khɛ̂ɛ-nǎi khráp',
    japanese: 'どのくらいの頻度で走りますか',
    words: [
      { thai: 'วิ่ง', pronunciation: 'wîng', japanese: '走る' },
      { thai: 'บ่อย', pronunciation: 'bɔ̀ɔi', japanese: '頻繁に' },
      { thai: 'แค่ไหน', pronunciation: 'khɛ̂ɛ-nǎi', japanese: 'どのくらい' },
    ]
  },
  {
    speaker: 'B',
    thai: 'สัปดาห์ละสามสี่ครั้งค่ะ',
    pronunciation: 'sàp-daa lá sǎam-sìi khráng khâ',
    japanese: '週に3-4回です',
    words: [
      { thai: 'สัปดาห์ละ', pronunciation: 'sàp-daa lá', japanese: '週に' },
      { thai: 'สามสี่ครั้ง', pronunciation: 'sǎam-sìi khráng', japanese: '3-4回' },
    ]
  },
];

// i-making-plans: 友人と計画を立てる
export const intermediateMakingPlans: ConversationLine[] = [
  {
    speaker: 'A',
    thai: 'เสาร์หน้าว่างไหมครับ',
    pronunciation: 'sǎo nâa wâang mǎi khráp',
    japanese: '来週の土曜日は空いていますか',
    words: [
      { thai: 'เสาร์หน้า', pronunciation: 'sǎo nâa', japanese: '来週の土曜日' },
      { thai: 'ว่าง', pronunciation: 'wâang', japanese: '空いている' },
      { thai: 'ไหม', pronunciation: 'mǎi', japanese: '〜ですか' },
    ]
  },
  {
    speaker: 'B',
    thai: 'ว่างค่ะ มีอะไรหรอคะ',
    pronunciation: 'wâang khâ mii à-rai rɔ̌ɔ khá',
    japanese: '空いてます、何かありますか',
    words: [
      { thai: 'ว่าง', pronunciation: 'wâang', japanese: '空いている' },
      { thai: 'มี', pronunciation: 'mii', japanese: 'ある' },
      { thai: 'อะไร', pronunciation: 'à-rai', japanese: '何' },
      { thai: 'หรอ', pronunciation: 'rɔ̌ɔ', japanese: '〜ですか(口語)' },
    ]
  },
  {
    speaker: 'A',
    thai: 'ไปดูหนังกันไหมครับ',
    pronunciation: 'pai duu nǎng gan mǎi khráp',
    japanese: '映画を見に行きませんか',
    words: [
      { thai: 'ไป', pronunciation: 'pai', japanese: '行く' },
      { thai: 'ดูหนัง', pronunciation: 'duu nǎng', japanese: '映画を見る' },
      { thai: 'กัน', pronunciation: 'gan', japanese: '一緒に' },
      { thai: 'ไหม', pronunciation: 'mǎi', japanese: '〜ですか' },
    ],
    grammarPoint: {
      title: '誘いの表現「กัน」',
      explanation: '「กัน(gan)」は「一緒に」という意味で、誘いの文でよく使われます。',
      examples: [
        { thai: 'ไปกินข้าวกัน', pronunciation: 'pai gin khâao gan', japanese: '一緒にご飯を食べに行こう' },
        { thai: 'เล่นกัน', pronunciation: 'lên gan', japanese: '一緒に遊ぼう' },
      ]
    }
  },
  {
    speaker: 'B',
    thai: 'ดีค่ะ พบกันกี่โมงดีคะ',
    pronunciation: 'dii khâ phóp gan gìi moong dii khá',
    japanese: 'いいですね、何時に会いましょうか',
    words: [
      { thai: 'ดี', pronunciation: 'dii', japanese: '良い' },
      { thai: 'พบกัน', pronunciation: 'phóp gan', japanese: '会う' },
      { thai: 'กี่โมง', pronunciation: 'gìi moong', japanese: '何時' },
      { thai: 'ดี', pronunciation: 'dii', japanese: '良い' },
    ]
  },
  {
    speaker: 'A',
    thai: 'บ่ายสองโมงที่หน้าโรงหนังนะครับ',
    pronunciation: 'bàai sɔ̌ɔng moong thîi nâa roong-nǎng ná khráp',
    japanese: '午後2時に映画館の前でお願いします',
    words: [
      { thai: 'บ่ายสองโมง', pronunciation: 'bàai sɔ̌ɔng moong', japanese: '午後2時' },
      { thai: 'ที่', pronunciation: 'thîi', japanese: '〜で' },
      { thai: 'หน้า', pronunciation: 'nâa', japanese: '前' },
      { thai: 'โรงหนัง', pronunciation: 'roong-nǎng', japanese: '映画館' },
      { thai: 'นะ', pronunciation: 'ná', japanese: '〜ね' },
    ]
  },
];

// i-phone-call: 電話での会話
export const intermediatePhoneCall: ConversationLine[] = [
  {
    speaker: 'A',
    thai: 'สวัสดีครับ ขอพูดกับคุณสมชายได้ไหมครับ',
    pronunciation: 'sà-wàt-dii khráp khɔ̌ɔ phûut gàp khun Sǒm-chaai dâi mǎi khráp',
    japanese: 'もしもし、ソムチャイさんをお願いできますか',
    words: [
      { thai: 'สวัสดี', pronunciation: 'sà-wàt-dii', japanese: 'こんにちは' },
      { thai: 'ขอ', pronunciation: 'khɔ̌ɔ', japanese: '〜をお願いします' },
      { thai: 'พูดกับ', pronunciation: 'phûut gàp', japanese: '〜と話す' },
      { thai: 'คุณสมชาย', pronunciation: 'khun Sǒm-chaai', japanese: 'ソムチャイさん' },
      { thai: 'ได้ไหม', pronunciation: 'dâi mǎi', japanese: '〜できますか' },
    ]
  },
  {
    speaker: 'B',
    thai: 'รอสักครู่นะคะ',
    pronunciation: 'rɔɔ sàk-khrûu ná khá',
    japanese: '少々お待ちください',
    words: [
      { thai: 'รอ', pronunciation: 'rɔɔ', japanese: '待つ' },
      { thai: 'สักครู่', pronunciation: 'sàk-khrûu', japanese: '少しの間' },
      { thai: 'นะคะ', pronunciation: 'ná khá', japanese: '〜ね(女性)' },
    ]
  },
  {
    speaker: 'C',
    thai: 'ผมสมชายครับ มีอะไรให้ช่วยครับ',
    pronunciation: 'phǒm Sǒm-chaai khráp mii à-rai hâi chûai khráp',
    japanese: '私ソムチャイです、何かご用ですか',
    words: [
      { thai: 'ผม', pronunciation: 'phǒm', japanese: '私(男性)' },
      { thai: 'สมชาย', pronunciation: 'Sǒm-chaai', japanese: 'ソムチャイ' },
      { thai: 'มี', pronunciation: 'mii', japanese: 'ある' },
      { thai: 'อะไร', pronunciation: 'à-rai', japanese: '何' },
      { thai: 'ให้ช่วย', pronunciation: 'hâi chûai', japanese: '手伝うこと' },
    ]
  },
  {
    speaker: 'A',
    thai: 'ผมโทรมาเรื่องการประชุมพรุ่งนี้ครับ',
    pronunciation: 'phǒm thoo maa rʉ̂ang gaan-prà-chum phrûng-níi khráp',
    japanese: '明日の会議の件でお電話しました',
    words: [
      { thai: 'ผม', pronunciation: 'phǒm', japanese: '私(男性)' },
      { thai: 'โทรมา', pronunciation: 'thoo maa', japanese: '電話してきた' },
      { thai: 'เรื่อง', pronunciation: 'rʉ̂ang', japanese: '〜の件' },
      { thai: 'การประชุม', pronunciation: 'gaan-prà-chum', japanese: '会議' },
      { thai: 'พรุ่งนี้', pronunciation: 'phrûng-níi', japanese: '明日' },
    ]
  },
];

// i-describing-people: 人の見た目を説明する
export const intermediateDescribingPeople: ConversationLine[] = [
  {
    speaker: 'A',
    thai: 'เพื่อนคุณหน้าตาเป็นยังไงครับ',
    pronunciation: 'phʉ̂an khun nâa-taa pen yang-ngai khráp',
    japanese: 'あなたの友達はどんな見た目ですか',
    words: [
      { thai: 'เพื่อน', pronunciation: 'phʉ̂an', japanese: '友達' },
      { thai: 'คุณ', pronunciation: 'khun', japanese: 'あなた' },
      { thai: 'หน้าตา', pronunciation: 'nâa-taa', japanese: '見た目' },
      { thai: 'เป็น', pronunciation: 'pen', japanese: '〜である' },
      { thai: 'ยังไง', pronunciation: 'yang-ngai', japanese: 'どのように' },
    ]
  },
  {
    speaker: 'B',
    thai: 'เขาสูงผอม ผมยาวสีดำค่ะ',
    pronunciation: 'khǎo sǔung phɔ̌ɔm phǒm yaao sǐi-dam khâ',
    japanese: '彼は背が高くて痩せていて、黒い長髪です',
    words: [
      { thai: 'เขา', pronunciation: 'khǎo', japanese: '彼/彼女' },
      { thai: 'สูง', pronunciation: 'sǔung', japanese: '高い' },
      { thai: 'ผอม', pronunciation: 'phɔ̌ɔm', japanese: '痩せている' },
      { thai: 'ผม', pronunciation: 'phǒm', japanese: '髪' },
      { thai: 'ยาว', pronunciation: 'yaao', japanese: '長い' },
      { thai: 'สีดำ', pronunciation: 'sǐi-dam', japanese: '黒色' },
    ]
  },
  {
    speaker: 'A',
    thai: 'สวมแว่นตาไหมครับ',
    pronunciation: 'sǔam wɛ̂n-taa mǎi khráp',
    japanese: 'メガネをかけていますか',
    words: [
      { thai: 'สวม', pronunciation: 'sǔam', japanese: 'かける、身につける' },
      { thai: 'แว่นตา', pronunciation: 'wɛ̂n-taa', japanese: 'メガネ' },
      { thai: 'ไหม', pronunciation: 'mǎi', japanese: '〜ですか' },
    ]
  },
  {
    speaker: 'B',
    thai: 'สวมค่ะ แว่นตาสีน้ำตาล',
    pronunciation: 'sǔam khâ wɛ̂n-taa sǐi-nám-taan',
    japanese: 'かけています、茶色のメガネです',
    words: [
      { thai: 'สวม', pronunciation: 'sǔam', japanese: 'かける' },
      { thai: 'แว่นตา', pronunciation: 'wɛ̂n-taa', japanese: 'メガネ' },
      { thai: 'สีน้ำตาล', pronunciation: 'sǐi-nám-taan', japanese: '茶色' },
    ]
  },
];

// b-numbers: 数字と数え方
export const beginnerNumbers: ConversationLine[] = [
  {
    speaker: 'A',
    thai: 'นี่ราคาเท่าไหร่ครับ',
    pronunciation: 'nîi raa-khaa thâo-rài khráp',
    japanese: 'これはいくらですか',
    words: [
      { thai: 'นี่', pronunciation: 'nîi', japanese: 'これ' },
      { thai: 'ราคา', pronunciation: 'raa-khaa', japanese: '価格' },
      { thai: 'เท่าไหร่', pronunciation: 'thâo-rài', japanese: 'いくら' },
      { thai: 'ครับ', pronunciation: 'khráp', japanese: '(男性の丁寧語)' },
    ]
  },
  {
    speaker: 'B',
    thai: 'สามสิบบาทค่ะ',
    pronunciation: 'sǎam-sìp bàat khâ',
    japanese: '30バーツです',
    words: [
      { thai: 'สาม', pronunciation: 'sǎam', japanese: '3' },
      { thai: 'สิบ', pronunciation: 'sìp', japanese: '10' },
      { thai: 'บาท', pronunciation: 'bàat', japanese: 'バーツ' },
      { thai: 'ค่ะ', pronunciation: 'khâ', japanese: '(女性の丁寧語)' },
    ],
    grammarPoint: {
      title: 'タイ語の数字',
      explanation: 'タイ語の数字は、1=หนึ่ง(nʉ̀ng)、2=สอง(sɔ̌ɔng)、3=สาม(sǎam)、10=สิบ(sìp)、100=ร้อย(rɔ́ɔi)、1000=พัน(phan)です。',
      examples: [
        { thai: 'หนึ่งร้อย', pronunciation: 'nʉ̀ng-rɔ́ɔi', japanese: '100' },
        { thai: 'หนึ่งพัน', pronunciation: 'nʉ̀ng-phan', japanese: '1000' },
      ]
    }
  },
  {
    speaker: 'A',
    thai: 'ขอสามอันครับ',
    pronunciation: 'khɔ̌ɔ sǎam an khráp',
    japanese: '3つください',
    words: [
      { thai: 'ขอ', pronunciation: 'khɔ̌ɔ', japanese: '〜をお願いします' },
      { thai: 'สาม', pronunciation: 'sǎam', japanese: '3' },
      { thai: 'อัน', pronunciation: 'an', japanese: '個(類別詞)' },
      { thai: 'ครับ', pronunciation: 'khráp', japanese: '(男性の丁寧語)' },
    ]
  },
  {
    speaker: 'B',
    thai: 'เก้าสิบบาทค่ะ',
    pronunciation: 'gâao-sìp bàat khâ',
    japanese: '90バーツです',
    words: [
      { thai: 'เก้า', pronunciation: 'gâao', japanese: '9' },
      { thai: 'สิบ', pronunciation: 'sìp', japanese: '10' },
      { thai: 'บาท', pronunciation: 'bàat', japanese: 'バーツ' },
      { thai: 'ค่ะ', pronunciation: 'khâ', japanese: '(女性の丁寧語)' },
    ]
  },
];

// b-understanding-questions: 理解を深める質問
export const beginnerUnderstandingQuestions: ConversationLine[] = [
  {
    speaker: 'A',
    thai: 'นี่คืออะไรครับ',
    pronunciation: 'nîi khʉʉ à-rai khráp',
    japanese: 'これは何ですか',
    words: [
      { thai: 'นี่', pronunciation: 'nîi', japanese: 'これ' },
      { thai: 'คือ', pronunciation: 'khʉʉ', japanese: '〜である' },
      { thai: 'อะไร', pronunciation: 'à-rai', japanese: '何' },
      { thai: 'ครับ', pronunciation: 'khráp', japanese: '(男性の丁寧語)' },
    ]
  },
  {
    speaker: 'B',
    thai: 'นี่คือผลไม้ค่ะ',
    pronunciation: 'nîi khʉʉ phǒn-lá-mái khâ',
    japanese: 'これは果物です',
    words: [
      { thai: 'นี่', pronunciation: 'nîi', japanese: 'これ' },
      { thai: 'คือ', pronunciation: 'khʉʉ', japanese: '〜である' },
      { thai: 'ผลไม้', pronunciation: 'phǒn-lá-mái', japanese: '果物' },
      { thai: 'ค่ะ', pronunciation: 'khâ', japanese: '(女性の丁寧語)' },
    ]
  },
  {
    speaker: 'A',
    thai: 'ภาษาไทยว่าอะไรครับ',
    pronunciation: 'phaa-sǎa-thai wâa à-rai khráp',
    japanese: 'タイ語で何と言いますか',
    words: [
      { thai: 'ภาษาไทย', pronunciation: 'phaa-sǎa-thai', japanese: 'タイ語' },
      { thai: 'ว่า', pronunciation: 'wâa', japanese: '言う' },
      { thai: 'อะไร', pronunciation: 'à-rai', japanese: '何' },
      { thai: 'ครับ', pronunciation: 'khráp', japanese: '(男性の丁寧語)' },
    ]
  },
  {
    speaker: 'B',
    thai: 'พูดอีกทีได้ไหมคะ',
    pronunciation: 'phûut ìik thii dâi mǎi khá',
    japanese: 'もう一度言ってもらえますか',
    words: [
      { thai: 'พูด', pronunciation: 'phûut', japanese: '話す' },
      { thai: 'อีกที', pronunciation: 'ìik thii', japanese: 'もう一度' },
      { thai: 'ได้ไหม', pronunciation: 'dâi mǎi', japanese: '〜できますか' },
      { thai: 'คะ', pronunciation: 'khá', japanese: '(女性の丁寧語・疑問)' },
    ],
    grammarPoint: {
      title: '理解確認の表現',
      explanation: 'わからない時は「พูดอีกที(もう一度言って)」「ช้าๆ(ゆっくり)」などを使いましょう。',
      examples: [
        { thai: 'พูดช้าๆ หน่อย', pronunciation: 'phûut cháa-cháa nɔ̀i', japanese: 'ゆっくり話してください' },
        { thai: 'เข้าใจแล้ว', pronunciation: 'khâo-jai lɛ́ɛo', japanese: '分かりました' },
      ]
    }
  },
];

// b-language-learning: 言語学習について
export const beginnerLanguageLearning: ConversationLine[] = [
  {
    speaker: 'A',
    thai: 'คุณพูดภาษาไทยได้ไหมครับ',
    pronunciation: 'khun phûut phaa-sǎa-thai dâi mǎi khráp',
    japanese: 'タイ語を話せますか',
    words: [
      { thai: 'คุณ', pronunciation: 'khun', japanese: 'あなた' },
      { thai: 'พูด', pronunciation: 'phûut', japanese: '話す' },
      { thai: 'ภาษาไทย', pronunciation: 'phaa-sǎa-thai', japanese: 'タイ語' },
      { thai: 'ได้ไหม', pronunciation: 'dâi mǎi', japanese: '〜できますか' },
      { thai: 'ครับ', pronunciation: 'khráp', japanese: '(男性の丁寧語)' },
    ]
  },
  {
    speaker: 'B',
    thai: 'ได้นิดหน่อยค่ะ',
    pronunciation: 'dâi nít-nɔ̀i khâ',
    japanese: '少しできます',
    words: [
      { thai: 'ได้', pronunciation: 'dâi', japanese: 'できる' },
      { thai: 'นิดหน่อย', pronunciation: 'nít-nɔ̀i', japanese: '少し' },
      { thai: 'ค่ะ', pronunciation: 'khâ', japanese: '(女性の丁寧語)' },
    ]
  },
  {
    speaker: 'A',
    thai: 'เรียนมานานแค่ไหนครับ',
    pronunciation: 'riian maa naan khɛ̂ɛ-nǎi khráp',
    japanese: 'どのくらい勉強していますか',
    words: [
      { thai: 'เรียน', pronunciation: 'riian', japanese: '勉強する' },
      { thai: 'มา', pronunciation: 'maa', japanese: '〜してきた' },
      { thai: 'นาน', pronunciation: 'naan', japanese: '長い' },
      { thai: 'แค่ไหน', pronunciation: 'khɛ̂ɛ-nǎi', japanese: 'どのくらい' },
      { thai: 'ครับ', pronunciation: 'khráp', japanese: '(男性の丁寧語)' },
    ]
  },
  {
    speaker: 'B',
    thai: 'เรียนมาสามเดือนค่ะ',
    pronunciation: 'riian maa sǎam dʉan khâ',
    japanese: '3ヶ月勉強しています',
    words: [
      { thai: 'เรียน', pronunciation: 'riian', japanese: '勉強する' },
      { thai: 'มา', pronunciation: 'maa', japanese: '〜してきた' },
      { thai: 'สามเดือน', pronunciation: 'sǎam dʉan', japanese: '3ヶ月' },
      { thai: 'ค่ะ', pronunciation: 'khâ', japanese: '(女性の丁寧語)' },
    ]
  },
];

// b-hobbies-preferences: 趣味と好みの表現
export const beginnerHobbiesPreferences: ConversationLine[] = [
  {
    speaker: 'A',
    thai: 'คุณชอบอะไรครับ',
    pronunciation: 'khun chɔ̂ɔp à-rai khráp',
    japanese: '何が好きですか',
    words: [
      { thai: 'คุณ', pronunciation: 'khun', japanese: 'あなた' },
      { thai: 'ชอบ', pronunciation: 'chɔ̂ɔp', japanese: '好き' },
      { thai: 'อะไร', pronunciation: 'à-rai', japanese: '何' },
      { thai: 'ครับ', pronunciation: 'khráp', japanese: '(男性の丁寧語)' },
    ]
  },
  {
    speaker: 'B',
    thai: 'ฉันชอบฟังเพลงค่ะ',
    pronunciation: 'chǎn chɔ̂ɔp fang phleng khâ',
    japanese: '私は音楽を聴くのが好きです',
    words: [
      { thai: 'ฉัน', pronunciation: 'chǎn', japanese: '私(女性カジュアル)' },
      { thai: 'ชอบ', pronunciation: 'chɔ̂ɔp', japanese: '好き' },
      { thai: 'ฟัง', pronunciation: 'fang', japanese: '聴く' },
      { thai: 'เพลง', pronunciation: 'phleng', japanese: '音楽' },
      { thai: 'ค่ะ', pronunciation: 'khâ', japanese: '(女性の丁寧語)' },
    ]
  },
  {
    speaker: 'A',
    thai: 'เคยไปเที่ยวทะเลไหมครับ',
    pronunciation: 'khəəi pai thîao thá-lee mǎi khráp',
    japanese: '海に行ったことはありますか',
    words: [
      { thai: 'เคย', pronunciation: 'khəəi', japanese: '〜したことがある' },
      { thai: 'ไป', pronunciation: 'pai', japanese: '行く' },
      { thai: 'เที่ยว', pronunciation: 'thîao', japanese: '遊ぶ、観光する' },
      { thai: 'ทะเล', pronunciation: 'thá-lee', japanese: '海' },
      { thai: 'ไหม', pronunciation: 'mǎi', japanese: '〜ですか' },
      { thai: 'ครับ', pronunciation: 'khráp', japanese: '(男性の丁寧語)' },
    ],
    grammarPoint: {
      title: '経験を表す「เคย」',
      explanation: '「เคย(khəəi)」は「〜したことがある」という経験を表します。否定は「ไม่เคย(mâi khəəi)」です。',
      examples: [
        { thai: 'เคยกินอาหารไทย', pronunciation: 'khəəi gin aa-hǎan-thai', japanese: 'タイ料理を食べたことがある' },
        { thai: 'ไม่เคยไป', pronunciation: 'mâi khəəi pai', japanese: '行ったことがない' },
      ]
    }
  },
  {
    speaker: 'B',
    thai: 'เคยค่ะ ไปเดือนที่แล้ว',
    pronunciation: 'khəəi khâ pai dʉan thîi lɛ́ɛo',
    japanese: 'あります、先月行きました',
    words: [
      { thai: 'เคย', pronunciation: 'khəəi', japanese: '〜したことがある' },
      { thai: 'ค่ะ', pronunciation: 'khâ', japanese: '(女性の丁寧語)' },
      { thai: 'ไป', pronunciation: 'pai', japanese: '行く' },
      { thai: 'เดือนที่แล้ว', pronunciation: 'dʉan thîi lɛ́ɛo', japanese: '先月' },
    ]
  },
];

// b-abilities-possessions: 能力と所有の表現
export const beginnerAbilitiesPossessions: ConversationLine[] = [
  {
    speaker: 'A',
    thai: 'คุณมีรถไหมครับ',
    pronunciation: 'khun mii rót mǎi khráp',
    japanese: '車を持っていますか',
    words: [
      { thai: 'คุณ', pronunciation: 'khun', japanese: 'あなた' },
      { thai: 'มี', pronunciation: 'mii', japanese: 'ある、持っている' },
      { thai: 'รถ', pronunciation: 'rót', japanese: '車' },
      { thai: 'ไหม', pronunciation: 'mǎi', japanese: '〜ですか' },
      { thai: 'ครับ', pronunciation: 'khráp', japanese: '(男性の丁寧語)' },
    ]
  },
  {
    speaker: 'B',
    thai: 'ไม่มีค่ะ แต่มีจักรยาน',
    pronunciation: 'mâi mii khâ tɛ̀ɛ mii jàk-grà-yaan',
    japanese: '持っていません、でも自転車はあります',
    words: [
      { thai: 'ไม่มี', pronunciation: 'mâi mii', japanese: 'ない、持っていない' },
      { thai: 'ค่ะ', pronunciation: 'khâ', japanese: '(女性の丁寧語)' },
      { thai: 'แต่', pronunciation: 'tɛ̀ɛ', japanese: 'しかし' },
      { thai: 'มี', pronunciation: 'mii', japanese: 'ある' },
      { thai: 'จักรยาน', pronunciation: 'jàk-grà-yaan', japanese: '自転車' },
    ]
  },
  {
    speaker: 'A',
    thai: 'ขี่จักรยานเป็นไหมครับ',
    pronunciation: 'khìi jàk-grà-yaan pen mǎi khráp',
    japanese: '自転車に乗れますか',
    words: [
      { thai: 'ขี่', pronunciation: 'khìi', japanese: '(乗り物に)乗る' },
      { thai: 'จักรยาน', pronunciation: 'jàk-grà-yaan', japanese: '自転車' },
      { thai: 'เป็น', pronunciation: 'pen', japanese: 'できる' },
      { thai: 'ไหม', pronunciation: 'mǎi', japanese: '〜ですか' },
      { thai: 'ครับ', pronunciation: 'khráp', japanese: '(男性の丁寧語)' },
    ]
  },
  {
    speaker: 'B',
    thai: 'เป็นค่ะ ขี่ได้ดี',
    pronunciation: 'pen khâ khìi dâi dii',
    japanese: 'できます、上手に乗れます',
    words: [
      { thai: 'เป็น', pronunciation: 'pen', japanese: 'できる' },
      { thai: 'ค่ะ', pronunciation: 'khâ', japanese: '(女性の丁寧語)' },
      { thai: 'ขี่', pronunciation: 'khìi', japanese: '乗る' },
      { thai: 'ได้ดี', pronunciation: 'dâi dii', japanese: '上手にできる' },
    ]
  },
];

// b-polite-requests: 丁寧なお願いと許可
export const beginnerPoliteRequests: ConversationLine[] = [
  {
    speaker: 'A',
    thai: 'ขอถ่ายรูปได้ไหมครับ',
    pronunciation: 'khɔ̌ɔ thàai-rûup dâi mǎi khráp',
    japanese: '写真を撮ってもいいですか',
    words: [
      { thai: 'ขอ', pronunciation: 'khɔ̌ɔ', japanese: '〜をお願いします' },
      { thai: 'ถ่ายรูป', pronunciation: 'thàai-rûup', japanese: '写真を撮る' },
      { thai: 'ได้ไหม', pronunciation: 'dâi mǎi', japanese: '〜できますか' },
      { thai: 'ครับ', pronunciation: 'khráp', japanese: '(男性の丁寧語)' },
    ]
  },
  {
    speaker: 'B',
    thai: 'ได้ค่ะ เชิญเลยค่ะ',
    pronunciation: 'dâi khâ chəən ləəi khâ',
    japanese: 'はい、どうぞ',
    words: [
      { thai: 'ได้', pronunciation: 'dâi', japanese: 'できる' },
      { thai: 'ค่ะ', pronunciation: 'khâ', japanese: '(女性の丁寧語)' },
      { thai: 'เชิญเลย', pronunciation: 'chəən ləəi', japanese: 'どうぞどうぞ' },
    ]
  },
  {
    speaker: 'A',
    thai: 'ช่วยถ่ายให้หน่อยได้ไหมครับ',
    pronunciation: 'chûai thàai hâi nɔ̀i dâi mǎi khráp',
    japanese: '写真を撮っていただけますか',
    words: [
      { thai: 'ช่วย', pronunciation: 'chûai', japanese: '手伝う' },
      { thai: 'ถ่าย', pronunciation: 'thàai', japanese: '撮る' },
      { thai: 'ให้', pronunciation: 'hâi', japanese: '〜してあげる' },
      { thai: 'หน่อย', pronunciation: 'nɔ̀i', japanese: 'ちょっと' },
      { thai: 'ได้ไหม', pronunciation: 'dâi mǎi', japanese: '〜できますか' },
      { thai: 'ครับ', pronunciation: 'khráp', japanese: '(男性の丁寧語)' },
    ],
    grammarPoint: {
      title: '依頼表現「ช่วย〜ให้หน่อย」',
      explanation: '「ช่วย(手伝う)」+動詞+「ให้(〜してあげる)」+「หน่อย(ちょっと)」で丁寧な依頼になります。',
      examples: [
        { thai: 'ช่วยบอกให้หน่อย', pronunciation: 'chûai bɔ̀ɔk hâi nɔ̀i', japanese: 'ちょっと教えてください' },
        { thai: 'ช่วยเปิดประตูให้หน่อย', pronunciation: 'chûai pə̀ət prà-tuu hâi nɔ̀i', japanese: 'ドアを開けてください' },
      ]
    }
  },
  {
    speaker: 'B',
    thai: 'ได้เลยค่ะ ยืนตรงนี้นะคะ',
    pronunciation: 'dâi ləəi khâ yʉʉn trong níi ná khá',
    japanese: 'いいですよ、ここに立ってくださいね',
    words: [
      { thai: 'ได้เลย', pronunciation: 'dâi ləəi', japanese: 'もちろんできます' },
      { thai: 'ค่ะ', pronunciation: 'khâ', japanese: '(女性の丁寧語)' },
      { thai: 'ยืน', pronunciation: 'yʉʉn', japanese: '立つ' },
      { thai: 'ตรงนี้', pronunciation: 'trong níi', japanese: 'ここ' },
      { thai: 'นะคะ', pronunciation: 'ná khá', japanese: '〜ね(確認・女性)' },
    ]
  },
];

// b-time-expressions: 時間に関する表現
export const beginnerTimeExpressions: ConversationLine[] = [
  {
    speaker: 'A',
    thai: 'ตอนนี้กี่โมงครับ',
    pronunciation: 'tɔɔn-níi gìi moong khráp',
    japanese: '今何時ですか',
    words: [
      { thai: 'ตอนนี้', pronunciation: 'tɔɔn-níi', japanese: '今' },
      { thai: 'กี่โมง', pronunciation: 'gìi moong', japanese: '何時' },
      { thai: 'ครับ', pronunciation: 'khráp', japanese: '(男性の丁寧語)' },
    ]
  },
  {
    speaker: 'B',
    thai: 'สามโมงเย็นค่ะ',
    pronunciation: 'sǎam moong yen khâ',
    japanese: '午後3時です',
    words: [
      { thai: 'สามโมง', pronunciation: 'sǎam moong', japanese: '3時' },
      { thai: 'เย็น', pronunciation: 'yen', japanese: '午後(1-6時)' },
      { thai: 'ค่ะ', pronunciation: 'khâ', japanese: '(女性の丁寧語)' },
    ],
    grammarPoint: {
      title: 'タイ語の時刻表現',
      explanation: 'タイ語の時刻は独特です。朝(เช้า)、昼(เที่ยง)、午後(บ่าย/เย็น)、夜(ทุ่ม)、深夜(ตี)で区別します。',
      examples: [
        { thai: 'เจ็ดโมงเช้า', pronunciation: 'jèt moong cháao', japanese: '午前7時' },
        { thai: 'สองทุ่ม', pronunciation: 'sɔ̌ɔng thûm', japanese: '午後8時' },
      ]
    }
  },
  {
    speaker: 'A',
    thai: 'วันนี้วันอะไรครับ',
    pronunciation: 'wan-níi wan à-rai khráp',
    japanese: '今日は何曜日ですか',
    words: [
      { thai: 'วันนี้', pronunciation: 'wan-níi', japanese: '今日' },
      { thai: 'วัน', pronunciation: 'wan', japanese: '日、曜日' },
      { thai: 'อะไร', pronunciation: 'à-rai', japanese: '何' },
      { thai: 'ครับ', pronunciation: 'khráp', japanese: '(男性の丁寧語)' },
    ]
  },
  {
    speaker: 'B',
    thai: 'วันจันทร์ค่ะ',
    pronunciation: 'wan-jan khâ',
    japanese: '月曜日です',
    words: [
      { thai: 'วันจันทร์', pronunciation: 'wan-jan', japanese: '月曜日' },
      { thai: 'ค่ะ', pronunciation: 'khâ', japanese: '(女性の丁寧語)' },
    ]
  },
];

// b-location-movement: 場所と移動
export const beginnerLocationMovement: ConversationLine[] = [
  {
    speaker: 'A',
    thai: 'ห้องน้ำอยู่ที่ไหนครับ',
    pronunciation: 'hɔ̂ng-náam yùu thîi-nǎi khráp',
    japanese: 'トイレはどこですか',
    words: [
      { thai: 'ห้องน้ำ', pronunciation: 'hɔ̂ng-náam', japanese: 'トイレ' },
      { thai: 'อยู่', pronunciation: 'yùu', japanese: 'ある、いる' },
      { thai: 'ที่ไหน', pronunciation: 'thîi-nǎi', japanese: 'どこ' },
      { thai: 'ครับ', pronunciation: 'khráp', japanese: '(男性の丁寧語)' },
    ]
  },
  {
    speaker: 'B',
    thai: 'อยู่ตรงนั้นค่ะ',
    pronunciation: 'yùu trong nán khâ',
    japanese: 'あそこにあります',
    words: [
      { thai: 'อยู่', pronunciation: 'yùu', japanese: 'ある' },
      { thai: 'ตรงนั้น', pronunciation: 'trong nán', japanese: 'あそこ' },
      { thai: 'ค่ะ', pronunciation: 'khâ', japanese: '(女性の丁寧語)' },
    ]
  },
  {
    speaker: 'A',
    thai: 'ไปยังไงครับ',
    pronunciation: 'pai yang-ngai khráp',
    japanese: 'どうやって行きますか',
    words: [
      { thai: 'ไป', pronunciation: 'pai', japanese: '行く' },
      { thai: 'ยังไง', pronunciation: 'yang-ngai', japanese: 'どのように' },
      { thai: 'ครับ', pronunciation: 'khráp', japanese: '(男性の丁寧語)' },
    ]
  },
  {
    speaker: 'B',
    thai: 'เดินตรงไปแล้วเลี้ยวซ้ายค่ะ',
    pronunciation: 'dəən trong pai lɛ́ɛo líao sáai khâ',
    japanese: 'まっすぐ行って左に曲がってください',
    words: [
      { thai: 'เดิน', pronunciation: 'dəən', japanese: '歩く' },
      { thai: 'ตรงไป', pronunciation: 'trong pai', japanese: 'まっすぐ行く' },
      { thai: 'แล้ว', pronunciation: 'lɛ́ɛo', japanese: 'そして' },
      { thai: 'เลี้ยวซ้าย', pronunciation: 'líao sáai', japanese: '左に曲がる' },
      { thai: 'ค่ะ', pronunciation: 'khâ', japanese: '(女性の丁寧語)' },
    ]
  },
];

// b-family: 家族について
export const beginnerFamily: ConversationLine[] = [
  {
    speaker: 'A',
    thai: 'ครอบครัวคุณมีกี่คนครับ',
    pronunciation: 'khrɔ̂ɔp-khrua khun mii gìi khon khráp',
    japanese: 'ご家族は何人ですか',
    words: [
      { thai: 'ครอบครัว', pronunciation: 'khrɔ̂ɔp-khrua', japanese: '家族' },
      { thai: 'คุณ', pronunciation: 'khun', japanese: 'あなた' },
      { thai: 'มี', pronunciation: 'mii', japanese: 'いる' },
      { thai: 'กี่คน', pronunciation: 'gìi khon', japanese: '何人' },
      { thai: 'ครับ', pronunciation: 'khráp', japanese: '(男性の丁寧語)' },
    ]
  },
  {
    speaker: 'B',
    thai: 'มีสี่คนค่ะ พ่อ แม่ พี่ชาย กับฉัน',
    pronunciation: 'mii sìi khon khâ phɔ̂ɔ mɛ̂ɛ phîi-chaai gàp chǎn',
    japanese: '4人です。父、母、兄と私です',
    words: [
      { thai: 'มี', pronunciation: 'mii', japanese: 'いる' },
      { thai: 'สี่คน', pronunciation: 'sìi khon', japanese: '4人' },
      { thai: 'ค่ะ', pronunciation: 'khâ', japanese: '(女性の丁寧語)' },
      { thai: 'พ่อ', pronunciation: 'phɔ̂ɔ', japanese: '父' },
      { thai: 'แม่', pronunciation: 'mɛ̂ɛ', japanese: '母' },
      { thai: 'พี่ชาย', pronunciation: 'phîi-chaai', japanese: '兄' },
      { thai: 'กับ', pronunciation: 'gàp', japanese: 'と' },
      { thai: 'ฉัน', pronunciation: 'chǎn', japanese: '私' },
    ]
  },
  {
    speaker: 'A',
    thai: 'พี่ชายทำงานอะไรครับ',
    pronunciation: 'phîi-chaai tham-ngaan à-rai khráp',
    japanese: 'お兄さんは何の仕事をしていますか',
    words: [
      { thai: 'พี่ชาย', pronunciation: 'phîi-chaai', japanese: '兄' },
      { thai: 'ทำงาน', pronunciation: 'tham-ngaan', japanese: '働く' },
      { thai: 'อะไร', pronunciation: 'à-rai', japanese: '何' },
      { thai: 'ครับ', pronunciation: 'khráp', japanese: '(男性の丁寧語)' },
    ]
  },
  {
    speaker: 'B',
    thai: 'เขาเป็นวิศวกรค่ะ',
    pronunciation: 'khǎo pen wít-sà-wá-gɔɔn khâ',
    japanese: '彼はエンジニアです',
    words: [
      { thai: 'เขา', pronunciation: 'khǎo', japanese: '彼/彼女' },
      { thai: 'เป็น', pronunciation: 'pen', japanese: '〜である' },
      { thai: 'วิศวกร', pronunciation: 'wít-sà-wá-gɔɔn', japanese: 'エンジニア' },
      { thai: 'ค่ะ', pronunciation: 'khâ', japanese: '(女性の丁寧語)' },
    ]
  },
];

// b-asking-about-people: 人について尋ねる
export const beginnerAskingAboutPeople: ConversationLine[] = [
  {
    speaker: 'A',
    thai: 'คนนั้นใครครับ',
    pronunciation: 'khon nán khrai khráp',
    japanese: 'あの人は誰ですか',
    words: [
      { thai: 'คนนั้น', pronunciation: 'khon nán', japanese: 'あの人' },
      { thai: 'ใคร', pronunciation: 'khrai', japanese: '誰' },
      { thai: 'ครับ', pronunciation: 'khráp', japanese: '(男性の丁寧語)' },
    ]
  },
  {
    speaker: 'B',
    thai: 'เขาเป็นเพื่อนของฉันค่ะ',
    pronunciation: 'khǎo pen phʉ̂an khɔ̌ɔng chǎn khâ',
    japanese: '彼は私の友達です',
    words: [
      { thai: 'เขา', pronunciation: 'khǎo', japanese: '彼/彼女' },
      { thai: 'เป็น', pronunciation: 'pen', japanese: '〜である' },
      { thai: 'เพื่อน', pronunciation: 'phʉ̂an', japanese: '友達' },
      { thai: 'ของ', pronunciation: 'khɔ̌ɔng', japanese: '〜の' },
      { thai: 'ฉัน', pronunciation: 'chǎn', japanese: '私' },
      { thai: 'ค่ะ', pronunciation: 'khâ', japanese: '(女性の丁寧語)' },
    ]
  },
  {
    speaker: 'A',
    thai: 'เขาอายุเท่าไหร่ครับ',
    pronunciation: 'khǎo aa-yú thâo-rài khráp',
    japanese: '彼は何歳ですか',
    words: [
      { thai: 'เขา', pronunciation: 'khǎo', japanese: '彼/彼女' },
      { thai: 'อายุ', pronunciation: 'aa-yú', japanese: '年齢' },
      { thai: 'เท่าไหร่', pronunciation: 'thâo-rài', japanese: 'いくつ' },
      { thai: 'ครับ', pronunciation: 'khráp', japanese: '(男性の丁寧語)' },
    ]
  },
  {
    speaker: 'B',
    thai: 'อายุยี่สิบห้าปีค่ะ',
    pronunciation: 'aa-yú yîi-sìp-hâa pii khâ',
    japanese: '25歳です',
    words: [
      { thai: 'อายุ', pronunciation: 'aa-yú', japanese: '年齢' },
      { thai: 'ยี่สิบห้า', pronunciation: 'yîi-sìp-hâa', japanese: '25' },
      { thai: 'ปี', pronunciation: 'pii', japanese: '歳' },
      { thai: 'ค่ะ', pronunciation: 'khâ', japanese: '(女性の丁寧語)' },
    ]
  },
];

/**
 * 会話データマップ
 * トピックIDをキーとして、対応する会話データを取得
 */
export const conversationData: Record<string, ConversationLine[]> = {
  // 初級
  'b-greetings-status': beginnerGreetingsStatus,
  'b-self-introduction': beginnerSelfIntroduction,
  'b-numbers': beginnerNumbers,
  'b-understanding-questions': beginnerUnderstandingQuestions,
  'b-language-learning': beginnerLanguageLearning,
  'b-hobbies-preferences': beginnerHobbiesPreferences,
  'b-abilities-possessions': beginnerAbilitiesPossessions,
  'b-polite-requests': beginnerPoliteRequests,
  'b-time-expressions': beginnerTimeExpressions,
  'b-shopping-basic': beginnerShoppingBasic,
  'b-restaurant-basics': beginnerRestaurantBasics,
  'b-location-movement': beginnerLocationMovement,
  'b-family': beginnerFamily,
  'b-asking-about-people': beginnerAskingAboutPeople,

  // 中級
  'i-transport-taxi': intermediateTaxi,
  'i-asking-directions': intermediateAskingDirections,
  'i-shopping-advanced': intermediateShoppingAdvanced,
  'i-restaurant-requests': intermediateRestaurantRequests,
  'i-hotel-checkin': intermediateHotelCheckin,
  'i-health-symptoms': intermediateHealthSymptoms,
  'i-hobbies': intermediateHobbies,
  'i-making-plans': intermediateMakingPlans,
  'i-phone-call': intermediatePhoneCall,
  'i-describing-people': intermediateDescribingPeople,

  // 上級
  'a-renting-apartment': advancedRentingApartment,
  'a-opening-bank-account': advancedOpeningBankAccount,
  'a-job-interview': advancedJobInterview,
  'a-business-meeting': advancedBusinessMeeting,
  'a-discussing-news': advancedDiscussingNews,
  'a-thai-culture': advancedThaiCulture,
  'a-expressing-emotions': advancedExpressingEmotions,
  'a-making-complaint': advancedMakingComplaint,
};

/**
 * トピックIDから会話データを取得する関数（非同期版）
 * 動的インポートを使用してバンドルサイズを削減
 */
export async function getConversationByTopicId(topicId: string): Promise<ConversationLine[] | null> {
  // メモリにキャッシュされている場合はそれを返す
  if (conversationData[topicId]) {
    return conversationData[topicId];
  }

  // なければnullを返す（既に全てのデータがインポートされているため）
  return null;
}

/**
 * 同期版（後方互換性のため）
 */
export function getConversationByTopicIdSync(topicId: string): ConversationLine[] | null {
  return conversationData[topicId] || null;
}
