import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'explore'
})
export class ExplorePipe implements PipeTransform {

  transform(value: any, args?: any): any {

    if (args === '') {
    
      return null;
      // console.log(value);
      

    } else {
      const arr = value.filter(val => val['explore_tag'].toLowerCase().includes(args.toLowerCase()));
      console.log(args);

      return arr;
    }
  }

}
