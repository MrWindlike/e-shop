export interface User {
  account: string;
  password: string;
}

export interface LoginParams {
  account: User['account'];
  password: User['password'];
}

export interface RegisterParams {
  account: User['account'];
  password: User['password'];
}
