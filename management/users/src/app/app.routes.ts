import { Routes } from '@angular/router';
import { i18nResolver } from './shared/resolvers/i18n.resolver';

export const routes: Routes = [
  {
    path: 'management',
    resolve: [i18nResolver],
    loadComponent: () => import('./features/management/management').then((m) => m.Management),
  },
  {
    path: '**',
    redirectTo: 'management',
  },
];
