import { UrlConfig } from "./configs/url.config";
import { RouterModule, Routes, CanActivate } from '@angular/router';
//pages
import { LoginComponent } from "./pages/login/login.component";
import { HomeAdminComponent } from './pages/admin/home-admin.component';
import { HomeTeacherComponent } from './pages/teacher/home-teacher.component';
import { HomeStudentComponent } from './pages/student/home-student.component';
import { AllowAnonymousGuard } from "./guards/allowAnonymous.guard";
import { AuthenticationGuard } from "./guards/authentication.guard";
import { StorageConfog } from "./configs/storage.config";
import { AcceptAdminGuard } from "./guards/AcceptAdmin.guard";
import { AcceptTeacherGuard } from "./guards/AcceptTeacher.guard";
import { AcceptStudentGuard } from "./guards/AcceptStudent.guard";
import { AdminUsersPageComponent } from "./pages/admin-users-page/admin-users-page.component";
import { AdminLogUsersComponent } from "./pages/admin-log-users/admin-log-users.component";
import { AdminBinPageComponent } from './pages/admin-bin-page/admin-bin-page.component';
import { TeacherUsersComponent } from './pages/teacher-users/teacher-users.component';

const Url = UrlConfig; 

export const RoutesList: Routes = [
    { path: Url.Login, component: LoginComponent ,canActivate: [AllowAnonymousGuard]},
    //admin
    { path: Url.HomeAdmin, component: HomeAdminComponent  ,canActivate: [AuthenticationGuard,AcceptAdminGuard]},
    { path: Url.AdminUsers, component: AdminUsersPageComponent  ,canActivate: [AuthenticationGuard,AcceptAdminGuard]},
    { path: Url.AdminLogUsers, component: AdminLogUsersComponent  ,canActivate: [AuthenticationGuard,AcceptAdminGuard]},
    { path: Url.AdminBin, component: AdminBinPageComponent  ,canActivate: [AuthenticationGuard,AcceptAdminGuard]},
    //teacher
    { path: Url.HomeTeacher, component: HomeTeacherComponent  ,canActivate: [AuthenticationGuard,AcceptTeacherGuard]},
    { path: Url.TeacherUsers, component: TeacherUsersComponent  ,canActivate: [AuthenticationGuard,AcceptTeacherGuard]},
    //student
    { path: Url.HomeStudent, component: HomeStudentComponent  ,canActivate: [AuthenticationGuard,AcceptStudentGuard]},

    { path: '**', redirectTo:Url.Login, pathMatch: 'full' },
];

export const RoutingModule = RouterModule.forRoot(RoutesList);