import { Router } from '@angular/router';
import { ErrorCode } from '../enum/errors/error.enum';

export function navigateToError(router: Router, code: ErrorCode) {
  router.navigate(['/error'], {
    state: {
      code,
    },
  });
}
