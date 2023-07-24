import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  Appearance,
  Biography,
  Hero,
  NewHero,
  Powerstats,
  Work,
} from 'src/app/models';
import { AuthService } from 'src/app/services/auth.service';
import { HeroService } from 'src/app/services/hero.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-new',
  templateUrl: './new-hero.component.html',
  styleUrls: ['./new-hero.component.scss'],
})
export class NewHeroComponent {
  public errorMessage = '';
  public successMessage = '';
  public selectedImage: File;
  public previewImage: string = '';
  progress: number;
  showProgressBar: boolean;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private heroService: HeroService,
    private tokenService: TokenService,
    private router: Router,
    private http: HttpClient
  ) {}

  form = this.fb.nonNullable.group({
    name: ['', [Validators.required]],
    slug: ['', Validators.required],
    intelligence: [50],
    strength: [50],
    speed: [50],
    durability: [50],
    power: [50],
    combat: [50],
    gender: ['', Validators.required],
    race: [''],
    height: ['', Validators.required],
    weight: ['', Validators.required],
    eyeColor: [''],
    hairColor: [''],
    fullName: [''],
    alterEgos: [''],
    placeOfBirth: ['', Validators.required],
    occupation: [''],
    base: [''],
  });

  onFileSelected(event: any) {
    this.selectedImage = event.target.files[0];
    this.preview();
  }

  preview() {
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.previewImage = event.target.result;
    };
    reader.readAsDataURL(this.selectedImage);
  }

  uploadImage() {
    this.progress = 50;
    this.showProgressBar = true;
    const formData = new FormData();
    formData.append('file', this.selectedImage);

    this.http.post('api/file/upload', formData).subscribe(
      (response) => {
        console.log('Image uploaded:', response);
        // Handle the success response here
      },
      (error) => {
        console.error('Error uploading image:', error);
        // Handle the error response here
      }
    );
  }

  onSubmit(): void {
    if (this.form.valid) {
      const newHero: NewHero = this.buildNewHero(this.form);
      console.log(newHero);
      this.showProgressBar = true;
      this.heroService.create(newHero).subscribe({
        next: (hero: Hero) => {
          console.log(hero);
          if (this.selectedImage) {
            this.heroService
              .uploadImage(hero.id.toString(), this.selectedImage)
              .subscribe({
                next: (v: Hero) => {
                  this.success();
                },
                error: (e) => {
                  console.log(e);
                  this.showProgressBar = false;
                  this.errorMessage = e.message;
                },
              });
          }else{
            this.success();
          }
        },
        error: (e) => {
          console.log(e);
          this.showProgressBar = false;
          this.errorMessage = e.message;
        },
      });
    }
  }

  success(): void{
    this.resetForm();
    this.successMessage = 'The new SuperHero has been created.';
    this.showProgressBar = false;
  }

  resetForm(): void{
    this.form.reset();
    this.previewImage= '';
  }

  buildNewHero(form: FormGroup): NewHero {
    const {
      name,
      slug,
      intelligence,
      strength,
      speed,
      durability,
      power,
      combat,
      gender,
      race,
      height,
      weight,
      eyeColor,
      hairColor,
      fullName,
      alterEgos,
      placeOfBirth,
      occupation,
      base,
    } = this.form.getRawValue();

    const powerstats: Powerstats = {
      intelligence,
      strength,
      speed,
      durability,
      power,
      combat,
    };
    const avg: number =
      (intelligence + strength + speed + durability + power + combat) / 6;

    const appearance: Appearance = {
      gender,
      race,
      height,
      weight,
      eyeColor,
      hairColor,
    };

    const biography: Biography = {
      fullName,
      alterEgos,
      placeOfBirth,
      firstAppearance: undefined,
      alignment: avg > 70 ? 'G' : 'B',
    };

    const work: Work = { occupation, base };
    const newHero: NewHero = {
      name,
      slug,
      powerstats,
      appearance,
      biography,
      work,
    };
    return newHero;
  }
}
