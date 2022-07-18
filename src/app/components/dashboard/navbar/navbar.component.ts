import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { showAlert } from 'src/helpers/alert';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  logout(): void{
    this.authService.logout().subscribe({
      next: (result) =>{
        if(result){
          this.router.navigate(['/']);
        }else{
          showAlert('Error!', 'Ocurrio un error al cerrar la sesion', 'error');
        }
      }
    });
  }

}
