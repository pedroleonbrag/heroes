import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TokenService } from './token.service';
import { environment } from 'src/environments/environment';

//const AUTH_API_URL = 'http://challenge-react.alkemy.org';
//const AUTH_API_URL = 'http://localhost:8081/api/auth/login';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  private loginEvent = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  public get loginEventObservable(): Observable<boolean> {
    return this.loginEvent.asObservable();
  }

  public set loginEventValue(value: boolean) {
    this.loginEvent.next(value);
  }

  login(username: string, password: string) {
    const body = { username: username, password: password };
    return this.http.post<string>(`${environment.apiUrl}/api/authenticate`, body);
  }

  register(username: string, password: string) {
    const body = { username: username, password: password };
    return this.http.post<string>(`${environment.apiUrl}/api/register`, body);
  }

  isLoggedIn(): boolean {
    return this.tokenService.isTokenValid();
  }
}
