import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpBaseService } from '../../../../../shared-lib/services/http-base.service';
import { environment } from '../../../environments/environment.development';
import { AUTH_ENDPOINT } from './model/auth.endpoint';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends HttpBaseService {
  private API_URL = environment.apiUrl;

  login(email: string, password: string): Observable<any> {
    return this.httpPost(this.API_URL, AUTH_ENDPOINT.LOGIN, { email, password });
  }

  twoFactorAuth(email: string, code: string): Observable<any> {
    return this.httpPost(this.API_URL, AUTH_ENDPOINT.TWO_FACTOR_AUTH, { email, code });
  }

  recovery(params: { email: string; phone: string }): Observable<any> {
    return this.httpPost(this.API_URL, AUTH_ENDPOINT.RECOVERY, params);
  }

  recoverySuccess(code: string): Observable<any> {
    return this.httpPost(this.API_URL, AUTH_ENDPOINT.RECOVERY_SUCCESS, code);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}
