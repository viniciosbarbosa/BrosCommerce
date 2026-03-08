import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideEnvironmentNgxMask } from 'ngx-mask';

import { routes } from './app.routes';
import { environment } from '../environments/environment';
import { ThemeService } from './shared/services/theme/theme.service';
import { authInterceptor } from './core/interceptors/auth-interceptor';
import { Lang } from './shared/interfaces/lang/lang';
import { LanguageService } from './shared/services/lang/language.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideTranslateService({ fallbackLang: environment.defaultLang }),
    provideTranslateHttpLoader({
      prefix: './assets/i18n/',
      suffix: '.json',
    }),
    provideEnvironmentNgxMask(),
    provideAppInitializer(() => {
      inject(ThemeService).init();
      const translate = inject(TranslateService);
      const langService = inject(LanguageService);

      const availableLanguages = Object.values(Lang).map((lang) => lang.code);
      translate.addLangs(availableLanguages);

      const initialLang = langService.currentLanguage();
      return translate.use(initialLang);
    }),
  ],
};
