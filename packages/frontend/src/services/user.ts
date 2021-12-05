import { ResponseResult } from 'shared/types/response';
import { User, LoginParams, RegisterParams } from 'shared/types/models/user';
import http from '@/utils/http';

interface Token {
  type: string;
  token: string;
}

export function fetchUser(): Promise<ResponseResult<User>> {
  return http.get('/shop/user');
}

export function login(params: LoginParams): Promise<ResponseResult<Token>> {
  return http.post('/shop/login', params);
}

export function logout(): Promise<ResponseResult<null>> {
  return http.post('/shop/logout');
}

export function register(params: RegisterParams): Promise<ResponseResult<Token>> {
  return http.post('/shop/user', params);
}
