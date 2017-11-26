import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { HttpService, ResponseModel } from '../services/http.service';
import { Injectable } from '@angular/core';
import { UrlConfig } from '../configs/url.config';
import { AuthenticationService } from '../services/authentication.service';
import { StorageConfog } from '../configs/storage.config';
@Injectable()
export class AcceptAdminGuard implements CanActivate {
    Url = UrlConfig;
    constructor(private authService: AuthenticationService, private router: Router) { }
    canActivate(route, state: RouterStateSnapshot): boolean | Observable<boolean> {
        if(parseInt(StorageConfog.getItem('usertype'))==1){
            return true;
        }else{
            this.router.navigate(['/',this.Url.Login ]);
            return false;
        }
    }

}