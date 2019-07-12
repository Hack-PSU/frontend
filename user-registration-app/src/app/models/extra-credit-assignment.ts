export class ExtraCreditAssignment {
  uid: number;
  user_uid: string;
  class_uid: number;
  hackathon:string;

  public static parseJSON(value): ExtraCreditAssignment {
    return new ExtraCreditAssignment(
      parseInt(value['uid'], 10),
      value['user_uid'],
      parseInt(value['class_uid'], 10),
      value['hackathon'],
    );
  }


  constructor(uid: number, user_uid: string, class_uid: number, hackathon: string) {
    this.uid = uid;
    this.user_uid = user_uid;
    this.class_uid = class_uid;
    this.hackathon = hackathon;
  }
}
