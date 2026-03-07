import { HttpBaseService } from './../../../../../../shared-lib/services/http-base.service';
import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { LOGIN_ENDPOINT } from '../../login/model/login.endpoint';
@Injectable({
  providedIn: 'root',
})
export class ResetPasswordService extends HttpBaseService {
  private API_URL = environment.apiUrl;

  isIdValid(params: any): Observable<any> {
    return this.httpPost(this.API_URL, LOGIN_ENDPOINT.RECOVERY, params);
  }

  sendNewPassword(params: any): Observable<any> {
    return this.httpPost(this.API_URL, LOGIN_ENDPOINT.RESET_PASSWORD, params);
  }

  resetPassword(id: string, password: string): Observable<any> {
    return this.httpPost(this.API_URL, LOGIN_ENDPOINT.RESET_PASSWORD, { id, password });
  }
}
