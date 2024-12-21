import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutmeShortComponent } from './aboutme-short.component';

describe('AboutmeShortComponent', () => {
  let component: AboutmeShortComponent;
  let fixture: ComponentFixture<AboutmeShortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AboutmeShortComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutmeShortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
