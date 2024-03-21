import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productFilter'
})
export class ProductFilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {

// console.log(value, args); 

    if (args === 'all') {
    
      return value;

    } else {
      const arr = value.filter(val => val['category'].includes(args));
      // console.log(args);
      return arr;
    }
  }

}
