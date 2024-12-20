import axios from 'axios';

export const IMAGE_URL = `https://upskilling-egypt.com:3003`;
export const baseURL = 'https://upskilling-egypt.com:3003/api/v1';
export const axiosInstance = axios.create({
  baseURL,
  // headers: { Authorization: localStorage.getItem('token') },
});
export const publicAxiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = '/login';
  } else {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// USERS_URLS
export const USERS_URLS = {
  LOGIN: `/Users/Login`,
  RESET_REQUEST: `/Users/Reset/Request`,
  RESET: '/Users/Reset',
  REGISTER: `/Users/Register`,
  VERIFY: `/Users/verify`,
  CHANGE_PASSWORD: `/Users/ChangePassword`,
  // GET_USERS: `/Users/Manager`, 
  GET_USERS: `/Users/`, 

  GET_UsersUrls: `Users/Manager`,
  TOGGLE_STATUS_URLS: (id: number) => `Users/${id}`,
  COUNT_USERS: `/Users/count`,
};

export const TASKS_URLS = {
  // GET_TASKS: `/Task`,
  GET_TASKS_MANAGER: `/Task/manager`,
  ADD_TASK: `/Task`,
  TASKS_COUNT: `/Task/count`,
  GET_TASK_BY_ID: (id: number) => `/Task/${id}`,
  UPDATE_TASK: (id: number) => `/Task/${id}`,
  DELETE_TASK: (id: number) => `/Task/${id}`,
};
export const PROJECTS_URLS = {
  GET_PROJECTS: `/Project/manager`,
  GET_PROJECTS_EMPIOYEE: `/Project/employee`,
  CREATE_PROJECT: `/Project`,
  GET_PROJECT: (id: number) => `/Project/${id}`,
  UPDATE_PROJECT: (id: number) => `/Project/${id}`,
  DELETE_PROJECT: (id: number) => `/Project/${id}`,
};

export const TASKSUSER_URLS = {
  GET_TASKSUSER: `/Task`,
  CHANGE_STATUS: (id: string) => `/Task/${id}/change-status`,
};
