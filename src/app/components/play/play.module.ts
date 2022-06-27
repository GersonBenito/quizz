import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayRoutingModule } from './play-routing.module';
import { EnterNameComponent } from './enter-name/enter-name.component';
import { CounterInitialComponent } from './counter-initial/counter-initial.component';
import { TakeQuizComponent } from './take-quiz/take-quiz.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    EnterNameComponent,
    CounterInitialComponent,
    TakeQuizComponent
  ],
  imports: [
    CommonModule,
    PlayRoutingModule,
    SharedModule,
  ]
})
export class PlayModule { }
