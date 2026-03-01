import { inject, Injectable } from '@angular/core';
import { Lang } from '../../enum/lang/lang.enum';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private translate = inject(TranslateService);

  setLanguage(language: Lang) {
    this.translate.use(language);
  }

  getCurrentLanguage(): Lang {
    return this.translate.currentLang as Lang;
  }
}
