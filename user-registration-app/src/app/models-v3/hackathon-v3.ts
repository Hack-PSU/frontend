export class HackathonV3 {
  public uid: string;
  public name: string;
  public startTime: Date;
  public endTime: Date | null;
  public active: boolean;

  public static parseJSON(value: any): HackathonV3 {
    return new HackathonV3(
      value['id'],
      value['name'],
      parseInt(value['startTime'], 10),
      parseInt(value['endTime'], 10),
      true
    );
  }

  constructor(
    uid: string,
    name: string,
    startTime: number,
    endTime: number,
    active: boolean
  ) {
    this.uid = uid;
    this.name = name;
    this.startTime = new Date(startTime);
    this.endTime = endTime ? new Date(endTime) : null;
    this.active = active;
  }
}
