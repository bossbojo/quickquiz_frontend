import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-users-page',
  templateUrl: './admin-users-page.component.html',
  styleUrls: ['./admin-users-page.component.scss']
})
export class AdminUsersPageComponent implements OnInit {
  OpenAddUser: boolean = false;
  constructor() { }

  ngOnInit() {
  }

  OnOpenModalAdduser() {
    this.OpenAddUser = false;
    setTimeout(() => {
      this.OpenAddUser = true;
    }, 100);
  }

}
