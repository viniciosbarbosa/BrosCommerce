import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpBaseService } from '../../../../../shared-lib/services/http-base.service';
import { environment } from '../../../environments/environment.development';
import { RoleEnum } from '../guards/enum/role.enum';
import { LocalStorageService } from '../services/local.storage/local.storage';
import { LocalStorageKey } from '../../shared/enum/local-storage/localStorage';
import { RoleService } from '../guards/service/role.service';
import { Observable } from 'rxjs';
import { AUTH_ENDPOINT } from './model/auth.endpoint';
import { RefreshToken } from './model/response/refresh.token';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends HttpBaseService {
  private API_URL = environment.apiUrl;
  private localStorageService = inject(LocalStorageService);
  private roleService = inject(RoleService);
  private token = signal(this.localStorageService.getItem(LocalStorageKey.TOKEN));
  private user = signal(this.localStorageService.getItem(LocalStorageKey.USER));

  isAuthenticated = computed(
    () =>
      this.token() !== null &&
      this.user() !== null &&
      this.roleService.getRole() !== RoleEnum.ONLOGGED,
  );

  refreshToken(refreshToken: string): Observable<RefreshToken> {
    return this.httpPost(this.API_URL, AUTH_ENDPOINT.REFRESH_TOKEN, { refreshToken });
  }

  getTokenOrRefreshToken(
    param: LocalStorageKey.TOKEN | LocalStorageKey.REFRESH_TOKEN,
  ): string | null {
    return this.localStorageService.getItem(param);
  }

  setTokenOrRefreshToken(
    param: LocalStorageKey.TOKEN | LocalStorageKey.REFRESH_TOKEN,
    token: string,
  ): void {
    this.localStorageService.setItem(param, token);
  }

  removeTokenOrRefreshToken(param: LocalStorageKey.TOKEN | LocalStorageKey.REFRESH_TOKEN): void {
    this.localStorageService.removeItem(param);
  }
}
