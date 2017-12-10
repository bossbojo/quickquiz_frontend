import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators} from '@angular/forms';
import { m_Login } from '../../model/m_Login';
import { jalert, jconfirm } from '../../configs/alert.config';
import { LanguageService } from '../../services/language.service';
import { StorageConfog } from '../../configs/storage.config';
import { HttpService } from '../../services/http.service';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { UrlConfig } from '../../configs/url.config';
import { GlobalValueService } from '../../services/global-value.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  Url = UrlConfig;
  FromLogin:FormGroup;
  BtnThai;
  BtnEng;
  Username;
  constructor(private build:FormBuilder,private langService:LanguageService ,private http:HttpService,private Authen:AuthenticationService,private route:Router,private global:GlobalValueService) {

    this.FromLogin = this.build.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
   }

  ngOnInit() {
    this.ActiveCheckLang('TH');
    this.global.OnHiddenLoading();
  }
  OnSubmit(){
    this.global.OnShowLoading();
    this.global.OnChangeTextLoading('Wait for login...');
    if(this.FromLogin.valid){
      let RequestLogin = new m_Login(this.FromLogin.controls['username'].value,this.FromLogin.controls['password'].value);
      this.http.requestPost('signin',RequestLogin).subscribe((res)=>{
          if(this.Authen.getAuthenticated){
            let statusUser = StorageConfog.getItem('usertype')
              if(statusUser == 1){
                this.route.navigate(['/',this.Url.HomeAdmin]);
                location.reload();
              }else if(statusUser == 2){
                this.route.navigate(['/',this.Url.HomeStudent]);
                location.reload();
              }else{
                this.route.navigate(['/',this.Url.HomeTeacher]);
                location.reload();
              }
              this.global.OnHiddenLoading();
          }else{
            if(res.data == 'Not Verify'){
              jconfirm('Warning','This account not verify. You want verify?').then((res)=>{
                if(!res){
                  this.global.OnHiddenLoading();
                  return;
                }
                this.Username = null;
                setTimeout(() => {
                  this.Username = this.FromLogin.controls['username'].value;
                }, 100);
                this.global.OnHiddenLoading();
                return;
              });
              return;
            }
            jalert('Login warning',res.data); 
            this.global.OnHiddenLoading();
          }
      },(err)=>{
        jalert('Error',err.status +' : '+err.statusText)
        this.global.OnHiddenLoading();
      });
    }else{
      jalert('Login warning','Please check your input.')
      this.global.OnHiddenLoading();
    }   
  }
  OnchangeLang(lang){
    this.langService.setLanguage(lang)
  }
  ActiveCheckLang(lang){
    StorageConfog.setItem('lang',lang);
    let Activelang = StorageConfog.getItem('lang');
    if(Activelang == 'TH'){
      this.BtnThai = 'btn-info';
      this.BtnEng = '';
    }else{
      this.BtnThai = '';
      this.BtnEng = 'btn-info';
    }
  }
  
}