import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numFormat'
})
export class NumFormatPipe implements PipeTransform {

  transform(number: any, currency = 'AOA', style = 'currency', lang = 'pt'): string {
    debugger
    const final = new Intl.NumberFormat(lang, { style, currency }).format(number);
    return final;
  }

}
