import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideAboutmeComponent } from './slide-aboutme.component';

describe('SlideAboutmeComponent', () => {
  let component: SlideAboutmeComponent;
  let fixture: ComponentFixture<SlideAboutmeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlideAboutmeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SlideAboutmeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
