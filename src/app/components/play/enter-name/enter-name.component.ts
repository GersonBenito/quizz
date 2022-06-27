import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { showAlert } from 'src/helpers/alert';
import { ResponseQuizService } from 'src/services/response-quiz.service';

@Component({
  selector: 'app-enter-name',
  templateUrl: './enter-name.component.html',
  styleUrls: ['./enter-name.component.css']
})
export class EnterNameComponent implements OnInit {

  public name: string = '';

  constructor(
    private _responseQuizService: ResponseQuizService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this._responseQuizService.isEmptyQuiz();
  }

  enterName(){
    if(this.name.trim()){
      this._responseQuizService.participantName = this.name;
      this.router.navigate(['/play/counter-initial'])
    }else{
      showAlert('Name empty','Enter your name', 'warning');
    }
  }
  
}
