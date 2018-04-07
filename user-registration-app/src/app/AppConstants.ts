import { environment } from '../environments/environment';
export class AppConstants {
  public static API_BASE_URL: String = environment.api_url;
  public static SOCKET_BASE_URL: String = environment.socket_url;
  public static LOGIN_ENDPOINT = '/login';
  public static REGISTER_ENDPOINT = '/register';
  public static LIVE_ENDPOINT = '/live';
}
