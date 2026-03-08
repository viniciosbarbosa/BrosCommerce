import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, switchMap, throwError } from 'rxjs';

import { LocalStorageService } from '../services/local.storage/local.storage';
import { LocalStorageKey } from '../../shared/enum/local-storage/localStorage';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const localStorageService = inject(LocalStorageService);
  const http = inject(HttpClient);

  const jwtToken = localStorageService.getItem(LocalStorageKey.JWT_TOKEN);

  const authReq = jwtToken
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
    : req;

  return next(authReq).pipe(
    catchError((error) => {
      if (error.status === 401) {
        const refreshToken = localStorageService.getItem(LocalStorageKey.REFRESH_TOKEN);

        if (!refreshToken) {
          return throwError(() => error);
        }

        return http.post<any>('/auth/refresh', { refreshToken }).pipe(
          switchMap((response) => {
            const newToken = response.token;

            localStorageService.setItem(LocalStorageKey.JWT_TOKEN, newToken);

            const retryReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${newToken}`,
              },
            });

            return next(retryReq);
          }),
        );
      }

      return throwError(() => error);
    }),
  );
};
