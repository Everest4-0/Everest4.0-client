import { AuthService } from './../services/auth.service';
import { StorageServices } from './../services/storage.service';
import { StorageService } from 'ngx-webstorage-service';
import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  for: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/me/dashboard', title: 'Início', icon: 'pe-7s-home', class: '', for: '' },
  { path: '/backoffice/users', title: 'Usuários', icon: 'pe-7s-users', class: '', for: '' },
  
  { path: '/me/diagnostic', title: 'Diagnóstico', icon: 'pe-7s-search', class: '', for: '' },
  { path: '/me/goals', title: 'Objectivos e plano de acção', icon: 'pe-7s-way', class: '', for: '' },
  { path: '/me/icons', title: 'Competência', icon: 'pe-7s-gym', class: 'disabled', for: '' },
  { path: '/me/user', title: 'Cursos online ', icon: 'pe-7s-bookmarks', class: 'disabled', for: '' },
  { path: '/me/user', title: 'Coaching online', icon: 'pe-7s-umbrella', class: 'disabled', for: '' },
  { path: '/me/user', title: 'Vagas e gestão de carreiras ', icon: 'pe-7s-speaker', class: 'disabled', for: '' },
  { path: '/me/user', title: 'Monitorização e relatórios ', icon: 'pe-7s-display1', class: 'disabled', for: '' },
  { path: '/me/maps', title: 'Apoio ao cliente', icon: 'pe-7s-help1', class: '', for: '' },
  /* { path: '/notifications', title: 'Notifications',  icon:'pe-7s-bell', class: '' },
  /* { path: '/user', title: 'User Profile',  icon:'pe-7s-note2', class: '' },*/
  { path: '/me/upgrade', title: 'Mudar para Premium', icon: 'pe-7s-rocket', class: 'active-pro ', for: 'FREE' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(public auth: AuthService) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };

  signOut() {
    this.auth.signOut();
    window.open('/', '_self')
  }
}
