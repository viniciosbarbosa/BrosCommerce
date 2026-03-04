import { ExternalRoutes } from '../../../routes/external.routes';
import { InternalRoutes } from '../../../routes/internal.routes';
import { NavItem } from '../interface/nav.items.interface';
import { RoleEnum } from '../../../../core/guards/enum/role.enum';

export const headerNavItems: NavItem[] = [
  {
    label: 'HEADER.PRODUCTS',
    route: ExternalRoutes.PRODUCT_CATEGORY,
    icon: 'inventory_2',
    roles: [RoleEnum.ADMIN, RoleEnum.MASTER, RoleEnum.CLIENT],
  },
  {
    label: 'HEADER.USERS',
    route: ExternalRoutes.USERS,
    icon: 'group',
    roles: [RoleEnum.ADMIN, RoleEnum.MASTER],
  },
  {
    label: 'HEADER.REPORTS',
    route: ExternalRoutes.REPORT,
    icon: 'analytics',
    roles: [RoleEnum.ADMIN, RoleEnum.MASTER, RoleEnum.AUDIT],
  },
];

export const profileNavItems: NavItem[] = [
  { label: 'PROFILE.PROFILE', route: InternalRoutes.PROFILE, icon: 'person' },
  { label: 'PROFILE.SETTINGS', route: InternalRoutes.SETTINGS, icon: 'settings' },
  { label: 'PROFILE.LOGOUT', route: InternalRoutes.LOGIN, icon: 'logout' },
];
