import { baseUrlimg } from './../../configs/url.config';
import { GlobalValueService } from './../../services/global-value.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { jalert, jconfirm } from '../../configs/alert.config';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-student-setting',
  templateUrl: './student-setting.component.html',
  styleUrls: ['./student-setting.component.scss']
})
export class StudentSettingComponent implements OnInit {
  FormSetting: FormGroup;
  OpenChangePass:boolean = false;
  loadingimg = false;
  image;
  imageBase64;
  User:any;
  profile:any;
  constructor(private Global:GlobalValueService,private http:HttpService,private build:FormBuilder) {
    $('#bodymain').addClass('colorchangestudent');
    this.User = this.Global.User;
    this.SetFormSetting();
   }
  SetFormSetting(){
    this.OnGetInfo();
    this.FormSetting = this.build.group({
        "img":['',[Validators.required]],
        "firstname":[this.User.firstname,[Validators.required]],
        "lastname":[this.User.lastname,[Validators.required]]
    });
  }
  ngOnInit() {
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
}
