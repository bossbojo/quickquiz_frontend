import { Pipe, PipeTransform } from '@angular/core';
import { LanguageService } from '../services/language.service';
declare const moment;
@Pipe({
    name: 'moment',
})
export class MomentPipe implements PipeTransform {
    constructor(private langService: LanguageService) { }

    transform(value: string, format: string = 'h:mm:ss a') {
        let time = '';
        switch (format) {
            case 'fromNow':
                time = moment(value).fromNow();
                break;
            default:
                time = moment(value).format(format);
                break;
        }
        return time;
    }
}