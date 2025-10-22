import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";

interface Stock {
  symbol: string;
  company: string;
  market: string;
  lastPrice: number;
  change: number;
  changePercent: string;
  isPositive: boolean;
}

@Component({
  selector: "app-screener",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./screener.component.html",
  styleUrls: ["./screener.component.scss"],
})
export class ScreenerComponent {
  screenerTitle = "trump";
  filterType = "Stock";
  filterScope = "Markets:US | Theme:Trump Concept";
  totalStocks = 30;

  stocks: Stock[] = [
    {
      symbol: "ACM",
      company: "AECOM",
      market: "US",
      lastPrice: 134.22,
      change: 0.58,
      changePercent: "0.43%",
      isPositive: true,
    },
    {
      symbol: "SDIG",
      company: "Stronghold Digi...",
      market: "US",
      lastPrice: 2.81,
      change: 0,
      changePercent: "0.00%",
      isPositive: false,
    },
    {
      symbol: "CXW",
      company: "CoreCivic, Inc",
      market: "US",
      lastPrice: 18.27,
      change: 0.25,
      changePercent: "1.39%",
      isPositive: true,
    },
    {
      symbol: "RUM",
      company: "Rumble Inc.",
      market: "US",
      lastPrice: 7.3,
      change: -0.03,
      changePercent: "-0.41%",
      isPositive: false,
    },
    {
      symbol: "GEO",
      company: "Geo Group Inc",
      market: "US",
      lastPrice: 17.47,
      change: 0.47,
      changePercent: "2.76%",
      isPositive: true,
    },
    {
      symbol: "PHUN",
      company: "Phunware, Inc.",
      market: "US",
      lastPrice: 2.79,
      change: -0.02,
      changePercent: "-0.71%",
      isPositive: false,
    },
    {
      symbol: "DJT",
      company: "Trump Media &...",
      market: "US",
      lastPrice: 15.96,
      change: -0.03,
      changePercent: "-0.19%",
      isPositive: false,
    },
  ];

  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(["/discover"]);
  }

  saveScreener() {
    // Handle save functionality
    console.log("Screener saved");
  }

  modifyFilter() {
    // Handle modify filter functionality
    console.log("Modify filter");
  }
}
