import { Pagination } from 'shared/types/request';
import http from '@/utils/http';

export function fetchOrders(params: Pagination) {
  return http.get('/distribution/orders', { params });
}
