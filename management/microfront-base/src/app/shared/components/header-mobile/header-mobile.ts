import { Component, computed, inject, input, OnInit, Signal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../../services/theme/theme.service';
import { LanguageService } from '../../services/lang/language.service';
import { HeaderService } from '../../services/header/header.service';
import { Theme } from '../../enum/theme/theme.enum';
import { Lang } from '../../interfaces/lang/lang';
import { Flag } from '../../utils/flags';
import { themeIcons, themeList } from '../header/nav/theme.nav';
import { headerNavItems, profileNavItems } from '../header/nav/items.nav.';
import { RoleService } from '../../../core/guards/service/role.service';

@Component({
  selector: 'app-header-mobile',
  standalone: true,
  imports: [CommonModule, TranslateModule, MatIconModule, RouterLink, RouterLinkActive],
  templateUrl: './header-mobile.html',
  styleUrl: './header-mobile.scss',
})
export class HeaderMobile implements OnInit {
  isLogged = input<boolean>(false);
  protected readonly isSettingsOpen = signal(false);

  protected readonly Theme = Theme;
  protected readonly Lang = Lang;
  protected readonly Object = Object;
  protected readonly themeIcons = themeIcons;
  protected readonly themeList = themeList;

  protected readonly themeService = inject(ThemeService);
  protected readonly languageService = inject(LanguageService);
  protected readonly headerService = inject(HeaderService);
  private roleService = inject(RoleService);
  private matIconRegistry = inject(MatIconRegistry);
  private domSanitizer = inject(DomSanitizer);

  protected readonly navItems = computed(() =>
    headerNavItems.filter((item) => !item.roles || item.roles.includes(this.roleService.getRole())),
  );

  protected readonly profileItems = computed(() =>
    profileNavItems.filter(
      (item) => !item.roles || item.roles.includes(this.roleService.getRole()),
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

  public toggleSettings() {
    this.isSettingsOpen.update((v) => !v);
  }
}
