export class ApiResponse<T> {
  msg: string;
  data: T;
  code: number;
}
