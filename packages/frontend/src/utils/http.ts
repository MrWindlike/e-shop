import axios from 'axios';
import { Message } from 'element-ui';
import {
  HOST,
  PORT,
} from 'shared/src/const/server';
import store from '@/store';

const SILENTS = ['/shop/log'];

let token = '';

export function setToken(ticket: string): void {
  token = ticket;
  localStorage.setItem('token', ticket);
}

export function clearToken(): void {
  token = '';
  localStorage.removeItem('token');
}

export function getToken(): string {
  return token || localStorage.getItem('token') || '';
}

const http = axios.create({
  baseURL: `${HOST}:${PORT}`,
});

http.interceptors.request.use((request) => ({
  ...request,
  headers: {
    Authorization: getToken(),
  },
}));

http.interceptors.response.use((response) => {
  if (response.config.method?.toLocaleUpperCase() !== 'GET' && !SILENTS.includes(response.config.url || '')) {
    Message.success(response.data.message);
  }

  return response.data;
}, ({ response }) => {
  if (response.status === 401) {
    clearToken();
    store.commit('user/SET_USER', null);
    Message.error('登录已过期，请重新登录');
  } else {
    if (SILENTS.includes(response.config.url)) {
      return;
    }

    Message.error(response.data?.message || '服务器错误, 请稍后再试');
    throw new Error(response.data?.message || '服务器错误, 请稍后再试');
  }
});

export default http;
