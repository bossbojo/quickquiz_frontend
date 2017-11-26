import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddUserComponent } from './modal-add-user.component';

describe('ModalAddUserComponent', () => {
  let component: ModalAddUserComponent;
  let fixture: ComponentFixture<ModalAddUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAddUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
