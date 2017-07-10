import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'vgDate'})
export class DateFormat implements PipeTransform {
  transform(value: Date, args: string[]): any {
    if (!value) return value;
    return `${value.getDate()}.${value.getMonth()+1}.${value.getFullYear()} ${value.getHours()}:${value.getMinutes()}`;
  }
}
