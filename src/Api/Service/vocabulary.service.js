import API_BASE from "../config";
import API from "../instance";

export function getVocabularyCategories(endpoint) {
   return API.get(`${API_BASE.apiUrl}/${endpoint}`)
}

export function getVocabularyByCategory(endpoint) {
   return API.get(`${API_BASE.apiUrl}/${endpoint}`);
}

export function getQuestionByCategory(endpoint) {
   return API.get(`${API_BASE.apiUrl}/${endpoint}`);
}

export function getCorrectAnswer(endpoint, body) {
   return API.post(`${API_BASE.apiUrl}/${endpoint}`, body);
}