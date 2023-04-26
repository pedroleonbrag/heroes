import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TokenService } from './token.service';

const AUTH_API_URL = 'http://challenge-react.alkemy.org';

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
    const body = { email: username, password: password };
    return this.http.post<string>(AUTH_API_URL, body);
  }

  isLoggedIn(): boolean {
    return this.tokenService.isTokenValid();
  }

}
