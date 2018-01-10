import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentQuizStartComponent } from './student-quiz-start.component';

describe('StudentQuizStartComponent', () => {
  let component: StudentQuizStartComponent;
  let fixture: ComponentFixture<StudentQuizStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentQuizStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentQuizStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
