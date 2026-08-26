import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

API.interceptors.request.use((config) => {
  const access = localStorage.getItem('vecinomarket_access');
  if (access) {
    config.headers.Authorization = `Bearer ${access}`;
  }
  return config;
});

export default API;
