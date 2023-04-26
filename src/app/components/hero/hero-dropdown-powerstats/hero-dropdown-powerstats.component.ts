import { Component, Input } from '@angular/core';
import { Powerstats } from 'src/app/models';

@Component({
  selector: 'app-hero-dropdown-powerstats',
  templateUrl: './hero-dropdown-powerstats.component.html',
  styleUrls: ['./hero-dropdown-powerstats.component.scss']
})
export class HeroDropdownPowerstatsComponent {
  @Input() powerstats!: Powerstats;
  public overall!: number;
  constructor() { }
}
