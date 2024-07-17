import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermineComponent } from './termine.component';

describe('TermineComponent', () => {
  let component: TermineComponent;
  let fixture: ComponentFixture<TermineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TermineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TermineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
