import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { HttpService, ResponseModel } from '../services/http.service';
import { Injectable } from '@angular/core';
import { UrlConfig } from '../configs/url.config';
import { AuthenticationService } from '../services/authentication.service';
import { StorageConfog } from '../configs/storage.config';
@Injectable()
export class AllowAnonymousGuard implements CanActivate {
    Url = UrlConfig;
    HomePack = [this.Url.HomeAdmin,this.Url.HomeStudent,this.Url.HomeTeacher]
    constructor(private authService: AuthenticationService, private router: Router) { }
    canActivate(route, state: RouterStateSnapshot): boolean | Observable<boolean> {
        if (this.authService.getAuthenticated) {
            this.router.navigate(['/',this.HomePack[parseInt(StorageConfog.getItem('usertype'))-1] ]);
            return false;
        }
        return true;
    }

}