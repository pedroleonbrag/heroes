import { Directive, Input, HostBinding } from '@angular/core';
import { MAXIMUM_POWERSTATS } from '../models/team.overview.model';

@Directive({
  selector: '[barWidth]',
})
export class BarWidthDirective {
  @Input('barWidth') obj: any | undefined = undefined;

  @HostBinding('style.width') get width() {
    if (this.obj === undefined) return null;
    const {value, cantHeroes} = this.obj;
    return (value * 100) / (cantHeroes * 100) + '%';
    
  }
}
