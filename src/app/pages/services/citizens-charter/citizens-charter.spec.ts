import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitizensCharter } from './citizens-charter';

describe('CitizensCharter', () => {
  let component: CitizensCharter;
  let fixture: ComponentFixture<CitizensCharter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitizensCharter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitizensCharter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
