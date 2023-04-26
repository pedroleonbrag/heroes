import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
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
    private tokenService: TokenService,
    private router: Router
  ) {}

  form = this.fb.nonNullable.group({
    email: ['challenge@alkemy.org', [Validators.required]],
    password: ['react', Validators.required],
  });

  onSubmit(): void {
    if (this.form.valid) {
      const { email, password } = this.form.getRawValue();

      this.authService.login(email, password).subscribe({
        next: (v: any) => {
          this.tokenService.saveToken(v.token);
          this.authService.loginEventValue = true;
          this.router.navigate(['/home']);
        },
        error: (e) => (this.errorMessage = e.error.error || e.message),
      });
    }
  }
}
