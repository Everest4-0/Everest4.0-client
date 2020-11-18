import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrFilter'
})
export class ArrFilterPipe implements PipeTransform {

  transform(arr: Array<any>, key: any, value: any): unknown {
    
    return this.filter(arr, key, value);
  }
  filter(xs, k, v) {
    let key = k.split('.');
    let final = xs.filter(x => {
      for (let i=1;i<key.length; i++) {
        x = x[key[i]]
      }
      return x === v
    });


    return final;
  };
}
