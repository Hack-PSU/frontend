import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Error as GenericError } from 'tslint/lib/error';
import { Error } from '../../models/interfaces';
import { AlertService } from 'ngx-alerts';
import { Observable } from 'rxjs/Observable';
import 'rxjs-compat/add/observable/throw';

@Injectable()
export class CustomErrorHandlerService {

  private static tryParseError(error: HttpErrorResponse): Error {
    try {
      return { error: error.error, message: error.message };
    } catch (ex) {
      return error;
    }
  }

  private static parseGenericError(error: GenericError): Error {
    return {
      error: {
        message: error.message,
      },
      message: error.message,
    }
  }

  constructor(private alerts: AlertService) {
  }

  private parseCustomServerError(error: HttpErrorResponse): any {
    if (error.status >= 500) {
      throw new Error('Server error');
    }
    const { message } = error.error;
    const title = error.name || 'Internal Server Error.';
    return { title, message };
  }

  private createCustomError(error: HttpErrorResponse): HttpErrorResponse {
    console.error(error);
    try {
      const parsedError = this.parseCustomServerError(error);
      const responseOptions = {
        error: { title: parsedError.title, message: parsedError.message },
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

  private showToast(error: Error): void {
    this.alerts.danger(error.error.message);
  }

  public handleHttpError(error: HttpErrorResponse): Observable<Error> {
    const customError = this.createCustomError(error);
    const parsedError = CustomErrorHandlerService.tryParseError(customError);
    this.showToast(parsedError);
    return Observable.throwError(parsedError);
  }

  public handleError(error: GenericError): Observable<Error> {
    const parsedError = CustomErrorHandlerService.parseGenericError(error);
    this.showToast(parsedError);
    return Observable.throwError(parsedError);
  }
}
