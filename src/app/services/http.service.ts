// Http service [ Created by Loem 21-04-2017 ]

import { Injectable } from '@angular/core';
import { Http, Response, RequestOptionsArgs, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { AuthenticationService } from './authentication.service';
import { baseUrl } from '../configs/url.config';

@Injectable()
export class HttpService {
    constructor(private http: Http, private authenticated: AuthenticationService) { }

    // Request to server by GET method : ส่งข้อมูลไปยัง server ผ่าน method GET
    requestGet(url: string): Observable<ResponseModel> {
        return this.onProcessRequest(this.http.get(this.convertURL(url), { headers: this.onRequestHeaders() }));
    }

    // Request to server by POST method : ส่งข้อมูลไปยัง server ผ่าน method POST
    requestPost(url: string, model: any): Observable<ResponseModel> {
        return this.onProcessRequest(this.http.post(this.convertURL(url), JSON.stringify(model), { headers: this.onRequestHeaders() }));
    }

    // Request to server by PUT method : ส่งข้อมูลไปยัง server ผ่าน method PUT
    requestPut(url: string, model: any): Observable<ResponseModel> {
        return this.onProcessRequest(this.http.put(this.convertURL(url), JSON.stringify(model), { headers: this.onRequestHeaders() }));
    }

    // Request to server by DELETE method : ส่งข้อมูลไปยัง server ผ่าน method DELETE
    requestDelete(url: string): Observable<ResponseModel> {
        return this.onProcessRequest(this.http.delete(this.convertURL(url), { headers: this.onRequestHeaders() }));
    }

    // Process map data : ตรวจสอบข้อมูลและแปลงเป็น Json 
    private onMapData(response: Response): ResponseModel {
        let responseData: any = {};
        try {
            responseData.data = response.json();
        }
        catch (e) {
            if (response.text()) {
                responseData.data = response.text()
            }
        }
        responseData.status = response.status;
        responseData.statusText = response.statusText;
        responseData.response = response;
        responseData.Message = responseData.data.Message ? responseData.data.Message : responseData.response.statusText;
        responseData.TempData = responseData.data.TempData ? responseData.data.TempData : null;
        responseData.Token = responseData.data.Token ? responseData.data.Token : null;
        responseData.Detail = responseData.data.Detail ? responseData.data.Detail : null;
        return responseData;
    }

    // Process do data : จัดการข้อมูลกรณีมีข้อมูลการ authentication ออกมา
    onDoProcess(response: ResponseModel) {
        if (response.Token)
            this.authenticated.setAuthenticated(response.Token, response.Detail);
    }

    // Error handle : ส่ง error ออกไปเมื่อ server เกิดข้อผิดพลาด
    private onErrorHandle(response: any): Observable<Response> {
        return Observable.throw(this.onMapData(response));
    }

    // Request Headers : ส่งค่า Header เพื่อให้ Server รู้ว่าเราต้องการอะไร และเพื่อยืนยันตัวตน
    private onRequestHeaders(): Headers {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=utf-8');
        if (this.authenticated.getAuthenticated)
            headers.append('Authorization', this.authenticated.getAuthenticated);
        return headers;
    }

    // Convert Url : แปลงค่า Url เป็นค่าที่เรากำหนดไว้
    private convertURL(url: string): string {
        const hostRequest = url[0] == '/' ? url : '/' + url;
        return this.address + hostRequest;
    }

    // Process request of http : เปลี่ยนการทำงานหลังจากที่มีการ Request ไปที่ server
    private onProcessRequest(httpProcess: Observable<Response>): Observable<any> {
        return httpProcess
            .map(res => this.onMapData(res))
            .do(res => this.onDoProcess(res))
            .catch(res => this.onErrorHandle(res));
    }

    // Check domain is production or development : เช็คว่าที่อยู่เป็นอะไร ถ้าเรา build เป็น production หรือ development

    private address: string = baseUrl;


}

// Custom response class : สร้างคลาส Response ขึ้นมาเอง
export class ResponseModel {
    status: number;
    statusText: string;
    data: any;
    Message: string;
    TempData: string;
    Token: string;
    Detail: any;
    response: Response;
}