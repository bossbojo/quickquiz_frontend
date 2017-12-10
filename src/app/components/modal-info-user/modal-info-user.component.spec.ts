import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalInfoUserComponent } from './modal-info-user.component';

describe('ModalInfoUserComponent', () => {
  let component: ModalInfoUserComponent;
  let fixture: ComponentFixture<ModalInfoUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalInfoUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalInfoUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
