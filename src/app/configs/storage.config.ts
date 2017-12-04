import { Subject } from 'rxjs/Subject';
export class StorageConfog {

    static setItem(key: string, item: any): void {
        try {
            if (typeof item == 'string') {
                Storage.setItem(key, item);
            }
            else {
                Storage.setItem(key, JSON.stringify(item));
            }
        }
        catch (e) {
            //console.log('Storage set item error : ', e);
        }
    }

    static getItem(key: string): any {
        try {
            return JSON.parse(Storage.getItem(key));
        }
        catch (e) {
            return Storage.getItem(key);
        }
    }

    static removeItem(key: string): void {
        Storage.removeItem(key);
    }

}

const Storage = localStorage;