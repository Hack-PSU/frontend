import { ActivatedRoute, Router } from '@angular/router';
import { NgProgress } from '@ngx-progressbar/core';
import { AuthService, CustomErrorHandlerService } from '../../services/services';

export abstract class BaseComponent {
  protected constructor(public authService: AuthService,
                        protected router: Router,
                        protected errorHandler: CustomErrorHandlerService,
                        protected activatedRoute: ActivatedRoute,
                        protected progressBar: NgProgress) {
  }

  protected readRouteAndNavigate(callback) {
    this.progressBar.complete();
    this.activatedRoute.queryParams
        .subscribe(callback);
  }
}
