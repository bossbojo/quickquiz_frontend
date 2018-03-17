import { HttpService } from './../../../services/http.service';
import { GlobalValueService } from './../../../services/global-value.service';
import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
  constructor(private build: FormBuilder, private GlobalValueService: GlobalValueService, private http: HttpService) {
    this.User = GlobalValueService.User;
    this.SetFormGroup();
  }

  ngOnChanges() {
    if (this.modal && this.Data) {
      $('#add-question').modal();
      this.GetDataAll();
    }
  }
  SetFormGroup(){
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
      this.DataQuiz = res.data;
    });
  }
  OnClose() {
    $('#add-question').modal('hide');
    this.modalChange.emit(false);
  }
  Onsubmit() {
    let obj = {
      code_id: this.Data.code_id,
      img: '',
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
        this.FormAddQuestion.reset();
        this.GetDataAll();
      }
    });
  }
  OnOpenEdit(data) {
    console.log(data);
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
    let obj = {
      code_id: this.Data.code_id,
      img: '',
      user_id: this.User.user_id,
      question_id:this.DataEdit.q_id,
      question: this.FormAddQuestion.controls['question'].value,
      choice1_id:this.DataEdit.Answers[0].a_id,
      choice1: this.FormAddQuestion.controls['choice1'].value,
      choice2_id:this.DataEdit.Answers[1].a_id,
      choice2: this.FormAddQuestion.controls['choice2'].value,
      choice3_id:this.DataEdit.Answers[2].a_id,
      choice3: this.FormAddQuestion.controls['choice3'].value,
      choice4_id:this.DataEdit.Answers[3].a_id,
      choice4: this.FormAddQuestion.controls['choice4'].value,
      correct: this.FormAddQuestion.controls['correct'].value
    }
    console.log(obj);    
    this.http.requestPut(`update/quiz/question`, obj).subscribe((res: any) => {
    //console.log(res);
      if (res.data) {
        this.OnCloseEdit();
        this.GetDataAll();
      }
    });
  }
  OnCloseEdit(){
    this.AddQuestion = true;
    this.EdisQuestion = false;
    this.SetFormGroup();
  }
}
