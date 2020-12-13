import { SidebarModule } from './../sidebar/sidebar.module';
import { FooterModule } from './../shared/footer/footer.module';
import { NavbarModule } from './../shared/navbar/navbar.module';
import { BackOfficeRoutes } from './backoffice.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateUserComponent } from './user/create-user/create-user.component';
import { UsersComponent } from './user/users/users.component';
import { UpdateUserComponent } from './user/update-user/update-user.component';
import { DeleteUserComponent } from './user/delete-user/delete-user.component';
import { BackofficeComponent } from './backoffice/backoffice.component';



@NgModule({
  declarations: [
    CreateUserComponent,
    UsersComponent,
    UpdateUserComponent,
    DeleteUserComponent,
    BackofficeComponent
  ],
  imports: [
    CommonModule,
    NavbarModule,
    FooterModule,
    SidebarModule,
    BackOfficeRoutes
  ]
})
export class BackofficeModule { }
