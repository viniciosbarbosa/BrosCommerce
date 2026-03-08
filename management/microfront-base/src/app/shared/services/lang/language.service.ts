import { inject, Injectable, signal } from '@angular/core';
import { Lang } from '../../interfaces/lang/lang';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../../../environments/environment';
import { LocalStorageService } from '../../../core/services/local.storage/local.storage';
import { LocalStorageKey } from '../../enum/local-storage/localStorage';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private localStorageService = inject(LocalStorageService);
  private translate = inject(TranslateService);
  currentLanguage = signal<string>(this.getLangSaved());

  private getLangSaved(): string {
    return (
      (this.localStorageService.getItem(LocalStorageKey.LANGUAGE) as string) ??
      environment.defaultLang
    );
  }

  setLanguage(langCode: string) {
    this.translate.use(langCode);
    this.currentLanguage.set(langCode);
    this.localStorageService.setItem(LocalStorageKey.LANGUAGE, langCode);
  }
}
