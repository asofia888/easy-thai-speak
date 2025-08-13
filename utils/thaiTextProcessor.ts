/**
 * タイ文字処理ユーティリティ
 * TTS送信前にタイ文字のみを抽出し、正規化する
 */

// タイ文字のUnicode範囲定義
const THAI_UNICODE_RANGES = {
  // 基本タイ文字 (U+0E00-U+0E7F)
  BASIC: /[\u0E00-\u0E7F]/g,
  // タイ語の子音 (U+0E01-U+0E2E)
  CONSONANTS: /[\u0E01-\u0E2E]/g,
  // タイ語の母音記号 (U+0E30-U+0E3A, U+0E40-U+0E4E)
  VOWELS: /[\u0E30-\u0E3A\u0E40-\u0E4E]/g,
  // 声調記号 (U+0E48-U+0E4C)
  TONE_MARKS: /[\u0E48-\u0E4C]/g,
  // 数字 (U+0E50-U+0E59)
  DIGITS: /[\u0E50-\u0E59]/g,
  // 句読点 (U+0E4F, U+0E5A, U+0E5B)
  PUNCTUATION: /[\u0E4F\u0E5A\u0E5B]/g
};

/**
 * テキストからタイ文字のみを抽出
 * @param text 入力テキスト（タイ文字、Paiboon+、日本語が混在）
 * @returns タイ文字のみの文字列
 */
export const extractThaiText = (text: string): string => {
  if (!text) return '';
  
  // タイ文字とスペース、基本的な句読点のみを抽出
  const thaiPattern = /[\u0E00-\u0E7F\s.,!?]/g;
  const matches = text.match(thaiPattern);
  
  if (!matches) return '';
  
  return matches
    .join('')
    .replace(/\s+/g, ' ')  // 連続スペースを単一スペースに
    .replace(/\s*([.,!?])\s*/g, '$1 ')  // 句読点周りのスペース正規化
    .trim();
};

/**
 * タイ文字の有効性をチェック
 * @param text チェック対象のテキスト
 * @returns タイ文字が含まれているかどうか
 */
export const isValidThaiText = (text: string): boolean => {
  if (!text) return false;
  
  const cleanText = extractThaiText(text);
  
  // タイ文字が最低1文字含まれているかチェック
  const hasThaiChars = THAI_UNICODE_RANGES.BASIC.test(cleanText);
  
  // 抽出後のテキストが空でないかチェック
  const hasContent = cleanText.length > 0;
  
  // 基本的な有効性チェック（より寛容に）
  return hasThaiChars && hasContent;
};

/**
 * タイ文字テキストの品質をチェック
 * @param text タイ文字テキスト
 * @returns 品質レポート
 */
export const analyzeThaiTextQuality = (text: string): {
  isValid: boolean;
  hasConsonants: boolean;
  hasVowels: boolean;
  hasToneMarks: boolean;
  wordCount: number;
  characterCount: number;
  quality: 'high' | 'medium' | 'low';
} => {
  const cleanText = extractThaiText(text);
  
  const hasConsonants = THAI_UNICODE_RANGES.CONSONANTS.test(cleanText);
  const hasVowels = THAI_UNICODE_RANGES.VOWELS.test(cleanText);
  const hasToneMarks = THAI_UNICODE_RANGES.TONE_MARKS.test(cleanText);
  
  const wordCount = cleanText.split(/\s+/).filter(word => word.length > 0).length;
  const characterCount = cleanText.replace(/\s/g, '').length;
  
  // 品質評価ロジック（より寛容に調整）
  let quality: 'high' | 'medium' | 'low' = 'low';
  
  if (hasConsonants && characterCount >= 1) {
    if (hasVowels && characterCount >= 2) {
      if (hasToneMarks && wordCount >= 2) {
        quality = 'high';
      } else {
        quality = 'medium';
      }
    } else {
      // 子音のみでも基本的には有効（例: ดี）
      quality = 'medium';
    }
  }
  
  return {
    isValid: isValidThaiText(cleanText),
    hasConsonants,
    hasVowels,
    hasToneMarks,
    wordCount,
    characterCount,
    quality
  };
};

/**
 * TTS用にタイ文字を前処理
 * @param text 入力テキスト
 * @param options 処理オプション
 * @returns TTS送信用に最適化されたタイ文字テキスト
 */
export const prepareTTSText = (
  text: string,
  options: {
    removeExtraSpaces?: boolean;
    normalizePunctuation?: boolean;
    validateQuality?: boolean;
  } = {}
): string => {
  const {
    removeExtraSpaces = true,
    normalizePunctuation = true,
    validateQuality = true
  } = options;
  
  // 1. タイ文字のみを抽出
  let cleanText = extractThaiText(text);
  
  if (!cleanText) {
    throw new Error('有効なタイ文字が含まれていません');
  }
  
  // 2. 追加の正規化処理
  if (removeExtraSpaces) {
    cleanText = cleanText.replace(/\s+/g, ' ');
  }
  
  if (normalizePunctuation) {
    // タイ語の句読点を正規化
    cleanText = cleanText
      .replace(/[,，]/g, ',')
      .replace(/[.．]/g, '.')
      .replace(/[!！]/g, '!')
      .replace(/[?？]/g, '?');
  }
  
  // 3. 品質チェック
  if (validateQuality) {
    const quality = analyzeThaiTextQuality(cleanText);
    if (!quality.isValid) {
      throw new Error('タイ文字の品質が不十分です');
    }
  }
  
  return cleanText.trim();
};

/**
 * 複数のテキストを一括処理
 * @param texts テキストの配列
 * @returns 処理済みタイ文字テキストの配列
 */
export const batchProcessThaiTexts = (texts: string[]): Array<{
  original: string;
  processed: string;
  isValid: boolean;
  error?: string;
}> => {
  return texts.map(text => {
    try {
      const processed = prepareTTSText(text);
      return {
        original: text,
        processed,
        isValid: true
      };
    } catch (error) {
      return {
        original: text,
        processed: '',
        isValid: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  });
};

/**
 * SSML用の特殊文字エスケープ
 * @param text タイ文字テキスト
 * @returns SSML安全なテキスト
 */
export const escapeForSSML = (text: string): string => {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
};

/**
 * デバッグ用：テキスト内容の詳細分析
 * @param text 分析対象テキスト
 * @returns 詳細分析結果
 */
export const debugThaiText = (text: string): {
  original: string;
  extracted: string;
  analysis: ReturnType<typeof analyzeThaiTextQuality>;
  unicodeBreakdown: {
    consonants: string[];
    vowels: string[];
    toneMarks: string[];
    digits: string[];
    punctuation: string[];
    others: string[];
  };
} => {
  const extracted = extractThaiText(text);
  const analysis = analyzeThaiTextQuality(extracted);
  
  // Unicode文字を分類
  const chars = [...extracted];
  const unicodeBreakdown = {
    consonants: chars.filter(char => THAI_UNICODE_RANGES.CONSONANTS.test(char)),
    vowels: chars.filter(char => THAI_UNICODE_RANGES.VOWELS.test(char)),
    toneMarks: chars.filter(char => THAI_UNICODE_RANGES.TONE_MARKS.test(char)),
    digits: chars.filter(char => THAI_UNICODE_RANGES.DIGITS.test(char)),
    punctuation: chars.filter(char => THAI_UNICODE_RANGES.PUNCTUATION.test(char)),
    others: chars.filter(char => 
      !THAI_UNICODE_RANGES.BASIC.test(char) && 
      char !== ' '
    )
  };
  
  return {
    original: text,
    extracted,
    analysis,
    unicodeBreakdown
  };
};

/**
 * 一般的なタイ語フレーズの辞書
 */
export const COMMON_THAI_PHRASES = {
  greetings: [
    'สวัสดี',
    'สวัสดีครับ',
    'สวัสดีค่ะ',
    'ลาก่อน',
    'แล้วพบกันใหม่'
  ],
  politeness: [
    'ขอบคุณ',
    'ขอบคุณครับ',
    'ขอบคุณค่ะ',
    'ขอโทษ',
    'ขอโทษครับ',
    'ขอโทษค่ะ'
  ],
  basic: [
    'ใช่',
    'ไม่ใช่',
    'ไม่',
    'ดี',
    'ไม่ดี',
    'เข้าใจ',
    'ไม่เข้าใจ'
  ]
} as const;