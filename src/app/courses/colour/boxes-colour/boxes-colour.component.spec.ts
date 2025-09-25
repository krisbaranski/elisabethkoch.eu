import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxesColourComponent } from './boxes-colour.component';

describe('BoxesColourComponent', () => {
  let component: BoxesColourComponent;
  let fixture: ComponentFixture<BoxesColourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoxesColourComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BoxesColourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
