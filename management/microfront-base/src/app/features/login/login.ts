import { Component, inject, OnInit, signal } from '@angular/core';
import { FormSignInUp } from './components/form-sign-in-up/form-sign-in-up';
import { BUTTON_MODULES } from '../../shared/modules/button.module';
import { AuthService } from '../../core/auth/auth.service';
import { CdkAutofill } from '@angular/cdk/text-field';
import { LoginRequest } from './models/request/login.request';
import { SnackBarService } from '../../shared/services/snackBar/snack-bar.service';
import { LoginViewState } from './models/login-view-state.enum';

@Component({
  selector: 'app-login',
  imports: [FormSignInUp, BUTTON_MODULES],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {
  private authService = inject(AuthService);
  private snackBar = inject(SnackBarService);
  ngOnInit(): void {}

  loading = signal<boolean>(false);
  viewState = signal<LoginViewState>(LoginViewState.LOGIN);
  errorMessage = signal<string>('');

  handleLogin(event: LoginRequest) {
    this.loading.set(true);
    this.authService.login(event.email, event.password).subscribe({
      next: (response) => {
        console.log(response);
        this.viewState.set(LoginViewState.SELECT_2_FACTOR_METHOD);
        this.loading.set(false);
      },
      error: (error) => {
        this.snackBar.showError(error.error.message);
        this.loading.set(false);
      },
    });
  }

  handleTwoFactorAuthSuccess(event: string) {
    console.log(event);
  }

  handlePasswordRecovery(event: string) {
    console.log(event);
  }
}
