import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { environment } from '../environments/environment.development';
export const routes: Routes = [
  {
    path: 'info',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.remotes.info,
        exposedModule: './routes',
      }).then((m) => m.routes),
  },
  {
    path: 'report',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.remotes.report,
        exposedModule: './routes',
      }).then((m) => m.Component),
  },
  {
    path: 'users',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.remotes.users,
        exposedModule: './routes',
      }).then((m) => m.routes),
  },

  { path: 'home', component: Home },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];
