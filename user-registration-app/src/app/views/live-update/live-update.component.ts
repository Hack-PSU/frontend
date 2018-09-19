import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { LiveUpdatesService } from '../../services/LiveUpdatesService/live-updates.service';
import { OrderedSet } from '../../models/sorted-set';
import { UpdateModel } from '../../models/UpdateModel';
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

  updates: OrderedSet<UpdateModel>;

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
    this.updates = new OrderedSet<UpdateModel>((a,b) => a.uid === b.uid, 'UpdateModel');
    this.liveUpdatesService.getUpdates().subscribe((updates) => {
      this.updates.addAll(updates);
    });
  }

  ngOnInit() {
  }

  updateClicked(updateModel: UpdateModel) {
    LiveUpdateComponent.collapseListener(`toggle_${updateModel.uid}`);
  }

  expand() {
    if (!LiveUpdateComponent.fullyExpanded) {
      setTimeout(() => {
        $('html, body').animate({
          scrollTop: $('.update-container-row').last().offset().top,
        },                      1000);
      },         1000);
      $('.expandable-update').each(function () {
        $(this).show(1000);
      });
    }
    LiveUpdateComponent.fullyCollapsed = false;
    LiveUpdateComponent.fullyExpanded = true;
  }

  collapse() {
    if (!LiveUpdateComponent.fullyCollapsed) {
      $('html, body').animate({
        scrollTop: $('.update-container-row').offset().bottom,
      },                      2000);
      setTimeout(() => {
        $('.expandable-update').each(function () {
          $(this).hide(1000);
        });
      },         1000);
    }
    LiveUpdateComponent.fullyCollapsed = true;
    LiveUpdateComponent.fullyExpanded = false;
  }

  collapseLastN() {
    $('.expandable-update').slice(3).each(function () {
      $(this).hide(1000);
    });
  }

}
