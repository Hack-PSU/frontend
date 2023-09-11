export class SponsorModel {
  public id: number;
  public name: string;
  public level: string;
  public darkLogo: string;
  public lightLogo: string;
  public order: number;
  public link: string;
  public hackathonId: string;

  static parseJSON(value: any): SponsorModel {
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
