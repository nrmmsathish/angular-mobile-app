import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RewardService } from '../../services/reward.service';

interface FormSection {
  id: string;
  title: string;
  isExpanded: boolean;
  items?: FormItem[];
  status?: string;
  lastUpdate?: string;
  expiryDate?: string;
}

interface FormItem {
  id: string;
  title: string;
  subtitle?: string;
  status: 'never-submitted' | 'no' | 'completed';
  lastUpdate?: string;
  expiryDate?: string;
  hasInfo?: boolean;
}

@Component({
  selector: 'app-complete-forms',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './complete-forms.component.html',
  styleUrls: ['./complete-forms.component.scss']
})
export class CompleteFormsComponent {
  isUpdating = false;
  showSuccessAnimation = false;
  formUpdateCount = 0;
  
  formSections: FormSection[] = [
    {
      id: 'customer-knowledge',
      title: 'Customer knowledge assessment',
      isExpanded: true,
      items: [
        {
          id: 'knowledge-ut-ilp',
          title: 'Customer knowledge assessment (UT & ILP)',
          status: 'never-submitted',
          lastUpdate: '-',
          expiryDate: '-',
          hasInfo: true
        },
        {
          id: 'knowledge-all-other',
          title: 'Customer knowledge assessment (All other)',
          status: 'never-submitted',
          lastUpdate: '-',
          expiryDate: '-',
          hasInfo: true
        }
      ]
    },
    {
      id: 'customer-account',
      title: 'Customer account review',
      isExpanded: false
    },
    {
      id: 'risk-profile',
      title: 'Risk profile questionnaire',
      isExpanded: true,
      items: [
        {
          id: 'risk-questionnaire',
          title: 'Risk Profile Questionnaire',
          status: 'never-submitted',
          lastUpdate: '-',
          expiryDate: '-'
        }
      ]
    },
    {
      id: 'risk-warning',
      title: 'Risk warning statement',
      isExpanded: false
    },
    {
      id: 'nyse-market',
      title: 'NYSE market data agreement',
      isExpanded: false
    },
    {
      id: 'w8ben',
      title: 'W-8BEN',
      isExpanded: false
    },
    {
      id: 'accredited-investor',
      title: 'Accredited Investor',
      isExpanded: true,
      items: [
        {
          id: 'accredited-status',
          title: 'Accredited Investor',
          status: 'no',
          lastUpdate: '-',
          expiryDate: '-'
        }
      ]
    }
  ];

  constructor(private router: Router, private rewardService: RewardService) {}

  close() {
    this.router.navigate(['/onboarding']);
  }

  toggleSection(sectionId: string) {
    const section = this.formSections.find(s => s.id === sectionId);
    if (section) {
      section.isExpanded = !section.isExpanded;
    }
  }

  updateForm() {
    // Start loading animation
    this.isUpdating = true;
    
    // Simulate form update process
    setTimeout(() => {
      this.isUpdating = false;
      this.showSuccessAnimation = true;
      this.formUpdateCount++;
      
      // Add reward based on update count
      if (this.formUpdateCount === 1) {
        // First form update - special achievement
        this.rewardService.addReward(RewardService.FIRST_FORM_REWARD);
      } else {
        // Regular form update
        this.rewardService.addReward(RewardService.FORM_UPDATE_REWARD);
      }
      
      // Hide success animation after 2 seconds
      setTimeout(() => {
        this.showSuccessAnimation = false;
      }, 2000);
      
    }, 1500); // Simulate 1.5 second processing time
  }

  viewRequiredForms() {
    console.log('View what respective form(s) is required clicked');
  }
}