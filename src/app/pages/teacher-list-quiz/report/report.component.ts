import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { GlobalValueService } from '../../../services/global-value.service';
import { HttpService } from '../../../services/http.service';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-report-quiz',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit, OnChanges {
  @Input() modal: boolean;
  @Output() modalChange = new EventEmitter();
  @Input() Data: any;
  Report: any;
  constructor(private build: FormBuilder, private GlobalValueService: GlobalValueService, private http: HttpService,private date:DatePipe) { }

  ngOnInit() {
  }
  ngOnChanges() {
    if (this.modal && this.Data) {
      this.GetDataAll();
      $('#add-report-quiz').modal();
    } else {
      $('#add-report-quiz').modal('hide');
    }
  }
  OnClose() {
    $('#add-report-quiz').modal('hide');
    this.modalChange.emit(null);
  }
  GetDataAll() {
    this.http.requestGet(`get/data/all/quiz_history/code?code=${this.Data.code}`).subscribe((res: any) => {
      this.Report = res.data;
    });
  }
  ExportFile() {
    let data: fileExport[] = [];
    data.push(new fileExport('ลำดับ','code','ชื่อผู้ใช้งาน','ชื่อ-สกุล','คะเเนน','เต็ม','วันที่/เดือน/ปี'));
    for (let i = 0; i < this.Report.length; i++) {
      data.push(new fileExport(
        i+1,
        this.Report[i].code,
        this.Report[i].username,
        this.Report[i].firstname+' '+this.Report[i].lastname,
        this.Report[i].point,
        this.Report[i].quiz_limit,
        this.date.transform(this.Report[i].create_dt,'dd MMM yyyy')
      )
    )
    }
    new Angular2Csv(data, 'Quiz of ' + this.Data.code);
  }
}
class fileExport {
  constructor(no:any,code_quiz: any, username: any, fullname: any, point: any,max: any, date: any) {
    this.no = no;
    this.code_quiz = code_quiz;
    this.username = username;
    this.fullname = fullname;
    this.point = point;
    this.max = max;
    this.date = date;
  }
  no:any;
  code_quiz: any;
  username: any;
  fullname: any;
  point: any;
  max:any;
  date: any;
}