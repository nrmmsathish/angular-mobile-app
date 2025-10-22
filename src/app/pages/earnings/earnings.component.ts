import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

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
  selector: "app-earnings",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./earnings.component.html",
  styleUrls: ["./earnings.component.scss"],
})
export class EarningsCalendarComponent {
  selectedDate = "10 / 22";
  selectedYear = "2025";
  selectedPeriod = "Day";
  activeEarningsTab = "Dividend";
  activeFilterTab = "Dividend";

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

  earningsTabs = ["Earnings", "Dividend", "Economy"];

  setEarningsTab(tab: string) {
    this.activeEarningsTab = tab;
    this.activeFilterTab = tab;
  }

  setPeriod(period: string) {
    this.selectedPeriod = period;
  }
}
