import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { environment } from '../environments/environment.development';
import { InternalRoutes } from './shared/routes/internal.routes';
export const routes: Routes = [
  {
    path: 'product-category',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.remotes.productCategory,
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
      }).then((m) => m.routes),
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

  { path: InternalRoutes.HOME, component: Home },
  { path: '', redirectTo: InternalRoutes.HOME, pathMatch: 'full' },
];
