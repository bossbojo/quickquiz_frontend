import { Component, OnChanges,OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { StorageConfog } from '../../configs/storage.config';
import { LanguageService } from '../../services/language.service';
import { UrlConfig } from '../../configs/url.config';
import { GlobalValueService } from '../../services/global-value.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnChanges,OnInit {
  Url = UrlConfig;
  UserType: number;
  Lang:string;
  constructor(private auth: AuthenticationService,private langService:LanguageService,private global:GlobalValueService) {
    this.UserType = StorageConfog.getItem('usertype');
    this.Lang = StorageConfog.getItem('lang');
  }
  ngOnInit(){
    setTimeout(() => {
      this.global.ToggleSidebar();
    }, 200);
  }
  ngOnChanges() {


  }
  Onlogout() {
    this.auth.logout();
  }
  ToggleSidebar(){
    this.global.ToggleSidebar();
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
}
