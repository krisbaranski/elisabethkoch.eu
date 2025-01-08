import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingsShortComponent } from './trainings-short.component';

describe('TrainingsShortComponent', () => {
  let component: TrainingsShortComponent;
  let fixture: ComponentFixture<TrainingsShortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainingsShortComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrainingsShortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
