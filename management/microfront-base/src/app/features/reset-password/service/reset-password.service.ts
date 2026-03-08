import { HttpBaseService } from './../../../../../../shared-lib/services/http-base.service';
import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { LOGIN_ENDPOINT } from '../../login/model/login.endpoint';
import { IS_VALID_ID } from '../model/request/isValidId.request';

import { RESET_PASSWORD } from '../model/request/resetPassword.request';
import { VALID_ID } from '../model/response/valid.id.response';

@Injectable({
  providedIn: 'root',
})
export class ResetPasswordService extends HttpBaseService {
  private API_URL = environment.apiUrl;

  isIdValid(params: IS_VALID_ID): Observable<VALID_ID> {
    return this.httpPost(this.API_URL, LOGIN_ENDPOINT.RECOVERY, params);
  }

  sendNewPassword(params: RESET_PASSWORD): Observable<any> {
    return this.httpPost(this.API_URL, LOGIN_ENDPOINT.RESET_PASSWORD, params);
  }
}
