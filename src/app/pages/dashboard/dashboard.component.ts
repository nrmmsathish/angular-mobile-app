import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface AccountStat {
  label: string;
  value: string;
  icon: string;
  type: 'miles' | 'points' | 'cashback' | 'smr';
  accountNumber: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  userName = 'Richard Lim';
  userAge = 55;
  investmentLevel = 'Getting Started';
  currentStage = 'Stage 3';
  
  accountStats: AccountStat[] = [
    { 
      label: 'Miles', 
      value: '324,567', 
      icon: 'airplane', 
      type: 'miles',
      accountNumber: '••••7855'
    },
    { 
      label: 'Points', 
      value: '892,150', 
      icon: 'star', 
      type: 'points',
      accountNumber: '••••3707'
    },
    { 
      label: 'Cash Back', 
      value: '2.85', 
      icon: 'cashback', 
      type: 'cashback',
      accountNumber: '••••2879'
    },
    { 
      label: 'Citi SMR', 
      value: '', 
      icon: 'smr', 
      type: 'smr',
      accountNumber: ''
    }
  ];

  wanderPlusOffer = {
    title: 'Complimentary AIA WanderPlus Premium Cover',
    description: 'Enhanced travel protection for frequent travelers. Worldwide coverage with premium benefits. T&Cs apply.'
  };

  savingsSection = {
    title: 'PREMIUM WEALTH MANAGEMENT',
    subtitle: 'Exclusive benefits for high net worth clients with global banking solutions',
    buttonText: 'Explore Benefits'
  };

  totalAssets = {
    amount: 'SGD 1,547,892.35'
  };

  localDeposits = {
    amount: 'SGD 892,456.20'
  };

  foreignDeposits = {
    amount: 'SGD 655,436.15'
  };

  creditCards = {
    amount: 'SGD 12,847.50',
    label: 'PRESTIGE CARD'
  };

  replacementCard = {
    title: 'Manage your Citi Prestige® World Elite',
    cardNumber: '••••2879'
  };

  bottomNavItems = [
    { label: 'Wealth', icon: 'chart', route: '/wealth' },
    { label: 'Payments', icon: 'transfer', route: '/payments' },
    { label: 'For You', icon: 'user', route: '/academy' }
  ];

  constructor(private router: Router) {}

  onWanderPlusClick() {
    console.log('WanderPlus offer clicked');
  }

  onTryNowClick() {
    console.log('Try now clicked');
  }

  onWealthAnalysisClick() {
    console.log('Wealth Analysis clicked');
  }

  onEStatementsClick() {
    console.log('E-Statements clicked');
  }

  onTotalAssetsClick() {
    console.log('Total Assets clicked');
  }

  onLocalDepositsClick() {
    console.log('Local Currency Deposits clicked');
  }

  onForeignDepositsClick() {
    console.log('Foreign Currency Deposits clicked');
  }

  onCreditCardsClick() {
    console.log('Credit Cards clicked');
  }

  onActivateCardClick() {
    console.log('Activate replacement card clicked');
  }

  onBottomNavClick(item: any) {
    if (item.route) {
      this.router.navigate([item.route]);
    }
  }

  goToAcademy() {
    this.router.navigate(['/academy']);
  }
}