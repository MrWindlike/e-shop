import { User } from './user.d';
import { Address } from './address';
import { Good } from './good';
import { BaseModel } from './base';

export interface CreatedOrderParams {
  addressId: number;
  goods: {
    id: number;
    count: number;
    price: number;
  }[];
}

export type Order = BaseModel & {
  address: Address;
  goods: Good[];
  user: User;
}
