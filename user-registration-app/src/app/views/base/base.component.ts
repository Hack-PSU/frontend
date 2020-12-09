import { ActivatedRoute, Router } from '@angular/router';
import { NgProgress } from 'ngx-progressbar';
import { AuthService, CustomErrorHandlerService } from '../../services/services';

export abstract class BaseComponent {
  constructor(public authService: AuthService,
              public progressBar: NgProgress,
              protected errorHandler: CustomErrorHandlerService,
              protected activatedRoute: ActivatedRoute,
              protected router: Router) {
  }

  protected readRouteAndNavigate(callback) {
    this.progressBar.ref().complete();
    this.activatedRoute.queryParams
        .subscribe(callback);
  }
}
