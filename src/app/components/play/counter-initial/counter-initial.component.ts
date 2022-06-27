import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-counter-initial',
  templateUrl: './counter-initial.component.html',
  styleUrls: ['./counter-initial.component.css']
})
export class CounterInitialComponent implements OnInit {

  public counter: any = 3;

  constructor( private router: Router ) { }

  ngOnInit(): void {
    this.initialCounter();
  }

  initialCounter(){
    let interval = setInterval(()=>{ 
      this.counter--;
      this.cleanCounter(interval);
    }, 1000);
  }

  cleanCounter(interval: any){
    if(this.counter === 0){
      this.counter = 'Ready!';
      clearInterval(interval);
      this.takeQuizz();
    }
  }

  takeQuizz(){
    setTimeout(()=>{
      this.router.navigate(['/play/take-quiz']);
    }, 1000);
  }

}
