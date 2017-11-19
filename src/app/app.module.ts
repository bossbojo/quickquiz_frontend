//modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgProgressModule, NgProgressBrowserXhr } from 'ngx-progressbar';
import { BrowserXhr, HttpModule } from '@angular/http';
import { RoutingModule } from './app.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//Services
import { LanguageService } from './services/language.service';
import { HttpService } from './services/http.service';
import { AuthenticationService } from './services/authentication.service';
import { AuthenticationGuard } from './guards/authentication.guard';
import { AllowAnonymousGuard } from './guards/allowAnonymous.guard';
//Directive
import { ValidationDirective } from './configs/validation.directive';
import { LanguagePipe } from './pipes/language.pipe';
//Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeAdminComponent } from './pages/home-admin/home-admin.component';
import { HomeTeacherComponent } from './pages/home-teacher/home-teacher.component';
import { HomeStudentComponent } from './pages/home-student/home-student.component';






@NgModule({
  declarations: [
    LanguagePipe,
    //Directive
    ValidationDirective,
    //components
    AppComponent,
    NavbarComponent,
    LoginComponent,
    HomeAdminComponent,
    HomeTeacherComponent,
    HomeStudentComponent
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
    AuthenticationService,
    HttpService,
    LanguageService,
    AuthenticationGuard,
    AllowAnonymousGuard,
    { provide: BrowserXhr, useClass: NgProgressBrowserXhr }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
