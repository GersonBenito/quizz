import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserResponseComponent } from '../shared/user-response/user-response.component';
import { CounterInitialComponent } from './counter-initial/counter-initial.component';
import { EnterNameComponent } from './enter-name/enter-name.component';
import { TakeQuizComponent } from './take-quiz/take-quiz.component';

const routes: Routes = [
  { path: '', component: EnterNameComponent },
  { path: 'counter-initial', component: CounterInitialComponent },
  { path: 'take-quiz', component: TakeQuizComponent },
  { path: 'user-response/:id', component: UserResponseComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayRoutingModule { }
