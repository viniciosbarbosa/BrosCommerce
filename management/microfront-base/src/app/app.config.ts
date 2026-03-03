import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideEnvironmentNgxMask } from 'ngx-mask';

import { routes } from './app.routes';
import { environment } from '../environments/environment';
import { ThemeService } from './shared/services/theme/theme.service';

function getBrowserLang(): string {
  const browserLang = navigator.language?.split('-')[0];

  return environment.supportedLangs.includes(browserLang) ? browserLang : environment.defaultLang;
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(),
    provideTranslateService({ fallbackLang: environment.defaultLang }),
    provideTranslateHttpLoader({
      prefix: './assets/i18n/',
      suffix: '.json',
    }),
    provideEnvironmentNgxMask(),
    provideAppInitializer(() => {
      inject(ThemeService).init();
      const translate = inject(TranslateService);
      const lang = getBrowserLang();
      translate.addLangs(environment.supportedLangs);
      return translate.use(lang);
    }),
  ],
};
