export class SponsorModel {
  public uid: number;
  public name: string;
  public level: string;
  public logo: string;
  public order: number;
  public website_link: string;
  public hackathon: string;

  static parseJSON(value: any) {
    const sponsor = new SponsorModel();
    return Object.assign(sponsor, value);
  }

  static parseFromJSONArray(array: any[]): SponsorModel[] {
    return array.map((value) => {
      const sponsor = new SponsorModel();
      return Object.assign(sponsor, value);
    });
  }
}
