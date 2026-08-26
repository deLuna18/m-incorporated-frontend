import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicePortal } from './service-portal';

describe('ServicePortal', () => {
  let component: ServicePortal;
  let fixture: ComponentFixture<ServicePortal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicePortal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicePortal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
