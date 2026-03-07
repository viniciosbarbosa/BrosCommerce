import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetPasswordService } from './service/reset-password.service';
import { FORM_MODULES } from '../../shared/modules/form.module';
import { BUTTON_MODULES } from '../../shared/modules/button.module';
import { LOADING_MODULE } from '../../shared/modules/loading.module';
import { SnackBarService } from '../../shared/services/snackBar/snack-bar.service';
import { TranslateModule } from '@ngx-translate/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { Loading } from '../../shared/components/loading/loading';
import { InternalRoutes } from '../../shared/routes/internal.routes';
import { passwordsMatchValidator } from '../../shared/validator/passoword.match';
import { passwordStrengthValidator } from '../../shared/validator/password.stregth';

@Component({
  selector: 'app-reset-password',
  imports: [FORM_MODULES, BUTTON_MODULES, LOADING_MODULE, TranslateModule, Loading],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.scss',
})
export class ResetPassword implements OnInit {
  resetPasswordId = signal<string>('');
  showForm = signal<boolean>(false);
  loading = signal<boolean>(false);
  hidePassword = signal<boolean>(true);
  hideConfirmPassword = signal<boolean>(true);

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private snackBar = inject(SnackBarService);
  private resetPasswordService = inject(ResetPasswordService);
  private fb = inject(FormBuilder);

  form: FormGroup = this.fb.group(
    {
      password: ['', [Validators.required, Validators.minLength(6), passwordStrengthValidator()]],
      confirmPassword: ['', [Validators.required]],
    },
    { validators: passwordsMatchValidator() },
  );

  ngOnInit(): void {
    this.getResetPasswordId();
  }

  getResetPasswordId() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.resetPasswordId.set(id);
        this.isIdValid();
      } else {
        this.router.navigate([InternalRoutes.LOGIN]);
      }
    });
  }

  isIdValid() {
    this.loading.set(true);
    this.resetPasswordService.isIdValid(this.resetPasswordId()).subscribe({
      next: () => {
        this.showForm.set(true);
        this.loading.set(false);
      },
      error: (error) => {
        this.snackBar.showError(error.statusText);
        this.loading.set(false);
      },
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    const { password } = this.form.value;

    this.resetPasswordService.resetPassword(this.resetPasswordId(), password).subscribe({
      next: () => {
        this.snackBar.showSuccess('PASSWORD_RESET_SUCCESS');
        this.router.navigate([InternalRoutes.LOGIN]);
      },
      error: (error) => {
        this.snackBar.showError(error);
        this.loading.set(false);
      },
    });
  }
}
