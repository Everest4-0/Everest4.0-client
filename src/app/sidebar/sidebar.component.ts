import { Router } from '@angular/router';
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
  roles: Array<string>;
}
export const DEFAULT_ROUTES: RouteInfo[] = [
  { path: '/me/dashboard', title: 'Início', icon: 'pe-7s-home', class: '', roles: ['FREE', 'PREMIUM'] },

  { path: '/me/diagnostic', title: 'Diagnóstico', icon: 'pe-7s-search', class: '', roles: ['FREE', 'PREMIUM'] },
  { path: '/me/goals', title: 'Objectivos e plano de acção', icon: 'pe-7s-way', class: '', roles: ['FREE', 'PREMIUM'] },
  { path: '/me/icons', title: 'Competência', icon: 'pe-7s-gym', class: 'disabled', roles: ['FREE', 'PREMIUM'] },
  { path: '/me/user', title: 'Cursos online ', icon: 'pe-7s-bookmarks', class: 'disabled', roles: ['FREE', 'PREMIUM'] },
  { path: '/me/user', title: 'Coaching online', icon: 'pe-7s-umbrella', class: 'disabled', roles: ['FREE', 'PREMIUM'] },
  { path: '/me/user', title: 'Vagas e gestão de carreiras ', icon: 'pe-7s-speaker', class: 'disabled', roles: ['FREE', 'PREMIUM'] },
  { path: '/me/user', title: 'Monitorização e relatórios ', icon: 'pe-7s-display1', class: 'disabled', roles: ['FREE', 'PREMIUM'] },
  { path: '/me/maps', title: 'Apoio ao cliente', icon: 'pe-7s-help1', class: '', roles: ['FREE', 'PREMIUM'] },
  { path: '/me/upgrade', title: 'Mudar para Premium', icon: 'pe-7s-rocket', class: 'active-pro ', roles: ['FREE'] },



];

export const BACKOFFICE_ROUTES: RouteInfo[] = [

  //BACKOFFICES Routes
  { path: '/backoffice/users', title: 'Usuários', icon: 'pe-7s-users', class: '', roles: ['ADMIN'] },
  { path: '/backoffice/evaluations', title: 'Variaveis de avaliação', icon: 'pe-7s-star', class: '', roles: ['ADMIN'] },
  { path: '/backoffice/academic-levels', title: 'Níveis académico', icon: 'pe-7s-study', class: '', roles: ['ADMIN'] },
  { path: '/backoffice/professional-experiencies', title: 'Experiências profissionais', icon: 'pe-7s-graph3', class: '', roles: ['ADMIN'] },
  { path: '/backoffice/work-situations', title: 'Situações de trabalho', icon: 'pe-7s-portfolio', class: '', roles: ['ADMIN'] },
  { path: '/backoffice/budget-categories', title: 'Categorias de orçamento', icon: 'pe-7s-cash', class: '', roles: ['ADMIN'] }
]
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(public auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.menuItems = [
      BACKOFFICE_ROUTES,
      DEFAULT_ROUTES
    ][this.router.url.includes('/backoffice') ? 0 : 1].filter(menuItem => {
      return this.auth.user.roles.filter(r => menuItem.roles.includes(r)).length > 0
    });
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
