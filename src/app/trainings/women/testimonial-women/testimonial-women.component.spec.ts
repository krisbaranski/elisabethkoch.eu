import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimonialWomenComponent } from './testimonial-women.component';

describe('TestimonialWomenComponent', () => {
  let component: TestimonialWomenComponent;
  let fixture: ComponentFixture<TestimonialWomenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestimonialWomenComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestimonialWomenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
