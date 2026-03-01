import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Theme } from '../../shared/enum/theme/theme.enum';
import { ThemeService } from '../../shared/services/theme/theme.service';
import { LanguageService } from '../../shared/services/lang/language.service';
import { Lang } from '../../shared/enum/lang/lang.enum';
@Component({
  selector: 'app-home',
  imports: [RouterLink, TranslateModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  protected readonly Theme = Theme;
  protected readonly Lang = Lang;
  themeService = inject(ThemeService);
  languageService = inject(LanguageService);
  ngOnInit(): void {
    console.log(this.themeService.currentTheme());
  }
  setTheme(theme: Theme) {
    this.themeService.setTheme(theme);
  }
  changeLanguage(language: Lang) {
    this.languageService.setLanguage(language);
  }
}
