import axios from "axios";

const API_URL = process.env.API_URL || "https://api.psiweb.com.br";

export { API_URL };
const api = axios.create({
  baseURL: API_URL,
});

export default api;
