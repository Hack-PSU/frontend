export class RegistrationModel {
  public firstName: String;
  public lastName: String;
  public gender: String;
  public email: String;
  public eighteenBeforeEvent: boolean;
  public shirtSize: String;
  public dietaryRestriction: String;
  public allergies: String;
  public travelReimbursement: boolean;
  public first_hackathon: boolean;
  public university: String;
  public phone: string;
  public academicYear: String;
  public major: String;
  public resume: File;
  public mlhcoc: boolean;
  public mlhdcp: boolean;
  public ethnicity: String;
  public codingExperience: String;
  public referral: String;
  public projectDesc: String;
  public return: String;

  constructor() {
    this.firstName = null;
    this.lastName = null;
    this.gender = null;
    this.email = null;
    this.eighteenBeforeEvent = false;
    this.shirtSize = null;
    this.dietaryRestriction = null;
    this.allergies = null;
    this.travelReimbursement = false;
    this.first_hackathon = false;
    this.university = null;
    this.phone = null;
    this.academicYear = null;
    this.major = null;
    this.resume = null;
    this.mlhcoc = false;
    this.mlhdcp = null;
    this.ethnicity = null;
    this.codingExperience = null;
    this.referral = null;
    this.projectDesc = null;
    this.return = null;
  }
}


