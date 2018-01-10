import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentQuizScoreComponent } from './student-quiz-score.component';

describe('StudentQuizScoreComponent', () => {
  let component: StudentQuizScoreComponent;
  let fixture: ComponentFixture<StudentQuizScoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentQuizScoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentQuizScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
