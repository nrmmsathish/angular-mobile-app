import { Component, OnInit } from "@angular/core";
import { RouterOutlet, Router, NavigationEnd, NavigationStart } from "@angular/router";
import { HeaderComponent } from "./components/header/header";
import { FooterComponent } from "./components/footer/footer";
import { LoadingComponent } from "./components/loading/loading.component";
import { CommonModule } from "@angular/common";
import { filter } from "rxjs/operators";
import { LoadingService } from "./services/loading.service";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, LoadingComponent, CommonModule],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent implements OnInit {
  title = "angular-mobile-app";
  showHeader = true;
  showFooter = true;

  constructor(private router: Router, private loadingService: LoadingService) {
    // Set initial state based on current route  
    const currentUrl = this.router.url;
    
    // Clean localStorage flags if we're starting on citi-home
    if (currentUrl.includes('citi-home') || currentUrl === '/') {
      localStorage.removeItem('academyMode');
      localStorage.removeItem('hideHeader');
    }
    
    this.updateHeaderFooterVisibility(currentUrl);
  }

  ngOnInit() {
    // Handle navigation events for header/footer visibility
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event) => {
        const url = (event as NavigationEnd).url;
        
        // Special handling for citi-home to ensure clean state
        if (url.includes('citi-home') || url === '/') {
          // Clear any lingering header hiding flags
          localStorage.removeItem('academyMode');
          localStorage.removeItem('hideHeader');
          // Force update after a small delay
          setTimeout(() => {
            localStorage.removeItem('academyMode');
            localStorage.removeItem('hideHeader');
          }, 100);
        }
        
        // Update header and footer visibility based on route
        this.updateHeaderFooterVisibility(url);
        
        // Double-check after a small delay to ensure state is correct
        setTimeout(() => {
          this.updateHeaderFooterVisibility(url);
        }, 50);
      });

    // Handle loading states for navigation
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.loadingService.show();
      } else if (event instanceof NavigationEnd) {
        // Add a small delay to show the loading animation
        setTimeout(() => {
          this.loadingService.hide();
        }, 500);
      }
    });
  }

  private updateHeaderFooterVisibility(url: string) {
    if (url.includes('dashboard')) {
      // Dashboard: hide both header and footer
      this.showHeader = false;
      this.showFooter = false;
    } else if (url.includes('citi-home') || url === '/') {
      // Citi-home: show header but hide footer
      this.showHeader = true;
      this.showFooter = false;
    } else {
      // All other pages: show both header and footer
      this.showHeader = true;
      this.showFooter = true;
    }
  }
}
