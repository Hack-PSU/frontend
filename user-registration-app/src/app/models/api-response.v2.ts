export interface IApiResponse {
  api_response: string;
  status: number;
  body: { data: any, result: string };
}
