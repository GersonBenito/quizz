import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { showAlert } from 'src/helpers/alert';
import { ResponseQuizService } from 'src/services/response-quiz.service';

@Component({
  selector: 'app-user-response',
  templateUrl: './user-response.component.html',
  styleUrls: ['./user-response.component.css']
})
export class UserResponseComponent implements OnInit {

  public id: string = '';
  public loading: boolean = false;
  public userResponses: any;
  public previusRouter: string = '';

  constructor(
    private _responseQuizService: ResponseQuizService,
    private aRouter: ActivatedRoute,
    private router: Router,
  ) { 
    this.id = this.aRouter.snapshot.paramMap.get('id')!; // operator ! not null acertion of TypeScript, say return a string and not a string or null
    this.getUserResponseById(this.id);
    this.previusRouter = this.aRouter.snapshot.url[0].path;
  }

  ngOnInit(): void {
  }

  getUserResponseById(id: string){
    this.loading = true;
    this._responseQuizService.getUserResponseById(id).subscribe({
      next: response =>{
        this.userResponses = response.data;
        this.loading = false;
      },
      error: error =>{
        showAlert('Error', error.error.message, 'error');
        this.loading = false;
        this.returnHome();
      }
    });
  }

  returnHome(){
    if(this.previusRouter === 'admin-response'){
      this.router.navigate(['dashboard/statistics', this.userResponses.idQuiz]);
    }else{
      this.router.navigate(['/']);
    }
  }

}
