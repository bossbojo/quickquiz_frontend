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
  loadingimg = false;
  image = 'assets/img/user.png';
  constructor() {
    $('#bodymain').addClass('colorchangestudent');
   }

  ngOnInit() {
  }
  onFileChange(event) {
    this.loadingimg = true;
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
      //  this.FormSetting.get('avatar').setValue(reader.result.split(',')[1]);
        this.image = reader.result;
        this.loadingimg = false;
      };
    } else {
      this.loadingimg = false;
    }

  }
}
