import { Pagination } from 'shared/types/request';
import { Good } from 'shared/types/models/good';
import { ResponseResult } from 'shared/types/response';
import { CancelToken } from 'axios';
import http from '@/utils/http';

export function fetchGoods(
  params: Pagination,
  { cancelToken }: { cancelToken: CancelToken },
): Promise<ResponseResult<Good[]>> {
  return http.get('/shop/goods', { params, cancelToken });
}

export function fetchGood(id: string): Promise<ResponseResult<Good>> {
  return http.get(`/shop/good/${id}`);
}

export function createGood(data: Good): Promise<ResponseResult<Good>> {
  const form = new FormData();

  Object.keys(data).forEach((key) => {
    form.append(key, String(data[key as keyof Good]));
  });

  return http.post('/shop/good', form);
}

export function updateGood(id: string, data: Good): Promise<ResponseResult<Good>> {
  const form = new FormData();

  Object.keys(data).forEach((key) => {
    form.append(key, String(data[key as keyof Good]));
  });

  return http.put(`/shop/good/${id}`, form);
}

export function deleteGood(id: string): Promise<ResponseResult<null>> {
  return http.delete(`/shop/good/${id}`);
}
