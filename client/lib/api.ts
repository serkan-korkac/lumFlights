import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    if (typeof window === 'undefined') {
      const serverCookies = (await import('next/headers')).cookies;
      const token = (await serverCookies()).get('token')?.value;
      token ? config.headers['Authorization'] = `Bearer ${token}` : null;
    } else {
      const token = Cookies.get('token');
      token ? config.headers['Authorization'] = `Bearer ${token}` : null;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
