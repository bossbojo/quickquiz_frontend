// Http service [ Created by Loem 21-04-2017 ]

import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { UrlConfig } from '../configs/url.config';
import { StorageConfog } from '../configs/storage.config';
@Injectable()
export class AuthenticationService {
    private authorizationKey: string = 'authorization';
    private authorizationDetail: string = 'user'; 
    private authorizationType: string = 'usertype'; 
    private authenticated: string;
    private authenticatedDetail: string;
    private authenticatedType: string;
    constructor(private route:Router){}
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
    //logOut
    logout(){
        this.destroyAuthenticated();
        this.route.navigate(['/',UrlConfig.Login]);
        location.reload();
    }
    // get authenticated : แสดงข้อมูล authenticated
    get getAuthenticated(): string {
        this.authenticated = this.storage.getItem(this.authorizationKey);
        return this.authenticated;
    }
    get getUser(){
        return StorageConfog.getItem('user');
    }

    // Convert localStorage to clien session : แปลงข้อมูล localStorage
    private get storage(): Storage {
        return localStorage;
    }
    

}