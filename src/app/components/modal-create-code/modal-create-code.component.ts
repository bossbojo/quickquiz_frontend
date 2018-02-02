import { Component, OnChanges,Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal-create-code',
  templateUrl: './modal-create-code.component.html',
  styleUrls: ['./modal-create-code.component.scss']
})
export class ModalCreateCodeComponent implements OnChanges {
  @Input() modal: boolean;
  @Output() modalChange = new EventEmitter();
  constructor() { }

  ngOnChanges() {
    if (this.modal) {
      $('#add-code-quiz').modal();
    }
  }
  Onclose() {
    this.modal = false;
    this.modalChange.emit(false);
  }

}
