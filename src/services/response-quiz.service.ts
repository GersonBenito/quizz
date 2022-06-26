import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment as env} from 'src/environments/environment';
import { IQuestionnaire } from 'src/interfaces/questionnaire.interface';
import { IQuizzResponse } from 'src/interfaces/repsonse.quizz';
import { IResponse } from 'src/interfaces/response.interface';

@Injectable({
  providedIn: 'root'
})
export class ResponseQuizService {

  private urlBase: string = env.urlBase;
  public $quiz = new BehaviorSubject<IQuestionnaire | any>({
    _id: '',
    user: '',
    title: '',
    code: '',
    creationDate: new Date(),
    description: '',
    listQuestion: [],
    numberQuestion: 0
  });

  constructor(
    private http: HttpClient,
  ) { }

  getQuizByCode(code: string): Observable<IQuizzResponse>{
    return this.http.get<IQuizzResponse>(`${this.urlBase}/quizz/search/${code}`);
  }

}
