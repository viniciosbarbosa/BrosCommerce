import { inject, Injectable } from '@angular/core';
import { HttpBaseService } from '../../../../../../shared-lib/services/http-base.service';
import { environment } from '../../../../environments/environment';
import { LOGIN_ENDPOINT } from '../../login/model/login.endpoint';
import { Observable } from 'rxjs';
import { LocalStorageKey } from '../../../shared/enum/local-storage/localStorage';
import { LocalStorageService } from '../../../core/services/local.storage/local.storage';
import { RoleService } from '../../../core/guards/service/role.service';
import { RoleEnum } from '../../../core/guards/enum/role.enum';

@Injectable({
  providedIn: 'root',
})
export class LoginService extends HttpBaseService {
  private API_URL = environment.apiUrl;
  private localStorageService = inject(LocalStorageService);
  private roleService = inject(RoleService);

  loginIn(email: string, password: string): Observable<any> {
    return this.httpPost(this.API_URL, LOGIN_ENDPOINT.LOGIN, { email, password });
  }

  loginOut() {
    this.localStorageService.removeItem(LocalStorageKey.TOKEN);
    this.localStorageService.removeItem(LocalStorageKey.USER);
    this.roleService.setRole(RoleEnum.ONLOGGED);
  }

  twoFactorAuth(option: string, code: string): Observable<any> {
    return this.httpPost(this.API_URL, LOGIN_ENDPOINT.TWO_FACTOR_AUTH, { option, code });
  }

  recovery(params: { email: string; phone: string }): Observable<any> {
    return this.httpPost(this.API_URL, LOGIN_ENDPOINT.RECOVERY, params);
  }

  recoverySuccess(code: string): Observable<any> {
    return this.httpPost(this.API_URL, LOGIN_ENDPOINT.RECOVERY_SUCCESS, code);
  }
}
