import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstAppointmentComponent } from './first-appointment.component';

describe('FirstAppointmentComponent', () => {
  let component: FirstAppointmentComponent;
  let fixture: ComponentFixture<FirstAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FirstAppointmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FirstAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
