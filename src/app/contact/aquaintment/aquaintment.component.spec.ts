import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AquaintmentComponent } from './aquaintment.component';

describe('AquaintmentComponent', () => {
  let component: AquaintmentComponent;
  let fixture: ComponentFixture<AquaintmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AquaintmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AquaintmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
