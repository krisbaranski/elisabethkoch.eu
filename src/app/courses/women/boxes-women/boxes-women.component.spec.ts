import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxesWomenComponent } from './boxes-women.component';

describe('BoxesWomenComponent', () => {
  let component: BoxesWomenComponent;
  let fixture: ComponentFixture<BoxesWomenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoxesWomenComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BoxesWomenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
