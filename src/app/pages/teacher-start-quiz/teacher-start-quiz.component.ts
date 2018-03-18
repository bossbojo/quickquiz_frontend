import { HttpService } from './../../services/http.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SignalRService } from '../../services/SignalR.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-teacher-start-quiz',
  templateUrl: './teacher-start-quiz.component.html',
  styleUrls: ['./teacher-start-quiz.component.scss']
})
export class TeacherStartQuizComponent implements OnInit {
  Locked: boolean = false;
  Codelist: any;
  UserOnline: any;
  User: any;
  Code: any;
  countdown: number = 3;
  letstart: boolean = false;
  constructor(private http: HttpService, private signalr: SignalRService, private Auth: AuthenticationService) {
    this.GetDataCodeByUser();
    this.User = this.Auth.authenticatedDetail;
  }

  ngOnInit() {
    setTimeout(() => {
      console.log(this.signalr.hub.server);
      
      this.signalr.hub.client.onConnect = (res) => {
        console.log(res);
      };
      this.signalr.connection.hub.start().done(() => {
        this.signalr.hub.server.onConnect(this.User.user_id)
      });
    }, 1000);
  }
  ngOnDestroy() {
    this.signalr.onDisconnection();
  }
  OnLocked() {
    this.Locked = !this.Locked;
  }
  GetDataCodeByUser() {
    this.http.requestGet(`get/data/all/code`)
      .subscribe((res: any) => {
        this.Codelist = res.data;
        //console.log(this.Codelist);
      });
  }
  GetDataUserOnline(code) {
    this.Code = code;
    this.http.requestGet(`get/data/all/useronline?code=${code}`)
      .subscribe((res: any) => {
        this.UserOnline = res.data;
        console.log(this.UserOnline);
      });
  }
  OnStartQuiz() {
    this.signalr.connection.hub.start().done(() => {
      this.signalr.hub.server.onStartQuizByUser(this.Code)
    });
    this.OnLocked();
    setTimeout(() => {
      this.OnLocked();
      this.GetDataUserOnline(this.Code);
    }, 4000);
  }
  CountDown() {
    this.letstart = true
    return new Promise((resolve) => {
      $('.revese-countdown')
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
}
