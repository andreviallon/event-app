import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {
  transform(value: string): string {
    return moment(value).format('MMM Do YYYY');
  }
}
