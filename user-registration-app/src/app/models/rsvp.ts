export class Rsvp {
  pin: string;
  rsvp_time: string;
  idRSVP: string;
  user_id: string;
  rsvp_status: boolean;

  public static parseJSON(value: any) {
    const rsvp = new Rsvp();
    return Object.assign(rsvp, value);
  }
  constructor() {
    this.pin = null;
    this.rsvp_status = null;
    this.idRSVP = null;
    this.user_id = null;
    this.rsvp_time = null;
  }
}
