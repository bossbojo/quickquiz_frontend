import { UrlConfig } from "./configs/url.config";
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { LoginComponent } from "./pages/login/login.component";

const Url = UrlConfig; 
export const RoutesList: Routes = [
    { path: Url.Login, component: LoginComponent },
];

export const RoutingModule = RouterModule.forRoot(RoutesList);