import { ChangePasswordComponent } from './pages/student-setting/change-password/change-password.component';
import { DatePipe } from '@angular/common';
import { ReportComponent } from './pages/teacher-list-quiz/report/report.component';
import { SignalRService } from './services/SignalR.service';

//modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgProgressModule, NgProgressBrowserXhr } from 'ngx-progressbar';
import { BrowserXhr, HttpModule } from '@angular/http';
import { RoutingModule } from './app.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRouteSnapshot } from '@angular/router';
//Services
import { LanguageService } from './services/language.service';
import { HttpService } from './services/http.service';
import { AuthenticationService } from './services/authentication.service';
import { GlobalValueService } from './services/global-value.service';
//Directive
import { ValidationDirective } from './configs/validation.directive';
import { LanguagePipe } from './pipes/language.pipe';
//Guards
import { AcceptAdminGuard } from './guards/AcceptAdmin.guard';
import { AcceptStudentGuard } from './guards/AcceptStudent.guard';
import { AcceptTeacherGuard } from './guards/AcceptTeacher.guard';
import { AuthenticationGuard } from './guards/authentication.guard';
import { AllowAnonymousGuard } from './guards/allowAnonymous.guard';
//Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ModalInfoUserComponent } from './components/modal-info-user/modal-info-user.component';
import { VerifyUserComponent } from './components/verify-user/verify-user.component';
import { ModalAddUserComponent } from './components/modal-add-user/modal-add-user.component';
import { ModalCreateCodeComponent } from './pages/teacher-list-quiz/modal-create-code/modal-create-code.component';
import { ModalCreateQuestionComponent } from './pages/teacher-list-quiz/modal-create-question/modal-create-question.component';
//page
import { AdminUsersPageComponent } from './pages/admin-users-page/admin-users-page.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeAdminComponent } from './pages/admin/home-admin.component';
import { HomeTeacherComponent } from './pages/teacher/home-teacher.component';
import { HomeStudentComponent } from './pages/student/home-student.component';
import { AdminLogUsersComponent } from './pages/admin-log-users/admin-log-users.component';
import { AdminBinPageComponent } from './pages/admin-bin-page/admin-bin-page.component';
import { TeacherUsersComponent } from './pages/teacher-users/teacher-users.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ManagementComponent } from './pages/management/management.component';
import { NavbarStudentComponent } from './components/navbar-student/navbar-student.component';
import { StudentProfileComponent } from './pages/student-profile/student-profile.component';
import { StudentQuizReadyComponent } from './pages/student-quiz-ready/student-quiz-ready.component';
import { StudentQuizStartComponent } from './pages/student-quiz-start/student-quiz-start.component';
import { StudentQuizScoreComponent } from './pages/student-quiz-score/student-quiz-score.component';
import { StudentSettingComponent } from './pages/student-setting/student-setting.component';
import { TeacherListQuizComponent } from './pages/teacher-list-quiz/teacher-list-quiz.component';
import { TeacherReportComponent } from './pages/teacher-report/teacher-report.component';
import { TeacherStartQuizComponent } from './pages/teacher-start-quiz/teacher-start-quiz.component';
import { TeacherSettingComponent } from './pages/teacher-setting/teacher-setting.component';

@NgModule({
  declarations: [
    LanguagePipe,
    //Directive
    ValidationDirective,
    //components
    ChangePasswordComponent,
    ModalCreateQuestionComponent,
    AppComponent,
    NavbarComponent,
    LoginComponent,
    HomeAdminComponent,
    HomeTeacherComponent,
    HomeStudentComponent,
    SidebarComponent,
    AdminUsersPageComponent,
    AdminLogUsersComponent,
    AdminBinPageComponent,
    ModalAddUserComponent,
    VerifyUserComponent,
    ModalInfoUserComponent,
    TeacherUsersComponent,
    ProfileComponent,
    ManagementComponent,
    NavbarStudentComponent,
    StudentProfileComponent,
    StudentQuizReadyComponent,
    StudentQuizStartComponent,
    StudentQuizScoreComponent,
    StudentSettingComponent,
    TeacherListQuizComponent,
    TeacherReportComponent,
    ReportComponent,
    TeacherStartQuizComponent,
    TeacherSettingComponent,
    ModalCreateCodeComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    NgProgressModule,
    RoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    GlobalValueService,
    AuthenticationService,
    HttpService,
    LanguageService,
    { provide: BrowserXhr, useClass: NgProgressBrowserXhr },
    //Guard
    AcceptAdminGuard,
    AcceptStudentGuard,
    AcceptTeacherGuard,
    AuthenticationGuard,
    AllowAnonymousGuard,
    DatePipe,
    SignalRService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
