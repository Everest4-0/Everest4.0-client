import { DeleteUserComponent } from './user/delete-user/delete-user.component';
import { UpdateUserComponent } from './user/update-user/update-user.component';
import { UsersComponent } from './user/users/users.component';
import { CreateUserComponent } from './user/create-user/create-user.component';

import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';


const backOfficeRoutes: Routes = [
    { path: 'backoffice/users',                  component: UsersComponent },
    { path: 'backoffice/users/create',           component: CreateUserComponent },
    { path: 'backoffice/users/update/:_id',      component: UpdateUserComponent },
    { path: 'backoffice/users/delete/:_id',      component: DeleteUserComponent }

];

@NgModule({
    imports:[RouterModule.forChild(backOfficeRoutes)],
    exports:[RouterModule]
})

export class BackOfficeRoutes{}