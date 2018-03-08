import { Component, OnInit } from '@angular/core';
import { LiveUpdatesService } from '../live-updates.service';

@Component({
  selector: 'app-live-update',
  templateUrl: './live-update.component.html',
  providers: [LiveUpdatesService],
  styleUrls: ['./live-update.component.css']
})
export class LiveUpdateComponent implements OnInit {

  updates: string[];

  constructor(public liveUpdates: LiveUpdatesService) {
    this.updates = [];
    this.liveUpdates.getUpdates().subscribe((message: string) => {
      this.updates.push(message);
    });
  }

  ngOnInit() {
  }

}
