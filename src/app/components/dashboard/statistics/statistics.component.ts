import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { showAlert } from 'src/helpers/alert';
import { ResponseQuizService } from 'src/services/response-quiz.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  public id: string = '';
  public listUserResponse: any[] = [];
  public loading: boolean = false;

  constructor(
    private aRoute: ActivatedRoute,
    private router: Router,
    private _responseQuizServices: ResponseQuizService,
  ) { 
    this.id = this.aRoute.snapshot.paramMap.get('id')!;
    this.getResponsesByIdQuiz(this.id);
  }

  ngOnInit(): void {
  }

  getResponsesByIdQuiz(id: string){
    this.loading = true;
    this._responseQuizServices.getResponsesByIdQuiz(id).subscribe({
      next: response =>{
        this.listUserResponse = response.data;
        this.loading = false;
      },
      error: error =>{
        showAlert('Error', error.error.message, 'error');
        this.loading = false;
      }
    });
  }

  // TODO: need confirmation to delete
  deleteUserResponse(id: string){
    this._responseQuizServices.deleteUserResponse(id).subscribe({
      next: response =>{
        showAlert('Success', response.message, 'success');
      },
      error: error =>{
        showAlert('Error', error.error.message, 'error');
      },
      complete: () =>{
        this.getResponsesByIdQuiz(this.id);
      }
    });
  }

  previus(){
    this.router.navigate(['/dashboard']);
  }

}
