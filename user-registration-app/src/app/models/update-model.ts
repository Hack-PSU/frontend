export class UpdateModel {
  public uid: string;
  public update_text: string;
  public update_image: string;
  public update_title: string;
  public update_time: string;


  constructor(uid: string, update_text: string, update_image: string, update_title: string, update_time: string) {
    this.uid = uid;
    this.update_text = update_text;
    this.update_image = update_image;
    this.update_title = update_title;
    this.update_time = update_time;
  }

  static instance() {
    return new UpdateModel('','','','','');
  }
}
