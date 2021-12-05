import { Pagination } from 'shared/types/request';
import { ResponseResult, List } from 'shared/types/response';
import { Order, CreatedOrderParams } from 'shared/types/models/order';
import http from '@/utils/http';

export function fetchOrders(params: Pagination): Promise<ResponseResult<List<Order>>> {
  return http.get('/shop/orders', { params });
}

export function createOrder(data: CreatedOrderParams): Promise<ResponseResult<Order>> {
  return http.post('/shop/order', data);
}
