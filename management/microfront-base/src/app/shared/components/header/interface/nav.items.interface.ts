import { RoleEnum } from '../../../../core/guards/enum/role.enum';

export interface NavItem {
  label: string;
  route: string;
  icon: string;
  roles?: RoleEnum[];
}
