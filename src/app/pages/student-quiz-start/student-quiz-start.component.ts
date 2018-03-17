import { SignalRService } from './../../services/SignalR.service';
import { Component, OnInit } from '@angular/core';
import { dataquiz } from '../../morkdata/dataquiz';
import { UrlConfig } from '../../configs/url.config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-quiz-start',
  templateUrl: './student-quiz-start.component.html',
  styleUrls: ['./student-quiz-start.component.scss']
})
export class StudentQuizStartComponent implements OnInit {
  iconchoose = ['panorama_fish_eye','crop_square','details','signal_cellular_4_bar'];
  classchoose = ['bg-blueviolet','bg-cadetblue','bg-crimson','bg-darkgreen']
  morkdata;
  quizmax;
  minute = 0;
  second = 0;
  timernow:number = 0;
  quiznow:number = 1;
  allquiz:allquiz[] = [];
  constructor(private route:Router,private signalr:SignalRService) {
    this.morkdata = dataquiz;
    this.quizmax = this.morkdata.length;
    $('#bodymain').addClass('colorchangestudent');
  }

  ngOnInit() {
    this.timer();
  }
  OnclickChoose(q,a){
    this.allquiz.push(new allquiz(q,a))
    this.quiznow = this.quiznow + 1;
    if(this.quiznow > this.quizmax){
      this.route.navigate(['/',UrlConfig.StudentQuizScore]);
    }
    this.quiznow = this.quizmax;
  }
  timer(){
    setInterval(()=>{
      this.timernow = this.timernow + 1;
      this.minute = Math.round(this.timernow/60);
      this.second = this.timernow%60;
    },1000);
  }

}
class allquiz{
  constructor(IDquestion:string,IDAnwser:string){
    this.IDquestion = IDquestion;
    this.IDAnwser = IDAnwser;
  }
  IDquestion:string;
  IDAnwser:string;
}
