import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin, tap } from 'rxjs';
import { environment } from '../../environments/environment';

export const i18nResolver: ResolveFn<any> = () => {
  const http = inject(HttpClient);
  const translate = inject(TranslateService);

  return forkJoin(
    environment.supportedLangs.reduce((acc: any, lang: string) => {
      acc[lang] = http.get(`${environment.i18nUrl}${lang}.json`);
      return acc;
    }, {}),
  ).pipe(
    tap((translations: any) => {
      Object.keys(translations).forEach((lang) => {
        translate.setTranslation(lang, translations[lang], true);
      });
    }),
  );
};
