import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { showAlert } from 'src/helpers/alert';
import { LoginService } from 'src/services/login.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css']
})
export class RecoverPasswordComponent implements OnInit {

  public recoverForm: FormGroup;

  constructor( 
    private fb: FormBuilder,
    private loginServices: LoginService, 
    private router: Router,
  ) {
    this.recoverForm = this.fb.group({
      email: ['', [ Validators.required, Validators.email ]],
    });
  }

  ngOnInit(): void {
  }

  recoverPassword(){
    if(!this.recoverForm.invalid){
      const user = this.recoverForm.value;
      const { email } = user;
      console.log('email user', email);
      
      this.loginServices.recoverPassword(email).subscribe({
        next: (response) =>{
          // TODO: se usara redux y NgRx para el manejo de estado
          const id = response.data?._id;
          showAlert('Success', response.message, 'success');
          this.router.navigate([`user/change-password/${id}`]);
        },
        error: (error) =>{
          showAlert('Error!', error.error.message, 'error');
        },
      });
      
    }else{
      showAlert('Email is empty!', 'Please enter your email', 'warning');
    }
  }

}
