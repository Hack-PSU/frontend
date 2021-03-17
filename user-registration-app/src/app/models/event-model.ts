export class EventModel {
  public uid: string;
  public event_title: string;
  public event_type: string;
  public event_start_time: string;
  public event_end_time: string;
  public event_description: string;
  public event_icon: string;
  public event_location_name: string;
  public ws_presenter_names: string;
  public ws_skill_level: string;
  public ws_relevant_skills: string;

  static parseJSON(value: any) {
    const event = new EventModel();
    return Object.assign(event, value);
  }

  static parseFromJSONArray(array: any[]): EventModel[] {
    return array.map((value) => {
      const event = new EventModel();
      return Object.assign(event, value);
    });
  }
}
