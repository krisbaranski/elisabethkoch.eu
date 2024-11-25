import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TidycalComponent } from './tidycal.component';

describe('TidycalComponent', () => {
  let component: TidycalComponent;
  let fixture: ComponentFixture<TidycalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TidycalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TidycalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
