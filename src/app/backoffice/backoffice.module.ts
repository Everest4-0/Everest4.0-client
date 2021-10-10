import { UpdateQuizBackOfficeComponent } from './quiz/update-quiz/update-quiz-backoffice.component';
import { DeleteQuizBackOfficeComponent } from './quiz/delete-quiz/delete-quiz-backoffice.component';
import { DetailsQuizBackOfficeComponent } from './quiz/details-quiz/details-quiz-backoffice.component';
import { ListQuizBackOfficeComponent } from './quiz/list-quiz/list-quiz-backoffice.component';
import { FrontofficeModule } from './../frontoffice/frontoffice.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PipesModule } from './../pipes/pipes.module';
import { ArrSortPipe } from './../pipes/arr-sort.pipe';
import { ModalModule } from './../components/modal/modal.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarModule } from '../shared/sidebar/sidebar.module';
import { FooterModule } from './../shared/footer/footer.module';
import { NavbarModule } from './../shared/navbar/navbar.module';
import { BackOfficeRoutes } from './backoffice.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';

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


import { DetailsCourseComponent } from './courses/details-course-backoffice/details-course.component';
import { UpdateCourseComponent } from './courses/update-course-backoffice/update-course.component';

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
import { ComponentsModule } from 'app/components/components.module';
import { ProgramEnrollmentComponent } from './coaching-backoffice/program-enrollment/program-enrollment.component';
import { ListCourseBackOfficeComponent } from './courses/list-course-backoffice/list-course-backoffice.component';
import { CreateCourseBackOfficeComponent } from './courses/create-course-backoffice/create-course-backoffice.component';
import { CreateQuizBackOfficeComponent } from './quiz/create-quiz/create-quiz-backoffice.component';


@NgModule({
  declarations: [
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
    ListCourseBackOfficeComponent,
    CreateCourseBackOfficeComponent,
    DetailsCourseComponent,
    UpdateCourseComponent,
    ListQuizBackOfficeComponent,
    DetailsQuizBackOfficeComponent,
    DeleteQuizBackOfficeComponent,
    UpdateQuizBackOfficeComponent,
    CreateQuizBackOfficeComponent,
  ],
  imports: [
    FrontofficeModule,
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
    ComponentsModule,
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
