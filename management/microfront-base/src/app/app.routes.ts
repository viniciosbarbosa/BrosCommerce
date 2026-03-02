import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { environment } from '../environments/environment.development';
import { InternalRoutes } from './shared/routes/internal.routes';
import { Error } from './shared/components/error/error';
import { ErrorCode } from './shared/enum/errors/error.enum';

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
  {
    path: InternalRoutes.ERROR,
    component: Error,
  },
  { path: '', redirectTo: InternalRoutes.HOME, pathMatch: 'full' },
  {
    path: InternalRoutes.ERROR,
    component: Error,
    data: { code: ErrorCode.NOT_FOUND },
  },
  {
    path: '**',
    component: Error,
    data: { code: ErrorCode.NOT_FOUND },
  },
];
