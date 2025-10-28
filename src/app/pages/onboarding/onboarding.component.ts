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

  // Define the investment journey stages with timing and rewards
  investmentStages = [
    {
      id: 'prospecting',
      title: 'Prospecting',
      description: 'Initial interest and information gathering',
      status: 'completed',
      timeEstimate: '2-3 days',
      timeTaken: '2 days',
      rewardPoints: 50,
      earnedPoints: 50
    },
    {
      id: 'account-opening',
      title: 'Account Opening',
      description: 'Documentation and account setup completed',
      status: 'completed',
      timeEstimate: '3-5 days',
      timeTaken: '4 days',
      rewardPoints: 100,
      earnedPoints: 100
    },
    {
      id: 'onboarding',
      title: 'Onboarding',
      description: 'Platform introduction and basic setup',
      status: 'completed',
      timeEstimate: '1-2 days',
      timeTaken: '1 day',
      rewardPoints: 75,
      earnedPoints: 75
    },
    {
      id: 'getting-investment-ready',
      title: 'Getting Investment Ready',
      description: 'Risk assessment and investment planning',
      status: 'in-progress',
      timeEstimate: '2-4 days',
      timeTaken: null,
      rewardPoints: 150,
      earnedPoints: 0
    },
    {
      id: 'become-investment-active',
      title: 'Become Investment Active',
      description: 'Start making your first investments',
      status: 'pending',
      timeEstimate: '1-3 days',
      timeTaken: null,
      rewardPoints: 200,
      earnedPoints: 0
    },
    {
      id: 'managing-portfolio',
      title: 'Managing Portfolio',
      description: 'Monitor and adjust your investments',
      status: 'pending',
      timeEstimate: 'Ongoing',
      timeTaken: null,
      rewardPoints: 250,
      earnedPoints: 0
    },
    {
      id: 'diversifying-growing',
      title: 'Diversifying & Growing',
      description: 'Expand and optimize your portfolio',
      status: 'pending',
      timeEstimate: 'Ongoing',
      timeTaken: null,
      rewardPoints: 300,
      earnedPoints: 0
    }
  ];

  // Calculate total earned points
  get totalEarnedPoints(): number {
    return this.investmentStages.reduce((total, stage) => total + stage.earnedPoints, 0);
  }

  // Calculate total possible points
  get totalPossiblePoints(): number {
    return this.investmentStages.reduce((total, stage) => total + stage.rewardPoints, 0);
  }

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

  navigateToStage(stageId: string) {
    // Handle navigation to different investment journey stages
    const stage = this.investmentStages.find(s => s.id === stageId);
    if (!stage) return;

    switch(stageId) {
      case 'prospecting':
        console.log('Viewing Prospecting stage details');
        break;
      case 'account-opening':
        console.log('Viewing Account Opening stage details');
        break;
      case 'onboarding':
        console.log('Viewing Onboarding stage details');
        break;
      case 'getting-investment-ready':
        console.log('Continuing Getting Investment Ready stage');
        this.continueInvestmentReady();
        break;
      default:
        console.log('Navigating to stage:', stageId);
    }
  }

  continueInvestmentReady(event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    console.log('Starting Investment Readiness assessment');
    this.router.navigate(['/complete-forms']);
  }

  startFuturePlanner() {
    console.log('Starting Future Planner');
    this.router.navigate(['/complete-forms']);
  }

  openGamifiedOnboarding() {
    this.router.navigate(['/gamified-onboarding']);
  }
}