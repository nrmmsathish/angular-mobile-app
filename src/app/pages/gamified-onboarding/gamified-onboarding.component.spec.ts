import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamifiedOnboardingComponent } from './gamified-onboarding.component';

describe('GamifiedOnboardingComponent', () => {
  let component: GamifiedOnboardingComponent;
  let fixture: ComponentFixture<GamifiedOnboardingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GamifiedOnboardingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GamifiedOnboardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});