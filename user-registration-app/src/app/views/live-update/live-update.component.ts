import { Component, OnInit } from '@angular/core';
import { LiveUpdatesService } from '../../services/LiveUpdatesService/live-updates.service';
import { UpdateModel } from '../../models/update-model';
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { BaseComponent } from "../base/base.component";

declare var $: any;

@Component({
  selector: 'app-live-update',
  templateUrl: './live-update.component.html',
  providers: [LiveUpdatesService],
  styleUrls: ['./live-update.component.css'],
})
export class LiveUpdateComponent implements OnInit {
  static initialLoad = true;
  static fullyCollapsed = false;
  static fullyExpanded = false;
  public p: number;

  updates: Observable<UpdateModel[]>;

  static collapseListener(target: string) {
    // initialLoad = false;
    if (LiveUpdateComponent.fullyCollapsed) {
      LiveUpdateComponent.fullyCollapsed = false;
    }
    if (LiveUpdateComponent.fullyExpanded) {
      LiveUpdateComponent.fullyExpanded = false;
    }
    const $content = $('#' + target);
    $content.slideToggle(500, () => {
      // execute this after slideToggle is done
      // change text of header based on visibility of content div
    });
  }

  constructor(private liveUpdatesService: LiveUpdatesService) {
    this.p = 1;
    this.updates = this.liveUpdatesService.getUpdates()
      .pipe(
        map(updates => updates.reverse())
      )
  }

  ngOnInit() {
  }

  updateClicked(updateModel: UpdateModel) {
    LiveUpdateComponent.collapseListener(`toggle_${updateModel.uid}`);
  }

  expand() {
    $('html, body').animate({
      scrollTop: $('#update-container').last().offset().top,
    }, 1000);
    $('.expandable-update').each(function () {
      $(this).show(1000);
    });
  }

  collapse() {
    $('html, body').animate({
      scrollTop: $('#update-container').offset().bottom,
    }, 2000);
    setTimeout(() => {
      $('.expandable-update').each(function () {
        $(this).hide(1000);
      });
    }, 1000);
  }

  collapseLastN() {
    $('.expandable-update').slice(3).each(function () {
      $(this).hide(1000);
    });
  }

}
