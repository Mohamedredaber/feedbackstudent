import axios from 'axios';

const api = axios.create({
  // بما أنك تستخدم Gateway، المتصفح سيرسل الطلبات لـ localhost:5000
  // والـ Gateway هي من ستوزعها داخلياً
  baseURL: 'http://localhost:5000/api', 
});

// باقي الكود الخاص بالـ interceptors ممتاز ولا يحتاج تغيير
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      sessionStorage.clear();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;