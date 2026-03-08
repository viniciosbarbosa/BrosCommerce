import { Injectable, signal } from '@angular/core';
import { RoleEnum } from '../enum/role.enum';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private currentUserRole = signal<RoleEnum>(RoleEnum.ONLOGGED);

  setRole(role: RoleEnum) {
    this.currentUserRole.set(role);
  }

  getRole(): RoleEnum {
    return this.currentUserRole();
  }

  isRole(role: RoleEnum): boolean {
    return this.currentUserRole() === role;
  }
}
