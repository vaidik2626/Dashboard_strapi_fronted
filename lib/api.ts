import axios from 'axios';

// API configuration
const API_BASE_URL = `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}/api`;

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token (only for protected routes)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  
  // Don't add authorization header for auth endpoints
  const isAuthEndpoint = config.url?.includes('/auth/') || config.url?.includes('/custom-auth/');
  
  if (token && !isAuthEndpoint) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API calls
export const authAPI = {
  login: async (credentials: { identifier: string; password: string }) => {
    const response = await api.post('/auth/local', credentials);
    return response.data;
  },
  
  register: async (userData: { username: string; email: string; password: string }) => {
    const response = await api.post('/auth/local/register', userData);
    return response.data;
  },
  
  // Get current user (test if token is valid)
  me: async () => {
    const response = await api.get('/users/me');
    return response.data;
  },
  
  // Custom auth endpoints (if you prefer your custom format)
  customLogin: async (credentials: { identifier: string; password: string }) => {
    const response = await api.post('/custom-auth/login', credentials);
    return response.data;
  },
  
  customRegister: async (userData: { username: string; email: string; password: string }) => {
    const response = await api.post('/custom-auth/register', userData);
    return response.data;
  },
};

// Leads API calls
export const leadsAPI = {
  getAll: async () => {
    const response = await api.get('/leads');
    return response.data;
  },
  
  getById: async (id: number) => {
    const response = await api.get(`/leads/${id}`);
    return response.data;
  },
  
  create: async (leadData: { name: string; company: string; email: string; current_status: string }) => {
    const response = await api.post('/leads', { data: leadData });
    return response.data;
  },
  
  update: async (id: number, leadData: { name: string; company: string; email: string; current_status: string }) => {
    const response = await api.put(`/leads/${id}`, { data: leadData });
    return response.data;
  },
  
  delete: async (id: number) => {
    const response = await api.delete(`/leads/${id}`);
    return response.data;
  },
  
  // Advanced queries
  getByStatus: async (status: 'Active' | 'Inactive') => {
    const response = await api.get(`/leads?filters[current_status][$eq]=${status}`);
    return response.data;
  },
  
  searchByName: async (name: string) => {
    const response = await api.get(`/leads?filters[name][$contains]=${name}`);
    return response.data;
  },
};

export default api;