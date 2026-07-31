import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {

  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {

    if (err.response?.status === 401) {
      localStorage.clear();
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

export const authAPI = {

  login: (data) => api.post('/auth/login', data),

  register: (data) => api.post('/auth/register', data),
};

export const questionAPI = {

  getAll: (params) => api.get('/questions', { params }),

  getById: (id) => api.get(`/questions/${id}`),

  getForExam: (subject) => api.get(`/questions/exam/${subject}`),

  add: (data) => api.post('/questions', data),

  update: (id, data) => api.put(`/questions/${id}`, data),

  delete: (id) => api.delete(`/questions/${id}`),
};

export const studentAPI = {

  submitExam: (data) => api.post('/student/exam/submit', data),

  getResults: () => api.get('/student/results'),

  getStats: () => api.get('/student/stats'),

  getProfile: () => api.get('/student/profile'),

  getSubjects: () => api.get('/student/subjects'),
};

export const adminAPI = {

  getDashboardStats: () => api.get('/admin/dashboard/stats'),

  getAllResults: () => api.get('/admin/results'),

  getStudents: () => api.get('/admin/students'),
};

export default api;
