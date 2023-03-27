import {EventV3Model} from './event-v3-model';
import {SponsorV3Model} from './sponsor-v3-model';

export class HackathonStaticModel {
  public id: string;
  public name: string;
  public startTime: number;
  public endTime: number;
  public active: boolean;
  public events: EventV3Model[];
  public sponsors: SponsorV3Model[];

  static parseJSON(value: any): HackathonStaticModel {
    const model = new HackathonStaticModel();
    model.id = value['id'];
    model.name = value['name'];
    model.startTime = value['startTime'];
    model.endTime = value['endTime'];
    model.active = value['active'];
    model.events = EventV3Model.parseFromJSONArray(value['events']);
    model.sponsors = SponsorV3Model.parseJSONArray(value['sponsors']);

    return model;
  }
}
