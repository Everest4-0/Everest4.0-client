import { ActivatedRoute } from '@angular/router';
import { UserForm } from './../forms/user.form';
import { User } from './../models/user';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider, VKLoginProvider } from "angularx-social-login";

import { SocialUser } from "angularx-social-login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public isCollapsed = false;

  user: SocialUser;
  localUser: User = new User();
  loggedIn: boolean;
  passy: string;
  userForm: FormGroup;
  signOnUser: User = new User();
  signInUser: User = new User();
  signInForm: FormGroup;
  signInErro: any;
  w;
  x;
  constructor(
    private authService: SocialAuthService,
    public fb: FormBuilder,
    public auth: AuthService,
    private route: ActivatedRoute) {
    this.userForm = this.fb.group(new UserForm(this.fb));
    this.signInForm = this.fb.group({ email: [''], passw: [''] });
  }
  ngOnInit(): void {

    this.route.queryParamMap.subscribe(queryParams => {
      this.w = queryParams.get("w");
      this.x = queryParams.get("x");
    })

    this.authService.authState.subscribe((user) => {
      this.localUser.castSocialUser(user);
      this.auth.authenticate(this.localUser).subscribe((u: User) => {
        this.localUser = u;
        window.open('./', '_self')
      })
      this.user = user;
      this.loggedIn = (user != null);
    });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }


  signOut(): void {
    this.authService.signOut();
  }
  signIn() {
    this.auth.authenticate(this.signInUser).subscribe((u: User) => {
      this.localUser = u;
      window.open('./', '_self')
    },
      error => this.signInErro = error)
  }
  signOn() {
    this.auth.create({ email: this.signOnUser.email, password: this.signOnUser.password, provider: 'LOCAL' }).subscribe(user => {
      //alert(JSON.stringify(user))
      this.auth.authenticate(user).subscribe((u: User) => {
        this.localUser = u;
        window.open('./', '_self')
      })
    })
    if (this.userForm.dirty && this.userForm.valid) {
      alert(
        `Name: ${this.userForm.value.name} Email: ${this.userForm.value.email}`
      );
    }
  }
}
