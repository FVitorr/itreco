import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

// Middleware de requisição: insere o token
api.interceptors.request.use((config) => {
  0;
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
