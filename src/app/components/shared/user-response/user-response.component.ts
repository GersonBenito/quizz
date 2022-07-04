import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(
    private _responseQuizService: ResponseQuizService,
    private aRouter: ActivatedRoute,
    private router: Router,
  ) { 
    this.id = this.aRouter.snapshot.paramMap.get('id')!; // operator ! not null acertion of TypeScript, say return a string and not a string or null
    this.getUserResponseById(this.id);
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
    this.router.navigate(['/']);
  }

}
