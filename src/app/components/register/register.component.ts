import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HeroService } from 'src/app/services/hero.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
public errorMessage = '';
public message = '';

constructor(
  private fb: FormBuilder,
  private authService: AuthService,
  private heroService: HeroService,
) {

  this.heroService.test();

}

form = this.fb.nonNullable.group({
  username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(12)]],
  password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(12)]],
  passwordRepeated: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(12)]],
});

onSubmit(): void {

  this.errorMessage = '';
  this.message = '';
  
  if (this.form.valid) {
    const { username, password, passwordRepeated} = this.form.getRawValue();

    if(password != passwordRepeated){
      this.errorMessage = 'The passwords are not the same';
      return;
    }

    this.authService.register(username, password).subscribe({
      next: (v: any) => {
        console.log(v);
        this.form.reset();
        this.message = 'The user has been created';
      },
      error: (e) => {
        console.log(e);
        this.errorMessage = e.status == 400 ? 'User already exists': e.statusText
        ;
      },
    });
  }
}
}
