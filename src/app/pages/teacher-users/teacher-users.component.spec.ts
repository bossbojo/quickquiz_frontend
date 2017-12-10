import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherUsersComponent } from './teacher-users.component';

describe('TeacherUsersComponent', () => {
  let component: TeacherUsersComponent;
  let fixture: ComponentFixture<TeacherUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
