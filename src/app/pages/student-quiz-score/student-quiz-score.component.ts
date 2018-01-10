import { Component, OnInit } from '@angular/core';
import { UrlConfig } from '../../configs/url.config';

@Component({
  selector: 'app-student-quiz-score',
  templateUrl: './student-quiz-score.component.html',
  styleUrls: ['./student-quiz-score.component.scss']
})
export class StudentQuizScoreComponent implements OnInit {
  Url = UrlConfig;
  constructor() {
    $('#bodymain').addClass('colorchangestudent');
   }

  ngOnInit() {
  }

}
