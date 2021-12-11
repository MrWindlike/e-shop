import { CreatedLogParams } from 'shared/types/models/log';
import http from '@/utils/http';

export function createLog(params: CreatedLogParams) {
  return http.post('/shop/log', params);
}
