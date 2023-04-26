import { Pipe, PipeTransform } from '@angular/core';
import { Appearence } from 'src/app/models';

@Pipe({
  name: 'heroAppearence'
})
export class HeroAppearencePipe implements PipeTransform {

  transform(a: Appearence): string {
    return  a.height[1] + ' ' +  a.weight[1] + ' ' + a.eyeColor + ' eyes ' + a.hairColor;
  }

}
