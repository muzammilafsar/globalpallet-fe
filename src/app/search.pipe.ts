import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (args === '') {
      return value;
    } else {
      const arr = value.filter(val => val['tags'].toLowerCase().includes(args.toLowerCase()));
      return arr;
    }
  }

}
