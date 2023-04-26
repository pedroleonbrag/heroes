import { NonNullAssert } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  constructor() {}

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
}
