import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'largeCurrency',
  standalone: true
})
export class largeCurrencyPipe implements PipeTransform {

  transform(value?: number): string {
    if (value === null || value === undefined)
      return '';

    if (value >= 1e18)
      return ('$ ' + (value / 1e18).toFixed(2) + 'T'); // Trillones
    else if (value >= 1e12)
      return ('$ ' + (value / 1e12).toFixed(2) + 'B');  // Billones
    else if (value >= 1e6)
      return ('$ ' + (value / 1e6).toFixed(2) + 'M');  // Millones
    else if (value >= 1e3)
      return ('$ ' + (value / 1e3).toFixed(2) + 'K');  // Miles

    // Menor a 1000
    return '$ ' + value.toFixed(2)
  }
}
