import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'tasks',
    loadChildren: () => import('@org/task').then((m) => m.taskRoutes),
  },
  {
    path: 'users',
    loadChildren: () => import('@org/user-list').then((m) => m.userListRoutes),
  },
];
