import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment as env} from 'src/environments/environment';
import { IQuestionnaire } from 'src/interfaces/questionnaire.interface';
import { IQuizzResponse } from 'src/interfaces/repsonse.quizz';
import { IResponse } from 'src/interfaces/response.interface';

@Injectable({
  providedIn: 'root'
})
export class ResponseQuizService {

  private urlBase: string = env.urlBase;
  public participantName: string = '';
  public emptyQuiz: boolean = true;
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
    private router: Router,
  ) { }

  getQuizByCode(code: string): Observable<IQuizzResponse>{
    return this.http.get<IQuizzResponse>(`${this.urlBase}/quizz/search/${code}`);
  }

  isEmptyQuiz(){
    if(this.emptyQuiz){
      this.router.navigate(['/']);
    }
  }

}
