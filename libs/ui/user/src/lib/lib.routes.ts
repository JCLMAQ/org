import { Route } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { provideStore, provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import * as fromUsers from './+state/users.reducer';
import { UsersEffects } from './+state/users.effects';
import { UsersFacade } from './+state/users.facade';

export const userListRoutes: Route[] = [
  {
    path: '',
    component: UserListComponent,
    providers: [
      UsersFacade,
      provideState(fromUsers.USERS_FEATURE_KEY, fromUsers.usersReducer),
      provideEffects(UsersEffects),
    ],
  },
];
