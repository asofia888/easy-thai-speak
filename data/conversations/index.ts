import { ConversationLine } from '../../types';

// 初級会話データをインポート
export {
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
} from './beginner';

// 中級会話データをインポート
export {
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
} from './intermediate';

// 上級会話データをインポート
export {
  advancedRentingApartment,
  advancedJobInterview,
  advancedOpeningBankAccount,
  advancedBusinessMeeting,
  advancedDiscussingNews,
  advancedThaiCulture,
  advancedExpressingEmotions,
  advancedMakingComplaint,
} from './advanced';

// インポートして使用するためのローカル参照
import {
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
} from './beginner';

import {
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
} from './intermediate';

import {
  advancedRentingApartment,
  advancedJobInterview,
  advancedOpeningBankAccount,
  advancedBusinessMeeting,
  advancedDiscussingNews,
  advancedThaiCulture,
  advancedExpressingEmotions,
  advancedMakingComplaint,
} from './advanced';

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
