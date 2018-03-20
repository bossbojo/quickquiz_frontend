import { GlobalValueService } from './../../services/global-value.service';
import { baseUrlimg } from './../../configs/url.config';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { jalert } from '../../configs/alert.config';

@Component({
  selector: 'app-teacher-setting',
  templateUrl: './teacher-setting.component.html',
  styleUrls: ['./teacher-setting.component.scss']
})
export class TeacherSettingComponent implements OnInit {
  TabMenu = 'edit-profile';
  FormChangePass: FormGroup;
  FormSetting: FormGroup;
  image;
  imageBase64;
  User:any;
  profile:any;
  loadingimg = false;
  constructor(private Global:GlobalValueService,private http: HttpService, private build: FormBuilder) {
    this.User = this.Global.User;
    this.FormChangePass = this.build.group({
      old_password: ['', [Validators.required]],
      new_password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]]
    });
    this.SetFormSetting();
   }

  ngOnInit() {
  }
  SetFormSetting(){
    this.OnGetInfo();
    this.FormSetting = this.build.group({
        "img":['',[Validators.required]],
        "firstname":[this.User.firstname,[Validators.required]],
        "lastname":[this.User.lastname,[Validators.required]]
    });
  }
  OnGetInfo(){
    this.http.requestGet(`get/user/byid?id=${this.User.user_id}`).subscribe((res)=>{
      this.profile = res.data
      this.image = `${baseUrlimg}/Image/${this.profile.Image}`
    });
  }
  onFileChange(event) {
    this.loadingimg = true;
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.FormSetting.controls['img'].setValue(reader.result.split(',')[1]);
        this.imageBase64 = reader.result;
        this.loadingimg = false;
      };
    } else {
      this.loadingimg = false;
    }
  }
  OnSubmit(){
    if(this.FormSetting.valid){
      this.http.requestPut(`edit/prifile`,this.FormSetting.value).subscribe((res:any)=>{
        if(res.data){
          jalert('Success','success for edit profile');
          this.OnGetInfo();
        }
      },err => jalert('Warning','failed for edit profile'));
    }
  }
  OnSubmitPass() {
    if (this.FormChangePass.valid) {
      if (this.FormChangePass.controls['new_password'].value == this.FormChangePass.controls['confirm_password'].value) {
        this.http.requestPut(`change/password`, {
          "old_password": this.FormChangePass.controls['old_password'].value,
          "new_password": this.FormChangePass.controls['confirm_password'].value
        }).subscribe((res: any) => {
          if (res.data) {
            jalert('Success', 'success for change password')
            this.FormChangePass.reset();
          }
        }, err => {
          jalert('Warning', err.data.Message)
        });
      } else {
        jalert('Warning', 'new password and confirm password not macth.')
      }
    } else {
      jalert('Warning', 'Check your input.')
    }
  }
}
