import { FrontofficeComponent } from './frontoffice/frontoffice/frontoffice.component';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { BackofficeComponent } from './backoffice/backoffice/backoffice.component';
import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'me/dashboard',
    pathMatch: 'full',
  }, {
    path: 'me',
    component: FrontofficeComponent,
    children: [
      {
        path: '',
        loadChildren: './frontoffice/frontoffice.module#FrontofficeModule'
      }]
  }, {
    path: 'backoffice',
    component: BackofficeComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: ['ADMIN'],
        redirectTo: '/me/403'
      }
    },
    children: [
      {
        path: '',
        loadChildren: './backoffice/backoffice.module#BackofficeModule'
      }]
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
