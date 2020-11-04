import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-live-workshop',
  templateUrl: './live-workshop.component.html',
  // providers: [LiveUpdatesService],
  styleUrls: ['./live-workshop.component.css'],
})

export class LiveWorkshopComponent implements OnInit {
  @Input() title: String;
  @Input() description: String;
  @Input() date: String;
  @Input() time: String;
  @Input() link: String;
  @Input() skills: String;
  @Input() downloads: String[];
  @Input() presenter1img: String;
  @Input() presenter1Name: String;
  @Input() presenter2img: String;
  @Input() presenter2Name: String;
  @Input() presenter3img: String;
  @Input() presenter3Name: String;
  @Input() collapseID: String;

  ngOnInit() {
    this.removePresenter(1, this.presenter1Name, this.presenter1img)
    this.removePresenter(2, this.presenter2Name, this.presenter2img)
    this.removePresenter(3, this.presenter3Name, this.presenter3img)
  }

  removePresenter(presenterNo: number, presenterName: String, presenterImg: String) {
    if (!presenterName || !presenterImg) {
      const elem = document.getElementById('presenter' + presenterNo);
      elem.parentNode.removeChild(elem);
    }
  }
}
