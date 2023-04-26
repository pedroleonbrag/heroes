import { Pipe, PipeTransform } from '@angular/core';
import { Hero } from 'src/app/models';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(items: Hero[], searchText: string): Hero[] {
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter((h) => {
      return (
        h.name.toLowerCase().includes(searchText) ||
        h.slug.toLowerCase().includes(searchText) ||
        h.appearance.race !== null && h.appearance.race.toLowerCase().includes(searchText) ||
        h.appearance.gender !== null && h.appearance.gender.toLowerCase() === searchText ||
        h.work.occupation !== null && h.work.occupation.toLowerCase().includes(searchText)
      );
    });
  }
}
