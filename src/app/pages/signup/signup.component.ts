import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NavigationService } from '../../services/navigation.service';

interface SignupStep {
  id: number;
  title: string;
  description: string;
  icon: string;
  status: 'pending' | 'current' | 'completed';
  details: string[];
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  currentStep = 1;
  selectedAccount: string = '';
  applicationReference: string = '';
  qrCodeGenerated: boolean = false;
  verificationComplete: boolean = false;
  
  accountTypes = [
    {
      id: 'savings',
      name: 'Citi Savings Account',
      description: 'Earn competitive interest rates with flexible access to your funds',
      minBalance: 'S$3,000',
      features: ['No monthly fee with min balance', 'Online & Mobile banking', 'Worldwide ATM access', 'Overdraft protection'],
      interestRate: '0.05% p.a.',
      icon: '💰'
    },
    {
      id: 'current',
      name: 'Citi Current Account',
      description: 'Perfect for everyday banking with unlimited transactions',
      minBalance: 'S$1,000',
      features: ['Unlimited transactions', 'Free checkbook', 'Business banking ready', 'Multi-currency support'],
      interestRate: 'N/A',
      icon: '🏦'
    },
    {
      id: 'premium',
      name: 'Citi Premium Account',
      description: 'Enhanced banking experience with exclusive benefits',
      minBalance: 'S$50,000',
      features: ['Priority banking service', 'Personal relationship manager', 'Preferential rates', 'Exclusive lifestyle privileges'],
      interestRate: '0.15% p.a.',
      icon: '👑'
    },
    {
      id: 'investment',
      name: 'Citi Investment Account',
      description: 'Grow your wealth with our comprehensive investment platform',
      minBalance: 'S$10,000',
      features: ['Investment advisory', 'Portfolio management', 'Research reports', 'Global market access'],
      interestRate: 'Variable',
      icon: '📈'
    }
  ];
  
  steps: SignupStep[] = [
    {
      id: 1,
      title: 'Choose Account',
      description: 'Select the account that best fits your banking needs',
      icon: '🏦',
      status: 'current',
      details: [
        'Compare different account types',
        'Review minimum balance requirements',
        'Understand account features and benefits',
        'Select your preferred account type'
      ]
    },
    {
      id: 2,
      title: 'Prepare Docs',
      description: 'Gather all necessary documents for your application',
      icon: '📄',
      status: 'pending',
      details: [
        'Valid NRIC or Passport',
        'Proof of Income (Latest 3 months payslips)',
        'Proof of Address (Utility bills or bank statements)',
        'Employment Letter or Business Registration'
      ]
    },
    {
      id: 3,
      title: 'Submit App',
      description: 'Complete and submit your account opening application',
      icon: '📝',
      status: 'pending',
      details: [
        'Fill in personal and contact information',
        'Upload required documents',
        'Set up your initial deposit amount',
        'Review and submit your application'
      ]
    },
    {
      id: 4,
      title: 'Verification',
      description: 'Verify your identity using SingPass QR authentication',
      icon: '✅',
      status: 'pending',
      details: [
        'Scan QR code with SingPass app',
        'Authenticate using your digital identity',
        'Complete identity verification instantly',
        'Secure and convenient verification process'
      ]
    },
    {
      id: 5,
      title: 'Complete',
      description: 'Account setup complete - Welcome to Citi!',
      icon: '🎉',
      status: 'pending',
      details: [
        'Receive your application reference number',
        'Account will be activated within 1-2 business days',
        'Debit card and welcome kit will be mailed',
        'Access online banking immediately'
      ]
    }
  ];

  constructor(private router: Router, private navigationService: NavigationService) {}

  ngOnInit() {
    // Set page name for header
    this.navigationService.setCurrentPage('Signup');
    
    // Update steps status based on current step
    this.updateStepsStatus();
  }

  updateStepsStatus() {
    this.steps.forEach(step => {
      if (step.id < this.currentStep) {
        step.status = 'completed';
      } else if (step.id === this.currentStep) {
        step.status = 'current';
      } else {
        step.status = 'pending';
      }
    });
  }

  goToStep(stepId: number) {
    if (stepId <= this.currentStep + 1) {
      this.currentStep = stepId;
      this.updateStepsStatus();
    }
  }

  selectAccount(accountId: string) {
    this.selectedAccount = accountId;
  }

  getSelectedAccount() {
    return this.accountTypes.find(account => account.id === this.selectedAccount);
  }

  generateQRCode() {
    this.qrCodeGenerated = true;
    // Simulate QR code generation
    setTimeout(() => {
      this.verificationComplete = true;
      this.generateApplicationReference();
    }, 3000); // Simulate 3 second verification process
  }

  generateApplicationReference() {
    // Generate a realistic application reference number
    const timestamp = Date.now().toString().slice(-6);
    const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    this.applicationReference = `CITI${timestamp}${randomNum}`;
  }

  getQRPattern(): boolean[] {
    // Generate a simple QR-like pattern
    return Array.from({length: 64}, () => Math.random() > 0.5);
  }

  canProceedToNext(): boolean {
    switch (this.currentStep) {
      case 1:
        return this.selectedAccount !== '';
      case 4:
        return this.verificationComplete;
      default:
        return true;
    }
  }

  nextStep() {
    if (this.currentStep < this.steps.length && this.canProceedToNext()) {
      this.currentStep++;
      this.updateStepsStatus();
      
      // Generate reference number when completing verification
      if (this.currentStep === 5 && this.applicationReference === '') {
        this.generateApplicationReference();
      }
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.updateStepsStatus();
    }
  }

  startApplication() {
    // Navigate to dashboard or show completion message
    this.router.navigate(['/dashboard']).then(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  copyReferenceNumber() {
    if (this.applicationReference) {
      navigator.clipboard.writeText(this.applicationReference).then(() => {
        alert('Reference number copied to clipboard!');
      });
    }
  }

  goBack() {
    this.router.navigate(['/citi-home']).then(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  getCurrentStep(): SignupStep {
    return this.steps.find(step => step.id === this.currentStep) || this.steps[0];
  }
}