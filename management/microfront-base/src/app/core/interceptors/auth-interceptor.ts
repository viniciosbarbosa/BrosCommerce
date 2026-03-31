import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { BehaviorSubject, catchError, filter, switchMap, take, throwError } from 'rxjs';

import { LocalStorageService } from '../services/local.storage/local.storage';
import { LocalStorageKey } from '../../shared/enum/local-storage/localStorage';
import { AuthService } from '../auth/auth.service';
import { LoginService } from '../../features/login/service/login.service';

let isRefreshing = false;
const refreshTokenSubject = new BehaviorSubject<string | null>(null);

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const localStorageService = inject(LocalStorageService);
  const authService = inject(AuthService);
  const loginService = inject(LoginService);

  const token = localStorageService.getItem(LocalStorageKey.TOKEN);

  const authReq = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      })
    : req;

  return next(authReq).pipe(
    catchError((error) => {
      if (error.status !== 401 || req.url.includes('refresh-token')) {
        return throwError(() => error);
      }

      const refreshToken = localStorageService.getItem(LocalStorageKey.REFRESH_TOKEN);

      if (!refreshToken) {
        loginService.loginOut();
        return throwError(() => error);
      }

      if (isRefreshing) {
        return refreshTokenSubject.pipe(
          filter((token) => token !== null),
          take(1),
          switchMap((token) => {
            const retryReq = req.clone({
              setHeaders: { Authorization: `Bearer ${token}` },
            });

            return next(retryReq);
          }),
        );
      }

      isRefreshing = true;
      refreshTokenSubject.next(null);

      return authService.refreshToken(refreshToken).pipe(
        switchMap((response) => {
          const refreshToken = response.token;

          localStorageService.setItem(LocalStorageKey.TOKEN, refreshToken);

          isRefreshing = false;

          refreshTokenSubject.next(refreshToken);

          const retryReq = req.clone({
            setHeaders: { Authorization: `Bearer ${refreshToken}` },
          });

          return next(retryReq);
        }),

        catchError((refreshError) => {
          isRefreshing = false;
          loginService.loginOut();
          return throwError(() => refreshError);
        }),
      );
    }),
  );
};
