import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Theme } from '../../enum/theme/theme.enum';
import { LocalStorageService } from '../../../core/services/local.storage/local.storage';
import { LocalStorageKey } from '../../enum/local-storage/localStorage';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private localStorageService = inject(LocalStorageService);
  currentTheme = signal<Theme>(this.getSavedTheme());

  private getSavedTheme(): Theme {
    return (this.localStorageService.getItem(LocalStorageKey.THEME) as Theme) ?? environment.theme;
  }

  setTheme(theme: Theme): void {
    this.currentTheme.set(theme);
    document.body.classList.remove(...Object.values(Theme));
    document.body.classList.add(theme);
    this.localStorageService.setItem(LocalStorageKey.THEME, theme);
  }

  setThemeFromApi(theme: Theme): void {
    this.setTheme(theme);
  }

  init(): void {
    this.setTheme(this.currentTheme());
  }
}
