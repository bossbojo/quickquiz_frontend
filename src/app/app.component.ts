import { Component,OnChanges } from '@angular/core';
import { StorageConfog } from './configs/storage.config';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  NavberAdmin:boolean = false;
  title = 'app';
  constructor(private AuthenSer:AuthenticationService){
    StorageConfog.setItem('lang','EN');
  }
  onGetComponent(e){
    if(this.AuthenSer.getAuthenticated){
      if(StorageConfog.getItem('usertype') == 2)return;
      this.NavberAdmin = true;
    }
    //console.log(e);
  }
}
