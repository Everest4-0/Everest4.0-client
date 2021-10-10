import { FrontofficeComponent } from './frontoffice/frontoffice/frontoffice.component';
import { NgxPermissionsModule } from 'ngx-permissions';
import { FormValidatorComponent } from './components/form-validator/form-validator.component';
import { ModalComponent } from './components/modal/modal.component';
import { FirstloginComponent } from './frontoffice/firstlogin/firstlogin.component';
import { ModalModule } from './components/modal/modal.module';
import { StorageServices } from './services/storage.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { isDevMode, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ToastModule, TooltipModule } from 'ng-uikit-pro-standard';

import { JwPaginationComponent } from 'jw-angular-pagination';

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
import { SidebarModule } from './shared/sidebar/sidebar.module';

import { AppComponent } from './app.component';


import { LoginComponent } from './login/login.component';
import { MessageComponent } from './components/message/message.component';
import { ImageUploaderComponent } from './components/image-uploader/image-uploader.component';
import { DragAndDropDirective } from './directive/drag-and-drop.directive';
import { StepsComponent } from './components/steps/steps.component';
import { FormStepsComponent } from './components/form-steps/form-steps.component';
import { FormStepsTemplateComponent } from './components/form-steps-template/form-steps-template.component';
import { FormStepsCompleteComponent } from './components/form-steps-complete/form-steps-complete.component';
import { MsalModule, MsalInterceptor } from '@azure/msal-angular';

// for HttpClient import:
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';

// for Router import:
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';

// for Core import:
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { BackofficeModule } from './backoffice/backoffice.module';

import { PasswordStrengthMeterModule } from 'angular-password-strength-meter';


const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;
@NgModule({
  imports: [
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    NavbarModule,
    FooterModule,
    SidebarModule,
    AppRoutingModule,
    SocialLoginModule,
    StorageServiceModule,
    ModalModule,
    FormsModule,
    ReactiveFormsModule,
    TooltipModule,
    // for HttpClient use:
    LoadingBarHttpClientModule,

    // for Router use:
    LoadingBarRouterModule,

    // for Core use:
    LoadingBarModule,

    //for backoffice
    BackofficeModule,

    PasswordStrengthMeterModule,

    ToastModule.forRoot({
      timeOut: 5000
    }),
    MsalModule.forRoot({
      auth: {
        clientId: '8d006f57-71cc-402f-8fe3-95e9d004d404', // This is your client ID
        authority: 'https://login.microsoftonline.com/common/', // This is your tenant ID
        redirectUri: 'https://application.qld.everest40.com/'// This is your redirect URI
      },
      cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: isIE, // Set to true for Internet Explorer 11
      },
    }, {
      popUp: !isIE,
      consentScopes: [
        'user.read',
        'openid',
        'profile',
      ],
      unprotectedResources: [],
      protectedResourceMap: [
        ['https://graph.microsoft.com/v1.0/me', ['user.read']]
      ],
      extraQueryParameters: {}
    })
    , NgxPermissionsModule.forChild()
  ],
  declarations: [
    FirstloginComponent,
    AppComponent,
    FrontofficeComponent,
    LoginComponent,
    MessageComponent,
    ImageUploaderComponent,
    DragAndDropDirective,
    StepsComponent,
    FormStepsComponent,
    FormStepsTemplateComponent,
    FormStepsCompleteComponent,
    FormValidatorComponent,
  ], exports: [
    FirstloginComponent,
    DragAndDropDirective,
    ModalModule,
    ModalComponent,
    FormsModule,
    FormValidatorComponent,
    FormStepsComponent,
    FormStepsTemplateComponent,
    FormStepsCompleteComponent,
    ToastModule,
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
              '909647647828-ksij1o4rn7neefcv0soo16af3e3unkuj.apps.googleusercontent.com'
            ),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('383525742912583'),
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

  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
