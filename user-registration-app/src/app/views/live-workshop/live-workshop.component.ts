import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-live-workshop',
  templateUrl: './live-workshop.component.html',
  // providers: [LiveUpdatesService],
  styleUrls: ['./live-workshop.component.css'],
})
export class LiveWorkshopComponent implements OnInit {
  private _date: Date;
  private _startTime: Date;
  private _endTime: Date;

  @Input() title: string;
  @Input() description: string;
  @Input() link: string;
  @Input() skills: string;
  @Input() downloads: string[];
  @Input() presenters: string[];
  @Input() collapseID: string;
  // @Input() presenter1img: string;
  // @Input() presenter1Name: string;
  // @Input() presenter2img: string;
  // @Input() presenter2Name: string;
  // @Input() presenter3img: string;
  // @Input() presenter3Name: string;

  // not the most prettiest way to handle this date conversion
  @Input() set date(value: any) {
    this._date = new Date(0);
    this._date.setUTCMilliseconds(value);
    this._startTime = this._date;
  }
  get date(): any {
    return this._date.toLocaleDateString();
  }
  get startTime(): any {
    return this._startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  @Input() set endTime(value: any) {
    this._endTime = new Date(0);
    this._endTime.setUTCMilliseconds(value);
  }
  get endTime(): any {
    return this._endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  ngOnInit() {
    // this.removePresenter(1, this.presenter1Name, this.presenter1img);
    // this.removePresenter(2, this.presenter2Name, this.presenter2img);
    // this.removePresenter(3, this.presenter3Name, this.presenter3img);
  }

  removePresenter(presenterNo: number, presenterName: string, presenterImg: string) {
    if (!presenterName || !presenterImg) {
      // TODO: Fix this, it looks like this is preventing more than 1 profile pic from showing up
      // const elem = document.getElementById('presenter' + presenterNo);
      // elem.parentNode.removeChild(elem);
    }
  }
}
