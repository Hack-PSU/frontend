export class Registration {
  public firstName: string;
  public lastName: string;
  public gender: string;
  public email: string;
  public eighteenBeforeEvent: boolean;
  public shirtSize: string;
  public dietaryRestriction: string;
  public allergies: string;
  public travelReimbursement: boolean;
  public firstHackathon: boolean;
  public university: string;
  public phone: string;
  public academicYear: string;
  public major: string;
  public resume: any;
  public mlhcoc: boolean;
  public mlhdcp: boolean;
  public ethnicity: string;
  public codingExperience: string;
  public referral: string;
  public projectDesc: string;
  public expectations: string;
  public veteran: string;
  public submitted: boolean;
  private hackathon: string;
  public pin: string;

  public static parseJSON(value: any): Registration {
    const registration = new Registration();
    registration.firstName = value.firstname;
    registration.lastName = value.lastname;
    registration.gender = value.gender;
    registration.email = value.email;
    registration.eighteenBeforeEvent = !!value.eighteenBeforeEvent;
    registration.shirtSize = value.shirt_size;
    registration.dietaryRestriction = value.dietary_restriction;
    registration.allergies = value.allergies;
    registration.travelReimbursement = !!value.travel_reimbursement;
    registration.firstHackathon = !!value.first_hackathon;
    registration.university = value.university;
    registration.phone = value.phone;
    registration.academicYear = value.academic_year;
    registration.major = value.major;
    registration.resume = value.resume ? new URL(value.resume) : null;
    registration.mlhcoc = !!value.mlh_coc;
    registration.mlhdcp = !!value.mlh_dcp;
    registration.ethnicity = value.race;
    registration.codingExperience = value.coding_experience;
    registration.referral = value.referral;
    registration.projectDesc = value.project;
    registration.expectations = value.expectations;
    registration.veteran = value.veteran;
    registration.submitted = !!value.submitted;
    registration.hackathon = value.hackathon;
    registration.pin = value.pin;
    return registration;
  }

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
    this.firstHackathon = false;
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
    this.expectations = null;
    this.veteran = null;
    this.submitted = false;
    this.hackathon = null;
  }

  isCurrentRegistration(currentHackathonId: string): boolean {
    return this.hackathon === currentHackathonId;
  }

  hasExistingResume(): boolean {
    return this.resume instanceof URL;
  }
}

export interface IRegistrationDb {
  firstname: string;
  lastname: string;
  gender: string;
  shirt_size: string;
  dietary_restriction: string | null;
  allergies: string | null;
  travel_reimbursement: boolean;
  first_hackathon: boolean;
  university: string;
  email: string;
  academic_year: string;
  major: string;
  phone: string;
  race: string | null;
  resume: string | null;
  coding_experience: string | null;
  uid?: string;
  eighteenBeforeEvent: boolean;
  mlh_coc: boolean;
  mlh_dcp: boolean;
  referral: string | null;
  project: string | null;
  expectations: string | null;
  veteran: string;
  time: number;
  hackathon: string;
  submitted: boolean;
  name: string;
  start_time: string;
  end_time: string;
  base_pin: string;
  active: boolean;
}
