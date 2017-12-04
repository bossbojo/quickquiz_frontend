import { Component, OnChanges,Input,EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { jalert, jconfirm } from '../../configs/alert.config';
import { HttpService } from '../../services/http.service';
import { m_verifyUser } from '../../model/m_verifyUser';
import { GlobalValueService } from '../../services/global-value.service';

@Component({
  selector: 'app-verify-user',
  templateUrl: './verify-user.component.html',
  styleUrls: ['./verify-user.component.scss']
})
export class VerifyUserComponent implements OnChanges {
  @Input() username:any;
  @Output() login = new EventEmitter();
  FormVerify:FormGroup;
  constructor(private build: FormBuilder,private http:HttpService,private global:GlobalValueService) { }

  ngOnChanges() {
    if(this.username){
      this.SetFormGroup();
      $('#verify-modal').modal();
    }
  }
  SetFormGroup() {
    this.FormVerify = this.build.group({     
      username: [this.username, [Validators.required]],
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      faculty: ['', [Validators.required]],
      branch: ['', [Validators.required]],
      university: ['', [Validators.required]]
    });
  }
  OnSubmit(){
    if(this.FormVerify.valid){
      var obj = new m_verifyUser(
        this.FormVerify.controls['username'].value,
        this.FormVerify.controls['firstname'].value,
        this.FormVerify.controls['lastname'].value,
        this.FormVerify.controls['faculty'].value,
        this.FormVerify.controls['branch'].value,
        this.FormVerify.controls['university'].value
      );
      this.global.OnShowLoading();
      this.global.OnChangeTextLoading('Wait for verify...')
      this.http.requestPost(`verify`,obj).subscribe((res)=>{
        let result:any = res;
        if(result.data.username){
          jconfirm('Success','Success for verify. You want login?').then((res)=>{
            if(!res){
              this.global.OnHiddenLoading();
              return;
            }
            this.login.emit(true);
            this.global.OnHiddenLoading();
          });
        }
      });
    }else{
      jalert('Add user', 'This field is required.')
    }
  }
}
