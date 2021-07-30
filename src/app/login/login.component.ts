import { Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { NgxPermissionsService } from 'ngx-permissions';
import { ActivatedRoute } from '@angular/router';
import { UserForm } from './../forms/user.form';
import { User } from 'app/models/main//user';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { SocialAuthService, FacebookLoginProvider, GoogleLoginProvider, VKLoginProvider, SocialUser } from "angularx-social-login";
import { MsalService, BroadcastService } from '@azure/msal-angular';
import { Logger, CryptoUtils } from 'msal';
import Validator from 'app/helpers/validator';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public isCollapsed = false;
  isIframe = false;
  user: SocialUser = new SocialUser();
  errors: any = {};
  newUser = this.msAuthService.getAccount();
  localUser: User = new User();
  loggedIn: boolean;
  passy: string;
  userForm: FormGroup;
  signOnUser: User = new User();
  signInUser: User = new User();
  signInForm: FormGroup;
  signOnForm: FormGroup;
  signInErro: any;
  w;
  x;
  constructor(
    private authService: SocialAuthService,
    public fb: FormBuilder,
    public auth: AuthService,
    private route: ActivatedRoute,
    private broadcastService: BroadcastService,
    private msAuthService: MsalService) {
    this.userForm = this.fb.group(new UserForm(this.fb));
    this.signInForm = this.fb.group(
      {
        email: ['', Validators.required],
        password: ['', Validators.required, Validator.passwordValid],

        confirm_password: ['', [Validators.required]]
      },
      { validator: Validator.ConfirmedValidator('password', 'confirm_password') });
  }
  ngOnInit(): void {
    this.signOnUser.apikey = 'signOn';
    this.route.queryParamMap.subscribe(queryParams => {
      this.w = queryParams.get("w");
      this.x = queryParams.get("x");
    })
    this.authService.authState.subscribe(this.login);
    this.broadcastService.subscribe('msal:loginSuccess', () => {
      this.login(this.msAuthService.getAccount())
    });

    this.isIframe = window !== window.parent && !window.opener;



    this.msAuthService.handleRedirectCallback((authError, response) => {
      if (authError) {
        console.error('Redirect Error: ', authError.errorMessage);
        return;
      }

      console.log('Redirect Success: ', response);
    });


    this.msAuthService.setLogger(new Logger((logLevel, message, piiEnabled) => {
      console.log('MSAL Logging: ', message);
    }, {
      correlationId: CryptoUtils.createNewGuid(),
      piiLoggingEnabled: false
    }));
  }
  get f() {
    return this.signInForm.controls;
  }
  login = (user) => {

    this.localUser.castSocialUser(user);
    this.auth.authenticate(this.localUser, (user: User) => {
      this.localUser = user;
      window.open('./', '_self')
    })
  }

  checkoutAccount() {
    this.loggedIn = !!this.msAuthService.getAccount();
  }
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithMicrosoft(): void {
    const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

    if (isIE) {
      this.msAuthService.loginRedirect({
        extraScopesToConsent: ["user.read", "openid", "profile"]
      });
    } else {
      this.msAuthService.loginPopup({
        extraScopesToConsent: ["user.read", "openid", "profile"]
      });
    }
  }
  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }


  signOut(): void {
    this.authService.signOut();
  }
  signIn(userForm: FormGroup) {

    this.userForm = userForm

    if (this.userForm.dirty && this.userForm.valid) {
      this.auth.authenticate(this.signInUser, (u: User) => {
        this.localUser = u;
      })
    }
  };

  signOn(userForm: FormGroup) {
    debugger

    if (userForm.dirty && userForm.valid) {
      this.auth.signOn(this.signOnUser).subscribe((data: any) => {
        if (data.success) {
          this.auth.authenticate(data.user, (u: User) => {
            this.localUser = u;
            window.open('./', '_self')
          })
        } else {
          this.errors = data.errors
        }

      })
    }
  }
}
