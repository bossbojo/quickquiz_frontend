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
  title = 'app';
  constructor(private AuthenSer: AuthenticationService, private route: Router, private global: GlobalValueService) {
    StorageConfog.setItem('lang', 'EN');
    $(document).ready(function () {
      $('[data-toggle="tooltip"]').tooltip();
    });
  }
  onGetComponent(e) {
    this.global.Active = this.route.url.split('/')[1];
    if (this.global.Active == 'login') {
      this.NavberAdmin = false;
      $('#bodymain').addClass('colorchange')
      $('#sidebar-main').addClass('sidebar-hidden');
    } else {
      $('#bodymain').removeClass('colorchange')
    }
    if (this.AuthenSer.getAuthenticated) {
      if (StorageConfog.getItem('usertype') == 2) return;
      this.NavberAdmin = true;
    }
  }
  OnHiddenSidebar() {
    $('#sidebar-main').addClass('sidebar-hidden');
  }
}
