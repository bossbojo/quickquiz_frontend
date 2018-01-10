import { Component, OnInit } from '@angular/core';
import { jalert, jconfirm } from '../../configs/alert.config';
import { Router } from '@angular/router';
import { UrlConfig } from '../../configs/url.config';

@Component({
  selector: 'app-student-quiz-ready',
  templateUrl: './student-quiz-ready.component.html',
  styleUrls: ['./student-quiz-ready.component.scss']
})
export class StudentQuizReadyComponent implements OnInit {
  Url= UrlConfig;
  countdown:number = 3;
  letstart:boolean = false;
  constructor(private route:Router) { 
    $('#bodymain').addClass('colorchangestudent')
  }

  ngOnInit() {
  }
  OnGoQuiz(){
    $('#input-code').hide();
    $('#waing-code').fadeIn();
    setTimeout(() => {
      this.CountDown().then((res)=>{
        if(res)
        this.route.navigate(['/',this.Url.StudentQuizStart]);
      });
    }, 3000);
  }
  CountDown(){
    this.letstart = true
    return new Promise((resolve)=>{
      $('#revese-countdown')
      .prop('number', this.countdown)
      .animateNumber(
      {
        number: 0,
        numberStep: function (now, tween) {
          var target = $(tween.elem),
            rounded_now = Math.round(now);
  
          target.text(now === tween.end ? 'Let\'s start!' : rounded_now);
          if(now === tween.end){
            resolve(true);
          }
        }
      },
      (this.countdown*1000),'linear'
      );
    });
  }
  OnGoBack(){
    jconfirm('Warning','Are you sure for get back?').then(res =>{
      if(!res)return;
      $('#input-code').fadeIn();
      $('#waing-code').hide();
    });
  }
}
