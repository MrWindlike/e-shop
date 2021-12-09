import { ResponseResult } from 'shared/types/response';
import { User, LoginParams } from 'shared/types/models/user';
import http from '@/utils/http';

interface Token {
  type: string;
  token: string;
}

export function fetchAdmin(): Promise<ResponseResult<User>> {
  return http.get('/admin/admin');
}

export function login(params: LoginParams): Promise<ResponseResult<Token>> {
  return http.post('/admin/login', params);
}

export function logout(): Promise<ResponseResult<null>> {
  return http.post('/admin/logout');
}
