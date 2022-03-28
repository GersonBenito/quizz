import { Component, OnInit } from '@angular/core';
import { showAlert } from 'src/helpers/alert';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public pin: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  getPin(): void {
    if(this.pin){
      console.log(this.pin);
      
    }else{
      showAlert('PIN empty!','Please get into a PIN','warning');
    }
  }

}
