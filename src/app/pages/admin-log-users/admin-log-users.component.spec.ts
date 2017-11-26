import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLogUsersComponent } from './admin-log-users.component';

describe('AdminLogUsersComponent', () => {
  let component: AdminLogUsersComponent;
  let fixture: ComponentFixture<AdminLogUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminLogUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLogUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
