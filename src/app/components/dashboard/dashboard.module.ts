import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ListQuestionnaireComponent } from './list-questionnaire/list-questionnaire.component';
import { CreatedQuizzComponent } from './dashboard/created-quizz/created-quizz.component';


@NgModule({
  declarations: [
    DashboardComponent,
    NavbarComponent,
    ListQuestionnaireComponent,
    CreatedQuizzComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
