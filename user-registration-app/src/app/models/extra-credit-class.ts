export class ExtraCreditClass {
  uid: number
  class_name: string

  public static parseJSON(value: any): ExtraCreditClass {
    return new ExtraCreditClass(parseInt(value['uid'], 10), value['class_name'])
  }

  constructor(uid: number, class_name: string) {
    this.uid = uid
    this.class_name = class_name
  }
}
