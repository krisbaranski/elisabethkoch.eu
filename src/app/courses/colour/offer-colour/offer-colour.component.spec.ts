import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferColourComponent } from './offer-colour.component';

describe('OfferColourComponent', () => {
  let component: OfferColourComponent;
  let fixture: ComponentFixture<OfferColourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfferColourComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OfferColourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
