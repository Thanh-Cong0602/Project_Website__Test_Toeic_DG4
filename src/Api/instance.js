import axios from "axios";

const API = axios.create();
API.interceptors.request.use((request) => {
   request.withCredentials = true;
   return request;
})

export default API;