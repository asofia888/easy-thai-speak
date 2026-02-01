import { ConversationLine } from '../../types';

/**
 * 中級会話データ (Intermediate)
 * タクシー、レストラン、ホテルなどより実践的な会話を学びます
 */

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
