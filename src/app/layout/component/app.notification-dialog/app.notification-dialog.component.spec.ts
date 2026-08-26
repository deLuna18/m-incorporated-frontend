import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppNotificationDialogComponent } from './app.notification-dialog.component';

describe('AppNotificationDialogComponent', () => {
  let component: AppNotificationDialogComponent;
  let fixture: ComponentFixture<AppNotificationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppNotificationDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppNotificationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
