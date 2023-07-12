import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Hero } from '../models';

//const URL_API = `https://akabab.github.io/superhero-api/api`;
const URL_API = `http://localhost:8080/api/hero`;

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  constructor(private http: HttpClient) {}

  test(): void {
    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
      'Content-Type': 'application/json'
    });

    const body = { username: 'pedro', password: 'pedro' };
    this.http
      .post<string>('/api/authenticate', body, {headers: {}})
      .subscribe(
        (response) => {
          console.log('POST request successful', response);
          // Handle the response here
        },
        (error) => {
          console.log('Error occurred', error);
          // Handle the error here
        }
      );
  }

  getAll(): Observable<Hero[]> {
    // const headers = new HttpHeaders({
    //   'Access-Control-Allow-Origin': '*',
    //   'Access-Control-Allow-Credentials': 'true',
    //   'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    //   'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
    //   'Content-Type': 'application/json',
    //   'Authorization':
    //     'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwZWRybyIsImV4cCI6MTY4OTIxMDUzOSwiYXV0aCI6IkFETUlOIiwiaWF0IjoxNjg5MTI0MTM5fQ.veVcdNf-XodnzlY6TToOmZ2T-ohNOynjAV9eJG9_3yZ_C4kvnTGnMRBvi9nvJ5lBIUqjfMRkTNxqxvhYXpoNbA',
    // });

    return this.http
      .get<Hero[]>('/api/hero')
      .pipe(
        map((heroes: Hero[]) => {
          console.log(heroes);
          // if (heroes.length > 6) {
          //   return heroes.slice(0, 6);
          // }
          return heroes;
        })
      );
  }

  get(id: number): Observable<Hero> {
    return this.http.get<Hero>(`/api/hero/${id}`);
  }

  getTeam(ids: number[] | null): Observable<Hero[]> {
    if (ids === null) return new Observable<Hero[]>();
    const observables = ids.map((id) => this.get(id));
    return forkJoin([...observables]);
  }
}
