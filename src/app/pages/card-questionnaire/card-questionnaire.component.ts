import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NavigationService } from '../../services/navigation.service';

interface QuestionnaireData {
  monthlySpend: number;
  primarySpendCategory: string;
  travelFrequency: string;
  rewardsPreference: string;
  annualIncome: number;
}

@Component({
  selector: 'app-card-questionnaire',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './card-questionnaire.component.html',
  styleUrls: ['./card-questionnaire.component.scss']
})
export class CardQuestionnaireComponent implements OnInit {
  currentStep = 1;
  totalSteps = 5;
  
  questionnaireData: QuestionnaireData = {
    monthlySpend: 0,
    primarySpendCategory: '',
    travelFrequency: '',
    rewardsPreference: '',
    annualIncome: 0
  };

  monthlySpendOptions = [
    { label: 'Less than SGD 1,000', value: 1000 },
    { label: 'SGD 1,000 - 3,000', value: 2000 },
    { label: 'SGD 3,000 - 5,000', value: 4000 },
    { label: 'SGD 5,000 - 10,000', value: 7500 },
    { label: 'More than SGD 10,000', value: 15000 }
  ];

  spendCategories = [
    { label: 'Dining & Food', value: 'dining', icon: '🍽️' },
    { label: 'Travel & Transportation', value: 'travel', icon: '✈️' },
    { label: 'Shopping & Retail', value: 'shopping', icon: '🛍️' },
    { label: 'Groceries & Essentials', value: 'groceries', icon: '🛒' },
    { label: 'Entertainment', value: 'entertainment', icon: '🎬' },
    { label: 'Fuel & Petrol', value: 'fuel', icon: '⛽' }
  ];

  travelOptions = [
    { label: 'Never', value: 'never' },
    { label: '1-2 times per year', value: 'occasional' },
    { label: '3-5 times per year', value: 'frequent' },
    { label: 'More than 5 times per year', value: 'very_frequent' }
  ];

  rewardsOptions = [
    { label: 'Cashback', value: 'cashback', icon: '💰' },
    { label: 'Miles & Travel Rewards', value: 'miles', icon: '✈️' },
    { label: 'Points for Shopping', value: 'points', icon: '🎁' },
    { label: 'Dining & Entertainment', value: 'dining', icon: '🍽️' }
  ];

  incomeOptions = [
    { label: 'SGD 30,000 - 60,000', value: 45000 },
    { label: 'SGD 60,000 - 100,000', value: 80000 },
    { label: 'SGD 100,000 - 200,000', value: 150000 },
    { label: 'SGD 200,000 - 500,000', value: 350000 },
    { label: 'More than SGD 500,000', value: 750000 }
  ];

  constructor(private router: Router, private navigationService: NavigationService) {}

  ngOnInit() {
    this.navigationService.setCurrentPage('Card Recommendation');
  }

  goBack() {
    if (this.currentStep > 1) {
      this.currentStep--;
    } else {
      this.router.navigate(['/dashboard']);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  nextStep() {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
    }
  }

  submitQuestionnaire() {
    // Navigate to card recommendation result
    this.router.navigate(['/card-recommendation-result']);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  selectMonthlySpend(amount: number) {
    this.questionnaireData.monthlySpend = amount;
    setTimeout(() => this.nextStep(), 300);
  }

  selectSpendCategory(category: string) {
    this.questionnaireData.primarySpendCategory = category;
    setTimeout(() => this.nextStep(), 300);
  }

  selectTravelFrequency(frequency: string) {
    this.questionnaireData.travelFrequency = frequency;
    setTimeout(() => this.nextStep(), 300);
  }

  selectRewardsPreference(preference: string) {
    this.questionnaireData.rewardsPreference = preference;
    setTimeout(() => this.nextStep(), 300);
  }

  selectIncome(income: number) {
    this.questionnaireData.annualIncome = income;
    setTimeout(() => this.submitQuestionnaire(), 300);
  }

  getCurrentQuestion(): string {
    switch (this.currentStep) {
      case 1: return 'What is your average monthly credit card spending?';
      case 2: return 'What is your primary spending category?';
      case 3: return 'How often do you travel?';
      case 4: return 'What type of rewards do you prefer?';
      case 5: return 'What is your annual income range?';
      default: return '';
    }
  }
}