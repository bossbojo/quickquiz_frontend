import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-home-teacher',
  templateUrl: './home-teacher.component.html',
  styleUrls: ['./home-teacher.component.scss']
})
export class HomeTeacherComponent implements OnInit {
  User:any;
  constructor(private auth:AuthenticationService) {
    this.User = auth.getUser; 
   }

  ngOnInit() {
  }

}
