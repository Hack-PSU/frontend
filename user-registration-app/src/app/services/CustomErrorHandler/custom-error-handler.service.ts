import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Error } from '../../models/interfaces';
import { AlertService } from 'ngx-alerts';
import { Observable } from 'rxjs/Observable';
import 'rxjs-compat/add/observable/throw';

@Injectable()
export class CustomErrorHandlerService {
  constructor(public alerts: AlertService) {
  }

  tryParseError(error: HttpErrorResponse): Error {
    try {
      return { error: error.error, message: error.message };
    } catch (ex) {
      return error;
    }
  }

  parseCustomServerError(error: HttpErrorResponse): any {
    if (error.status >= 500) {
      throw new Error('Server error');
    }
    const body = error.message;
    const title = error.name || 'Internal Server Error.';
    return { title, body };
  }

  createCustomError(error: HttpErrorResponse): HttpErrorResponse {
    console.error(error);
    try {
      const parsedError = this.parseCustomServerError(error);
      const responseOptions = {
        error: { title: parsedError.title, message: parsedError.body },
        status: 400,
        headers: null,
        url: null,
      };
      return new HttpErrorResponse(responseOptions);
    } catch (ex) {
      const responseOptions = {
        error: {
          title: 'Unknown Error!',
          message: 'A Server Error Occurred. If this keeps repeating, send us an email at technology@hackpsu.org.',
        },
        status: 400,
        headers: null,
        url: null,
      };
      return new HttpErrorResponse(responseOptions);
    }
  }

  showToast(error: Error): void {
    this.alerts.danger(error.error.message);
  }

  parseCustomServerErrorToString(error: HttpErrorResponse): Observable<Error> {
    const customError = this.createCustomError(error);
    const parsedError = this.tryParseError(customError);
    this.showToast(parsedError);
    return Observable.throwError(parsedError);
  }
}
