import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherListQuizComponent } from './teacher-list-quiz.component';

describe('TeacherListQuizComponent', () => {
  let component: TeacherListQuizComponent;
  let fixture: ComponentFixture<TeacherListQuizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherListQuizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherListQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
