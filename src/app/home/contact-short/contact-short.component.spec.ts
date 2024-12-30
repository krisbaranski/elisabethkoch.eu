import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactShortComponent } from './contact-short.component';

describe('ContactShortComponent', () => {
  let component: ContactShortComponent;
  let fixture: ComponentFixture<ContactShortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactShortComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContactShortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
