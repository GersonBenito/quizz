import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { IQuestions } from 'src/interfaces/questions.interface';

@Injectable({
  providedIn: 'root'
})
export class QuizzService {

  public titleQuestionnaire: string = '';
  public descriptionQuestionnaire: string = '';
  public $question = new Subject<IQuestions>();
  
  constructor() { }

  setQuestion(question: IQuestions){
    this.$question.next(question);
  }

  getQuestion(): Observable<IQuestions>{
    return this.$question.asObservable();
  }

}
