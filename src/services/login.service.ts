import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env} from 'src/environments/environment';
import { ILogin } from 'src/interfaces/login.interface';
import { IResponse } from 'src/interfaces/response.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private urlBase: string = env.urlBase;

  constructor( private http: HttpClient ) { }

  login(user: ILogin): Observable<IResponse>{
    return this.http.post<IResponse>(`${this.urlBase}/login`,user);
  }

}
