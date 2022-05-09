import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuizzService {

  public titleQuestionnaire: string = '';
  public descriptionQuestionnaire: string = '';
  
  constructor() { }
}
