import API_BASE from "../config";
import API from "../instance";

export function getVocabularyCategories(endpoint) {
  return API.get(`${API_BASE.apiUrl}/${endpoint}`)
}

export function getAllVocabularies(endpoint) {
  return API.get(`${API_BASE.apiUrl}/${endpoint}`)
}

export function createVocabularyCategory(endpoint, body) {
  return API.post(`${API_BASE.apiUrl}/${endpoint}`, body)
}

export function updateVocabularyCategory(endpoint, body) {
  return API.put(`${API_BASE.apiUrl}/${endpoint}`, body)
}

export function deleteVocabularyCategory(endpoint) {
  return API.delete(`${API_BASE.apiUrl}/${endpoint}`)
}

export function createVocabulary(endpoint, body) {
  return API.post(`${API_BASE.apiUrl}/${endpoint}`, body)
}

export function updateVocabulary(endpoint, body) {
  return API.put(`${API_BASE.apiUrl}/${endpoint}`, body)
}

export function deleteVocabulary(endpoint) {
  return API.delete(`${API_BASE.apiUrl}/${endpoint}`)
}

export function getAllQuestionVocabulary(endpoint) {
  return API.get(`${API_BASE.apiUrl}/${endpoint}`)
}

