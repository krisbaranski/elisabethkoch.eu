import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tidycal60Component } from './tidycal-60.component';

describe('Tidycal60Component', () => {
  let component: Tidycal60Component;
  let fixture: ComponentFixture<Tidycal60Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tidycal60Component],
    }).compileComponents();

    fixture = TestBed.createComponent(Tidycal60Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
