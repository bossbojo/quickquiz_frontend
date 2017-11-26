import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBinPageComponent } from './admin-bin-page.component';

describe('AdminBinPageComponent', () => {
  let component: AdminBinPageComponent;
  let fixture: ComponentFixture<AdminBinPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminBinPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBinPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
