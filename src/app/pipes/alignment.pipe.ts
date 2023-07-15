import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'alignmentPipe'
})
export class AlignmentPipe implements PipeTransform {
  transform(value: string | undefined): string {
    return (value === 'G') ? 'Good' : 'Bad';
  }
}
