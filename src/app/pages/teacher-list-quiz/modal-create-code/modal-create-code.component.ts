import { HttpService } from './../../../services/http.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GlobalValueService } from './../../../services/global-value.service';
import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { jalert } from '../../../configs/alert.config';

@Component({
  selector: 'app-modal-create-code',
  templateUrl: './modal-create-code.component.html',
  styleUrls: ['./modal-create-code.component.scss']
})
export class ModalCreateCodeComponent implements OnChanges {
  @Input() modal: boolean;
  @Output() modalChange = new EventEmitter();
  @Output() Data = new EventEmitter();
  User: any;
  FormAddQuiz: FormGroup;
  constructor(private GlobalValueService: GlobalValueService, private build: FormBuilder, private http: HttpService) {
    this.User = GlobalValueService.User;
    console.log(this.User);
    this.FormAddQuiz = this.build.group({
      nameQuiz: ['', [Validators.required]]
    });
  }

  ngOnChanges() {
    if (this.modal) {
      $('#add-code-quiz').modal();
    }else{
      $('#add-code-quiz').modal('hide');
    }
  }
  Onclose() {
    this.modal = false;
    this.modalChange.emit(false);
    $('#add-code-quiz').modal('hide');
  }
  Onsubmit() {
    if (this.FormAddQuiz.valid) {
      let obj = {
        quick_name: this.FormAddQuiz.controls['nameQuiz'].value,
        user_id: this.User.user_id
      }
      this.http.requestPost(`create/quiz/code`, obj).subscribe((res: any) => {
        if (res.data) {
          this.Data.emit(res.data);
          this.Onclose();
        }
      });
    } else {
      jalert('Warning', 'Please check your input.')
    }
  }

}
