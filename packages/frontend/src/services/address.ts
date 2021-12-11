import {
  ResponseResult,
  List,
} from 'shared/types/response';
import {
  Address,
} from 'shared/types/models/address';
import {
  Pagination,
} from 'shared/types/request';
import http from '@/utils/http';

export function fetchAddresses(params: Pagination): Promise<ResponseResult<List<Address>>> {
  return http.get('/shop/addresses', { params });
}

export function createAddress(data: Address) {
  return http.post('/shop/address', data);
}

export function updateAddress(id: string, data: Address) {
  return http.put(`/shop/address/${id}`, data);
}

export function deleteAddress(id: string) {
  return http.delete(`/shop/address/${id}`);
}
