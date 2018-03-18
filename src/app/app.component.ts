import { SignalRService } from './services/SignalR.service';
import { Component, OnChanges } from '@angular/core';
import { StorageConfog } from './configs/storage.config';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router'
import { GlobalValueService } from './services/global-value.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  NavberAdmin: boolean = false;
  NavberStudent: boolean = false;
  title = 'app';
  constructor(private AuthenSer: AuthenticationService, private route: Router, private global: GlobalValueService,private signalr:SignalRService) {
    StorageConfog.setItem('lang', 'TH');
    this.signalr.OnStartSignalR();
  }
  onGetComponent(e) {
    //this.global.ToggleSidebar();
    this.global.Active = this.route.url.split('/')[1];
    if (this.global.Active == 'login') {
      this.NavberAdmin = false;
      this.NavberStudent = false;
      $('#bodymain').addClass('colorchange')
      $('#sidebar-main').addClass('sidebar-hidden');
    } else {
      $('#bodymain').removeClass('colorchange')
    }
    if (this.AuthenSer.getAuthenticated) {
      if (StorageConfog.getItem('usertype') == 2) {
        this.NavberStudent = true;
      } else {
        this.NavberAdmin = true;
      }
    }
  }
  OnHiddenSidebar() {
    if (!this.global.OpenSideBar) {
      this.global.ToggleSidebar();
    }

  }
}
