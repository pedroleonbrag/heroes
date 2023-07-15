import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Hero, NewHero } from '../models';
import { HeroFilter } from '../models/hero.filer.model';
import { Team } from '../models/team.model';

//const URL_API = `https://akabab.github.io/superhero-api/api`;
const URL_API = `http://localhost:8080/api/hero`;

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  constructor(private http: HttpClient) {}

  test(): void {

    // this.http.post('http://localhost:8080/producto/create', {nombre:"BB123", precio:200})
    //   .subscribe({
    //     next: (v: any) => {
    //       console.log(v);
    //     },
    //     error: (e) => {
    //       console.log(e);
    //     },
    //   });
  }

  getAll(filter: HeroFilter): Observable<Hero[]> {
    return this.http.post<Hero[]>('/api/hero/find', filter);
  }

  get(id: number): Observable<Hero> {
    return this.http.get<Hero>(`/api/hero/${id}`);
  }

  // getTeam(ids: number[] | null): Observable<Hero[]> {
  //   if (ids === null) return new Observable<Hero[]>();
  //   const observables = ids.map((id) => this.get(id));
  //   return forkJoin([...observables]);
  // }

  create(hero: NewHero): Observable<Hero> {
    return this.http.post<Hero>('/api/hero', hero);
  }

  uploadImage(heroId: string, image: File): Observable<Hero> {
    console.log(image);
    const formData = new FormData();
    formData.append('file', image);
    formData.append('id', heroId);
    return this.http.post<Hero>('api/file/upload', formData);
  }

}
