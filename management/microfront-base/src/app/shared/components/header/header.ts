import { InternalRoutes } from '../../routes/internal.routes';
import { Component, inject, OnInit, signal } from '@angular/core';
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

import { headerNavItems, profileNavItems } from './nav/items.nav.';
import { themeIcons } from './nav/theme.nav';

import { computed } from '@angular/core';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule, TranslateModule, RouterLink, MatIconModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit {
  private router = inject(Router);
  private matIconRegistry = inject(MatIconRegistry);
  private domSanitizer = inject(DomSanitizer);
  private authService = inject(AuthService);
  protected readonly Theme = Theme;
  protected readonly Lang = Lang;
  protected readonly Object = Object;
  protected readonly themeIcons = themeIcons;
  protected readonly InternalRoutes = InternalRoutes;
  protected readonly themeService = inject(ThemeService);
  protected readonly languageService = inject(LanguageService);
  protected readonly isMenuOpen = signal(false);
  protected readonly navItems = computed(() =>
    headerNavItems.filter(
      (item) => !item.roles || item.roles.includes(this.authService.currentUserRole()),
    ),
  );
  protected readonly profileItems = computed(() =>
    profileNavItems.filter(
      (item) => !item.roles || item.roles.includes(this.authService.currentUserRole()),
    ),
  );

  ngOnInit(): void {
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

  public setTheme(theme: Theme) {
    this.themeService.setTheme(theme);
  }

  public changeLanguage(langCode: string) {
    this.languageService.setLanguage(langCode);
  }

  public toggleMenu() {
    this.isMenuOpen.update((val) => !val);
  }

  public navigateToError(code: ErrorCode) {
    this.router.navigate(['/error'], {
      state: {
        code,
      },
    });
  }
}
