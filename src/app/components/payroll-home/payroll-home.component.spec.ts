import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollHomeComponent } from './payroll-home.component';

describe('PayrollHomeComponent', () => {
  let component: PayrollHomeComponent;
  let fixture: ComponentFixture<PayrollHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PayrollHomeComponent]
    });
    fixture = TestBed.createComponent(PayrollHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
