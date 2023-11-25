import { Route } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';

export const userListRoutes: Route[] = [
  { path: '', component: UserListComponent },
];
