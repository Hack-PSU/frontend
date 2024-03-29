export class RegistrationV3 {
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
  
  public static parseFromApiResponse(value: RegistrationApiResponseV3): RegistrationV3 {
    const registration = new RegistrationV3();
    registration.address = value.country;
    registration.firstName = value.firstName;
    registration.lastName = value.lastName;
    registration.gender = value.gender;
    registration.email = value.email;
    registration.shirtSize = value.shirtSize;
    registration.dietaryRestriction = value.dietaryRestriction;
    registration.allergies = value.allergies;
    registration.university = value.university;
    registration.phone = value.phone;
    registration.major = value.major;
    registration.resume = value.resume;
    registration.ethnicity = value.race;
    registration.submitted = true;
    registration.pin = "legacy pin";
    registration.uid = value.uid;
    if (value.registration) {
      registration.eighteenBeforeEvent = value.registration.eighteenBeforeEvent;
      registration.travelReimbursement = value.registration.travelReimbursement;
      registration.driving = value.registration.driving;
      registration.firstHackathon = value.registration.firstHackathon;
      registration.academicYear = value.registration.academicYear;
      registration.mlhcoc = value.registration.mlhCoc;
      registration.mlhdcp = value.registration.mlhDcp;
      registration.codingExperience = value.registration.codingExperience;
      registration.referral = value.registration.referral;
      registration.projectDesc = value.registration.project;
      registration.expectations = value.registration.expectations;
      registration.veteran = value.registration.veteran;
      registration.hackathon = value.registration.hackathonId;
      registration.time = value.registration.time;    
    }
    return registration;
  }
}

export class RegistrationApiResponseV3 {
  uid: string;
  firstName: string;
  lastName: string;
  gender: string;
  shirtSize: string;
  dietaryRestriction: string;
  allergies: string | null;
  university: string;
  email: string;
  major: string;
  phone: string;
  country: string;
  race: string;
  resume: URL | null;
  registration: {
    id: number;
    userId: string;
    travelReimbursement: boolean;
    driving: boolean;
    firstHackathon: boolean;
    academicYear: string;
    educationalInstitutionType: string;
    codingExperience: string | null;
    eighteenBeforeEvent: boolean;
    mlhCoc: boolean;
    mlhDcp: boolean;
    referral: string | null;
    project: string | null;
    expectations: string | null;
    shareAddressMlh: boolean;
    shareAddressSponsors: boolean;
    shareEmailMlh: boolean;
    veteran: string;
    hackathonId: string;
    time: number;
    submitted: boolean;
  } | null;

  public static parseJSON(value: any): RegistrationApiResponseV3 {
    const response = new RegistrationApiResponseV3();
    response.firstName = value.firstname;
    response.lastName = value.lastname;
    response.country = value.country;
    response.gender = value.gender;
    response.email = value.email;
    response.shirtSize = value.shirtSize;
    response.dietaryRestriction = value.dietaryRestriction;
    response.allergies = value.allergies;
    response.university = value.university;
    response.phone = value.phone;
    response.major = value.major;
    response.resume = value.resume ? new URL(value.resume) : null;
    response.race = value.race;
    response.uid = value.id;
    if (value.registration) {
      response.registration = {
        id: value.registration.id,
        userId: value.registration.userId,
        hackathonId: value.registration.hackathonId,
        academicYear: value.registration.academicYear,
        educationalInstitutionType: value.registration.educationalInstitutionType,
        codingExperience: value.registration.codingExperience,
        referral: value.registration.referral,
        project: value.registration.project,
        expectations: value.registration.expectations,
        veteran: value.registration.veteran,
        time: parseInt(value.registration.time, 10),
        submitted: !!value.registration.submitted,
        travelReimbursement: !!value.registration.travelReimbursement,
        driving: !!value.driving,
        firstHackathon: !!value.registration.firsthackathon,
        eighteenBeforeEvent: !!value.registration.eighteenBeforeEvent,
        mlhCoc: !!value.registration.mlhCoc,
        mlhDcp: !!value.registration.mlhDcp,
        shareAddressMlh: !!value.registration.shareAddressMlh,
        shareAddressSponsors: !!value.registration.shareAddressSponsors,
        shareEmailMlh: !!value.registration.shareEmailMlh,
      };

    } else {
      response.registration = null;
    }
    return response;
  }

  isCurrentRegistration(): boolean {
    // Hackfix until we fully migrate to the new frontend.
    if (this.registration) {
      return true;
    } else {
      return false;
    }
  }

}