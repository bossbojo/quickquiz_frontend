import { Component, OnInit } from '@angular/core';
import { StorageConfog } from '../../configs/storage.config';
import { HttpService } from '../../services/http.service';
import { baseUrlimg } from '../../configs/url.config';

@Component({
  selector: 'app-home-student',
  templateUrl: './home-student.component.html',
  styleUrls: ['./home-student.component.scss']
})
export class HomeStudentComponent implements OnInit {
  User:any;
  profile:any;
  image:any;
  constructor(private http:HttpService) {
    this.User = StorageConfog.getItem('user');
    this.OnGetInfo();
    $('#bodymain').addClass('colorchangestudent')
   }

  ngOnInit() {
  }
  OnGetInfo(){
    this.http.requestGet(`get/user/byid?id=${this.User.user_id}`).subscribe((res)=>{
      this.profile = res.data
      this.image = `${baseUrlimg}/Image/${this.profile.Image}`
    });
  }

}
