import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from '@angular/router';
interface Stock {
  name: string;
  percentage: string;
  isPositive: boolean;
}

interface TradingGroup {
  title: string;
  subtitle: string;
  stocks: Stock[];
}

interface DividendItem {
  id: string;
  symbol: string;
  companyName: string;
  market: string;
  dividend: number;
  exDate?: string;
  recordDate?: string;
  color: string;
  letter: string;
}

interface EarningsDay {
  date: string;
  displayDate: string;
  dividends: DividendItem[];
}

@Component({
  selector: "app-discover",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./discover.component.html",
  styleUrls: ["./discover.component.scss"],
})
export class DiscoverComponent {
  activeMainTab = "Hot";
  activeSubTab = "Screener";
  activeFilterTab = "Followed List";
  activeEarningsTab = "Dividend";

  selectedDate = "10 / 22";
  selectedYear = "2025";
  selectedPeriod = "Day";

  mainTabs = ["Hot", "Earnings Calendar", "Trade Feed", "Opportunity"];
  subTabs = ["Movers & Shakers", "Top Buys & Sells", "Screener"];
  filterTabs = ["Most Active", "Similar Candlesticks", "Followed List"];
  earningsTabs = ["Earnings", "Dividend", "Economy"];

  tradingGroups: TradingGroup[] = [
    {
      title: "trump",
      subtitle: "Type:Stock | Markets:US | Theme:Trump Concept",
      stocks: [
        { name: "General Motors", percentage: "+14.86%", isPositive: true },
        { name: "Steel Dynamics", percentage: "+5.15%", isPositive: true },
      ],
    },
    {
      title: "US Contra Trading",
      subtitle: "Type:Stock | Markets:US | Contra Trading",
      stocks: [
        { name: "General Motors", percentage: "+14.86%", isPositive: true },
        { name: "Vicor", percentage: "+13.37%", isPositive: true },
      ],
    },
    {
      title: "HK Contra Trading",
      subtitle: "Type:Stock | Markets:HK | Contra Trading",
      stocks: [
        { name: "IMOTIONTECH", percentage: "+10.99%", isPositive: true },
        { name: "OSHIDORI", percentage: "+10.42%", isPositive: true },
      ],
    },
    {
      title: "SI Contra Trading",
      subtitle: "Type:Stock | Markets:SG | Contra Trading",
      stocks: [
        { name: "YZJ Shipbldg CNY", percentage: "+55.73%", isPositive: true },
        {
          name: "NetEase 5xShortSG261027",
          percentage: "+27.27%",
          isPositive: true,
        },
      ],
    },
  ];
  constructor(private router: Router) {}
  earningsData: EarningsDay[] = [
    {
      date: "2025-10-22",
      displayDate: "10/22/2025",
      dividends: [
        {
          id: "1",
          symbol: "BEC.SI",
          companyName: "BRC ASIA LIMITED",
          market: "SG",
          dividend: 0.06,
          exDate: "2025-10-22",
          color: "#6366f1",
          letter: "B",
        },
        {
          id: "2",
          symbol: "NEX.SI",
          companyName: "Reclaims Global",
          market: "SG",
          dividend: 0.005,
          exDate: "2025-10-22",
          color: "#f97316",
          letter: "R",
        },
      ],
    },
    {
      date: "2025-10-23",
      displayDate: "10/23/2025",
      dividends: [
        {
          id: "3",
          symbol: "BEC.SI",
          companyName: "BRC ASIA LIMITED",
          market: "SG",
          dividend: 0.06,
          recordDate: "2025-10-23",
          color: "#6366f1",
          letter: "B",
        },
        {
          id: "4",
          symbol: "CHJ.SI",
          companyName: "Uni-Asia Grp",
          market: "SG",
          dividend: 0.01,
          exDate: "2025-10-23",
          color: "#22c55e",
          letter: "U",
        },
      ],
    },
  ];

  setMainTab(tab: string) {
    this.activeMainTab = tab;
  }

  setSubTab(tab: string) {
    this.activeSubTab = tab;
  }

  setFilterTab(tab: string) {
    this.activeFilterTab = tab;
  }

  setEarningsTab(tab: string) {
    this.activeEarningsTab = tab;
  }

  setPeriod(period: string) {
    this.selectedPeriod = period;
  }
  navigateToScreener(groupTitle: string) {
    if (groupTitle === "trump") {
      this.router.navigate(["/screener"]);
    }
  }
}
