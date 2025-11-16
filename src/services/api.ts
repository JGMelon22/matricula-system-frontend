import axios from 'axios';

// Url base para testes locais
const API_BASE_URL = 'https://localhost:7034/api';

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor para tratar erros da API
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.data?.description) {
            error.message = error.response.data.description;
        }
        console.error('API Error:', error);
        return Promise.reject(error);
    }
);

export default api;