export class EventModel {
  id: string;
  name: string;
  type: string;
  description: string;
  locationId: number;
  icon: string;
  startTime: number;
  endTime: number;
  wsPresenterNames: string;
  wsRelevantSkills: string;
  wsSkillLevel: string;
  hackathonId: string;
  wsUrls: [string];
  location: {
    id: number,
    name: string
  }

  static parseJSON(value: any) {
    const event = new EventModel();
    return Object.assign(event, value);
  }

  static parseFromJSONArray(array: any[]): EventModel[] {
    return array.map((value) => {
      const event = new EventModel();
      return Object.assign(event, value, { ws_urls: value.ws_urls });
    });
  }
}
