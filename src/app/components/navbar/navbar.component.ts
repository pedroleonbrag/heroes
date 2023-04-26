import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  isLoggedIn = false;
  isNavbarCollapsed = true;
  loggedIn$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private router: Router,
    private tokenService: TokenService
  ) {
    this.loggedIn$ = authService.loginEventObservable;
  }

  ngOnInit(){
    if(this.tokenService.isTokenValid()){
      this.authService.loginEventValue = true;
    }
  }

  logout() {
    this.tokenService.clearToken();
    this.authService.loginEventValue = false;
    this.router.navigate(['/login']);
  }
}
