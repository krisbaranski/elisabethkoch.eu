import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroLionComponent } from './hero-lion.component';

describe('HeroLionComponent', () => {
  let component: HeroLionComponent;
  let fixture: ComponentFixture<HeroLionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroLionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroLionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
