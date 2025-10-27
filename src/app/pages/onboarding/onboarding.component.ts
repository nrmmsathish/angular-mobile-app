import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-onboarding',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss']
})
export class OnboardingComponent {
  completedSteps = 3;
  totalSteps = 6;

  // Define the stages
  private stages = [
    { name: 'Getting Started', range: [1, 1] },
    { name: 'Initial Setup', range: [2, 2] },
    { name: 'Profile Setup', range: [3, 3] },
    { name: 'Risk Assessment', range: [4, 4] },
    { name: 'Knowledge Check', range: [5, 5] },
    { name: 'Final Review', range: [6, 6] }
  ];

  constructor(private router: Router) {}

  getCurrentStage(): number {
    for (let i = 0; i < this.stages.length; i++) {
      const stage = this.stages[i];
      if (this.completedSteps >= stage.range[0] && this.completedSteps <= stage.range[1]) {
        return i + 1;
      }
    }
    return this.stages.length; // Default to last stage if beyond range
  }

  getCurrentStageName(): string {
    const stageIndex = this.getCurrentStage() - 1;
    return this.stages[stageIndex]?.name || 'Complete';
  }

  goBack() {
    this.router.navigate(['/discover']);
  }

  navigateToSection(section: string) {
    // Handle navigation to different sections
    switch(section) {
      case 'net-worth':
        console.log('Navigating to Net Worth assessment');
        break;
      case 'risk-profile':
        console.log('Navigating to Risk Profile Questionnaire');
        break;
      case 'knowledge-assessment':
        console.log('Navigating to Customer Knowledge Assessment');
        break;
      case 'account-review':
        console.log('Navigating to Customer Account Review');
        break;
      default:
        console.log('Navigating to:', section);
    }
  }

  startFuturePlanner() {
    console.log('Starting Future Planner');
    this.router.navigate(['/complete-forms']);
  }

  openGamifiedOnboarding() {
    this.router.navigate(['/gamified-onboarding']);
  }
}