import { Injectable, EventEmitter } from '@angular/core';
import { environment } from '../../environments/environment';
import { baseUrl } from '../configs/url.config';
import { Subject } from 'rxjs/Subject';
declare const $;
@Injectable()
export class SignalRService {
    //private signalURL: string = `${baseUrl}/signalr`;
    private signalURL: string = `${baseUrl}/signalr`;
    public connection = $.connection;

    setHub(hubName: string, signalURL: string = null): SignalRModel {
        this.connection.hub.url = signalURL || this.signalURL;
        return this.connection[hubName] || null;
    }

    get getConnection(): any {
        return this.connection.hub.start();
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