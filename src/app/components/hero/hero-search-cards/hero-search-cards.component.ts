import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  debounceTime,
  distinctUntilChanged,
  Observable,
  Subject,
  Subscription,
} from 'rxjs';
import { Hero } from 'src/app/models';
import { HeroFilter } from 'src/app/models/hero.filer.model';
import { Team } from 'src/app/models/team.model';
import { HeroService } from 'src/app/services/hero.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-hero-search-cards',
  templateUrl: './hero-search-cards.component.html',
  styleUrls: ['./hero-search-cards.component.scss'],
})
export class HeroSearchCardsComponent implements OnInit {
  //searchTerm$ = new Subject<string>();
  heroes$: Observable<Hero[]>;
  subscription1!: Subscription;
  heroes: Hero[] = [];
  public p: number = 1;
  public searchText: string = '';
  public filter: HeroFilter = { name: '', race: '', alignment: undefined };

  constructor(
    private heroService: HeroService,
    private teamService: TeamService
  ) {}

  ngOnInit() {
    this.heroes$ = this.heroService.getAll(this.filter);
  }

  search(): void {
    console.log(this.filter);
    this.heroes$ = this.heroService.getAll(this.filter);
  }

  addToTeam(hero: Hero) {
    this.teamService.addToTeam(hero).subscribe({
      next: (r: any) => {
        console.log(r);
      },
      error: (e) => {
        console.log(e.error);
      },
    })
  }

}
