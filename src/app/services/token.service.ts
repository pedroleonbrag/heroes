import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor(private jwtHelper: JwtHelperService) {}

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  clearToken(): void {
    localStorage.removeItem('token');
  }

  isTokenValid(): boolean {
    const token = this.getToken();
    try {
      return !this.jwtHelper.isTokenExpired(token);
    } catch {
      return false;
    }
  }
}
