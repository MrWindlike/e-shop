import { Pagination } from 'shared/types/request';
import { List, ResponseResult } from 'shared/types/response';
import { Notification } from 'shared/types/models/notification';
import http from '@/utils/http';

export function fetchNotifications(
  params: Pagination,
): Promise<ResponseResult<List<Notification>>> {
  return http.get('distribution/notifications', { params });
}
