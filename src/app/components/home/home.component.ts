import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { showAlert } from 'src/helpers/alert';
import { ResponseQuizService } from 'src/services/response-quiz.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public code: string = '';
  public loading: boolean = false;

  constructor(
    private _responseQuizService: ResponseQuizService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  getPin(): void {
    if(this.code.trim()){
      this.getQuizByCode(this.code);
    }else{
      showAlert('CODE empty!','Please get into a PIN','warning');
    }
  }

  getQuizByCode(code: string){
    this.loading = true;
    this._responseQuizService.getQuizByCode(code).subscribe({
      next: response => {
        const { data } = response;
        console.log(data);
        
        this.loading = false;
        this._responseQuizService.$quiz.next(data);
        this._responseQuizService.emptyQuiz = false;
      },
      error: error =>{
        console.log('error', error);
        showAlert('Error', error.error.message, 'error');
        this.loading = false;
      },
      complete: () => {
        this.router.navigate(['/play']);
      }
    });
  }

}
