import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TokenService } from './token.service';

//const AUTH_API_URL = 'http://challenge-react.alkemy.org';
const AUTH_API_URL = 'http://localhost:8081/api/auth/login';

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
    // const headers = new HttpHeaders()
    //   .set('Content-Type', 'application/json')
    //   .set('Authorization', '');

    const body = { username: username, password: password };
    return this.http.post<string>('/api/authenticate', body);
    // this.http
    //   .post<string>('http://localhost:8081/api/authenticate2', body)
    //   .subscribe({
    //     next: (v: any) => {
    //       console.log(v);
    //     },
    //     error: (e) => {
    //       console.log(e);
    //     },
    //   });
    // //return this.http.get<any>('http://localhost:8081/api/hero/1');
    // return this.http.get<any>('http://localhost:8081/api/authenticate');
  }

  isLoggedIn(): boolean {
    return this.tokenService.isTokenValid();
  }
}
