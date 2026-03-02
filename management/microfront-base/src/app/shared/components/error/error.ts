import { Component, input, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ErrorCode } from '../../enum/errors/error.enum';

@Component({
  selector: 'app-error',
  imports: [TranslateModule, RouterLink],
  templateUrl: './error.html',
  styleUrl: './error.scss',
})
export class Error implements OnInit {
  private route = inject(ActivatedRoute);
  code = signal<ErrorCode>(ErrorCode.NOT_FOUND);
  titleKey = signal<string>('ERROR.404_TITLE');
  messageKey = signal<string>('ERROR.404_MESSAGE');

  ngOnInit(): void {
    const data = this.route.snapshot.data;
    const code = (data['code'] as ErrorCode) ?? ErrorCode.NOT_FOUND;

    this.code.set(code);
    this.titleKey.set(`ERROR.${code}_TITLE`);
    this.messageKey.set(`ERROR.${code}_MESSAGE`);
  }
}
