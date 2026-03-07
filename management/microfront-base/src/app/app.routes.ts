import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { environment } from '../environments/environment.development';
import { InternalRoutes } from './shared/routes/internal.routes';
import { Error } from './shared/components/error/error';
import { ErrorCode } from './shared/enum/errors/error.enum';
import { ExternalRoutes } from './shared/routes/external.routes';

export const routes: Routes = [
  {
    path: ExternalRoutes.PRODUCT_CATEGORY,
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.remotes.productCategory,
        exposedModule: './routes',
      }).then((m) => m.routes),
  },
  {
    path: ExternalRoutes.REPORT,
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.remotes.report,
        exposedModule: './routes',
      }).then((m) => m.routes),
  },
  {
    path: ExternalRoutes.USERS,
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.remotes.users,
        exposedModule: './routes',
      }).then((m) => m.routes),
  },
  {
    path: InternalRoutes.PROFILE,
    loadComponent: () => import('./features/profile/profile').then((m) => m.Profile),
  },
  {
    path: InternalRoutes.SETTINGS,
    loadComponent: () => import('./features/settings/settings').then((m) => m.Settings),
  },
  {
    path: InternalRoutes.LOGIN,
    loadComponent: () => import('./features/login/login').then((m) => m.Login),
  },
  {
    path: InternalRoutes.RESET_PASSWORD,
    loadChildren: () =>
      import('./features/reset-password/routes/reset-passoword.routes').then(
        (m) => m.resetPasswordRoutes,
      ),
  },
  {
    path: InternalRoutes.HOME,
    loadComponent: () => import('./features/home/home').then((m) => m.Home),
  },
  {
    path: InternalRoutes.ERROR,
    loadComponent: () => import('./shared/components/error/error').then((m) => m.Error),
  },
  { path: '', redirectTo: InternalRoutes.LOGIN, pathMatch: 'full' },
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
