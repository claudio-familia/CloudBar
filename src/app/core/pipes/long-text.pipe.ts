import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'longStoryShort'})
export class LongStoryShortPipe implements PipeTransform {
  transform(value: string): string {
    return value.split('').splice(0, 35).join('')+'...';
  }
}