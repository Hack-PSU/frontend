import { Hackathon } from './hackathon';

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
  public driving: boolean;
  public firstHackathon: boolean;
  public university: string;
  public phone: string;
  public academicYear: string;
  public major: string;
  public resume: any;
  public mlhcoc: boolean;
  public mlhdcp: boolean;
  public ethnicity: string;
  public ethnicities: any;
  public codingExperience: string;
  public referral: string;
  public projectDesc: string;
  public expectations: string;
  public veteran: string;
  public address: string;
  public addressFields: any;
  public shareAddressMlh: boolean;
  public shareAddressSponsors: boolean;
  public shareEmailMlh: boolean;
  public submitted: boolean;
  public hackathon: string;
  public pin: string;
  public uid: string;
  public time: number;

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
    this.driving = false;
    this.firstHackathon = false;
    this.university = null;
    this.phone = null;
    this.academicYear = null;
    this.major = null;
    this.resume = null;
    this.mlhcoc = false;
    this.mlhdcp = null;
    this.shareEmailMlh = false;
    this.ethnicity = null;
    this.ethnicities = {
      native: false,
      asian: false,
      african: false,
      latinx: false,
      pacific: false,
      caucasian: false,
      noDisclose: false,
    };
    this.address = '';
    this.addressFields = {
      addressLine1: '',
      addressLine2: '',
      city: '',
      stateProvince: '',
      zipcode: '',
      country: '',
    };
    this.shareAddressMlh = false;
    this.shareAddressSponsors = false;
    this.codingExperience = null;
    this.referral = null;
    this.projectDesc = null;
    this.expectations = null;
    this.veteran = null;
    this.submitted = false;
    this.hackathon = null;
  }

  hasExistingResume(): boolean {
    return this.resume instanceof URL;
  }

  public static parseFromApiResponse(value: RegistrationApiResponse): Registration {
    const registration = new Registration();
    registration.address = value.address;
    registration.firstName = value.firstname;
    registration.lastName = value.lastname;
    registration.gender = value.gender;
    registration.email = value.email;
    registration.eighteenBeforeEvent = value.eighteenBeforeEvent;
    registration.shirtSize = value.shirt_size;
    registration.dietaryRestriction = value.dietary_restriction;
    registration.allergies = value.allergies;
    registration.travelReimbursement = value.travel_reimbursement;
    registration.driving = value.driving;
    registration.firstHackathon = value.first_hackathon;
    registration.university = value.university;
    registration.phone = value.phone;
    registration.academicYear = value.academic_year;
    registration.major = value.major;
    registration.resume = value.resume;
    registration.mlhcoc = value.mlh_coc;
    registration.mlhdcp = value.mlh_dcp;
    registration.shareEmailMlh = false;
    registration.ethnicity = value.race;
    registration.codingExperience = value.coding_experience;
    registration.referral = value.referral;
    registration.projectDesc = value.project;
    registration.expectations = value.expectations;
    registration.veteran = value.veteran;
    registration.submitted = value.submitted;
    registration.hackathon = Hackathon.parseJSON(registration).uid;
    registration.pin = value.pin.toString();
    registration.uid = value.uid;
    registration.time = Date.now();
    return registration;
  }
}

export interface IRegistrationDb {
  address: string;
  firstname: string;
  lastname: string;
  gender: string;
  shirt_size: string;
  dietary_restriction: string | null;
  allergies: string | null;
  travel_reimbursement: boolean;
  driving: boolean;
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
  mlh_email?: boolean;
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

export class RegistrationApiResponse {
  address: string;
  academic_year: string;
  active: boolean;
  allergies: string | null;
  base_pin: string;
  coding_experience: string | null;
  dietary_restriction: string | null;
  eighteenBeforeEvent: boolean;
  email: string;
  end_time: string;
  expectations: string | null;
  first_hackathon: boolean;
  firstname: string;
  gender: string;
  lastname: string;
  major: string;
  mlh_coc: boolean;
  mlh_dcp: boolean;
  mlh_email?: boolean;
  name: string;
  phone: string;
  project: string | null;
  race: string | null;
  referral: string | null;
  resume: URL | null;
  shirt_size: string;
  start_time: string;
  submitted: boolean;
  time: number;
  travel_reimbursement: boolean;
  driving: boolean;
  uid: string;
  university: string;
  veteran: string;
  hackathon: Hackathon;

  // This is a result of the auto incremented pin.
  // The actual pin value is the result of subtracting the base pin from this
  private pinAi: number;

  public get pin(): number {
    return this.pinAi - this.hackathon.basePin;
  }

  public static parseJSON(value: any): RegistrationApiResponse {
    const registration = new RegistrationApiResponse();
    registration.firstname = value.firstname;
    registration.lastname = value.lastname;
    registration.address = value.address;
    registration.gender = value.gender;
    registration.email = value.email;
    registration.eighteenBeforeEvent = !!value.eighteenBeforeEvent;
    registration.shirt_size = value.shirt_size;
    registration.dietary_restriction = value.dietary_restriction;
    registration.allergies = value.allergies;
    registration.travel_reimbursement = !!value.travel_reimbursement;
    registration.driving = value.driving;
    registration.first_hackathon = !!value.first_hackathon;
    registration.university = value.university;
    registration.phone = value.phone;
    registration.academic_year = value.academic_year;
    registration.major = value.major;
    registration.resume = value.resume ? new URL(value.resume) : null;
    registration.mlh_coc = !!value.mlh_coc;
    registration.mlh_dcp = !!value.mlh_dcp;
    registration.mlh_email = false;
    registration.race = value.race;
    registration.coding_experience = value.coding_experience;
    registration.referral = value.referral;
    registration.project = value.project;
    registration.expectations = value.expectations;
    registration.veteran = value.veteran;
    registration.submitted = !!value.submitted;
    registration.hackathon = Hackathon.parseJSON(value);
    registration.hackathon.uid = value.hackathon;
    registration.pinAi = value.pin;
    registration.uid = value.uid;
    registration.time = parseInt(value.time, 10);
    return registration;
  }

  isCurrentRegistration(): boolean {
    return this.hackathon.active;
  }
}
