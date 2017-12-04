import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { GlobalValueService } from '../../services/global-value.service';
import { jconfirm, jalert } from '../../configs/alert.config';

@Component({
  selector: 'app-admin-bin-page',
  templateUrl: './admin-bin-page.component.html',
  styleUrls: ['./admin-bin-page.component.scss']
})
export class AdminBinPageComponent implements OnInit {
  UserAllDataRemove;
  constructor(private http: HttpService,private GlobalValue:GlobalValueService) { }

  ngOnInit() {
    this.OnGetDataAll();
  }
  OnGetDataAll() {
    this.http.requestGet(`get/user/remove`).subscribe((res) => {
      this.UserAllDataRemove = res;
      this.UserAllDataRemove = this.UserAllDataRemove.data;
    });
  }
  OnRecovery(id){
    jconfirm('Recovery','Are you sure for recovery this id : '+id).then((res)=>{
      if(!res)return;
      this.GlobalValue.OnShowLoading();
      this.http.requestGet(`recovery/user?id=${id}`).subscribe((res)=>{
        jalert('Result',res.data);
        this.OnGetDataAll()
        this.GlobalValue.OnHiddenLoading();
      });
    });
  }
  OnRecoveryAll(){
    jconfirm('Recovery all','Are you sure for recovery all').then((res)=>{
      if(!res)return;
      this.GlobalValue.OnShowLoading();
      this.http.requestGet(`recovery/user/all`).subscribe((res)=>{
        jalert('Result',res.data);
        this.OnGetDataAll()
        this.GlobalValue.OnHiddenLoading();
      });
    });
  }
}
