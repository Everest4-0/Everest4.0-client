import { NgxPermissionsService } from 'ngx-permissions';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class?: string;
  roles: Array<string>;
}
export const FRONTOFFICE_ROUTES: RouteInfo[] = [
  { path: '/me/dashboard', title: 'Início', icon: 'pe-7s-home', roles: ['PRO', 'BASIC', 'FREE'] },

  { path: '/me/goals', title: 'Planeamento pessoal', icon: 'pe-7s-way', roles: ['PRO', 'BASIC', 'FREE'] },
  { path: '/me/courses', title: 'Cursos online ', icon: 'pe-7s-bookmarks', roles: ['PRO', 'BASIC', 'FREE'] },
  { path: '/me/coaching', title: 'Consultoria de carreira', icon: 'pe-7s-umbrella', roles: ['PRO', 'BASIC', 'FREE'] },

  { path: '/me/helpdesk', title: 'Apoio ao cliente', icon: 'pe-7s-help1', roles: ['PRO', 'BASIC', 'FREE'] },
  { path: '/me/upgrade', title: 'Mudar para Premium', icon: 'pe-7s-rocket', class: 'active-pro', roles: ['FREE'] },



];

// BACKOFFICES Routes
export const BACKOFFICE_ROUTES: RouteInfo[] = [
  { path: '/backoffice/users', title: 'Usuários', icon: 'pe-7s-users', roles: ['ADMIN'] },
  { path: '/backoffice/evaluations', title: 'Variaveis de avaliação', icon: 'pe-7s-star', roles: ['ADMIN'] },
  { path: '/backoffice/quizes', title: 'Desafios', icon: 'pe-7s-timer', roles: ['ADMIN'] },
  { path: '/backoffice/academic-levels', title: 'Níveis académico', icon: 'pe-7s-study', roles: ['ADMIN'] },
  { path: '/backoffice/professional-experiencies', title: 'Experiências profissionais', icon: 'pe-7s-graph3', roles: ['ADMIN'] },
  { path: '/backoffice/work-situations', title: 'Situações de trabalho', icon: 'pe-7s-portfolio', roles: ['ADMIN'] },
  { path: '/backoffice/budget-categories', title: 'Categorias de orçamento', icon: 'pe-7s-cash', roles: ['ADMIN'] },
  { path: '/backoffice/courses', title: 'Cursos on-line', icon: 'pe-7s-bookmarks', roles: ['ADMIN'] },
  { path: '/backoffice/coaching', title: 'Gestão de carreira e Coaching online', icon: 'pe-7s-umbrella', roles: ['ADMIN'] }
]
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  backofficeMenuItems = this.router.url.includes('/backoffice') ? BACKOFFICE_ROUTES : [];
  frontofficeMenuItems = this.router.url.includes('/backoffice') ? [] : FRONTOFFICE_ROUTES;
  appVersion = environment.appVersion
  public roles;
  constructor(
    public auth: AuthService, private router: Router,
    private permissionsService: NgxPermissionsService
  ) { }

  ngOnInit() {

    this.frontofficeMenuItems.forEach(menuItem => {
      if (this.auth.user.roles.filter(r => menuItem.roles.includes(r)).length === 0) {
        menuItem.class += ' disabled'
      }
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
