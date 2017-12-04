import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { jconfirm, jalert } from '../../configs/alert.config';
import { GlobalValueService } from '../../services/global-value.service';

@Component({
  selector: 'app-admin-users-page',
  templateUrl: './admin-users-page.component.html',
  styleUrls: ['./admin-users-page.component.scss']
})
export class AdminUsersPageComponent implements OnInit {
  OpenAddUser: boolean = false;
  UserAllData: any;
  constructor(private http: HttpService,private GlobalValue:GlobalValueService) {
    this.OnGetDataAll();
  }

  ngOnInit() {

  }

  OnOpenModalAdduser() {
    this.OpenAddUser = false;
    setTimeout(() => {
      this.OpenAddUser = true;
    }, 100);
  }
  OnGetDataAll() {
    this.http.requestGet(`get/user`).subscribe((res) => {
      this.UserAllData = res;
      this.UserAllData = this.UserAllData.data;
    });
  }
  OnRefresh(event) {
    if (event) {
      this.OnGetDataAll();
    }
  }
  OnShow(username,id) {
    //console.log(username);
  }
  OnEdit(username,id) {
    //console.log(username);
  }
  OnReset(username,id){
    jconfirm('Reset','Are you sure for reset this username : '+username).then((res)=>{
      if(!res)return;
      this.GlobalValue.OnShowLoading();
      this.http.requestGet(`reset/user?id=${id}`).subscribe((res)=>{
        jalert('Result',res.data);
        this.OnGetDataAll()
        this.GlobalValue.OnHiddenLoading();
      });
    });
  }
  OnBlock(username,id,type){
    if(type == 1){
      jconfirm('Block','Are you sure for block this username : '+username).then((res)=>{
        if(!res)return;
        this.GlobalValue.OnShowLoading();
        this.http.requestGet(`block/user?id=${id}`).subscribe((res)=>{
          jalert('Result',res.data);
          this.OnGetDataAll()
          this.GlobalValue.OnHiddenLoading();
        });
      });
    }else{
      jconfirm('Unblock','Are you sure for unblock this username : '+username).then((res)=>{
        if(!res)return;
        this.GlobalValue.OnShowLoading();
        this.http.requestGet(`unblock/user?id=${id}`).subscribe((res)=>{
          jalert('Result',res.data);
          this.OnGetDataAll()
          this.GlobalValue.OnHiddenLoading();
        });
      });
    }

  }
  OnRemove(username,id){
    jconfirm('Remove','Are you sure for remove this username : '+username).then((res)=>{
      if(!res)return;
      this.GlobalValue.OnShowLoading();
      this.http.requestDelete(`remove/user?id=${id}`).subscribe((res)=>{
        jalert('Result',res.data);
        this.OnGetDataAll()
        this.GlobalValue.OnHiddenLoading();
      });
    });
  }
}
