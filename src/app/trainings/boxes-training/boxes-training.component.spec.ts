import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxesTrainingComponent } from './boxes-training.component';

describe('BoxesTrainingComponent', () => {
  let component: BoxesTrainingComponent;
  let fixture: ComponentFixture<BoxesTrainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoxesTrainingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BoxesTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
