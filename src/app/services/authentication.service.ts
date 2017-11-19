// Http service [ Created by Loem 21-04-2017 ]

import { Injectable, EventEmitter } from '@angular/core';
@Injectable()
export class AuthenticationService {
    private authorizationKey: string = 'authorization';
    private authorizationDetail: string = 'user'; 
    private authorizationType: string = 'usertype'; 
    private authenticated: string;
    private authenticatedDetail: string;
    private authenticatedType: string;

    // get realtime authenticated : แสดงข้อมูล authenticated เมื่อมี event เกิดขึ้น
    public getAuthenticatedEvent: EventEmitter<string> = new EventEmitter<string>();

    // set authenticated : เซตข้อมูลใส่ authenticated
    setAuthenticated(name: string,detail:any): void {
        this.authenticated = name;
        this.authenticatedDetail = detail;
        this.authenticatedType = detail.status;
        this.storage.setItem(this.authorizationKey, this.authenticated);
        this.storage.setItem(this.authorizationDetail,JSON.stringify(this.authenticatedDetail));
        this.storage.setItem(this.authorizationType,JSON.stringify(this.authenticatedType));
        this.getAuthenticatedEvent.emit(this.authenticated);
    }

    // remove data authenticated : นำข้อมูลออกจาก  authenticated
    destroyAuthenticated() {
        this.authenticated = null;
        this.storage.removeItem(this.authorizationKey);
        this.getAuthenticatedEvent.emit(this.authenticated);
    }

    // get authenticated : แสดงข้อมูล authenticated
    get getAuthenticated(): string {
        this.authenticated = this.storage.getItem(this.authorizationKey);
        return this.authenticated;
    }

    // Convert localStorage to clien session : แปลงข้อมูล localStorage
    private get storage(): Storage {
        return localStorage;
    }

}