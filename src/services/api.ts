import axios from "axios";

// A URL base do seu backend
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
});

api.interceptors.request.use(
  (config) => {
    // 1. Pega o token do armazenamento local
    const token = localStorage.getItem("authToken");

    // 2. Se o token existir, ele o anexa ao cabeçalho de autorização
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // 3. Retorna a configuração modificada para que a requisição prossiga
    return config;
  },
  (error) => {
    // Em caso de erro na configuração, rejeita a promessa
    return Promise.reject(error);
  }
);
