import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-card-application-success',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-application-success.component.html',
  styleUrls: ['./card-application-success.component.scss']
})
export class CardApplicationSuccessComponent implements OnInit {
  
  applicationDetails = {
    referenceNumber: 'CTI-' + this.generateReferenceNumber(),
    cardName: 'Citi Prestige® Card',
    applicationDate: new Date().toLocaleDateString('en-SG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    expectedProcessingTime: '7-10 business days',
    nextSteps: [
      'You will receive an SMS confirmation within 24 hours',
      'Our team will review your application within 2-3 business days',
      'You may be contacted for additional documentation',
      'Final decision will be communicated via email and SMS',
      'Upon approval, your card will be delivered within 5-7 business days'
    ],
    contactInfo: {
      phoneNumber: '+65 6225 5225',
      email: 'cardservices@citibank.com.sg',
      websiteStatus: 'www.citibank.com.sg/applications'
    }
  };

  benefits = [
    {
      title: 'Welcome Bonus',
      description: 'Earn 60,000 bonus ThankYou Points after spending SGD 4,000 in the first 3 months',
      icon: '🎁'
    },
    {
      title: 'Travel Benefits',
      description: 'Complimentary 4th night benefit and Priority Pass Select membership',
      icon: '✈️'
    },
    {
      title: 'Rewards Program',
      description: '4X points on dining & entertainment, 3X points on travel',
      icon: '⭐'
    }
  ];

  constructor(private router: Router, private navigationService: NavigationService) {}

  ngOnInit() {
    this.navigationService.setCurrentPage('Application Success');
  }

  private generateReferenceNumber(): string {
    const timestamp = Date.now().toString().slice(-8);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${timestamp}${random}`;
  }

  downloadPDF() {
    // In a real application, this would generate and download a PDF
    console.log('Downloading application confirmation PDF');
    alert('PDF download feature would be implemented here');
  }

  copyReferenceNumber() {
    navigator.clipboard.writeText(this.applicationDetails.referenceNumber).then(() => {
      alert('Reference number copied to clipboard!');
    }).catch(() => {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = this.applicationDetails.referenceNumber;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('Reference number copied to clipboard!');
    });
  }

  checkApplicationStatus() {
    console.log('Redirecting to application status page');
    // In a real app, this would navigate to a status checking page
    alert('Application status feature would be implemented here');
  }

  backToDashboard() {
    this.router.navigate(['/dashboard']);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  exploreMoreCards() {
    this.router.navigate(['/card-questionnaire']);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  contactSupport() {
    console.log('Opening contact support options');
    // In a real app, this might open a chat widget or phone dialer
    alert('Contact support feature would be implemented here');
  }
}