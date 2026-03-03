import { Component, inject, signal, OnInit, input, output } from '@angular/core';
import { FORM_MODULES } from '../../../../shared/modules/form.module';
import { BUTTON_MODULES } from '../../../../shared/modules/button.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormGroup, NonNullableFormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective } from 'ngx-mask';
import { LoginViewState } from '../../models/login-view-state.enum';
import { LoginRequest } from '../../models/request/login.request';
import { Loading } from '../../../../shared/components/loading/loading';

@Component({
  selector: 'app-form-sign-in-up',
  standalone: true,
  imports: [
    BUTTON_MODULES,
    FORM_MODULES,
    TranslateModule,
    CommonModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    Loading,
  ],
  templateUrl: './form-sign-in-up.html',
  styleUrl: './form-sign-in-up.scss',
})
export class FormSignInUp {
  private fb = inject(NonNullableFormBuilder);
  protected readonly LoginViewState = LoginViewState;
  hidePassword = signal<boolean>(true);

  viewState = input<LoginViewState>();

  loading = input<boolean>(false);
  errorMessage = input<string | null>(null);
  loginEmit = output<LoginRequest>();
  twoFactorAuthEmit = output<string>();
  passwordRecoveryEmit = output<string>();
  backToLogin = output<void>();
  viewStateChange = output<LoginViewState>();

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    keepMeLogged: [false],
  });

  recoveryForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  recoveryCodeForm: FormGroup = this.fb.group({
    code: ['', [Validators.required, Validators.minLength(6)]],
  });

  methodForm: FormGroup = this.fb.group({
    method: ['email', [Validators.required]],
  });

  twoFactorAuthForm: FormGroup = this.fb.group({
    code: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit() {
    switch (this.viewState()) {
      case LoginViewState.LOGIN:
        this.handleLogin();
        break;
      case LoginViewState.SELECT_2_FACTOR_METHOD:
        this.handleMethodSelection();
        break;
      case LoginViewState.TWO_FACTOR:
        this.handleTwoFactor();
        break;
      case LoginViewState.FORGOT_PASSWORD:
        this.handleRecovery();
        break;
      case LoginViewState.RECOVERY_PASSWORD:
        this.handleRecoveryCode();
        break;
    }
  }

  private handleLogin() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    let params = {
      email: this.loginForm.getRawValue().email,
      password: this.loginForm.getRawValue().password,
    };
    this.loginEmit.emit(params);
  }

  private handleMethodSelection() {
    if (this.methodForm.invalid) return;

    this.twoFactorAuthEmit.emit(this.methodForm.getRawValue().method);
  }

  private handleRecovery() {
    if (this.recoveryForm.invalid) {
      this.recoveryForm.markAllAsTouched();
      return;
    }
    this.passwordRecoveryEmit.emit(this.recoveryForm.getRawValue().email);
  }

  private handleRecoveryCode() {
    if (this.recoveryCodeForm.invalid) {
      this.recoveryCodeForm.markAllAsTouched();
      return;
    }
    this.passwordRecoveryEmit.emit(this.recoveryCodeForm.getRawValue().code);
  }

  private handleTwoFactor() {
    if (this.twoFactorAuthForm.invalid) {
      this.twoFactorAuthForm.markAllAsTouched();
      return;
    }
    this.twoFactorAuthEmit.emit(this.twoFactorAuthForm.getRawValue().code);
  }

  public onForgotPassword() {
    this.viewStateChange.emit(LoginViewState.FORGOT_PASSWORD);
  }

  public onBackToLogin() {
    this.backToLogin.emit();
  }
}
