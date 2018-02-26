import { environment } from '../environments/environment';
export class AppConstants {
  public static API_BASE_URL: String = environment.api_url;
  public static LOGIN_ENDPOINT: String = '/login';
  public static REGISTER_ENDPOINT: String = '/register';
}
