import { Component, OnInit, Input } from '@angular/core'

@Component({
  selector: 'app-live-workshop',
  templateUrl: './live-workshop.component.html',
  // providers: [LiveUpdatesService],
  styleUrls: ['./live-workshop.component.css'],
})
export class LiveWorkshopComponent implements OnInit {
  @Input() title: string
  @Input() description: string
  @Input() date: string
  @Input() time: string
  @Input() link: string
  @Input() skills: string
  @Input() downloads: string[]
  @Input() presenter1img: string
  @Input() presenter1Name: string
  @Input() presenter2img: string
  @Input() presenter2Name: string
  @Input() presenter3img: string
  @Input() presenter3Name: string
  @Input() collapseID: string

  ngOnInit() {
    this.removePresenter(1, this.presenter1Name, this.presenter1img)
    this.removePresenter(2, this.presenter2Name, this.presenter2img)
    this.removePresenter(3, this.presenter3Name, this.presenter3img)
  }

  removePresenter(presenterNo: number, presenterName: string, presenterImg: string) {
    if (!presenterName || !presenterImg) {
      // TODO: Fix this, it looks like this is preventing more than 1 profile pic from showing up
      // const elem = document.getElementById('presenter' + presenterNo);
      // elem.parentNode.removeChild(elem);
    }
  }
}
