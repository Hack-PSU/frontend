import {SponsorModel} from './sponsor';

export class SponsorV3Model {
  public id: number;
  public name: string;
  public darkLogo: string;
  public lightLogo: string;
  public level: string;
  public order: number;
  public link?: string;
  public hackathonId: string;

  static parseJSON(value: any): SponsorV3Model {
    const model = new SponsorV3Model();
    return Object.assign(model, value);
  }

  static parseJSONArray(array: any[]): SponsorV3Model[] {
    return array.map((s) => {
      const model = new SponsorModel();
      return Object.assign(model, s);
    })
  }
}
