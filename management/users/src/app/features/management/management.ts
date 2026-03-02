import { Component, inject } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-management',
  imports: [TranslateModule],
  templateUrl: './management.html',
  styleUrl: './management.scss',
})
export class Management {
  private translate = inject(TranslateService);

  changeLanguage(lang: string) {
    this.translate.use(lang);
  }
}
