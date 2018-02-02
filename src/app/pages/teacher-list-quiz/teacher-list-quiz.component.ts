import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teacher-list-quiz',
  templateUrl: './teacher-list-quiz.component.html',
  styleUrls: ['./teacher-list-quiz.component.scss']
})
export class TeacherListQuizComponent implements OnInit {
  OpenModelCreateCode:boolean = false;
  constructor() { }

  ngOnInit() {
  }
  
  OnRefresh(e){
    if(!e)
      this.OpenModelCreateCode = e;
  }

}
