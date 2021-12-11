import { BaseModel } from './base';

export type Address = BaseModel & {
  name: string;
  phone: string;
  address: string;
}


