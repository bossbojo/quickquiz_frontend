import { UrlConfig } from "./configs/url.config";
import { RouterModule, Routes, CanActivate } from '@angular/router';
//pages
import { LoginComponent } from "./pages/login/login.component";
import { HomeAdminComponent } from './pages/home-admin/home-admin.component';
import { HomeTeacherComponent } from './pages/home-teacher/home-teacher.component';
import { HomeStudentComponent } from './pages/home-student/home-student.component';
import { AllowAnonymousGuard } from "./guards/allowAnonymous.guard";
import { AuthenticationGuard } from "./guards/authentication.guard";
import { StorageConfog } from "./configs/storage.config";

const Url = UrlConfig; 

export const RoutesList: Routes = [
    { path: Url.Login, component: LoginComponent ,canActivate: [AllowAnonymousGuard]},
    //admin
    { path: Url.HomeAdmin, component: HomeAdminComponent  ,canActivate: [AuthenticationGuard]},
    //teacher
    { path: Url.HomeTeacher, component: HomeTeacherComponent  ,canActivate: [AuthenticationGuard]},
    //student
    { path: Url.HomeStudent, component: HomeStudentComponent  ,canActivate: [AuthenticationGuard]},

    { path: '**', redirectTo:Url.Login, pathMatch: 'full' },
];

export const RoutingModule = RouterModule.forRoot(RoutesList);