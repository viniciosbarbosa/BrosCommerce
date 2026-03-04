import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ThemeService } from '../../services/theme/theme.service';
import { LanguageService } from '../../services/lang/language.service';
import { Theme } from '../../enum/theme/theme.enum';
import { Lang } from '../../interfaces/lang/lang';
import { Flag } from '../../utils/flags';
import { themeIcons, themeList } from '../header/nav/theme.nav';

@Component({
  selector: 'app-header-offline',
  standalone: true,
  imports: [CommonModule, TranslateModule, MatIconModule],
  templateUrl: './header-offline.html',
  styleUrl: './header-offline.scss',
})
export class HeaderOffline implements OnInit {
  protected readonly Theme = Theme;
  protected readonly Lang = Lang;
  protected readonly Object = Object;
  protected readonly themeIcons = themeIcons;
  protected readonly themeList = themeList;

  protected readonly themeService = inject(ThemeService);
  protected readonly languageService = inject(LanguageService);
  private matIconRegistry = inject(MatIconRegistry);
  private domSanitizer = inject(DomSanitizer);

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
}
