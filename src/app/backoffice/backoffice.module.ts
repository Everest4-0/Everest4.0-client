import { SidebarModule } from './../sidebar/sidebar.module';
import { FooterModule } from './../shared/footer/footer.module';
import { NavbarModule } from './../shared/navbar/navbar.module';
import { BackOfficeRoutes } from './backoffice.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateUserComponent } from './user/create-user/create-user.component';
import { UpdateUserComponent } from './user/update-user/update-user.component';
import { DeleteUserComponent } from './user/delete-user/delete-user.component';
import { BackofficeComponent } from './backoffice/backoffice.component';
import { BackofficeNavbarComponent } from './components/backoffice-navbar/backoffice-navbar.component';
import { ListUserComponent } from './user/list-user/list-user.component';
import { DetailsUserComponent } from './user/details-user/details-user.component';



@NgModule({
  declarations: [
    CreateUserComponent,
    UpdateUserComponent,
    DeleteUserComponent,
    BackofficeComponent,
    BackofficeNavbarComponent,
    ListUserComponent,
    DetailsUserComponent
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
