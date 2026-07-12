import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ===== AUTH =====
export const auth = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  logout: () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
  },
  getProfile: () => api.get('/auth/profile'),
};

// ===== USERS =====
export const users = {
  getAll: () => api.get('/admin/users'),
  getById: (id) => api.get(`/admin/users/${id}`),
  update: (id, data) => api.put(`/admin/users/${id}`, data),
  block: (id) => api.post(`/admin/users/${id}/block`),
  unblock: (id) => api.post(`/admin/users/${id}/unblock`),
};

// ===== TRANSACTIONS =====
export const transactions = {
  getAll: () => api.get('/admin/transactions'),
  getByUser: (userId) => api.get(`/admin/transactions/user/${userId}`),
};

// ===== ROUTES =====
export const routes = {
  getAll: () => api.get('/admin/routes'),
  getById: (id) => api.get(`/admin/routes/${id}`),
  create: (data) => api.post('/admin/routes', data),
  update: (id, data) => api.put(`/admin/routes/${id}`, data),
  delete: (id) => api.delete(`/admin/routes/${id}`),
};

// ===== BUSES =====
export const buses = {
  getAll: () => api.get('/admin/buses'),
  getById: (id) => api.get(`/admin/buses/${id}`),
  create: (data) => api.post('/admin/buses', data),
  update: (id, data) => api.put(`/admin/buses/${id}`, data),
  delete: (id) => api.delete(`/admin/buses/${id}`),
};

// ===== STATS =====
export const stats = {
  getDashboard: () => api.get('/admin/stats'),
};

export default api;