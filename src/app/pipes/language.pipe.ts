import { Pipe, PipeTransform } from '@angular/core';
import { LanguageService } from '../services/language.service';
@Pipe({
    name: 'lang',
    pure: false
})
export class LanguagePipe implements PipeTransform {
    constructor(private langService: LanguageService) { }

    transform(value: string, key: string, elm: HTMLElement) {
        if (elm) elm.setAttribute('data-translate', value);
        return this.langService.translage(value, key);
    }
    transform2(value: string, key: string) {
        return this.langService.translage(value, key);
    }
}