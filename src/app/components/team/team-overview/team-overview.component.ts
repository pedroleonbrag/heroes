import { Component, DoCheck, Input, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { Hero } from 'src/app/models';
import { PartialTeam, TeamOverview } from 'src/app/models/team.model';

@Component({
  selector: 'app-team-overview',
  templateUrl: './team-overview.component.html',
  styleUrls: ['./team-overview.component.scss'],
})
export class TeamOverviewComponent implements OnChanges, DoCheck {
  @Input('heroes') heroes!: Hero[];
  public team: PartialTeam = {};

  constructor() {}

  ngOnChanges() {
    if (this.heroes !== undefined) {
      this.buildTotals();
    }
  }

  ngDoCheck(): void {
    if (this.heroes !== undefined) {
      this.buildTotals();
    }
  }

  buildTotals() {
    this.team = {
      heroes: this.heroes,
      totalIntelligence: this.heroes.reduce(
        (acc, h) => acc + h.powerstats.intelligence,
        0
      ),
      totalStrength: this.heroes.reduce(
        (acc, h) => acc + h.powerstats.strength,
        0
      ),
      totalSpeed: this.heroes.reduce((acc, h) => acc + h.powerstats.speed, 0),
      totalDurability: this.heroes.reduce(
        (acc, h) => acc + h.powerstats.durability,
        0
      ),
      totalPower: this.heroes.reduce((acc, h) => acc + h.powerstats.power, 0),
      totalCombat: this.heroes.reduce((acc, h) => acc + h.powerstats.combat, 0),
      heightAvg:
        this.heroes.length > 0
          ? Math.floor(this.heroes.reduce(
              (acc, h) =>
                acc + Number(h.appearance.height.replace(' cm', '')),
              0
            ) / this.heroes.length)
          : 0,
      weightAvg:
        this.heroes.length > 0
          ? Math.floor(this.heroes.reduce(
              (acc, h) =>
                acc + Number(h.appearance.weight.replace(' kg', '')),
              0
            ) / this.heroes.length)
          : 0,
    };

  }
}
