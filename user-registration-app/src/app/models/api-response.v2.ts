export interface IApiResponse<T> {
  api_response: string;
  status: number;
  body: { data: T; result: string };
}
