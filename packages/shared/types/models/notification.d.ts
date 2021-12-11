import { BaseModel } from './base';
import { Order } from './order';

export type Notification = BaseModel & {
  order: Order;
}
