import { TestBed } from '@angular/core/testing';

import { RoleService } from './role.service';
import { RoleEnum } from '../enum/role.enum';

describe('RoleService', () => {
  let service: RoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set role', () => {
    service.setRole(RoleEnum.ADMIN);
    expect(service.currentUserRole()).toBe(RoleEnum.ADMIN);
  });

  it('should get role', () => {
    service.setRole(RoleEnum.ADMIN);
    expect(service.getRole()).toBe(RoleEnum.ADMIN);
  });

  it('should check role', () => {
    service.setRole(RoleEnum.ADMIN);
    expect(service.isRole(RoleEnum.ADMIN)).toBe(true);
  });
});
