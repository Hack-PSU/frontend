import { environment } from '../environments/environment';
export class AppConstants {
  public static API_BASE_URL: string = environment.api_url;
  public static API_BASE_URL_V2: string = environment.api_v2_url;
  public static LOGIN_ENDPOINT = '/login';
  public static REGISTER_ENDPOINT = '/register';
  public static LIVE_ENDPOINT = '/live';
  public static PIN_ENDPOINT = '/pin';
  public static TABLE_ENDPOINT: '/table';
}
