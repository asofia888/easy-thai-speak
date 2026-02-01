/**
 * 会話データの再エクスポート
 *
 * このファイルは後方互換性のために維持されています。
 * 会話データは以下のファイルに分割されています：
 * - ./conversations/beginner.ts (初級)
 * - ./conversations/intermediate.ts (中級)
 * - ./conversations/advanced.ts (上級)
 * - ./conversations/index.ts (マッピングと関数)
 */

// すべての会話データとユーティリティ関数を再エクスポート
export {
  // 初級会話
  beginnerGreetingsStatus,
  beginnerSelfIntroduction,
  beginnerNumbers,
  beginnerUnderstandingQuestions,
  beginnerLanguageLearning,
  beginnerHobbiesPreferences,
  beginnerAbilitiesPossessions,
  beginnerPoliteRequests,
  beginnerTimeExpressions,
  beginnerShoppingBasic,
  beginnerRestaurantBasics,
  beginnerLocationMovement,
  beginnerFamily,
  beginnerAskingAboutPeople,

  // 中級会話
  intermediateTaxi,
  intermediateRestaurantRequests,
  intermediateAskingDirections,
  intermediateShoppingAdvanced,
  intermediateHotelCheckin,
  intermediateHealthSymptoms,
  intermediateHobbies,
  intermediateMakingPlans,
  intermediatePhoneCall,
  intermediateDescribingPeople,

  // 上級会話
  advancedRentingApartment,
  advancedJobInterview,
  advancedOpeningBankAccount,
  advancedBusinessMeeting,
  advancedDiscussingNews,
  advancedThaiCulture,
  advancedExpressingEmotions,
  advancedMakingComplaint,

  // マッピングと関数
  conversationData,
  getConversationByTopicId,
  getConversationByTopicIdSync,
} from './conversations/index';
