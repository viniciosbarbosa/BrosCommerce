import { inject, Injectable, signal } from '@angular/core';
import { Lang } from '../../interfaces/lang/lang';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private translate = inject(TranslateService);
  currentLanguage = signal<string>(environment.defaultLang);

  setLanguage(langCode: string) {
    this.translate.use(langCode);
    this.currentLanguage.set(langCode);
  }
}
