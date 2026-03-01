import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';

import { routes } from './app.routes';
import { environment } from '../environments/environment';

function getBrowserLang(): string {
  const browserLang = navigator.language?.split('-')[0];

  return environment.supportedLangs.includes(browserLang) ? browserLang : environment.defaultLang;
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideTranslateService({ fallbackLang: environment.defaultLang }),
    provideTranslateHttpLoader({
      prefix: './assets/i18n/',
      suffix: '.json',
    }),
    provideAppInitializer(() => {
      const translate = inject(TranslateService);
      const lang = getBrowserLang();
      translate.addLangs(environment.supportedLangs);
      return translate.use(lang);
    }),
  ],
};
