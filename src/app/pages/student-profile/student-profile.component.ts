import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { StorageConfog } from '../../configs/storage.config';
import { baseUrlimg, UrlConfig } from '../../configs/url.config';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.scss']
})
export class StudentProfileComponent implements OnInit {
  Url = UrlConfig;
  User:any;
  profile:any;
  image:any;
  QuizList:any = [1,2,3,4,5,6,7,8,9,10];
  constructor(private http:HttpService) {
    $('#bodymain').addClass('colorchangestudent')
    this.User = StorageConfog.getItem('user');
    this.OnGetInfo();
   }

  ngOnInit() {
  }
  OnGetInfo(){
    this.http.requestGet(`get/user/byid?id=${this.User.user_id}`).subscribe((res)=>{
      this.profile = res.data
      console.log(this.profile);
       
      this.image = `${baseUrlimg}/Image/${this.profile.Image}`
    });
  }

}
