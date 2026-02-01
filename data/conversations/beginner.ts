import { ConversationLine } from '../../types';

/**
 * 初級会話データ (Beginner)
 * 基本的な挨拶、自己紹介、買い物などの会話を学びます
 */

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
