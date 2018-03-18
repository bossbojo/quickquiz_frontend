import { AuthenticationService } from './../../services/authentication.service';
import { GlobalValueService } from './../../services/global-value.service';
import { SignalRService } from './../../services/SignalR.service';
import { HttpService } from './../../services/http.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { jalert, jconfirm } from '../../configs/alert.config';
import { Router } from '@angular/router';
import { UrlConfig } from '../../configs/url.config';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-student-quiz-ready',
  templateUrl: './student-quiz-ready.component.html',
  styleUrls: ['./student-quiz-ready.component.scss']
})
export class StudentQuizReadyComponent implements OnInit, OnDestroy {
  Url = UrlConfig;
  countdown: number = 3;
  letstart: boolean = false;
  FormCode: FormGroup;
  User: any;
  constructor(private Auth: AuthenticationService, private route: Router, private http: HttpService, private build: FormBuilder, private signalr: SignalRService, private global: GlobalValueService) {
    $('#bodymain').addClass('colorchangestudent')
    this.FormCode = this.build.group({
      Code: ['', [Validators.required]]
    });
    this.User = this.Auth.authenticatedDetail;
  }
  ngOnDestroy() {
    this.signalr.onDisconnection();
  }
  ngOnInit() {
    setTimeout(() => {
      this.signalr.hub.client.onStartQuiz = (res) => {
        if (res == 'Connected') {
          $('#input-code').hide();
          $('#waing-code').fadeIn();
        }else{
          jalert('Warning',res);
        }
      }
      this.signalr.hub.client.OnStartQuizByUser = (res) => {
        this.OnStart();
      }
    }, 1000);

  }
  OnGoQuiz() {
    this.signalr.OnStartQuiz(this.global.User.user_id, this.FormCode.controls['Code'].value);
  }
  OnStart() {
    this.CountDown().then((res) => {
      if (res)
        this.http.requestPost(`create/quiz_history`, {
          "code": this.FormCode.controls['Code'].value,
          "user_id": this.User.user_id
        })
          .subscribe((res: any) => {
            if (res.data) {
              this.route.navigate(['/', this.Url.StudentQuizStart], { queryParams: { data: this.FormCode.controls['Code'].value, his_id: res.data.Id } });
            }
          });
    });
  }
  CountDown() {
    this.letstart = true
    return new Promise((resolve) => {
      $('#revese-countdown2')
        .prop('number', this.countdown)
        .animateNumber(
          {
            number: 0,
            numberStep: function (now, tween) {
              var target = $(tween.elem),
                rounded_now = Math.round(now);

              target.text(now === tween.end ? 'Let\'s start!' : rounded_now);
              if (now === tween.end) {
                resolve(true);
              }
            }
          },
          (this.countdown * 1000), 'linear'
        );
    });
  }
  OnGoBack() {
    jconfirm('Warning', 'Are you sure for get back?').then(res => {
      if (!res) return;
      $('#input-code').fadeIn();
      $('#waing-code').hide();
    });
  }
}