import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { IResponse } from 'src/interfaces/response.interface';
import { IUser } from 'src/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private urlBase: string = env.urlBase;

  constructor( private http: HttpClient ) { }

  createUser(user: IUser): Observable<IResponse>{
    return this.http.post<IResponse>(`${this.urlBase}/user`, user);
  }

  // TODO: add token in the backend
  getToken(){
    const user = localStorage.getItem('user');
    const token = JSON.parse(user || '{}');
    return token._id;
  }

}
