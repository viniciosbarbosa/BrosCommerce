import { Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Theme } from '../../enum/theme/theme.enum';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly STORAGE_KEY = 'theme';

  currentTheme = signal<Theme>(this.getSavedTheme());

  private getSavedTheme(): Theme {
    console.log(localStorage.getItem(this.STORAGE_KEY));
    return (localStorage.getItem(this.STORAGE_KEY) as Theme) ?? environment.theme;
  }

  setTheme(theme: Theme): void {
    this.currentTheme.set(theme);
    document.body.classList.remove(...Object.values(Theme));
    document.body.classList.add(theme);
    localStorage.setItem(this.STORAGE_KEY, theme);
  }

  setThemeFromApi(theme: Theme): void {
    this.setTheme(theme);
  }

  init(): void {
    this.setTheme(this.currentTheme());
  }
}
