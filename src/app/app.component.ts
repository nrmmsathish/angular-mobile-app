import { Component, OnInit } from "@angular/core";
import { RouterOutlet, Router, NavigationEnd } from "@angular/router";
import { HeaderComponent } from "./components/header/header";
import { FooterComponent } from "./components/footer/footer";
import { CommonModule } from "@angular/common";
import { filter } from "rxjs/operators";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, CommonModule],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent implements OnInit {
  title = "angular-mobile-app";
  showHeaderFooter = true;

  constructor(private router: Router) {
    // Set initial state based on current route
    const currentUrl = this.router.url;
    this.showHeaderFooter = !currentUrl.includes('citi-home') && !currentUrl.includes('dashboard');
  }

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event) => {
        // Hide header and footer for Citi home page and dashboard
        const url = (event as NavigationEnd).url;
        this.showHeaderFooter = !url.includes('citi-home') && !url.includes('dashboard');
      });
  }
}
