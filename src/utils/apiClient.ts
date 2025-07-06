import axios, { type AxiosInstance } from "axios";

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: `https://${import.meta.env.VITE_RAPIDAPI_HOST}/api/v1`,
  headers: {
    "X-RapidAPI-Key": import.meta.env.VITE_RAPIDAPI_KEY,
    "X-RapidAPI-Host": import.meta.env.VITE_RAPIDAPI_HOST,
  },
});

export { apiClient };
