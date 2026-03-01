import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { loadRemoteModule } from '@angular-architects/module-federation';
export const routes: Routes = [
  {
    path: 'info',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4201/remoteEntry.js',
        exposedModule: './Component',
      }).then((m) => m.Component),
  },
  {
    path: 'report',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4202/remoteEntry.js',
        exposedModule: './Component',
      }).then((m) => m.Component),
  },
  {
    path: 'users',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4203/remoteEntry.js',
        exposedModule: './Component',
      }).then((m) => m.Component),
  },

  { path: 'home', component: Home },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];
