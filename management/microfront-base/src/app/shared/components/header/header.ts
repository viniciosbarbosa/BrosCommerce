import { Component, inject, signal } from '@angular/core';
import { ThemeService } from '../../services/theme/theme.service';
import { LanguageService } from '../../services/lang/language.service';
import { Theme } from '../../enum/theme/theme.enum';
import { Lang } from '../../enum/lang/lang.enum';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  protected readonly Theme = Theme;
  protected readonly Lang = Lang;

  themeService = inject(ThemeService);
  languageService = inject(LanguageService);

  isMenuOpen = signal(false);

  setTheme(theme: Theme) {
    this.themeService.setTheme(theme);
  }

  changeLanguage(language: Lang) {
    this.languageService.setLanguage(language);
  }

  toggleMenu() {
    this.isMenuOpen.update((val) => !val);
  }
}
