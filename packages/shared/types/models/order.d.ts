import { Address } from './address';
import { Good } from './goods';

export interface CreatedOrderParams {
  addressId: number;
  goods: {
    id: number;
    count: number;
  }[];
}

export interface Order {
  id: number;
  address: Address;
  goods: Good[];
}
