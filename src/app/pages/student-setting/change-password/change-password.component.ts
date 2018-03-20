import { GlobalValueService } from './../../../services/global-value.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from './../../../services/http.service';
import { Component, OnInit, EventEmitter, Input, Output, OnChanges } from '@angular/core';
import { jalert } from '../../../configs/alert.config';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnChanges {
  @Input() OpenClose: boolean;
  @Output() OpenCloseChange = new EventEmitter();
  FormChangePass: FormGroup;
  constructor(private http: HttpService, private build: FormBuilder,private GlobalValue:GlobalValueService) {
    this.FormChangePass = this.build.group({
      old_password: ['', [Validators.required]],
      new_password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]]
    });
  }

  ngOnChanges() {
    if (this.OpenClose) {
      $('#student-password').modal();
    }
  }
  Onclose() {
    $('#student-password').modal('hide');
    this.OpenCloseChange.emit(false);
  }
  OnSubmit() {
    if (this.FormChangePass.valid) {
      this.GlobalValue.OnShowLoading();
      if (this.FormChangePass.controls['new_password'].value == this.FormChangePass.controls['confirm_password'].value) {
        this.http.requestPut(`change/password`, {
          "old_password": this.FormChangePass.controls['old_password'].value,
          "new_password": this.FormChangePass.controls['confirm_password'].value
        }).subscribe((res: any) => {
          if (res.data) {
            jalert('Success', 'success for change password')
            this.FormChangePass.reset();
            this.Onclose();
          }
          this.GlobalValue.OnHiddenLoading();
        }, err => {
          this.GlobalValue.OnHiddenLoading();
          jalert('Warning', err.data.Message)
        });
      } else {
        this.GlobalValue.OnHiddenLoading();
        jalert('Warning', 'new password and confirm password not macth.')
      }
    } else {
      this.GlobalValue.OnHiddenLoading();
      jalert('Warning', 'Check your input.')
    }
  }
}
