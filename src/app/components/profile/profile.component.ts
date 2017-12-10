import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { GlobalValueService } from '../../services/global-value.service';
import { baseUrlimg } from '../../configs/url.config';
import { StorageConfog } from '../../configs/storage.config';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  image:any;
  profile:any;
  User:any;
  constructor(private http:HttpService,private GlobalValue:GlobalValueService) { }

  
  ngOnInit() {
    this.User = StorageConfog.getItem('user');
    this.OnGetInfo();
  }
  OnGetInfo(){
    this.http.requestGet(`get/user/byid?id=${this.User.user_id}`).subscribe((res)=>{
      this.profile = res.data
      this.image = `${baseUrlimg}/Image/${this.profile.Image}`
    });
  }
}
