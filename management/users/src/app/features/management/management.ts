import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-management',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './management.html',
  styleUrl: './management.scss',
})
export class Management {
  // private http = inject(HttpClient);
  // private translate = inject(TranslateService);
  // ngOnInit(): void {
  //   const langs = ['pt', 'en', 'es'];
  //   langs.forEach((lang) => {
  //     this.http.get(`http://localhost:4203/assets/i18n/${lang}.json`).subscribe((translations) => {
  //       this.translate.setTranslation(lang, translations as any, true);
  //     });
  //   });
  // }
}
