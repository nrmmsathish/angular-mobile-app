import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface Offer {
  id: string;
  title: string;
  description: string;
  image: string;
  buttonText: string;
  category: string;
}

interface QuickAction {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  route?: string;
}

@Component({
  selector: 'app-citi-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './citi-home.component.html',
  styleUrls: ['./citi-home.component.scss']
})
export class CitiHomeComponent {
  activeTab = 'All';
  tabs = ['All', 'Offers', 'Wealth Insights'];

  offers: Offer[] = [
    {
      id: '1',
      title: 'Citi Gourmet Pleasures',
      description: 'Enjoy up to 50% off dining deals with Citi Cards. T&Cs apply.',
      image: 'gourmet-pleasures.jpg',
      buttonText: 'Learn More',
      category: 'Offers'
    },
    {
      id: '2',
      title: 'Citi Mastercard Million Dollar Giveaway',
      description: 'Win big with our exclusive giveaway program.',
      image: 'mastercard-giveaway.jpg',
      buttonText: 'Find out more',
      category: 'Offers'
    },
    {
      id: '3',
      title: 'Building a diversified portfolio',
      description: 'Learn the fundamentals of portfolio diversification.',
      image: 'portfolio-building.jpg',
      buttonText: 'Read more',
      category: 'Wealth Insights'
    },
    {
      id: '4',
      title: 'Be an informed investor',
      description: 'Stay updated with market trends and investment strategies.',
      image: 'informed-investor.jpg',
      buttonText: 'Learn more',
      category: 'Wealth Insights'
    },
    {
      id: '5',
      title: 'Exploring loan options',
      description: 'There may be situations where taking on a loan could help.',
      image: 'loan-options.jpg',
      buttonText: 'Read more',
      category: 'Wealth Insights'
    }
  ];

  quickActions: QuickAction[] = [
    {
      id: '1',
      icon: 'lock',
      title: 'Authorise',
      subtitle: 'Transaction',
      route: '/authorise'
    },
    {
      id: '2',
      icon: 'money-transfer',
      title: 'PayNow',
      subtitle: '',
      route: '/paynow'
    },
    {
      id: '3',
      icon: 'qr-code',
      title: 'Scan QR',
      subtitle: '',
      route: '/scan-qr'
    },
    {
      id: '4',
      icon: 'menu',
      title: 'More',
      subtitle: '',
      route: '/more'
    }
  ];

  constructor(private router: Router) {}

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  getFilteredOffers() {
    if (this.activeTab === 'All') {
      return this.offers;
    }
    return this.offers.filter(offer => offer.category === this.activeTab);
  }

  onOfferClick(offer: Offer) {
    // Handle offer click - could navigate to offer details
    console.log('Offer clicked:', offer);
  }

  onQuickActionClick(action: QuickAction) {
    if (action.route) {
      this.router.navigate([action.route]);
    }
  }

  onLoginClick() {
    // Navigate to dashboard
    this.router.navigate(['/dashboard']);
  }

  onLogoClick() {
    this.router.navigate(['/dashboard']);
  }
}