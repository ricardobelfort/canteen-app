import { Routes } from '@angular/router';
import { UsersFormComponent } from './users-form/users-form.component';
import { UsersListComponent } from './users-list/users-list.component';

export const usersRoutes: Routes = [
  { path: '', component: UsersListComponent },
  { path: 'novo', component: UsersFormComponent },
];
