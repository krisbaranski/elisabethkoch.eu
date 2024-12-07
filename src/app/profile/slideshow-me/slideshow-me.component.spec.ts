import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideshowMeComponent } from './slideshow-me.component';

describe('SlideshowComponent', () => {
  let component: SlideshowMeComponent;
  let fixture: ComponentFixture<SlideshowMeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SlideshowMeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SlideshowMeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
