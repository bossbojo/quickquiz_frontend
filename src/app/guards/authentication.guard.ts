import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { HttpService, ResponseModel } from '../services/http.service';
import { Injectable } from '@angular/core';
import { UrlConfig } from '../configs/url.config';
import { AuthenticationService } from '../services/authentication.service';
import { GlobalValueService } from '../services/global-value.service';
@Injectable()
export class AuthenticationGuard implements CanActivate {
    constructor(private http: HttpService, private router: Router, private authService: AuthenticationService,private global:GlobalValueService) { }
    canActivate(route, state): boolean | Observable<boolean> {
        // check authorizeation request from server
        return <Observable<any>>this.http.requestGet('Authentication')
            .finally(() => setTimeout(() => this.global.OnHiddenLoading(), 1500))
            .map(res => this.destroyAuthenticated(res.data))
            .catch(res => this.destroyAuthenticatedCatch(res));
    }

    private destroyAuthenticatedCatch(res): any {
        this.authService.destroyAuthenticated();
        this.router.navigate(['/', UrlConfig.Login]);
        // location.reload();
        this.global.OnHiddenLoading();
        return Observable.of(res);
    }

    private destroyAuthenticated(res: ResponseModel): any {
        if (!res.Token || res.Token.trim() == '') {
            this.authService.destroyAuthenticated();
            // location.reload();
            this.router.navigate(['/', UrlConfig.Login]);
        }
        this.global.OnHiddenLoading();
        return res.Token.trim() != '';
    }

}