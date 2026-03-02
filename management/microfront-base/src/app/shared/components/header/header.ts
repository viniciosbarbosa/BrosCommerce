import { Component, inject, signal } from '@angular/core';
import { ThemeService } from '../../services/theme/theme.service';
import { LanguageService } from '../../services/lang/language.service';
import { Theme } from '../../enum/theme/theme.enum';
import { Lang } from '../../interfaces/lang/lang';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  imports: [CommonModule, TranslateModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  protected readonly Theme = Theme;
  protected readonly Lang = Lang;
  protected readonly Object = Object;

  themeService = inject(ThemeService);
  languageService = inject(LanguageService);

  isMenuOpen = signal(false);

  setTheme(theme: Theme) {
    this.themeService.setTheme(theme);
  }

  changeLanguage(langCode: string) {
    this.languageService.setLanguage(langCode);
  }

  toggleMenu() {
    this.isMenuOpen.update((val) => !val);
  }
}
