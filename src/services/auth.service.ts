import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment as env} from 'src/environments/environment';
import { ILogin } from 'src/interfaces/login.interface';
import { IResponse } from 'src/interfaces/response.interface';
import { IUser } from 'src/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private urlBase: string = env.urlBase;
  private $logout = new BehaviorSubject<boolean>(false);
  private headersAuth = new HttpHeaders({
    'Authorization': `Bearer ${this.getToken()}`
  });

  constructor( private http: HttpClient ) { }

  createUser(user: IUser): Observable<IResponse>{
    return this.http.post<IResponse>(`${this.urlBase}/auth/register`, user);
  }

  login(user: ILogin): Observable<IResponse>{
    return this.http.post<IResponse>(`${this.urlBase}/auth/login`,user);
  }

  
  recoverPassword(email: string): Observable<IResponse>{
    return this.http.get<IResponse>(`${this.urlBase}/auth/recover-password/${email}`);
  }

  changePassword(id: string, password: object): Observable<IResponse>{
    return this.http.post<IResponse>(`${this.urlBase}/auth/change-password/${id}`, password, {
      headers: this.headersAuth
    });
  }

  getToken(){
    const user = localStorage.getItem('user');
    const token = JSON.parse(user || '{}');
    return token.tokenSession;
  }

  logout(): Observable<boolean>{
    localStorage.removeItem('user');
    this.$logout.next(true);
    return this.$logout;
  }

}
