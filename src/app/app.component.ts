import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  Authen:boolean = false;
  title = 'app';
  onGetComponent(e){
    console.log(e);
  }
}
