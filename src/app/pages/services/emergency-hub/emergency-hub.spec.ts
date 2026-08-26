import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmergencyHub } from './emergency-hub';

describe('EmergencyHub', () => {
  let component: EmergencyHub;
  let fixture: ComponentFixture<EmergencyHub>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmergencyHub]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmergencyHub);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
