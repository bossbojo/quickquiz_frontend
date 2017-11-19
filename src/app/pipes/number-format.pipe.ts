import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'numberFormat'
})
export class NumberFormatPipe implements PipeTransform {
    transform(value: number, digit: number = 2) {

        return (value || 0).toFixed(digit);
    }
}