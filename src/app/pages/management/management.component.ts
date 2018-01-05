import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { jalert } from '../../configs/alert.config';
import { m_addUniversity, m_addFaculty, m_addMajor } from '../../model/m_management';


@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit {
  FormUniversity: FormGroup;
  FormFaculty: FormGroup;
  FormMajor: FormGroup;
  University: any;
  Faculty: any;
  Major: any;
  MajorBackUp: any;
  constructor(private http: HttpService, private build: FormBuilder) {

  }

 ngOnInit()  {
    this.GetDataUniversity();
    this.GetDataFaculty();
    this.GetDataMajor();
    this.SetFormGroup();
  }
  SetFormGroup() {
    this.FormUniversity = this.build.group({
      FullWord: ['', [Validators.required]],
      Abbreviation: ['', [Validators.required]]
    });
    this.FormFaculty = this.build.group({
      FullWord: ['', [Validators.required]],
      Abbreviation: ['', [Validators.required]]
    });
    this.FormMajor = this.build.group({
      FullWord: ['', [Validators.required]],
      Abbreviation: ['', [Validators.required]],
      Faculty: ['', [Validators.required]]
    });
  }
  GetDataUniversity() {
    this.http.requestGet(`get/data/all/university`).subscribe((res) => {
      this.University = res.data
    });
  }
  GetDataFaculty() {
    this.http.requestGet(`get/data/all/faculty`).subscribe((res) => {
      this.Faculty = res.data
    });
  }
  GetDataMajor() {
    this.http.requestGet(`get/data/all/major`).subscribe((res) => {
      this.Major = res.data
      this.MajorBackUp = this.Major;
    });
  }
  OnSelectFaculty(value) {
    if (value == '') {
      this.Major = this.MajorBackUp;
      return;
    }
    this.Major = this.MajorBackUp.filter(
      ma => ma.Faculty_Abbreviation == value
    );
  }
  OnSubmitUniversity() {
    if (this.FormUniversity.valid) {
      let obj = new m_addUniversity(
        this.FormUniversity.controls['FullWord'].value,
        this.FormUniversity.controls['Abbreviation'].value
      );
      this.http.requestPost(`add/data/university`,obj).subscribe((res)=>{
        if(res.data == true){
          jalert('Success','success for add university.');
          $('#CloseUniversity').click();
          this.ngOnInit();
        }else if(res.data == false){
          jalert('Failed', 'Failed for add university.');
        }else{
          jalert('Failed', res.data);
        }
      });
    } else {
      jalert('Add university', 'This field is required.')
    }
  }
  OnSubmitFaculty() {
    if (this.FormFaculty.valid) {
      let obj = new m_addFaculty(
        this.FormFaculty.controls['FullWord'].value,
        this.FormFaculty.controls['Abbreviation'].value
      );
      this.http.requestPost(`add/data/faculty`,obj).subscribe((res)=>{
        if(res.data == true){
          jalert('Success','success for add faculty.');
          $('#CloseFaculty').click();
          this.ngOnInit();
        }else if(res.data == false){
          jalert('Failed', 'Failed for add faculty.');
        }else{
          jalert('Failed', res.data);
        }
      });
    } else {
      jalert('Add faculty', 'This field is required.')
    }
  }
  OnSubmitMajor() {
    if (this.FormMajor.valid) {
      let obj = new m_addMajor(
        this.FormMajor.controls['FullWord'].value,
        this.FormMajor.controls['Abbreviation'].value,
        this.FormMajor.controls['Faculty'].value
      );
      this.http.requestPost(`add/data/major`,obj).subscribe((res)=>{
        if(res.data == true){
          jalert('Success','success for add major.');
          $('#CloseMajor').click();
          this.ngOnInit();
        }else if(res.data == false){
          jalert('Failed', 'Failed for add major.');
        }else{
          jalert('Failed', res.data);
        }
      });
    } else {
      jalert('Add major', 'This field is required.')
    }
  }
}
