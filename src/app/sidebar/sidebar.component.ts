import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Inicio',  icon: 'pe-7s-graph', class: '' },
    { path: '/table', title: 'Diagnóstico',  icon:'pe-7s-way', class: '' },
    { path: '/typography', title: 'Objectivo e estratégia',  icon:'pe-7s-target', class: '' },
    { path: '/icons', title: 'Competência',  icon:'pe-7s-gym', class: '' },
    { path: '/user', title: 'Relatórios e consultas',  icon:'pe-7s-note2', class: '' },
    { path: '/maps', title: 'Apoio',  icon:'pe-7s-help1', class: '' },
   /* { path: '/notifications', title: 'Notifications',  icon:'pe-7s-bell', class: '' },
   /* { path: '/user', title: 'User Profile',  icon:'pe-7s-note2', class: '' },*/
    { path: '/upgrade', title: 'Mudar para Premium',  icon:'pe-7s-rocket', class: 'active-pro' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
