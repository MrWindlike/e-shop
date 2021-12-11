import { BaseModel } from './base';

export type Good = BaseModel & {
  name: string;
  description: string;
  image: string;
  price: number;
  inventory: number;
}
