import { NgxPermissionsService } from 'ngx-permissions';
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
  class?: string;
  roles: Array<string>;
}
export const FRONTOFFICE_ROUTES: RouteInfo[] = [
  { path: '/me/dashboard', title: 'Início', icon: 'pe-7s-home', roles: ['PRO', 'BASIC', 'FREE'] },

  { path: '/me/diagnostic', title: 'Diagnóstico', icon: 'pe-7s-search', roles: ['PRO', 'BASIC', 'FREE'] },
  { path: '/me/goals', title: 'Objectivos e plano de acção', icon: 'pe-7s-way', roles: ['PRO', 'BASIC', 'FREE'] },
<<<<<<< HEAD
//  { path: '/me/quiz', title: 'Desafios', icon: 'pe-7s-stopwatch', roles: ['PRO', 'BASIC', 'FREE'] },
=======
  { path: '/me/quiz/quizes', title: 'Desafios', icon: 'pe-7s-stopwatch', roles: ['PRO', 'BASIC', 'FREE'] },
>>>>>>> 1852364105789724b050176f7d41079d076a4879
  //{ path: '/me/icons', title: 'Competências', icon: 'pe-7s-gym', class: 'disabled', roles: ['FREE', 'PREMIUM'] },
  { path: '/me/courses', title: 'Cursos online ', icon: 'pe-7s-bookmarks', roles: ['PRO', 'BASIC','FREE'] },
  { path: '/me/coaching', title: 'Coaching online', icon: 'pe-7s-umbrella', class: 'disabled', roles: ['PRO'] },
  { path: '/me/vacant-n-jobs', title: 'Vagas e gestão de carreiras ', icon: 'pe-7s-speaker', roles: ['PRO', 'BASIC'] },
  { path: '/me/monitoring', title: 'Monitorização e relatórios ', icon: 'pe-7s-display1', roles: ['PRO', 'BASIC'] },
  { path: '/me/helpdesk', title: 'Apoio ao cliente', icon: 'pe-7s-help1', roles: ['PRO', 'BASIC', 'FREE'] },
  { path: '/me/upgrade', title: 'Mudar para Premium', icon: 'pe-7s-rocket', class: 'active-pro', roles: ['FREE'] },



];

//BACKOFFICES Routes
export const BACKOFFICE_ROUTES: RouteInfo[] = [
  { path: '/backoffice/users', title: 'Usuários', icon: 'pe-7s-users', roles: ['ADMIN'] },
  { path: '/backoffice/evaluations', title: 'Variaveis de avaliação', icon: 'pe-7s-star', roles: ['ADMIN'] },
  { path: '/backoffice/quizes', title: 'Desafios', icon: 'pe-7s-timer', roles: ['ADMIN'] },
  { path: '/backoffice/academic-levels', title: 'Níveis académico', icon: 'pe-7s-study', roles: ['ADMIN'] },
  { path: '/backoffice/professional-experiencies', title: 'Experiências profissionais', icon: 'pe-7s-graph3', roles: ['ADMIN'] },
  { path: '/backoffice/work-situations', title: 'Situações de trabalho', icon: 'pe-7s-portfolio', roles: ['ADMIN'] },
  { path: '/backoffice/budget-categories', title: 'Categorias de orçamento', icon: 'pe-7s-cash', roles: ['ADMIN'] },
  { path: '/backoffice/courses', title: 'Cursos on-line', icon: 'pe-7s-umbrella', roles: ['ADMIN'] }
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
  public roles;
  constructor(
    public auth: AuthService, private router: Router,
    private permissionsService: NgxPermissionsService
  ) { }

  ngOnInit() {

    this.frontofficeMenuItems.forEach(menuItem => {
      if (this.auth.user.roles.filter(r => menuItem.roles.includes(r)).length === 0)
        menuItem.class += ' disabled'
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
