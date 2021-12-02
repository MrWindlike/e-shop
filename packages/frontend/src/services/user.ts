import http from '../utils/http';
import { ResponseResult } from 'shared/types/service';
import { User, LoginParams, RegisterParams } from 'shared/types/models/user';

export function fetchUser(): Promise<ResponseResult<User>> {
  return http.get('/shop/user');
}

export function login(params: LoginParams): Promise<ResponseResult<string>> {
  return http.post('/shop/login', params);
}

export function register(params: RegisterParams): Promise<ResponseResult<boolean>> {
  return http.post('/shop/user', params);
}
