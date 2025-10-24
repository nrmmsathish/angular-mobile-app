import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";

@Component({
  selector: "app-footer",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./footer.html",
  styleUrls: ["./footer.scss"],
})
export class FooterComponent {
  activeTab = "Home";

  constructor(private router: Router) {}

  navigateTo(route: string, tabName: string) {
    this.activeTab = tabName;
    this.router.navigate([route]);
  }

  openAIChat() {
    this.activeTab = "AI";
    this.router.navigate(["/chatbot"]);
  }
}
