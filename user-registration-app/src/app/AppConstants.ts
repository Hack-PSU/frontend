import { environment } from '../environments/environment';
export class AppConstants {
  // public static API_BASE_URL: String = 'https://api.hackpsu.org/v1/';
  public static API_BASE_URL: String = environment.api_url;
}
