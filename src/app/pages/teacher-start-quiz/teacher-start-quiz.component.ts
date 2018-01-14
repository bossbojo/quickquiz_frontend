import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teacher-start-quiz',
  templateUrl: './teacher-start-quiz.component.html',
  styleUrls: ['./teacher-start-quiz.component.scss']
})
export class TeacherStartQuizComponent implements OnInit {
  Locked:boolean = false;
  constructor() { }

  ngOnInit() {
  }
  OnLocked(){
    this.Locked = !this.Locked;
  }
}
