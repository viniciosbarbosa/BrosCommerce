import { InternalRoutes } from './../../routes/internal.routes';
import { Component, inject, signal } from '@angular/core';
import { ThemeService } from '../../services/theme/theme.service';
import { LanguageService } from '../../services/lang/language.service';
import { Theme } from '../../enum/theme/theme.enum';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Lang } from '../../interfaces/lang/lang';
import { ErrorCode } from '../../enum/errors/error.enum';
import { Flag } from '../../utils/flags';

@Component({
  selector: 'app-header',
  imports: [CommonModule, TranslateModule, RouterLink, MatIconModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  protected readonly Theme = Theme;
  protected readonly Lang = Lang;
  protected readonly Object = Object;
  private router = inject(Router);
  private matIconRegistry = inject(MatIconRegistry);
  private domSanitizer = inject(DomSanitizer);

  protected readonly InternalRoutes = InternalRoutes;

  protected readonly ThemeIcons: Record<Theme, string> = {
    [Theme.LIGHT]: 'light_mode',
    [Theme.DARK]: 'dark_mode',
    [Theme.NEUTRAL]: 'contrast',
  };

  themeService = inject(ThemeService);
  languageService = inject(LanguageService);

  isMenuOpen = signal(false);

  constructor() {
    this.registerIcons();
  }

  private registerIcons() {
    Flag.forEach((flag) => {
      this.matIconRegistry.addSvgIcon(
        flag.name,
        this.domSanitizer.bypassSecurityTrustResourceUrl(flag.url),
      );
    });
  }

  setTheme(theme: Theme) {
    this.themeService.setTheme(theme);
  }

  changeLanguage(langCode: string) {
    this.languageService.setLanguage(langCode);
  }

  toggleMenu() {
    this.isMenuOpen.update((val) => !val);
  }

  navigateToError(code: ErrorCode) {
    this.router.navigate(['/error'], {
      state: {
        code,
      },
    });
  }
}
