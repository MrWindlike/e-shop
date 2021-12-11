import { User } from './user';
import { Good } from './good';
import { BaseModel } from './base';

export type Log = BaseModel & {
  user: User;
  good: Good;
}

export interface CreatedLogParams {
  userId: string;
  goodId: string;
}
