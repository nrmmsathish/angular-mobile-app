import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router, NavigationEnd } from "@angular/router";
import { NavigationService } from "../../services/navigation.service";
import { filter } from "rxjs/operators";

@Component({
  selector: "app-footer",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./footer.html",
  styleUrls: ["./footer.scss"],
})
export class FooterComponent implements OnInit {
  activeTab = "Academy";

  constructor(
    private router: Router,
    private navigationService: NavigationService
  ) {}

  ngOnInit() {
    // Set initial page based on current route
    this.setPageFromRoute();
    
    // Listen to route changes to update the current page
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.setPageFromRoute());
  }

  navigateTo(route: string, tabName: string) {
    this.activeTab = tabName;
    this.navigationService.setCurrentPage(tabName);
    this.router.navigate([route]);
  }

  openAIChat() {
    this.activeTab = "Assistant";
    this.navigationService.setCurrentPage("Assistant");
    this.router.navigate(["/chatbot"]);
  }

  private setPageFromRoute() {
    const url = this.router.url;
    if (url.includes('/discover')) {
      this.activeTab = 'Markets';
      this.navigationService.setCurrentPage('Markets');
    } else if (url.includes('/academy')) {
      this.activeTab = 'Academy';
      this.navigationService.setCurrentPage('Academy');
    } else if (url.includes('/chatbot')) {
      this.activeTab = 'Assistant';
      this.navigationService.setCurrentPage('Assistant');
    } else if (url.includes('/onboarding')) {
      this.activeTab = 'Onboarding';
      this.navigationService.setCurrentPage('Onboarding');
    } else if (url.includes('/complete-forms')) {
      this.activeTab = 'Onboarding';
      this.navigationService.setCurrentPage('Complete Forms');
    } else if (url.includes('/course')) {
      this.activeTab = 'Academy';
      this.navigationService.setCurrentPage('Course');
    } else if (url.includes('/screener')) {
      this.activeTab = 'Markets';
      this.navigationService.setCurrentPage('Screener');
    } else if (url.includes('/earnings-calendar')) {
      this.activeTab = 'Markets';
      this.navigationService.setCurrentPage('Earnings');
    } else if (url.includes('/indian-concept') || url.includes('/bitcoin-etf') || 
               url.includes('/warren-buffett') || url.includes('/nancy-pelosi')) {
      this.activeTab = 'Markets';
      this.navigationService.setCurrentPage('Stock Detail');
    } else {
      // Default to Academy
      this.activeTab = 'Academy';
      this.navigationService.setCurrentPage('Academy');
    }
  }
}
