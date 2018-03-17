import { StudentQuizReadyComponent } from './../pages/student-quiz-ready/student-quiz-ready.component';
import { baseUrlsignalr } from './../configs/url.config';
import { Injectable, EventEmitter } from '@angular/core';
import { environment } from '../../environments/environment';
import { baseUrl } from '../configs/url.config';
import { Subject } from 'rxjs/Subject';

declare const $;
@Injectable()
export class SignalRService {
    private signalURL: string = `${baseUrlsignalr}/signalr`;
    public connection = $.connection;
    public hub: SignalRModel;
    constructor(){}
    OnStartSignalR() {
        setTimeout(() => {
            this.connection = $.connection;
            this.connection.hub.url = this.signalURL;
            this.hub = this.connection.hub.proxies['quizhub'];
            // this.hub.client.onStartQuiz = (res) => {
            //     console.log(res);
            // }
        }, 1000);
    }
    OnReturnReady(){
        return new Promise((resolve)=>{
            
        });
    }
    OnStartQuiz(user_id, code) {
        this.connection.hub.start().done(() => {
            this.hub.server.onStartQuiz(user_id, code);
        });
    }
    onDisconnection(): void {
        if (!this.connection.hub.stop) return;
        this.connection.hub.stop();
    }
}

export class SignalRModel {
    client: any;
    connection: any;
    hubName: string;
    server: any;
    state: any;
}