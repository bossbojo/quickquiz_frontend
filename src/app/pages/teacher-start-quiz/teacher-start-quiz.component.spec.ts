import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherStartQuizComponent } from './teacher-start-quiz.component';

describe('TeacherStartQuizComponent', () => {
  let component: TeacherStartQuizComponent;
  let fixture: ComponentFixture<TeacherStartQuizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherStartQuizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherStartQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
