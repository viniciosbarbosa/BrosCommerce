import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { auditorGuard } from './auditor-guard';

describe('auditorGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => auditorGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
