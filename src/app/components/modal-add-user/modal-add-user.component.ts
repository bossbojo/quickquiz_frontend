import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { m_addUser } from '../../model/m_addUser';
import { ValidatorsConfig } from '../../configs/validators.config';
import { jalert } from '../../configs/alert.config';
import { GlobalValueService } from '../../services/global-value.service';

@Component({
  selector: 'app-modal-add-user',
  templateUrl: './modal-add-user.component.html',
  styleUrls: ['./modal-add-user.component.scss']
})
export class ModalAddUserComponent implements OnChanges {
  @Input() modal: boolean;
  @Output() modalChange = new EventEmitter();
  @Output() Refresh = new EventEmitter();
  FormAddUser: FormGroup
  constructor(private build: FormBuilder, private http: HttpService,private global:GlobalValueService) { }

  ngOnChanges() {
    if (this.modal) {
      $('#add-user-modal').modal();
      this.SetFormGroup();
    }
  }
  Onclose() {
    this.modal = false;
    this.modalChange.emit(false);
  }
  SetFormGroup() {
    this.FormAddUser = this.build.group({
      Username: ['', [Validators.required]],
      Password: ['', [Validators.required, ValidatorsConfig.comparePassword('CPassword')]],
      CPassword: ['', [Validators.required, ValidatorsConfig.comparePassword('Password')]],
      UserType: [2, [Validators.required]]
    });
  }
  onComparePassword(password: HTMLInputElement, confirm_password: HTMLInputElement) {
    if (password.value.trim() == '' || confirm_password.value.trim() == '') return;
    if (password.value === confirm_password.value) {
      this.FormAddUser.controls['Password'].setErrors(null);
      this.FormAddUser.controls['CPassword'].setErrors(null);
    }
  }
  OnSubmit() {
    if (this.FormAddUser.valid) {
      this.global.OnShowLoading();
      this.global.OnChangeTextLoading('Wait for add user...');
      var obj = new m_addUser(
        this.FormAddUser.controls['Username'].value,
        this.FormAddUser.controls['Password'].value,
        this.FormAddUser.controls['UserType'].value,
      );
      this.http.requestPost(`add/user`, obj).subscribe((res) => {
        let result: any = res;
        //console.log(result.data);
        if (result.data.newUser) {
          this.global.OnHiddenLoading();
          jalert('Success','Success for add this username : '+result.data.newUser.username);
          $('#add-user-modal').modal('toggle');
          this.Refresh.emit(true);
        }else{
          this.global.OnHiddenLoading();
          jalert('Warning',result.data);
        }
      },(err)=>{
        this.global.OnHiddenLoading();
        jalert('ERROR',err);
      });
    } else {
      jalert('Add user', 'This field is required.')
    }

  }

}
