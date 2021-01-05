import { NgxPermissionsModule } from 'ngx-permissions';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar.component';

@NgModule({
    imports: [ RouterModule, CommonModule, NgxPermissionsModule.forRoot() ],
    declarations: [ SidebarComponent ],
    exports: [ SidebarComponent ]
})

export class SidebarModule {}
