import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrSort'
})
export class ArrSortPipe implements PipeTransform {

  transform(arr: Array<any>, key: any, value: any): unknown {
    return arr.sort((x, y) => x[key] > y[key] ? 1 : -1
    );
  }
  sort = (x, y) => {


    return 1
  };
}
