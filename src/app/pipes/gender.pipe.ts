import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'genderPipe'
})
export class GenderPipe implements PipeTransform {
  transform(value: string | undefined): string {
    return (value === 'M') ? 'Male' : 'Female';
  }
}
