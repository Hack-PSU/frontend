import { Component, OnInit } from '@angular/core';
import { LiveUpdatesService } from '../live-updates.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';

declare var $: any;

class UpdateModel {
  public idLIVE_UPDATES: string;
  public update_text: string;
  public update_image: string;
  public update_title: string;
}

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

  updates: UpdateModel[];
  idtoken: Observable<string>;
  progress: { uploaded, total };
  error: any;
  loading = false;

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

  constructor(public liveUpdates: LiveUpdatesService, public afAuth: AngularFireAuth) {
    this.updates = [];
    this.liveUpdates.subject(new Event('connected'))
      .subscribe(() => {
        this.updates = [];
        this.error = null;
        this.progress = null;
      });
    this.liveUpdates.subject(new Event('disconnected'))
      .subscribe(() => {
        this.updates = [];
        this.loading = true;
      });
    this.afAuth.auth.onAuthStateChanged((user) => {
      this.idtoken = Observable.fromPromise(user.getIdToken(true));
      this.idtoken.subscribe((value) => {
        this.liveUpdates.getUpdates(value).subscribe((message: UpdateModel[]) => {
          message.forEach(m => this.updates.unshift(m));

        });
      },                     (error) => {
        this.error = error;
      });
    });
  }

  ngOnInit() {
  }

  updateClicked(updateModel: UpdateModel) {
    LiveUpdateComponent.collapseListener(`toggle_${updateModel.idLIVE_UPDATES}`);
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

}
