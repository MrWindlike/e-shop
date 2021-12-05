import { Pagination } from 'shared/types/request';
import { ResponseResult, List } from 'shared/types/response';
import { Good } from 'shared/types/models/good';
import http from '@/utils/http';

export function fetchGoods(params: Pagination): Promise<ResponseResult<List<Good>>> {
  return http.get('/shop/goods', { params });
}

export function fetchGood(id: string): Promise<ResponseResult<Good>> {
  return http.get(`/shop/good/${id}`);
}
