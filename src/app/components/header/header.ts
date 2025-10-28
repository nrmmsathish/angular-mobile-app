import { Component, OnInit, OnDestroy } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { NavigationService } from "../../services/navigation.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./header.html",
  styleUrls: ["./header.scss"],
})
export class HeaderComponent implements OnInit, OnDestroy {
  currentTime = "12:53";
  currentPageName = "Academy";
  private timeInterval: any;
  private navigationSubscription!: Subscription;

  constructor(private navigationService: NavigationService, private router: Router) {}

  ngOnInit() {
    this.updateTime();
    this.timeInterval = setInterval(() => this.updateTime(), 60000);
    
    // Subscribe to page name changes
    this.navigationSubscription = this.navigationService.currentPage$.subscribe(
      (pageName) => {
        this.currentPageName = pageName;
      }
    );
  }

  ngOnDestroy() {
    if (this.timeInterval) {
      clearInterval(this.timeInterval);
    }
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  updateTime() {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  }

  onLogoClick() {
    this.router.navigate(['/dashboard']).then(() => {
      // Scroll to top after navigation
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}
