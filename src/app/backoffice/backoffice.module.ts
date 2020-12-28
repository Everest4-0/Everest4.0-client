import { PipesModule } from './../pipes/pipes.module';
import { ArrSortPipe } from './../pipes/arr-sort.pipe';
import { ModalModule } from './../components/modal/modal.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarModule } from './../sidebar/sidebar.module';
import { FooterModule } from './../shared/footer/footer.module';
import { NavbarModule } from './../shared/navbar/navbar.module';
import { BackOfficeRoutes } from './backoffice.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { CreateUserComponent } from './user/create-user/create-user.component';
import { UpdateUserComponent } from './user/update-user/update-user.component';
import { DeleteUserComponent } from './user/delete-user/delete-user.component';
import { BackofficeComponent } from './backoffice/backoffice.component';
import { BackofficeNavbarComponent } from './components/backoffice-navbar/backoffice-navbar.component';
import { ListUserComponent } from './user/list-user/list-user.component';
import { DetailsUserComponent } from './user/details-user/details-user.component';
import { ListEvaluationComponent } from './evaluation/list-evaluation/list-evaluation.component';
import { UpdateEvaluationComponent } from './evaluation/update-evaluation/update-evaluation.component';
import { CreateEvaluationComponent } from './evaluation/create-evaluation/create-evaluation.component';


import { MomentModule } from 'ngx-moment';
import { NgSelectModule } from '@ng-select/ng-select';
import { ListCategoryBudgetComponent } from './budgetCategory/list-category-budget/list-category-budget.component';
import { CreateCategoryBudgetComponent } from './budgetCategory/create-category-budget/create-category-budget.component';
import { UpdateCategoryBudgetComponent } from './budgetCategory/update-category-budget/update-category-budget.component';
import { CreateAcademicLevelComponent } from './academic-level/create-academic-level/create-academic-level.component';
import { ListAcademicLevelComponent } from './academic-level/list-academic-level/list-academic-level.component';
import { UpdateAcademicLevelComponent } from './academic-level/update-academic-level/update-academic-level.component';
import { ListWorkSituationComponent } from './workSituation/list-work-situation/list-work-situation.component';
import { UpdateWorkSituationComponent } from './workSituation/update-work-situation/update-work-situation.component';
import { CreateWorkSituationComponent } from './workSituation/create-work-situation/create-work-situation.component';
import { ListProfessionalExperienceComponent } from './professional-experience/list-professional-experience/list-professional-experience.component';
import { UpdateProfessionalExperienceComponent } from './professional-experience/update-professional-experience/update-professional-experience.component';
import { CreateProfessionalExperienceComponent } from './professional-experience/create-professional-experience/create-professional-experience.component';
import { ListCourseComponent } from './courses/list-course/list-course.component';
import { CreateCourseComponent } from './courses/create-course/create-course.component';
import { DetailsCourseComponent } from './courses/details-course/details-course.component';
import { UpdateCourseComponent } from './courses/update-course/update-course.component';


import { SwitchModule } from '@syncfusion/ej2-angular-buttons';

import { TabModule } from '@syncfusion/ej2-angular-navigations';

import { ButtonModule } from '@syncfusion/ej2-angular-buttons';

import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';

import { DialogModule } from '@syncfusion/ej2-angular-popups';

import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';

import { NumericTextBoxModule } from '@syncfusion/ej2-angular-inputs';

import { RadioButtonModule } from '@syncfusion/ej2-angular-buttons';

import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons';

import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';
import { ListQuizComponent } from './quiz/list-quiz/list-quiz.component';
import { DetailsQuizComponent } from './quiz/details-quiz/details-quiz.component';


@NgModule({
  declarations: [
    CreateUserComponent,
    UpdateUserComponent,
    DeleteUserComponent,
    BackofficeComponent,
    BackofficeNavbarComponent,
    ListUserComponent,
    DetailsUserComponent,
    ListEvaluationComponent,
    UpdateEvaluationComponent,
    CreateEvaluationComponent,
    ListCategoryBudgetComponent,
    CreateCategoryBudgetComponent,
    UpdateCategoryBudgetComponent,
    CreateAcademicLevelComponent,
    ListAcademicLevelComponent,
    UpdateAcademicLevelComponent,
    ListWorkSituationComponent,
    UpdateWorkSituationComponent,
    CreateWorkSituationComponent,
    ListProfessionalExperienceComponent,
    UpdateProfessionalExperienceComponent,
    CreateProfessionalExperienceComponent,
    ListCourseComponent,
    CreateCourseComponent,
    DetailsCourseComponent,
    UpdateCourseComponent,
    ListQuizComponent,
    DetailsQuizComponent
  ],
  imports: [
    CommonModule,
    NavbarModule,
    FooterModule,
    SidebarModule,
    BackOfficeRoutes,
    FormsModule,
    ReactiveFormsModule,
    MomentModule,
    NgSelectModule,
    DragDropModule,
    ModalModule,

    /*********************** */

    // BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    TabModule,
    RichTextEditorAllModule,
    CheckBoxModule,
    DialogModule,
    NumericTextBoxModule,
    ButtonModule,
    SwitchModule,
    RadioButtonModule,
    TextBoxModule,
    DropDownListModule,
    PipesModule,
  ]
})
export class BackofficeModule { }
