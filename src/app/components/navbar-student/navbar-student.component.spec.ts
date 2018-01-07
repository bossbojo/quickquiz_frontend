import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarStudentComponent } from './navbar-student.component';

describe('NavbarStudentComponent', () => {
  let component: NavbarStudentComponent;
  let fixture: ComponentFixture<NavbarStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
