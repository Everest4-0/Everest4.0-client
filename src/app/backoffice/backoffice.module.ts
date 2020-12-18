import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { ListEvaluationComponent } from './evaluation/list-evaluation/list-evaluation.component';
import { UpdateEvaluationComponent } from './evaluation/update-evaluation/update-evaluation.component';
import { CreateEvaluationComponent } from './evaluation/create-evaluation/create-evaluation.component';


import { MomentModule } from 'ngx-moment';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    CreateUserComponent,
    UpdateUserComponent,
    DeleteUserComponent,
    BackofficeComponent,
    BackofficeNavbarComponent,
    ListUserComponent,
    DetailsUserComponent,
    ListEvaluationComponent,
    UpdateEvaluationComponent,
    CreateEvaluationComponent
  ],
  imports: [
    CommonModule,
    NavbarModule,
    FooterModule,
    SidebarModule,
    BackOfficeRoutes,
    FormsModule,
    ReactiveFormsModule,
    MomentModule,
    NgSelectModule
  ]
})
export class BackofficeModule { }
