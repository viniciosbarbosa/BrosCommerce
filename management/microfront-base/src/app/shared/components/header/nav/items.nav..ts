import { ExternalRoutes } from '../../../routes/external.routes';
import { InternalRoutes } from '../../../routes/internal.routes';
import { NavItem } from '../interface/nav.items.interface';

export const headerNavItems: NavItem[] = [
  { label: 'HEADER.PRODUCTS', route: ExternalRoutes.PRODUCT_CATEGORY, icon: 'inventory_2' },
  { label: 'HEADER.USERS', route: ExternalRoutes.USERS, icon: 'group' },
  { label: 'HEADER.REPORTS', route: ExternalRoutes.REPORT, icon: 'analytics' },
  { label: 'HEADER.LOGIN', route: InternalRoutes.LOGIN, icon: 'login' },
];

export const profileNavItems: NavItem[] = [
  { label: 'PROFILE.PROFILE', route: InternalRoutes.PROFILE, icon: 'person' },
  { label: 'PROFILE.SETTINGS', route: InternalRoutes.SETTINGS, icon: 'settings' },
  { label: 'PROFILE.LOGOUT', route: InternalRoutes.LOGIN, icon: 'logout' },
];
