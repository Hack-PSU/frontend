export class UserExtraCreditApiResponse {
  uid: number;
  user_uid: string;
  class_uid: number;
  hackathon: string;

  public static parseJSON(value: any): UserExtraCreditApiResponse {
    const userExtraCredit = new UserExtraCreditApiResponse();
    userExtraCredit.uid = value.uid;
    userExtraCredit.user_uid = value.user_uid;
    userExtraCredit.class_uid = value.class_uid;
    userExtraCredit.hackathon = value.hackathon;
    return userExtraCredit;
  }
}
