import { BackOfficeRoutes } from './backoffice.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateUserComponent } from './user/create-user/create-user.component';
import { UsersComponent } from './user/users/users.component';
import { UpdateUserComponent } from './user/update-user/update-user.component';
import { DeleteUserComponent } from './user/delete-user/delete-user.component';



@NgModule({
  declarations: [
    CreateUserComponent,
    UsersComponent,
    UpdateUserComponent,
    DeleteUserComponent
  ],
  imports: [
    CommonModule,
    BackOfficeRoutes
  ]
})
export class BackofficeModule { }
