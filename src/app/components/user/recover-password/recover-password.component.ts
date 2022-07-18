import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { showAlert } from 'src/helpers/alert';
import { setLocalStorage } from 'src/helpers/helpers';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css']
})
export class RecoverPasswordComponent implements OnInit {

  public recoverForm: FormGroup;

  constructor( 
    private fb: FormBuilder,
    private authService: AuthService, 
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
      
      this.authService.recoverPassword(email).subscribe({
        next: (response) =>{
          const id = response.data?._id;
          setLocalStorage('user', response.data)
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
