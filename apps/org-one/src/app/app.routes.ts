import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'task',
    loadChildren: () => import('@org/task').then((m) => m.taskRoutes),
  },
  {
    path: 'user-list',
    loadChildren: () => import('@org/user-list').then((m) => m.userListRoutes),
  },
];
