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
  routerLink = signal<string>('/');
  routerLinkText = signal<string>('ERROR.BACK_HOME');
  ngOnInit(): void {
    const data = this.route.snapshot.data;
    const queryParams = this.route.snapshot.queryParams;
    const code =
      (queryParams['code'] as ErrorCode) ?? (data['code'] as ErrorCode) ?? ErrorCode.NOT_FOUND;

    this.code.set(code);
    this.titleKey.set(`ERROR.${code}_TITLE`);
    this.messageKey.set(`ERROR.${code}_MESSAGE`);
    console.log(this.code());
    this.routerLink.set(this.verifyRoute());
    this.routerLinkText.set(this.verifyTypeError());
  }

  verifyRoute(): string {
    return this.code() === ErrorCode.NOT_FOUND ? '/' : '/login';
  }

  verifyTypeError(): string {
    return this.code() === ErrorCode.NOT_FOUND ? 'ERROR.BACK_HOME' : 'ERROR.BACK_LOGIN';
  }
}
