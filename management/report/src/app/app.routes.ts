import { Routes } from '@angular/router';
import { i18nResolver } from './resolvers/i18n.resolver';

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
