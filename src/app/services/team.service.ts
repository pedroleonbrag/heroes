import { NonNullAssert } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { Team } from '../models/team.model';
import { HttpClient } from '@angular/common/http';
import { Hero } from '../models';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  constructor(private http: HttpClient) {}

  saveTeamIds(team: number[]) {
    localStorage.setItem('team', JSON.stringify(team));
  }

  getTeamIds(): number[] {
    const team = localStorage.getItem('team');
    if (team === null) {
      return [];
    }
    return JSON.parse(team);
  }

  getTeam(): Observable<Team> {
    return this.http.get<Team>('/api/team');
  }

  deleteFromTeam(hero: Hero): Observable<Team> {
    return this.http.post<Team>('/api/deleteFromTeam', hero);
  }

  addToTeam(hero: Hero): Observable<Team> {
    return this.http.post<Team>('/api/addToTeam', hero);
  }

}
