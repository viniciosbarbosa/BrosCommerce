import { Component, inject, OnInit } from '@angular/core';
import { FormSignInUp } from './components/form-sign-in-up/form-sign-in-up';
import { BUTTON_MODULES } from '../../shared/modules/button.module';
import { AuthService } from '../../core/auth/auth.service';
import { CdkAutofill } from '@angular/cdk/text-field';
import { LoginRequest } from './models/request/login.request';
import { SnackBarService } from '../../shared/services/snackBar/snack-bar.service';

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

  handleLoginSuccess(event: LoginRequest) {
    console.log(event);
    this.authService.login(event.email, event.password).subscribe((response) => {
      console.log(response);
    });
  }

  handleTwoFactorAuthSuccess(event: string) {
    console.log(event);
  }

  handlePasswordRecovery(event: string) {
    console.log(event);
  }

  openSnackBar() {
    this.snackBar.showSuccess('Success');
    // this.snackBar.showError('Error');
    // this.snackBar.showWarning('Warning');
    // this.snackBar.showInfo('Info');
  }
}
