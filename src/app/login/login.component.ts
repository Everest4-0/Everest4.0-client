import { User } from './../models/user';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider, VKLoginProvider } from "angularx-social-login";

import { SocialUser } from "angularx-social-login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: SocialUser;
  localUser: User = new User();
  loggedIn: boolean;
  constructor(private authService: SocialAuthService, private auth: AuthService) { }

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.localUser.castSocialUser(user);
      this.auth.authenticate(this.localUser).subscribe((u: User) => {
        this.localUser = u;
      })
      this.user = user;
      this.loggedIn = (user != null);
    });
  }

  signInWithGoogle(): void {
    alert(1)
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }


  signOut(): void {
    this.authService.signOut();
  }
}
