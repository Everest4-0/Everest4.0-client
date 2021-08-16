import { NgxPermissionsService } from 'ngx-permissions';
import { AuthService } from './services/auth.service';
import { Component, OnInit } from '@angular/core';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { ToastService } from 'ng-uikit-pro-standard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLogedin = false;
  
  constructor(public location: Location,
    public auth: AuthService,
    private permissionsService: NgxPermissionsService) {
    this.isLogedin = !!auth.user
  }

  ngOnInit() {
    if (this.auth.user) {
      this.permissionsService.flushPermissions();
      this.permissionsService.loadPermissions(this.auth.user.roles);
    }
  }

   get roles() { return this.permissionsService.getPermissions(); }
  isMap(path) {
    let titlee = this.location.prepareExternalUrl(this.location.path());
    titlee = titlee.slice(1);
    if (path === titlee) {
      return false;
    } else {
      return true;
    }
  }
}
