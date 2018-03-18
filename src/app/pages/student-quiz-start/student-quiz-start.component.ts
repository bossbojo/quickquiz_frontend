import { HttpService } from './../../services/http.service';
import { SignalRService } from './../../services/SignalR.service';
import { Component, OnInit } from '@angular/core';
import { dataquiz } from '../../morkdata/dataquiz';
import { UrlConfig } from '../../configs/url.config';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-quiz-start',
  templateUrl: './student-quiz-start.component.html',
  styleUrls: ['./student-quiz-start.component.scss']
})
export class StudentQuizStartComponent implements OnInit {
  iconchoose = ['panorama_fish_eye', 'crop_square', 'details', 'signal_cellular_4_bar'];
  classchoose = ['bg-blueviolet', 'bg-cadetblue', 'bg-crimson', 'bg-darkgreen']
  morkdata;
  DataReal: any;
  quizmax;
  minute = 0;
  second = 0;
  timernow: number = 0;
  quiznow: number = 1;
  allquiz: allquiz[] = [];
  CodeNow: any;
  QHisIdNow: any;
  constructor(private route: Router, private signalr: SignalRService, private http: HttpService, private param: ActivatedRoute) {
    $('#bodymain').addClass('colorchangestudent');
    this.param.queryParams
      .subscribe(params => {
        if(params){
          this.GetDataByCode(params.data);
          this.CodeNow = params.data;
          this.QHisIdNow = params.his_id;
        }else{
          this.route.navigate(['/',UrlConfig.StudentQuizReady]);
        }
      });
  }

  ngOnInit() {
    this.timer();
  }
  GetDataByCode(code) {
    this.http.requestGet(`get/all/quizandanwser/stu?code=${code}`).subscribe((res: any) => {
      this.DataReal = res.data;
      this.quizmax = this.DataReal.length;
    })
  }
  OnclickChoose(q, a) {
    this.allquiz.push(new allquiz(q, a))
    if (this.quiznow + 1 > this.quizmax) {
      this.http.requestPost(`create/answers_history`, {
        "quiz_his_id": this.QHisIdNow,
        "q_id": q,
        "a_id": a,
        "code": this.CodeNow
      }).subscribe((res: any) => {
        this.route.navigate(['/', UrlConfig.StudentQuizScore], { queryParams: { id: this.QHisIdNow, time:$('#timeQuiz').text()} });
      });
    } else {
      this.http.requestPost(`create/answers_history`, {
        "quiz_his_id": this.QHisIdNow,
        "q_id": q,
        "a_id": a,
        "code": this.CodeNow
      }).subscribe((res: any) => {
        this.quiznow = this.quiznow + 1;
      });
    }
  }
  timer() {
    setInterval(() => {
      this.timernow = this.timernow + 1;
      this.minute = Math.round(this.timernow / 60);
      this.second = this.timernow % 60;
    }, 1000);
  }

}
class allquiz {
  constructor(IDquestion: string, IDAnwser: string) {
    this.IDquestion = IDquestion;
    this.IDAnwser = IDAnwser;
  }
  IDquestion: string;
  IDAnwser: string;
}
