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
        this.snackBar.showError(error.error?.message || 'Login failed');
        this.loading.set(false);
      },
    });
  }

  handleTwoFactorEmit(event: string) {
    if (event === 'email' || event === 'phone') {
      this.viewState.set(LoginViewState.TWO_FACTOR);
    } else {
      // It's the code
      this.loading.set(true);
      // Assuming email is stored or available from loginForm somehow.
      // For now let's just log and set success.
      console.log('2FA Code:', event);
      this.loading.set(false);
      // Logic for 2FA verification would go here
    }
  }

  handlePasswordRecovery(event: string) {
    if (this.viewState() === LoginViewState.FORGOT_PASSWORD) {
      // It's the email
      this.loading.set(true);
      this.authService.recovery({ email: event, phone: '' }).subscribe({
        next: () => {
          this.viewState.set(LoginViewState.RECOVERY_PASSWORD);
          this.loading.set(false);
        },
        error: (error) => {
          this.snackBar.showError(error.error?.message || 'Recovery failed');
          this.loading.set(false);
        },
      });
    } else if (this.viewState() === LoginViewState.RECOVERY_PASSWORD) {
      this.loading.set(true);
      this.authService.recoverySuccess(event).subscribe({
        next: () => {
          this.snackBar.showSuccess('Password recovered successfully');
          this.viewState.set(LoginViewState.LOGIN);
          this.loading.set(false);
        },
        error: (error) => {
          this.snackBar.showError(error.error?.message || 'Invalid code');
          this.loading.set(false);
        },
      });
    }
  }

  handleViewStateChange(state: LoginViewState) {
    this.viewState.set(state);
  }

  handleBackToLogin() {
    this.viewState.set(LoginViewState.LOGIN);
  }
}
