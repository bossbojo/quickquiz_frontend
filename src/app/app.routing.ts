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
import { ManagementComponent } from './pages/management/management.component';

import { StudentProfileComponent } from './pages/student-profile/student-profile.component';
import { StudentQuizReadyComponent } from './pages/student-quiz-ready/student-quiz-ready.component';
import { StudentQuizStartComponent } from './pages/student-quiz-start/student-quiz-start.component';
import { StudentQuizScoreComponent } from './pages/student-quiz-score/student-quiz-score.component';
import { StudentSettingComponent } from './pages/student-setting/student-setting.component';

import { TeacherListQuizComponent } from './pages/teacher-list-quiz/teacher-list-quiz.component';
import { TeacherReportComponent } from './pages/teacher-report/teacher-report.component';
import { TeacherStartQuizComponent } from './pages/teacher-start-quiz/teacher-start-quiz.component';
import { TeacherSettingComponent } from './pages/teacher-setting/teacher-setting.component';

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
    { path: Url.TeacherListQuiz, component: TeacherListQuizComponent  ,canActivate: [AuthenticationGuard,AcceptTeacherGuard]},
    { path: Url.TeacherReport, component: TeacherReportComponent  ,canActivate: [AuthenticationGuard,AcceptTeacherGuard]},
    { path: Url.TeacherStartQuiz, component: TeacherStartQuizComponent  ,canActivate: [AuthenticationGuard,AcceptTeacherGuard]},
    { path: Url.TeacherSetting, component: TeacherSettingComponent  ,canActivate: [AuthenticationGuard,AcceptTeacherGuard]},
    //student
    { path: Url.HomeStudent, component: HomeStudentComponent  ,canActivate: [AuthenticationGuard,AcceptStudentGuard]},
    { path: Url.StudentProfile , component: StudentProfileComponent  ,canActivate: [AuthenticationGuard,AcceptStudentGuard]},
    { path: Url.StudentQuizReady , component: StudentQuizReadyComponent  ,canActivate: [AuthenticationGuard,AcceptStudentGuard]},
    { path: Url.StudentQuizStart , component: StudentQuizStartComponent  ,canActivate: [AuthenticationGuard,AcceptStudentGuard]},
    { path: Url.StudentQuizScore , component: StudentQuizScoreComponent  ,canActivate: [AuthenticationGuard,AcceptStudentGuard]},
    { path: Url.StudentSetting , component: StudentSettingComponent  ,canActivate: [AuthenticationGuard,AcceptStudentGuard]},
    //teacher of admin
    { path: Url.Management, component: ManagementComponent  ,canActivate: [AuthenticationGuard]},
    { path: '**', redirectTo:Url.Login, pathMatch: 'full' },
];

export const RoutingModule = RouterModule.forRoot(RoutesList);