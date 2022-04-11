import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { showAlert } from 'src/helpers/alert';
import { LoginService } from 'src/services/login.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  public changePassword: FormGroup;
  public IdUser: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private aRoute: ActivatedRoute,
    private loginService: LoginService,
  ) { 
    this.changePassword = this.fb.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getIdUser();
  }

  getIdUser(): void {
    const { id } = this.aRoute.snapshot.params;
    this.IdUser = id;
    console.log(this.IdUser);
    
  }

  handleSumbit(): void{
    const { password } = this.changePassword.value;
    console.log({password});
    
    this.loginService.changePassword(this.IdUser, { password }).subscribe({
      next: (response) =>{
        showAlert('Success', response.message, 'success');
      },
      error: (error) =>{
        showAlert('Ocurred an error', error.error.message, 'error');
      },
      complete: () =>{
        this.router.navigate(['/user']);
      }
    });
  }

}
