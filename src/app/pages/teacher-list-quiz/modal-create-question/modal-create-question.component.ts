import { HttpService } from './../../../services/http.service';
import { GlobalValueService } from './../../../services/global-value.service';
import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { jalert } from '../../../configs/alert.config';
import { baseUrlimg2 } from '../../../configs/url.config';

@Component({
  selector: 'app-modal-create-question',
  templateUrl: './modal-create-question.component.html',
  styleUrls: ['./modal-create-question.component.scss']
})
export class ModalCreateQuestionComponent implements OnChanges {
  @Input() modal: boolean;
  @Output() modalChange = new EventEmitter();
  @Input() Data: any;
  User: any;
  DataQuiz: any;
  FormAddQuestion: FormGroup;
  AddQuestion: boolean = true;
  EdisQuestion: boolean = false;
  DataEdit: any;
  imageShow;
  imageBase64;
  baseUrlimg2 = baseUrlimg2;
  constructor(private build: FormBuilder, private GlobalValueService: GlobalValueService, private http: HttpService) {
    this.User = GlobalValueService.User;
    this.SetFormGroup();
  }

  ngOnChanges() {
    if (this.modal && this.Data) {
      $('#add-question-new').modal();
      this.GetDataAll();
    } else {
      $('#add-question-new').modal('hide');
    }
  }
  SetFormGroup() {
    this.FormAddQuestion = this.build.group({
      question: ['', [Validators.required]],
      choice1: ['', [Validators.required]],
      choice2: ['', [Validators.required]],
      choice3: ['', [Validators.required]],
      choice4: ['', [Validators.required]],
      correct: ['1', [Validators.required]]
    });
  }
  GetDataAll() {
    this.http.requestGet(`get/all/quizandanwser?code_id=${this.Data.code_id}`).subscribe((res: any) => {
      //console.log(res);
      this.DataQuiz = res.data;
    });
  }
  OnClose() {
    $('#add-question-new').modal('hide');
    this.modalChange.emit(false);
  }
  onFileChange(event) {

    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageBase64 = reader.result.split(',')[1];
        this.imageShow = reader.result;
      };
    } else {
    }
  }
  Onsubmit() {
    if (this.FormAddQuestion.valid) {
      let obj = {
        code_id: this.Data.code_id,
        img: this.imageBase64 ? this.imageBase64 : '',
        user_id: this.User.user_id,
        question: this.FormAddQuestion.controls['question'].value,
        choice1: this.FormAddQuestion.controls['choice1'].value,
        choice2: this.FormAddQuestion.controls['choice2'].value,
        choice3: this.FormAddQuestion.controls['choice3'].value,
        choice4: this.FormAddQuestion.controls['choice4'].value,
        correct: this.FormAddQuestion.controls['correct'].value
      }
      this.http.requestPost(`create/quiz/question`, obj).subscribe((res: any) => {
        if (res.data) {
          console.log(res);

          this.FormAddQuestion.reset();
          this.GetDataAll();
        }
      });
    } else {
      jalert('Warning', 'Check your input.')
    }
  }
  OnOpenEdit(data) {
    this.imageShow = null;
    this.imageBase64 = null;
    this.DataEdit = data;
    let correctchoice;
    for (let i = 0; i < this.DataEdit.Answers.length; i++) {
      if (this.DataEdit.Answers[i].correct) {
        correctchoice = i + 1;
      }
    }
    this.FormAddQuestion = this.build.group({
      question: [this.DataEdit.question, [Validators.required]],
      choice1: [this.DataEdit.Answers[0].answer, [Validators.required]],
      choice2: [this.DataEdit.Answers[1].answer, [Validators.required]],
      choice3: [this.DataEdit.Answers[2].answer, [Validators.required]],
      choice4: [this.DataEdit.Answers[3].answer, [Validators.required]],
      correct: [correctchoice + '', [Validators.required]]
    });
    this.AddQuestion = false;
    this.EdisQuestion = true;
  }
  OnsubmitEdit() {
    if(this.FormAddQuestion.valid){
      let obj = {
        code_id: this.Data.code_id,
        img: this.imageBase64?this.imageBase64:'',
        user_id: this.User.user_id,
        question_id: this.DataEdit.q_id,
        question: this.FormAddQuestion.controls['question'].value,
        choice1_id: this.DataEdit.Answers[0].a_id,
        choice1: this.FormAddQuestion.controls['choice1'].value,
        choice2_id: this.DataEdit.Answers[1].a_id,
        choice2: this.FormAddQuestion.controls['choice2'].value,
        choice3_id: this.DataEdit.Answers[2].a_id,
        choice3: this.FormAddQuestion.controls['choice3'].value,
        choice4_id: this.DataEdit.Answers[3].a_id,
        choice4: this.FormAddQuestion.controls['choice4'].value,
        correct: this.FormAddQuestion.controls['correct'].value
      }
      console.log(obj);
      this.http.requestPut(`update/quiz/question`, obj).subscribe((res: any) => {
        console.log(res);
        if (res.data) {
          this.OnCloseEdit();
          this.GetDataAll();
        }
      });
    }else {
      jalert('Warning', 'Check your input.')
    }
  }
  OnCloseEdit() {
    this.DataEdit = null;
    this.AddQuestion = true;
    this.EdisQuestion = false;
    this.imageShow = null;
    this.imageBase64 = null;
    this.SetFormGroup();
  }
  OnRemove(q_id){
    this.http.requestDelete(`remove/question?q_id=${q_id}`).subscribe((res:any)=>{
      this.GetDataAll();
    },err => this.GetDataAll());
  }
}
