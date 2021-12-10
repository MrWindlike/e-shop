import { Pagination } from 'shared/types/request';
import { ResponseResult, List } from 'shared/types/response';
import { Good } from 'shared/types/models/good';
import http from '@/utils/http';

export function fetchGoods(params: Pagination): Promise<ResponseResult<List<Good>>> {
  return http.get('/shop/goods', { params });
}

export function fetchGood(id: number): Promise<ResponseResult<Good>> {
  return http.get(`/shop/good/${id}`);
}

export function checkGoods(ids: number[]): Promise<ResponseResult<Record<string, number>>> {
  return http.get('/shop/goods/inventory', { params: { ids: ids.join(',') } });
}
