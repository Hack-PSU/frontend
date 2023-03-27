import {LocationModel} from './location-model';

export class EventV3Model {
  public id: string;
  public name: string;
  public type: string;
  public startTime: number;
  public endTime: number;
  public description: string;
  public icon: string;
  public location: LocationModel;
  public wsPresenterNames: string;
  public wsSkillLevel: string;
  public wsRelevantSkills: string;
  public wsUrls: string[];

  static parseJSON(value: any) {
    const event = new EventV3Model();
    if ('location' in value) {
      const location = new LocationModel();
      event.location = Object.assign(location, value['location']);
    }
    return Object.assign(event, value);
  }

  static parseFromJSONArray(array: any[]): EventV3Model[] {
    return array.map((value) => {
      const event = new EventV3Model();
      return Object.assign(event, value, { wsUrls: value.wsUrls });
    });
  }
}
