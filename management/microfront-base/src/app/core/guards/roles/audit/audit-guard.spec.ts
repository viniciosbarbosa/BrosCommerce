import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { auditGuard } from './audit-guard';

describe('auditGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => auditGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
