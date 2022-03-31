import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUser } from 'src/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class SaveLocalStorageService {

  private key: string = 'user';
  private $save = new BehaviorSubject<boolean>(false);

  constructor() { }

  saveLocalStorage(user: IUser | undefined): Observable<boolean>{
    if(user){
      localStorage.setItem(this.key, JSON.stringify(user));
      this.$save.next(true);
    }
    return this.$save;
  }

}
