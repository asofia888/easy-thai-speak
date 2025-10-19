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

/**
 * 会話データマップ
 * トピックIDをキーとして、対応する会話データを取得
 */
export const conversationData: Record<string, ConversationLine[]> = {
  // 初級
  'b-greetings-status': beginnerGreetingsStatus,
  'b-self-introduction': beginnerSelfIntroduction,
  'b-shopping-basic': beginnerShoppingBasic,
  'b-restaurant-basics': beginnerRestaurantBasics,

  // 中級
  'i-transport-taxi': intermediateTaxi,
  'i-restaurant-requests': intermediateRestaurantRequests,

  // 上級
  'a-renting-apartment': advancedRentingApartment,
  'a-job-interview': advancedJobInterview,
};

/**
 * トピックIDから会話データを取得する関数
 */
export function getConversationByTopicId(topicId: string): ConversationLine[] | null {
  return conversationData[topicId] || null;
}
