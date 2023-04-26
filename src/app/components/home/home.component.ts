import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { HeroService } from 'src/app/services/hero.service';
import { Hero } from 'src/app/models';
import { Subscription } from 'rxjs';
import { TeamService } from 'src/app/services/team.service';
import { MatDialog } from '@angular/material/dialog';
import { HeroModalComponent } from '../hero/hero-modal/hero-modal.component';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public team!: Hero[];
  private subscription!: Subscription;

  constructor(
    private heroService: HeroService,
    private teamService: TeamService,
    private cd: ChangeDetectorRef,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    const teamIds = this.teamService.getTeamIds();
    this.subscription = this.heroService
      .getTeam(teamIds)
      .subscribe((heroes) => {
        this.team = heroes;
      });
  }

  deleteHero(hero: Hero) {
    let ix = this.team.findIndex(h => h.id === hero.id);
    this.team.splice(ix, 1);
    this.teamService.saveTeamIds(this.team.map((h) => h.id));
    this.cd.detectChanges();
  }

  openDialog(hero: Hero) {
    //this.dialog.open(HeroModalComponent);
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
