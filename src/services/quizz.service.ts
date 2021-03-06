import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { IQuestionnaire } from 'src/interfaces/questionnaire.interface';
import { IQuestions } from 'src/interfaces/questions.interface';
import { IQuizzResponse } from 'src/interfaces/repsonse.quizz';
import { IResponse } from 'src/interfaces/response.interface';


@Injectable({
  providedIn: 'root'
})
export class QuizzService {

  public titleQuestionnaire: string = '';
  public descriptionQuestionnaire: string = '';
  public $question = new Subject<IQuestions>();
  private urlBase: string = env.urlBase;
  
  constructor(
    private http: HttpClient,
  ) { }

  setQuestion(question: IQuestions){
    this.$question.next(question);
  }

  getQuestion(): Observable<IQuestions>{
    return this.$question.asObservable();
  }

  createQuizz(questionnaire: IQuestionnaire): Observable<IResponse>{
    return this.http.post<IResponse>(`${this.urlBase}/quizz`, questionnaire);
  }

  getQuizzByIdUser(_id: string | undefined): Observable<IQuizzResponse>{
    return this.http.get<IQuizzResponse>(`${this.urlBase}/quizz/${_id}`);
  }

  deleteQuizz(_id: string): Observable<IResponse>{
    return this.http.delete<IResponse>(`${this.urlBase}/quizz/${_id}`);
  }

  getQuizzById(_id: string): Observable<IResponse>{
    return this.http.get<IResponse>(`${this.urlBase}/quizz/details/${_id}`);
  }

}
