import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment as env} from 'src/environments/environment';
import { ILogin } from 'src/interfaces/login.interface';
import { IResponse } from 'src/interfaces/response.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private urlBase: string = env.urlBase;
  private $logout = new BehaviorSubject<boolean>(false);

  constructor( private http: HttpClient ) { }

  login(user: ILogin): Observable<IResponse>{
    return this.http.post<IResponse>(`${this.urlBase}/login`,user);
  }

  recoverPassword(email: string): Observable<IResponse>{
    return this.http.get<IResponse>(`${this.urlBase}/login/recover-password/${email}`);
  }

  changePassword(id: string, password: object): Observable<IResponse>{
    return this.http.post<IResponse>(`${this.urlBase}/login/change-password/${id}`, password);
  }

  logout(): Observable<boolean>{
    localStorage.removeItem('user');
    this.$logout.next(true);
    return this.$logout;
  }

}
