import { Pagination } from 'shared/types/request';
import { Good } from 'shared/types/models/good';
import { ResponseResult } from 'shared/types/response';
import http from '@/utils/http';

export function fetchGoods(params: Pagination): Promise<ResponseResult<Good[]>> {
  return http.get('/shop/goods', { params });
}

export function fetchGood(id: string): Promise<ResponseResult<Good>> {
  return http.get(`/shop/good/${id}`);
}

export function createGood(data: Good): Promise<ResponseResult<Good>> {
  const form = new FormData();

  Object.keys(data).forEach((key) => {
    form.append(key, data[key]);
  });

  return http.post('/shop/good', form);
}

export function updateGood(id: string, data: Good): Promise<ResponseResult<Good>> {
  const form = new FormData();

  Object.keys(data).forEach((key) => {
    form.append(key, data[key]);
  });

  return http.put(`/shop/good/${id}`, form);
}

export function deleteGood(id: string): Promise<ResponseResult<null>> {
  return http.delete(`/shop/good/${id}`);
}
