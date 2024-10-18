import axios from 'axios';

export const useAxios = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL_API,
});

useAxios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default useAxios;
