import { Component, OnInit } from '@angular/core';
import { StorageConfog } from '../../configs/storage.config';
import { LanguageService } from '../../services/language.service';
import { AuthenticationService } from '../../services/authentication.service';
import { HttpService } from '../../services/http.service';
import { baseUrlimg, UrlConfig } from '../../configs/url.config';

@Component({
  selector: 'app-navbar-student',
  templateUrl: './navbar-student.component.html',
  styleUrls: ['./navbar-student.component.scss']
})
export class NavbarStudentComponent implements OnInit {
  Lang:string;
  User:any;
  profile:any;
  image:any;
  Url = UrlConfig;
  constructor(private auth: AuthenticationService,private langService:LanguageService,private http:HttpService) { 
    this.Lang = StorageConfog.getItem('lang');
    this.User = StorageConfog.getItem('user');
    this.OnGetInfo();
    
  }

  ngOnInit() {
  }
  OnchangeLang(lang){
    if(this.Lang == 'EN'){
      this.Lang = 'TH'
      this.langService.setLanguage(this.Lang);
      return;
    }
    this.Lang = 'EN'
    this.langService.setLanguage(this.Lang);
  }
  Onlogout() {
    this.auth.logout();
  }
  OnGetInfo(){
    this.http.requestGet(`get/user/byid?id=${this.User.user_id}`).subscribe((res)=>{
      this.profile = res.data
      this.image = `${baseUrlimg}/Image/${this.profile.Image}`
    });
  }
}
