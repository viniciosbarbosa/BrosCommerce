import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  imports: [RouterLink, TranslateModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private translate = inject(TranslateService);

  changeLanguage(language: string) {
    this.translate.use(language);
  }
}
