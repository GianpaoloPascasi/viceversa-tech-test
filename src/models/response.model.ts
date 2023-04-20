export interface Response<T> {
  msg: string;
  data: T;
  code: number;
}
