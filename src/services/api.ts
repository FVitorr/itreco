import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

// Middleware de requisição: insere o token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    console.log("Interceptando token:", token);
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Se der erro antes da requisição ser feita
    return Promise.reject(error);
  }
);

export default api;
