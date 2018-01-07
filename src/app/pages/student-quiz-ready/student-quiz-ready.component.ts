import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-quiz-ready',
  templateUrl: './student-quiz-ready.component.html',
  styleUrls: ['./student-quiz-ready.component.scss']
})
export class StudentQuizReadyComponent implements OnInit {

  constructor() { 
    $('#bodymain').addClass('colorchangestudent')
  }

  ngOnInit() {
  }
  OnGoQuiz(){
    $('#input-code').hide();
    $('#waing-code').fadeIn();
  }
  OnGoBack(){
    $('#input-code').fadeIn();
    $('#waing-code').hide();
  }
}
