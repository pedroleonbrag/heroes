import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  debounceTime,
  distinctUntilChanged,
  Observable,
  Subject,
  Subscription,
} from 'rxjs';
import { Hero } from 'src/app/models';
import { HeroService } from 'src/app/services/hero.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.scss'],
})
export class HeroSearchComponent implements OnInit, OnDestroy {
  //searchTerm$ = new Subject<string>();
  heroes$: Observable<Hero[]>;
  subscription1!: Subscription;
  subscription2!: Subscription;
  subscription3!: Subscription;
  heroes: Hero[] = [];
  team: Hero[] = [];
  cantidadBad: number = 0;
  cantidadGood: number = 0;
  public p: number = 1;
  public searchText: string = '';
  private searchSubject = new Subject<string>();

  constructor(
    private heroService: HeroService,
    private teamService: TeamService
  ) {
    this.heroes$ = heroService.getAll();
  }

  ngOnInit() {
    this.subscription1 = this.heroes$.subscribe((heroes) => {
      this.heroes = heroes;
    });

    this.subscription2 = this.searchSubject
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((value) => {
        this.searchText = value;
      });

    const teamIds = this.teamService.getTeamIds();
    this.subscription3 = this.heroService
      .getTeam(teamIds)
      .subscribe((heroes) => {
        this.team = heroes;
        this.cantidadBad = this.team.filter(
          (h) => h.biography.alignment === 'bad'
        ).length;
        this.cantidadGood = this.team.filter(
          (h) => h.biography.alignment === 'good'
        ).length;
      });
  }

  keyUpFilter(event: any) {
    this.searchSubject.next(event.target.value.trim());
  }

  addToTeam(hero: Hero) {
    this.cantidadBad =
      hero.biography.alignment === 'bad'
        ? this.cantidadBad + 1
        : this.cantidadBad;
    this.cantidadGood =
      hero.biography.alignment === 'good'
        ? this.cantidadGood + 1
        : this.cantidadGood;
    this.team.push(hero);
    this.teamService.saveTeamIds(this.team.map((h) => h.id));
  }

  canBeAdded(hero: Hero): boolean {
    if (this.team.length > 5) return false;
    if (hero.biography.alignment === 'good' && this.cantidadGood > 2)
      return false;
    if (hero.biography.alignment === 'bad' && this.cantidadBad > 2)
      return false;
    if (this.team.find((h) => h.id === hero.id) !== undefined) return false;
    return true;
  }

  ngOnDestroy() {
    this.subscription1?.unsubscribe();
    this.subscription2.unsubscribe();
    this.subscription3.unsubscribe();
  }
}
