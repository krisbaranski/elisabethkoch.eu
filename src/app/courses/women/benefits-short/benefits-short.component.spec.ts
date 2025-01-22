import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenefitsShortComponent } from './benefits-short.component';

describe('BenefitsShortComponent', () => {
  let component: BenefitsShortComponent;
  let fixture: ComponentFixture<BenefitsShortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BenefitsShortComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BenefitsShortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
