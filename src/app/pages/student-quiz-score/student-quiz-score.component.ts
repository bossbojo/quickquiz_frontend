import { HttpService } from './../../services/http.service';
import { Component, OnInit } from '@angular/core';
import { UrlConfig } from '../../configs/url.config';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-student-quiz-score',
  templateUrl: './student-quiz-score.component.html',
  styleUrls: ['./student-quiz-score.component.scss']
})
export class StudentQuizScoreComponent implements OnInit {
  Url = UrlConfig;
  Score:any;
  ScoreLimit:any;
  TimeQuiz:any;
  Data:any;
  constructor(private param: ActivatedRoute, private http:HttpService,private route:Router) {
    $('#bodymain').addClass('colorchangestudent');
    this.param.queryParams
      .subscribe(params => {
        if(params){
          this.GetSco(params.id, params.time)
        }else{
          this.route.navigate(['/',this.Url.StudentQuizReady]);
        }
      });
  }

  ngOnInit() {
  }
  GetSco(Id, time) {
    this.http.requestPut(`update/quiz_history/finish?id=${Id}&time=${time}`,{})
    .subscribe((res:any)=>{
     // console.log(res.data);
      this.Data = res.data;
      if(res.data){
        this.Score = res.data.point;
        this.ScoreLimit = res.data.quiz_limit;
        this.TimeQuiz = res.data.time;
      }
    });
  }
}
