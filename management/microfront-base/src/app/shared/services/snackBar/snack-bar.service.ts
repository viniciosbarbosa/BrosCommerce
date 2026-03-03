import { inject, Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';
import { SnackBar } from '../../components/snack-bar/snack-bar';
import { environment } from '../../../../environments/environment.development';
import { snackBar } from '../../enum/snackBar/snackBar';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  private snackBar = inject(MatSnackBar);
  private breakpointObserver = inject(BreakpointObserver);

  public showSuccess(message: string): void {
    this.open(message, snackBar.SUCCESS);
  }

  public showError(message: string): void {
    this.open(message, snackBar.ERROR);
  }

  public showWarning(message: string): void {
    this.open(message, snackBar.WARNING);
  }

  public showInfo(message: string): void {
    this.open(message, snackBar.INFO);
  }

  private open(message: string, type: snackBar): void {
    this.snackBar.openFromComponent(SnackBar, {
      data: { message, type },
      duration: environment.snackBarDuration,

      verticalPosition: 'top',
      horizontalPosition: 'right',
    });
  }
}
