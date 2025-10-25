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
  completedSteps = 0;
  totalSteps = 4;

  constructor(private router: Router) {}

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
}