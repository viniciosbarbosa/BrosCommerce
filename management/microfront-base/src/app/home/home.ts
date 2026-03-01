import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  imports: [RouterLink, TranslateModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  private translate = inject(TranslateService);

  ngOnInit(): void {
    this.translate.use('pt');
  }

  changeLanguage(language: string) {
    this.translate.use(language);
  }
}
