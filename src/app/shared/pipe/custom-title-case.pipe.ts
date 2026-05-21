import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customTitleCase',
  standalone: true // Use true if you are using Standalone Components
})
export class TitleCasePipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return '';

    return value.toLowerCase().split(' ').map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
  }
}