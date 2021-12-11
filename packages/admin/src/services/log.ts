import { Pagination } from 'shared/types/request';
import http from '@/utils/http';

export function fetchLogs(params: Pagination) {
  return http.get('/shop/logs', { params });
}
