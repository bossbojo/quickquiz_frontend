import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
declare const require;
@Injectable()
export class LanguageService {
    constructor() { this.processStorageLanguage(); }
    private languageKey = 'lang';
    public getLanguageStorageEvent: Subject<any> = new Subject();

    // Set lanugae [th, en] : Set ภาษาให้กับระบบเช่น [th, en]
    setLanguage(lang: string) {
        this.setLanguageStorage(lang);
        this.getLanguageStorageEvent.next(this.getLanguageStorage);
        this.processTranslateElementByAttribute();
    }

    // Translage language : แปลภาษา
    translage(language: string, key: string = null) {
        let languageTranslage = language;
        if (LANGUAGES_VALIABLE[this.getLanguageStorage]) {
            languageTranslage = LANGUAGES_VALIABLE[this.getLanguageStorage][key || language] || language;
        }
        return languageTranslage;
    }

    // Convert localStorage to clien session : แปลงข้อมูล localStorage
    private get storage(): Storage {
        return localStorage;
    }

    // Get language storage : ดึงข้อมูล key of language storage ออกมา
    public get getLanguageStorage() {
        return this.storage.getItem(this.languageKey);
    }

    // Set language storage : set ข้อมูล key of language storage
    private setLanguageStorage(lang: string): void {
        this.storage.setItem(this.languageKey, lang.toUpperCase());
    }

    // Check language storage : ตรวจสอบข้อมูลของ storage ว่ามีภาษาอยู่แล้วหรือไม่ถ้าไม่มีก็ set ค่า default ให้กับภาษา
    private processStorageLanguage(defaultLanguage: string = 'th') {
        if (!this.getLanguageStorage)
            this.setLanguageStorage(defaultLanguage);
    }

    // translate by data-translate attribute
    private processTranslateElementByAttribute() {
        const attr = 'data-translate';
        let elements = document.querySelectorAll(`[${attr}]`);
        if (elements.length == 0) return;
        for (let element of (<any>elements)) {
            const elem = <HTMLElement>element;
            const text = elem.getAttribute(attr);
            if (!text) continue;
            elem.innerHTML = this.translage(text);
        }
    }
}

// set languages to LANGUAGES : เก็บค่าภาษาไว้ก่อน โดยดุึงจาก json file
const LANGUAGES_VALIABLE = {
    TH: require('../languages/th.json')
  //  KH: require('../languages/kh.json')
};