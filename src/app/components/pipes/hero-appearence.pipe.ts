import { Pipe, PipeTransform } from '@angular/core';
import { Appearance } from 'src/app/models';

@Pipe({
  name: 'heroAppearence'
})
export class HeroAppearencePipe implements PipeTransform {

  transform(a: Appearance): string {
    return  a.height + ' ' +  a.weight + ' ' + a.eyeColor + ' eyes ' + a.hairColor;
  }

}
