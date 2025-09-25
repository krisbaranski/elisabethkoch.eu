import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroColourComponent } from './hero-colour.component';

describe('HeroComponent', () => {
  let component: HeroColourComponent;
  let fixture: ComponentFixture<HeroColourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroColourComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroColourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
