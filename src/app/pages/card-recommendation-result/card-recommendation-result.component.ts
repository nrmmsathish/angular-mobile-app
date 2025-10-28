import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-card-recommendation-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-recommendation-result.component.html',
  styleUrls: ['./card-recommendation-result.component.scss']
})
export class CardRecommendationResultComponent implements OnInit {
  
  recommendedCard = {
    name: 'Citi Prestige® Card',
    type: 'Premium Travel Rewards',
    annualFee: 'SGD 535',
    image: 'assets/images/citi-prestige-card.jpg',
    benefits: [
      '4X ThankYou Points on dining and entertainment',
      '3X ThankYou Points on travel and gas stations',
      '1X ThankYou Points on all other purchases',
      'Complimentary 4th night at hotels worldwide',
      'Priority Pass Select lounge access',
      'Global Entry or TSA PreCheck credit',
      'No foreign transaction fees'
    ],
    features: [
      {
        title: 'Travel Benefits',
        items: [
          'Complimentary 4th night benefit',
          'Priority Pass Select membership',
          '$250 annual travel credit'
        ]
      },
      {
        title: 'Rewards Program',
        items: [
          '4X points on dining & entertainment',
          '3X points on travel & gas',
          'Points transfer to airline partners'
        ]
      },
      {
        title: 'Premium Perks',
        items: [
          'Concierge service 24/7',
          'Global Entry/TSA PreCheck credit',
          'Prestige customer service line'
        ]
      }
    ],
    welcomeBonus: 'Earn 60,000 bonus ThankYou Points after spending SGD 4,000 in purchases within the first 3 months'
  };

  constructor(private router: Router, private navigationService: NavigationService) {}

  ngOnInit() {
    this.navigationService.setCurrentPage('Card Recommendation');
  }

  goBack() {
    this.router.navigate(['/card-questionnaire']);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  applyNow() {
    // Navigate to application success page
    this.router.navigate(['/card-application-success']);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  learnMore() {
    console.log('Learn more about Citi Prestige Card');
    // Navigate to detailed card information page
  }

  retakeSurvey() {
    this.router.navigate(['/card-questionnaire']);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  backToDashboard() {
    this.router.navigate(['/dashboard']);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}