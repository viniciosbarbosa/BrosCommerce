import { Component, inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef, MatSnackBarModule } from '@angular/material/snack-bar';
import { SNACK_BAR_MODULE } from '../../modules/snackbar.module';
import { LOADING_MODULE } from '../../modules/loading.module';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { snackBar } from '../../enum/snackBar/snackBar';

@Component({
  selector: 'app-snack-bar',
  standalone: true,
  imports: [CommonModule, SNACK_BAR_MODULE, LOADING_MODULE, TranslateModule, MatSnackBarModule],
  templateUrl: './snack-bar.html',
  styleUrl: './snack-bar.scss',
})
export class SnackBar {
  public snackBarRef = inject(MatSnackBarRef);
  public data = inject(MAT_SNACK_BAR_DATA);

  get message(): string {
    return this.data?.message || '';
  }

  get type(): snackBar {
    return this.data?.type || snackBar.INFO;
  }
}
