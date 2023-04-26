import { Pipe, PipeTransform } from '@angular/core';
import { Powerstats } from 'src/app/models';

@Pipe({
  name: 'overall'
})
export class OverallPipe implements PipeTransform {

  transform(ps: Powerstats): number {
    return Math.floor((ps.combat + ps.durability + ps.intelligence + ps.power + ps.speed + ps.strength) / 6);
  }

}
