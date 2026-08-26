import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CivilRegistry } from './civil-registry';

describe('CivilRegistry', () => {
  let component: CivilRegistry;
  let fixture: ComponentFixture<CivilRegistry>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CivilRegistry]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CivilRegistry);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
