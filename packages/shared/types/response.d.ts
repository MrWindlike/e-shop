export interface ResponseResult<Data> {
  code: number;
  message: string;
  data: Data;
}

export interface List<Data> {
  list: Data[];
  total: number;
}
