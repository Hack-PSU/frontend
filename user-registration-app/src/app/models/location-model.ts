export class LocationModel {
  public id: number;
  public name: string;

  static parseJSON(value: any) {
    const location = new LocationModel();
    return Object.assign(location, value);
  }
}
