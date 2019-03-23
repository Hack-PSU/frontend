export class Hackathon {
  public uid: string;
  public name: string;
  public startTime: Date;
  public endTime: Date | null;
  public basePin: number;
  public active: boolean;

  public static parseJSON(value): Hackathon {
    return new Hackathon(
      value['uid'],
      value['name'],
      parseInt(value['start_time'], 10),
      parseInt(value['end_time'], 10),
      value['base_pin'],
      value['active'],
    );
  }

  constructor(uid: string, name: string, start_time: number, end_time: number, base_pin: number, active: boolean) {
    this.uid = uid;
    this.name = name;
    this.startTime = new Date(start_time);
    this.endTime = end_time ? new Date(end_time) : null;
    this.basePin = base_pin;
    this.active = active;
  }
}
