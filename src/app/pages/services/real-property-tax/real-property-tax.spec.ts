import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealPropertyTax } from './real-property-tax';

describe('RealPropertyTax', () => {
  let component: RealPropertyTax;
  let fixture: ComponentFixture<RealPropertyTax>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RealPropertyTax]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RealPropertyTax);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
