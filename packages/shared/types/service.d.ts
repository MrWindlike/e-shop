export interface ResponseResult<Data> {
  code: number;
  message: string;
  data: Data;
}
