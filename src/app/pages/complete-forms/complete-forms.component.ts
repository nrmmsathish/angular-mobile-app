import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {}

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
    console.log('Update form clicked');
  }

  viewRequiredForms() {
    console.log('View what respective form(s) is required clicked');
  }
}