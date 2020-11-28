import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'groupBy'
})
export class GroupByPipe implements PipeTransform {

  transform(arr: Array<any>,key:any): Array<any> {
    if(arr==undefined) return [];
    return this.groupBy(arr,key)
  }

  groupBy(xs:Array<any>, key) {
    let final = xs.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});


    return Object.keys(final).map((k) => [k, final[k]]);
  };
}
