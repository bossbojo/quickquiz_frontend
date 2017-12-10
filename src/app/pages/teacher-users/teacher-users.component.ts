import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { jconfirm, jalert } from '../../configs/alert.config';
import { GlobalValueService } from '../../services/global-value.service';
import { StorageConfog } from '../../configs/storage.config';

@Component({
  selector: 'app-teacher-users',
  templateUrl: './teacher-users.component.html',
  styleUrls: ['./teacher-users.component.scss']
})
export class TeacherUsersComponent implements OnInit {

  OpenAddUser: boolean = false;
  UserId;
  UserAllData: any;
  UserType;
  User;
  constructor(private http: HttpService, private GlobalValue: GlobalValueService) {
   // this.OnGetDataAll();
  }

  ngOnInit() {
    this.UserType = StorageConfog.getItem('usertype');
    this.User = StorageConfog.getItem('user');
    this.OnGetDataAll();
  }

  OnOpenModalAdduser() {
    this.OpenAddUser = false;
    setTimeout(() => {
      this.OpenAddUser = true;
    }, 100);
  }
  OnGetDataAll() {
    this.http.requestGet(`get/user/for/teacher?id=${this.User.user_id}`).subscribe((res) => {
      this.UserAllData = res;
      this.UserAllData = this.UserAllData.data;
    });
  }
  OnRefresh(event) {
    if (event) {
      this.OnGetDataAll();
    }
  }
  OnShow(username, id) {
    this.UserId = null;
    setTimeout(() => {
      this.UserId = id;
    }, 100);
  }
  OnReset(username, id) {
    jconfirm('Reset', 'Are you sure for reset this username : ' + username).then((res) => {
      if (!res) return;
      this.GlobalValue.OnShowLoading();
      this.http.requestGet(`reset/user?id=${id}`).subscribe((res) => {
        jalert('Result', res.data);
        this.OnGetDataAll()
        this.GlobalValue.OnHiddenLoading();
      });
    });
  }
  OnBlock(username, id, type) {
    if (type == 1) {
      jconfirm('Block', 'Are you sure for block this username : ' + username).then((res) => {
        if (!res) return;
        this.GlobalValue.OnShowLoading();
        this.http.requestGet(`block/user?id=${id}`).subscribe((res) => {
          jalert('Result', res.data);
          this.OnGetDataAll()
          this.GlobalValue.OnHiddenLoading();
        });
      });
    } else {
      jconfirm('Unblock', 'Are you sure for unblock this username : ' + username).then((res) => {
        if (!res) return;
        this.GlobalValue.OnShowLoading();
        this.http.requestGet(`unblock/user?id=${id}`).subscribe((res) => {
          jalert('Result', res.data);
          this.OnGetDataAll()
          this.GlobalValue.OnHiddenLoading();
        });
      });
    }

  }
  OnRemove(username, id) {
    jconfirm('Remove', 'Are you sure for remove this username : ' + username).then((res) => {
      if (!res) return;
      this.GlobalValue.OnShowLoading();
      this.http.requestDelete(`remove/user?id=${id}`).subscribe((res) => {
        jalert('Result', res.data);
        this.OnGetDataAll()
        this.GlobalValue.OnHiddenLoading();
      });
    });
  }
}
