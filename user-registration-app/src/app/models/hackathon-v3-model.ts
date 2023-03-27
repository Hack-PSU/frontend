export class HackathonV3Model {
  public id: string;
  public name: string;
  public startTime: number;
  public endTime: number;
  public active: boolean;

  static parseJSON(value: any): HackathonV3Model {
    const model = new HackathonV3Model();
    return Object.assign(model, value);
  }
}
