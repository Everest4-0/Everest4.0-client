import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrSum'
})
export class ArrSumPipe implements PipeTransform {

  transform(arr: Array<any>, k: any = null): number {
    return arr.reduce((t: number, v) => { return t + (k == null ? v : parseInt(v[k])) }, 0);
  }

}
