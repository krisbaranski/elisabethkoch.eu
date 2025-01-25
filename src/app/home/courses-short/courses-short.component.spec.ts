import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesShortComponent } from './courses-short.component';

describe('CoursesShortComponent', () => {
  let component: CoursesShortComponent;
  let fixture: ComponentFixture<CoursesShortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursesShortComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CoursesShortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
