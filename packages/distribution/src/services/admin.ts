import { ResponseResult } from 'shared/types/response';
import { User, LoginParams } from 'shared/types/models/user';
import http from '@/utils/http';

interface Token {
  type: string;
  token: string;
}

export function fetchAdmin(): Promise<ResponseResult<User>> {
  return http.get('/distribution/admin');
}

export function login(params: LoginParams): Promise<ResponseResult<Token>> {
  return http.post('/distribution/login', params);
}

export function logout(): Promise<ResponseResult<null>> {
  return http.delete('/distribution/logout');
}
