import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkWomenComponent } from './work-women.component';

describe('WorkWomenComponent', () => {
  let component: WorkWomenComponent;
  let fixture: ComponentFixture<WorkWomenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkWomenComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkWomenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
