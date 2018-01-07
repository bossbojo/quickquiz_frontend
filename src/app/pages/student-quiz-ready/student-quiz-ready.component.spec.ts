import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentQuizReadyComponent } from './student-quiz-ready.component';

describe('StudentQuizReadyComponent', () => {
  let component: StudentQuizReadyComponent;
  let fixture: ComponentFixture<StudentQuizReadyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentQuizReadyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentQuizReadyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
