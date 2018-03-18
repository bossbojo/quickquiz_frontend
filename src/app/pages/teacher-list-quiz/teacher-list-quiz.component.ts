import { HttpService } from './../../services/http.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teacher-list-quiz',
  templateUrl: './teacher-list-quiz.component.html',
  styleUrls: ['./teacher-list-quiz.component.scss']
})
export class TeacherListQuizComponent implements OnInit {
  OpenModelCreateCode: boolean = false;
  OpenModelCreateQuestion:boolean = false;
  OpenModelReport:boolean = false;
  DataReport:any;
  Data:any;
  DataQuestion:any;
  constructor(private http:HttpService) {
    this.GetData();
   }

  ngOnInit() {
  }
  GetData(){
    this.http.requestGet(`get/all/quiz`).subscribe((res:any)=>{
      this.Data = res.data;
    });
  }
  OnRefresh(e) {
    if (!e)
      this.OpenModelCreateCode = e;
      this.GetData();
  }
  OutPutData(event) {
    this.GetData();
    this.OpenModelCreateCode = false;
    this.OnOpenQuestion(event);
  }
  OnOpenReport(data){
    this.DataReport = data;
    this.OpenModelReport = true;
  }
  OnOpenQuestion(data){
    this.DataQuestion = data;
    this.OpenModelCreateQuestion = true;
  }
  OncloseMode(e){
    this.DataQuestion = null;
    this.OpenModelCreateCode = false;
    this.OpenModelReport = false;
    this.OpenModelCreateQuestion = false;
  }
  OnRemove(code_id){
    this.http.requestDelete(`remove/quiz/code?value=${code_id}`).subscribe((res:any)=>{
      if(res.data){
        this.GetData();
      }
    });
  }
}
