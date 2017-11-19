import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { HttpService, ResponseModel } from '../services/http.service';
import { Injectable } from '@angular/core';
import { UrlConfig } from '../configs/url.config';
import { AuthenticationService } from '../services/authentication.service';
@Injectable()
export class AllowAnonymousGuard implements CanActivate {
    constructor(private authService: AuthenticationService, private router: Router) { }
    canActivate(route, state: RouterStateSnapshot): boolean | Observable<boolean> {
        if (this.authService.getAuthenticated) {
            this.router.navigate(['/', UrlConfig.Login]);
            return false;
        }
        return true;
    }

}