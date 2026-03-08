import { Component, inject, OnInit, signal } from '@angular/core';
import { FormSignInUp } from './components/form-sign-in-up/form-sign-in-up';
import { BUTTON_MODULES } from '../../shared/modules/button.module';
import { LoginRequest } from './model/request/login.request';
import { SnackBarService } from '../../shared/services/snackBar/snack-bar.service';
import { LoginViewState } from './model/login-view-state.enum';
import { LocalStorageKey } from '../../shared/enum/local-storage/localStorage';
import { Router } from '@angular/router';
import { InternalRoutes } from '../../shared/routes/internal.routes';
import { RoleService } from '../../core/guards/service/role.service';
import { LoginService } from './service/login.service';
import { RoleEnum } from '../../core/guards/enum/role.enum';
import { snackBarMessage } from './enum/snackBar.enum';
import { TwoFactorAuthRequest } from './model/request/two.factor.request';

@Component({
  selector: 'app-login',
  imports: [FormSignInUp, BUTTON_MODULES],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private snackBar = inject(SnackBarService);
  private router = inject(Router);
  private roleService = inject(RoleService);
  private loginService = inject(LoginService);

  loading = signal<boolean>(false);
  viewState = signal<LoginViewState>(LoginViewState.LOGIN);
  errorMessage = signal<string>('');

  handleLoginIn(event: LoginRequest): void {
    this.loading.set(true);
    let params = {
      email: event.email,
      password: event.password,
    };
    this.loginService.loginIn(params).subscribe({
      next: (response) => {
        this.handleViewStateChange(LoginViewState.SELECT_2_FACTOR_METHOD);
        console.log(response);
      },
      error: (error) => {
        this.snackBar.showError(error.error?.message || snackBarMessage.LOGIN_ERROR);
        this.loading.set(false);
      },
    });
  }

  handleTwoFactorEmit(event: TwoFactorAuthRequest | string): void {
    if (event === 'email' || event == 'phone') {
      this.viewState.set(LoginViewState.TWO_FACTOR);
      this.loginService.twoFactorAuth(event).subscribe({
        next: (response) => {
          console.log(response);
          this.viewState.set(LoginViewState.TWO_FACTOR);
          this.loading.set(false);
          // this.postLogin();
        },
        error: (error) => {
          this.snackBar.showError(error.error?.message || '2FA failed');
          this.loading.set(false);
        },
      });
    } else {
      this.loading.set(false);
    }
  }

  handlePasswordRecovery(event: string): void {
    if (this.viewState() === LoginViewState.FORGOT_PASSWORD) {
      this.loading.set(true);

      let params = {
        code: event,
      };

      this.loginService.recovery(params).subscribe({
        next: () => {
          this.loading.set(false);
        },
        error: (error) => {
          this.snackBar.showError(error.error?.message || 'Recovery failed');
          this.loading.set(false);
        },
      });
    }
  }

  handleViewStateChange(state: LoginViewState): void {
    this.viewState.set(state);
  }

  handleBackToLogin(): void {
    this.viewState.set(LoginViewState.LOGIN);
  }

  setDataLocalStorage(params: LocalStorageKey): void {
    // this.localStorageService.setItem(key, value);
  }

  postLogin(response: any): void {
    this.router.navigate([InternalRoutes.HOME]);
    this.loading.set(false);
    this.setRole(response.user.role);
    this.setDataLocalStorage(response);
    this.router.navigate([InternalRoutes.HOME]);
  }

  setRole(userRole: RoleEnum): void {
    this.roleService.setRole(userRole);
  }
}
