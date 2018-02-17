import { Url } from 'url';

export class RegistrationModel {
  public firstName: String;
  public lastName: String;
  public gender: String;
  public email: String;
  public eighteenBeforeEvent: boolean;
  public shirtSize: ShirtSize;
  public dietaryRestriction: DietaryRestriction;
  public travel_reimbursement: boolean;
  public first_hackathon: boolean;
  public university: String; s;
  public phoneNumber: Number;
  public academicYear: AcademicStatus;
  public major: String;
  public resume: Url;
  public mlhcoc: boolean;
  public mlhdcp: boolean;
  public dem_info: boolean;
  public ethnicity: Ethnicities;
  public codingExperience: CodingExperience;
  public referral: String;
  public projectDesc: String;
}

enum ShirtSize {
  XS,
  S,
  M,
  L,
  XL,
  XXL,
}

enum DietaryRestriction {
  VEGETARIAN,
  VEGAN,
  KOSHER,
  HALAL,
  ALLERGIES,
}

enum AcademicStatus {
  FRESHMAN,
  SOPHOMORE,
  JUNIOR,
  SENIOR,
  HIGHER,
}

enum Ethnicities {
  AIAN,
  ASIAN,
  BAA,
  HL,
  NHOPI,
  WHITE,
}

enum CodingExperience {
  NONE,
  BEGINNER,
  INTERMEDIATE,
  ADVANCED,
}

