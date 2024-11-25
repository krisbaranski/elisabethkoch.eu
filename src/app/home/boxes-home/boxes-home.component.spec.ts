import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxesHomeComponent } from './boxes-home.component';

describe('BoxesHomeComponent', () => {
  let component: BoxesHomeComponent;
  let fixture: ComponentFixture<BoxesHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoxesHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BoxesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
