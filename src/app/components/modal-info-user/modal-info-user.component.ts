import { Component, OnChanges,EventEmitter,Input, Output } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { baseUrl, baseUrlimg } from '../../configs/url.config';
import { jconfirm, jalert } from '../../configs/alert.config';
import { GlobalValueService } from '../../services/global-value.service';

@Component({
  selector: 'app-modal-info-user',
  templateUrl: './modal-info-user.component.html',
  styleUrls: ['./modal-info-user.component.scss']
})
export class ModalInfoUserComponent implements OnChanges {
  @Input() UserId;
  @Output() UserIdChange = new EventEmitter();
  image:any;
  profile:any;
  constructor(private http:HttpService,private GlobalValue:GlobalValueService) { }

  ngOnChanges() {
    if(this.UserId){
      $('#info-user-modal').modal();
      this.OnGetInfo()
    }
  }
  Onclose() {
    this.UserId = null;
    this.UserIdChange.emit(null);
  }
  OnGetInfo(){
    this.http.requestGet(`get/user/byid?id=${this.UserId}`).subscribe((res)=>{
      this.profile = res.data
      this.image = `${baseUrlimg}/Image/${this.profile.Image}`
    });
  }
  OnReset(username,id){
    jconfirm('Reset','Are you sure for reset this username : '+username).then((res)=>{
      if(!res)return;
      this.GlobalValue.OnShowLoading();
      this.http.requestGet(`reset/user?id=${id}`).subscribe((res)=>{
        jalert('Result',res.data);
        this.OnGetInfo()
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
          this.OnGetInfo()
          this.GlobalValue.OnHiddenLoading();
        });
      });
    }else{
      jconfirm('Unblock','Are you sure for unblock this username : '+username).then((res)=>{
        if(!res)return;
        this.GlobalValue.OnShowLoading();
        this.http.requestGet(`unblock/user?id=${id}`).subscribe((res)=>{
          jalert('Result',res.data);
          this.OnGetInfo()
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
        this.OnGetInfo()
        this.GlobalValue.OnHiddenLoading();
      });
    });
  }
}
