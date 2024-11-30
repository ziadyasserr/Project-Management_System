import axios from 'axios';

export const IMAGE_URL = `https://upskilling-egypt.com:3003`;
export const baseURL = 'https://upskilling-egypt.com:3003/api/v1';
export const axiosInstance = axios.create({
  baseURL,
  headers: { Authorization: localStorage.getItem('token') },
});

// USERS_URLS
export const USERS_URLS = {
  LOGIN: `/Users/Login`,
  RESET_REQUEST: `/Users/Reset/Request`,
  RESET: '/Users/Reset',
  REGISTER: `/Users/Register`,
  VERIFY: `/Users/verify`,
  CHANGE_PASSWORD: `/Users/ChangePassword`,
};
