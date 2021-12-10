import { User } from './user';
import { Good } from './good';

export interface Log {
  user: User;
  good: Good;
}

export interface CreatedLogParams {
  userId: string;
  goodId: string;
}
