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
  paymentDate?: string;
  color: string;
  letter: string;
}

interface EarningsItem {
  id: string;
  symbol: string;
  companyName: string;
  market: string;
  date: string;
  marketTiming: string; // Post Market, Pre-Market, etc.
  epsActual?: number;
  epsForecast?: number;
  revenueActual?: number;
  revenueForecast?: string;
  logoUrl?: string;
  hasWatchlist: boolean;
}

interface EconomyItem {
  id: string;
  title: string;
  period: string; // Sep YoY, Sep MoM, etc.
  actual?: string;
  consensus?: string;
  previous: string;
  date: string;
  time: string;
  importance: number; // 1-3 stars
  country: string; // SI for Singapore
  category: string;
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
  activeFilterTab = "Economy";

  earningsData: DividendItem[] = [
    {
      id: "1",
      symbol: "S68.SI",
      companyName: "SGX",
      market: "SG",
      dividend: 0.105,
      exDate: "2025-10-16",
      color: "#1976d2",
      letter: "S",
    },
    {
      id: "2",
      symbol: "S68.SI",
      companyName: "SGX",
      market: "SG",
      dividend: 0.105,
      recordDate: "2025-10-17",
      color: "#1976d2",
      letter: "S",
    },
    {
      id: "3",
      symbol: "S68.SI",
      companyName: "SGX",
      market: "SG",
      dividend: 0.105,
      paymentDate: "2025-10-27",
      color: "#1976d2",
      letter: "S",
    },
    {
      id: "4",
      symbol: "HSHD.SI",
      companyName: "HSBC HK SDR 5to1",
      market: "SG",
      dividend: 0.0198,
      paymentDate: "2025-10-01",
      color: "#ff9800",
      letter: "H",
    },
    {
      id: "5",
      symbol: "W05.SI",
      companyName: "Wing Tai",
      market: "SG",
      dividend: 0.04,
      paymentDate: "2025-10-15",
      color: "#ff9800",
      letter: "W",
    },
  ];

  earningsData2: EarningsItem[] = [
    {
      id: "1",
      symbol: "N2IU.SI",
      companyName: "Mapletree PanAsia Com Tr",
      market: "SG",
      date: "10-22",
      marketTiming: "Post Market",
      epsForecast: 0.02,
      revenueForecast: "0.22B",
      hasWatchlist: true,
    },
    {
      id: "2",
      symbol: "J69U.SI",
      companyName: "Frasers Cpt Tr",
      market: "SG",
      date: "10-23",
      marketTiming: "Pre-Market",
      hasWatchlist: true,
    },
    {
      id: "3",
      symbol: "T82U.SI",
      companyName: "Suntec Reit",
      market: "SG",
      date: "10-23",
      marketTiming: "",
      revenueForecast: "0.11B",
      hasWatchlist: true,
    },
    {
      id: "4",
      symbol: "AIY.SI",
      companyName: "IFAST",
      market: "SG",
      date: "10-24",
      marketTiming: "Post Market",
      epsForecast: 0.08,
      revenueForecast: "0.09B",
      hasWatchlist: true,
    },
    {
      id: "5",
      symbol: "AJBU.SI",
      companyName: "Keppel DC Reit",
      market: "SG",
      date: "10-24",
      marketTiming: "Pre-Market",
      hasWatchlist: true,
    },
  ];

  economyData: EconomyItem[] = [
    {
      id: "1",
      title: "Inflation Rate Sep YoY",
      period: "Sep YoY",
      actual: "–",
      consensus: "–",
      previous: "0.50",
      date: "10/23",
      time: "13:00",
      importance: 2,
      country: "SI",
      category: "Economy",
    },
    {
      id: "2",
      title: "Industrial Output Index Sep MoM",
      period: "Sep MoM",
      actual: "–",
      consensus: "–",
      previous: "-9.70",
      date: "10/24",
      time: "13:00",
      importance: 1,
      country: "SI",
      category: "Economy",
    },
    {
      id: "3",
      title: "Industrial Production Sep YoY",
      period: "Sep YoY",
      actual: "–",
      consensus: "–",
      previous: "-7.80",
      date: "10/24",
      time: "13:00",
      importance: 1,
      country: "SI",
      category: "Economy",
    },
    {
      id: "4",
      title: "Retail Sales Sep MoM",
      period: "Sep MoM",
      actual: "–",
      consensus: "–",
      previous: "0.50",
      date: "11/05",
      time: "",
      importance: 0,
      country: "SI",
      category: "Economy",
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

  getEconomyByDate() {
    const grouped: { [key: string]: EconomyItem[] } = {};
    
    this.economyData.forEach(item => {
      const date = item.date === "10/24" ? "10/24/2025" : 
                   item.date === "10/23" ? "10/23/2025" : 
                   item.date === "11/05" ? "11/05/2025" : item.date;
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(item);
    });

    return Object.keys(grouped).map(date => ({
      date,
      items: grouped[date]
    }));
  }

  getStarsArray(count: number): number[] {
    return Array.from({ length: count }, (_, i) => i + 1);
  }
}