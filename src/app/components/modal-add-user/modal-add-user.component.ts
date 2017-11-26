import { Component, OnChanges,Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal-add-user',
  templateUrl: './modal-add-user.component.html',
  styleUrls: ['./modal-add-user.component.scss']
})
export class ModalAddUserComponent implements OnChanges {
  @Input() modal:boolean;
  @Output() modalChange = new EventEmitter();
  constructor() { }

  ngOnChanges() {
    console.log(this.modal);
    if(this.modal){
      $('#add-user-modal').modal();
    }
  }
  Onclose(){
    this.modal = false;
    this.modalChange.emit(false);
  }
  

}
