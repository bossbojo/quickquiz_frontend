import { Component, OnInit } from '@angular/core';
import { StorageConfog } from '../../configs/storage.config';
import { AuthenticationService } from '../../services/authentication.service';
import { UrlConfig } from '../../configs/url.config';
import { GlobalValueService } from '../../services/global-value.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  Url = UrlConfig;
  UserType: number;
  constructor(private auth: AuthenticationService,private global:GlobalValueService) {
    this.UserType = StorageConfog.getItem('usertype');
   }

  ngOnInit() {
  }
  Onlogout() {
    this.auth.logout();
  }
  ActiveBtn(){
    this.global.ToggleSidebar();
  }
}
