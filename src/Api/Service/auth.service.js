import API_BASE from "../config";
import API from "../instance";
export function loginAPI(endpoint, inputs) {
   return API.post(`${API_BASE.apiUrl}/${endpoint}`, inputs)
}

export function registerAPI(endpoint, user) {
   return API.post(`${API_BASE.apiUrl}/${endpoint}`, user)
}

export function logoutAPI(endpoint) {
  return API.post(`${API_BASE.apiUrl}/${endpoint}`)
}
export function getAllAccounts(endpoint) {
  return API.get(`${API_BASE.apiUrl}/${endpoint}`)
}

