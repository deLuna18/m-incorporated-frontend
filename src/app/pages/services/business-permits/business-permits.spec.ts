import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessPermits } from './business-permits';

describe('BusinessPermits', () => {
  let component: BusinessPermits;
  let fixture: ComponentFixture<BusinessPermits>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessPermits]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessPermits);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
