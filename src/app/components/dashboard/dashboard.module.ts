import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { ListQuestionnaireComponent } from './list-questionnaire/list-questionnaire.component';
import { CreatedQuestionComponent } from './created-question/created-question.component';
import { SharedModule } from '../shared/shared.module';
import { CreatedQuizzComponent } from './created-quizz/created-quizz.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListQuestionsComponent } from './list-questions/list-questions.component';
import { ViewQuestionnaireComponent } from './view-questionnaire/view-questionnaire.component';


@NgModule({
  declarations: [
    DashboardComponent,
    NavbarComponent,
    ListQuestionnaireComponent,
    CreatedQuestionComponent,
    CreatedQuizzComponent,
    ListQuestionsComponent,
    ViewQuestionnaireComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
