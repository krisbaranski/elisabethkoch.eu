import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroAnalyseComponent } from './hero-analyse.component';

describe('HeroAnalyseComponent', () => {
  let component: HeroAnalyseComponent;
  let fixture: ComponentFixture<HeroAnalyseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroAnalyseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeroAnalyseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
