import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'user-list',
    loadChildren: () => import('@org/user-list').then((m) => m.userListRoutes),
  },
];
