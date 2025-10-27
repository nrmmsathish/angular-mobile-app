import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { EarningsCalendarComponent } from "../earnings/earnings.component";
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
  imports: [CommonModule, EarningsCalendarComponent],
  templateUrl: "./discover.component.html",
  styleUrls: ["./discover.component.scss"],
})
export class DiscoverComponent {
  activeMainTab = "Top";
  activeSubTab = "Screener";
  activeFilterTab = "Followed List";
  activeEarningsTab = "Dividend";

  selectedDate = "10 / 22";
  selectedYear = "2025";
  selectedPeriod = "Day";

  mainTabs = ["Top", "Calendar"];
  subTabs = ["Movers & Shakers", "Top Buys & Sells", "Screener"];
  filterTabs = ["Most Active", "Similar Candlesticks", "Followed List"];
  earningsTabs = ["Earnings", "Dividend", "Economy"];

  tradingGroups: TradingGroup[] = [
    {
      title: "Crypto ETF",
      subtitle: "Type:ETF | Markets:US | Theme:Cryptocurrency",
      stocks: [
        { name: "Hashdex Bitcoin ETF (DEFI)", percentage: "+0.97%", isPositive: true },
        { name: "Invesco Galaxy Bitcoin ETF (BTCO)", percentage: "+0.96%", isPositive: true },
      ],
    },
    {
      title: "Warren Buffett Holdings",
      subtitle: "Type:Stock | Markets:US | Theme:Berkshire Hathaway Portfolio",
      stocks: [
        { name: "Coca-Cola (KO)", percentage: "+4.06%", isPositive: true },
        { name: "Pool (POOL)", percentage: "+2.91%", isPositive: true },
      ],
    },
    {
      title: "Nancy Pelosi Portfolio",
      subtitle: "Type:Stock | Markets:US | Theme:Political Portfolio Tracking",
      stocks: [
        { name: "Warner Bros. Discovery (WBD)", percentage: "+10.97%", isPositive: true },
        { name: "Salesforce.com (CRM)", percentage: "+3.59%", isPositive: true },
      ],
    },
    {
      title: "Indian Concept",
      subtitle: "Type:Stock | Markets:IN | Theme:Indian Market Focus",
      stocks: [
        { name: "Infosys (INFY)", percentage: "+2.96%", isPositive: true },
        { name: "Wipro Limited (WIT)", percentage: "+1.89%", isPositive: true },
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
    if (groupTitle === "Indian Concept") {
      this.router.navigate(["/indian-concept"]);
    } else if (groupTitle === "Crypto ETF") {
      this.router.navigate(["/bitcoin-etf"]);
    } else if (groupTitle === "Warren Buffett Holdings") {
      this.router.navigate(["/warren-buffett"]);
    } else if (groupTitle === "Nancy Pelosi Portfolio") {
      this.router.navigate(["/nancy-pelosi"]);
    }
  }
}
