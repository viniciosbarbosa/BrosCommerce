import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
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
  currentUserRole = signal<RoleEnum>(RoleEnum.ONLOGGED);
  private roleService = inject(RoleService);

  isAuthenticated(): boolean {
    return (
      this.localStorageService.getItem(LocalStorageKey.TOKEN) !== null &&
      this.localStorageService.getItem(LocalStorageKey.USER) !== null &&
      this.currentUserRole() !== RoleEnum.ONLOGGED
    );
  }

  refreshToken(): Observable<RefreshToken> {
    return this.httpGet(this.API_URL, AUTH_ENDPOINT.REFRESH_TOKEN);
  }
}
