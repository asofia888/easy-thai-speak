import { ConversationLine } from '../../types';

/**
 * 上級会話データ (Advanced)
 * ビジネス、不動産、銀行などより高度な会話を学びます
 */

// a-renting-apartment: マンションを借りる
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
