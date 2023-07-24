import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HeroService } from 'src/app/services/hero.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private heroService: HeroService,
    private tokenService: TokenService,
    private router: Router
  ) {

    this.heroService.test();

  }

  form = this.fb.nonNullable.group({
    email: ['pedro', [Validators.required]],
    password: ['pedro', Validators.required],
  });

  onSubmit(): void {
    if (this.form.valid) {
      const { email, password } = this.form.getRawValue();

      this.authService.login(email, password).subscribe({
        next: (v: any) => {
          console.log(v);
          this.tokenService.saveToken(v.id_token);
          this.authService.loginEventValue = true;
          this.router.navigate(['/home']);
        },
        error: (e) => {
          console.log(e);
          this.errorMessage = 'Check your credentials'
        },
      });
    }
  }
}
