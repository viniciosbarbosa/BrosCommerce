import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'management',
    loadChildren: () => import('./features/management/management').then((m) => m.Management),
  },
  {
    path: '**',
    redirectTo: 'management',
  },
];
