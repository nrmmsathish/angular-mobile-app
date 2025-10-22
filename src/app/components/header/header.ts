import { Component, OnInit, OnDestroy } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./header.html",
  styleUrls: ["./header.scss"],
})
export class HeaderComponent implements OnInit, OnDestroy {
  currentTime = "12:53";
  activeTab = "Academy";
  private timeInterval: any;

  constructor(private router: Router) {}

  ngOnInit() {
    this.updateTime();
    this.timeInterval = setInterval(() => this.updateTime(), 60000);
  }

  ngOnDestroy() {
    if (this.timeInterval) {
      clearInterval(this.timeInterval);
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

  setActiveTab(tab: string) {
    this.activeTab = tab;
    // Navigate to appropriate route based on tab
    if (tab === "Academy") {
      this.router.navigate(["/academy"]);
    } else if (tab === "Discover") {
      this.router.navigate(["/discover"]);
    }
  }
}
