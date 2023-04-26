import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Hero } from '../models';

const URL_API = `https://akabab.github.io/superhero-api/api`;

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${URL_API}/all.json`).pipe(
      map((heroes: Hero[]) => {
        /*if (heroes.length > 6) {
          return heroes.slice(0, 6);
        }*/
        return heroes;
      })
    );
  }

  getByName(name: string): Observable<Hero[]> {
    return this.http
      .get<Hero[]>(`${URL_API}/all.json`)
      .pipe(
        map((hs) =>
          hs.filter((h) =>
            h.name.toLowerCase().includes(name.trim().toLowerCase())
          )
        )
      );
  }

  get(id: number): Observable<Hero> {
    return this.http.get<Hero>(`${URL_API}/id/${id}.json`);
  }

  getTeam(ids: number[] | null): Observable<Hero[]> {
    if (ids === null) return new Observable<Hero[]>();
    const observables = ids.map(id => this.get(id));
    return forkJoin([...observables]);
  }
}
