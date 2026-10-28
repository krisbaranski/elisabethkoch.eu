import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroBlogComponent } from './hero-blog.component';

describe('HeroBlogComponent', () => {
  let component: HeroBlogComponent;
  let fixture: ComponentFixture<HeroBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroBlogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
