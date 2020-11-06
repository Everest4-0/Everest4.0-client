import { DiagnosticComponent } from './frontoffice/diagnostic/diagnostic.component';
import { StorageServices } from './services/storage.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
<<<<<<< HEAD
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
=======
import { NgModule,NO_ERRORS_SCHEMA } from '@angular/core';
>>>>>>> a82f29c37c5b3224ef10b480fa4aeb03ae2c046d
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule} from '@angular/forms' 
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { StorageServiceModule } from 'ngx-webstorage-service';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider,
  AmazonLoginProvider,
  VKLoginProvider
} from 'angularx-social-login';

import { AppRoutingModule } from './app.routing';
import { NavbarModule } from './shared/navbar/navbar.module';
import { FooterModule } from './shared/footer/footer.module';
import { SidebarModule } from './sidebar/sidebar.module';

import { AppComponent } from './app.component';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';
import { MessageComponent } from './components/message/message.component';
import { ModalModule } from './components/modal';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    RouterModule,
    HttpClientModule,
    NavbarModule,
    FooterModule,
    SidebarModule,
    AppRoutingModule,
<<<<<<< HEAD
    ModalModule,
=======


    MDBBootstrapModule.forRoot(),
>>>>>>> a82f29c37c5b3224ef10b480fa4aeb03ae2c046d
    SocialLoginModule,
    StorageServiceModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    DiagnosticComponent,
    MessageComponent
  ],
  providers: [
    StorageServices,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '624796833023-clhjgupm0pu6vgga7k5i5bsfp6qp6egh.apps.googleusercontent.com'
            ),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('561602290896109'),
          },
          {
            id: AmazonLoginProvider.PROVIDER_ID,
            provider: new AmazonLoginProvider(
              'clientId'
            ),
          },
          {
            id: VKLoginProvider.PROVIDER_ID,
            provider: new VKLoginProvider(
              'clientId'
            ),
          },
        ],
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent],

  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
