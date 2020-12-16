import { DetailsUserComponent } from './user/details-user/details-user.component';
import { ListUserComponent } from './user/list-user/list-user.component';
import { DeleteUserComponent } from './user/delete-user/delete-user.component';
import { UpdateUserComponent } from './user/update-user/update-user.component';
import { CreateUserComponent } from './user/create-user/create-user.component';

import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';


const backOfficeRoutes: Routes = [
    { path: 'users',                 component: ListUserComponent },
    { path: 'users/create',          component: CreateUserComponent },
    { path: 'users/update/:id',      component: UpdateUserComponent },
    { path: 'users/delete/:id',      component: DeleteUserComponent },
    { path: 'users/details/:id',      component: DetailsUserComponent }

];

@NgModule({
    imports:[RouterModule.forChild(backOfficeRoutes)],
    exports:[RouterModule]
})

export class BackOfficeRoutes{}