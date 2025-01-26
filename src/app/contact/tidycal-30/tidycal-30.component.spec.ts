import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tidycal30Component } from './tidycal-30.component';

describe('Tidycal30Component', () => {
  let component: Tidycal30Component;
  let fixture: ComponentFixture<Tidycal30Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tidycal30Component],
    }).compileComponents();

    fixture = TestBed.createComponent(Tidycal30Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
