import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router, ActivatedRoute } from "@angular/router";

interface ConstituentStock {
  symbol: string;
  companyName: string;
  market: string;
  lastPrice: number;
  changePercent: number;
  isPositive: boolean;
  hasWatchlist?: boolean;
}

@Component({
  selector: "app-stock-detail",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./stock-detail.component.html",
  styleUrls: ["./stock-detail.component.scss"],
})
export class StockDetailComponent implements OnInit {
  stockInfo = {
    symbol: "BK4523",
    name: "Indian Concept",
    market: "US",
    price: 1728.54,
    change: 13.44,
    changePercent: 0.78,
    isPositive: true,
    status: "Not Yet Opened",
    openTime: "10/21 16:00:00 EDT",
    high: 1729.38,
    low: 1709.55,
    open: 1715.32,
    prevClose: 1715.10,
    volume: "46.31M",
    turnoverRate: 0.28,
    peRatio: 20.39,
    pbRatio: 3.21,
    marketCap: "440.2B",
    amplitude: 1.16,
    floatCap: "402.9B",
    gainers: 5,
    unchanged: 0,
    losers: 11
  };

  selectedTimeframe = "D";
  timeframes = ["1D", "5D", "D", "W", "M", "Q", "Y"];

  constituentStocks: ConstituentStock[] = [
    { symbol: "INFY", companyName: "Infosys", market: "US", lastPrice: 17.41, changePercent: 2.96, isPositive: true, hasWatchlist: true },
    { symbol: "WIT", companyName: "Wipro Limited", market: "US", lastPrice: 2.69, changePercent: 1.89, isPositive: true, hasWatchlist: true },
    { symbol: "G", companyName: "Genpact", market: "US", lastPrice: 40.29, changePercent: 1.08, isPositive: true, hasWatchlist: true },
    { symbol: "IBN", companyName: "ICICI Bank", market: "US", lastPrice: 31.24, changePercent: 0.77, isPositive: true, hasWatchlist: true },
    { symbol: "HDB", companyName: "HDFC Bank", market: "US", lastPrice: 36.69, changePercent: 0.16, isPositive: true, hasWatchlist: true },
    { symbol: "RDY", companyName: "Dr Reddy's Laboratories", market: "US", lastPrice: 14.73, changePercent: -0.14, isPositive: false, hasWatchlist: true },
    { symbol: "IIF", companyName: "MS India Investment Fund", market: "US", lastPrice: 27.32, changePercent: -0.36, isPositive: false },
    { symbol: "INDA", companyName: "iShares MSCI India ETF", market: "US", lastPrice: 54.48, changePercent: -0.47, isPositive: false },
    { symbol: "INDY", companyName: "iShares India 50 ETF", market: "US", lastPrice: 53.32, changePercent: -0.49, isPositive: false, hasWatchlist: true },
    { symbol: "SMIN", companyName: "", market: "US", lastPrice: 74.28, changePercent: -0.64, isPositive: false },
  ];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    // Check the current route to determine which stock to display
    const currentUrl = this.router.url;
    if (currentUrl.includes('bitcoin-etf')) {
      this.loadBitcoinETFData();
    } else if (currentUrl.includes('warren-buffett')) {
      this.loadWarrenBuffettData();
    } else if (currentUrl.includes('nancy-pelosi')) {
      this.loadNancyPelosiData();
    } else {
      this.loadIndianConceptData();
    }
  }

  loadIndianConceptData() {
    // Default data (already set above)
  }

  loadBitcoinETFData() {
    this.stockInfo = {
      symbol: "BK4594",
      name: "Bitcoin ETF",
      market: "US",
      price: 2367.94,
      change: 20.85,
      changePercent: 0.89,
      isPositive: true,
      status: "Not Yet Opened",
      openTime: "10/21 16:00:00 EDT",
      high: 2416.20,
      low: 2290.50,
      open: 2319.53,
      prevClose: 2347.09,
      volume: "110.7M",
      turnoverRate: 5.09,
      peRatio: 0, // -- in screenshot
      pbRatio: 0, // -- in screenshot
      marketCap: "145.7B",
      amplitude: 5.36,
      floatCap: "145.7B",
      gainers: 11,
      unchanged: 0,
      losers: 0
    };

    this.constituentStocks = [
      { symbol: "DEFI", companyName: "Hashdex Bitcoin ETF", market: "US", lastPrice: 126.71, changePercent: 0.97, isPositive: true },
      { symbol: "BTCO", companyName: "Invesco Galaxy Bitcoin ETF", market: "US", lastPrice: 111.62, changePercent: 0.96, isPositive: true, hasWatchlist: true },
      { symbol: "EZBC", companyName: "Franklin Bitcoin ETF", market: "US", lastPrice: 64.79, changePercent: 0.93, isPositive: true },
      { symbol: "HODL", companyName: "VanEck Bitcoin ETF", market: "US", lastPrice: 31.64, changePercent: 0.93, isPositive: true },
      { symbol: "BTCW", companyName: "WisdomTree Bitcoin Fund", market: "US", lastPrice: 118.54, changePercent: 0.92, isPositive: true },
      { symbol: "BITB", companyName: "Bitwise Bitcoin ETF", market: "US", lastPrice: 60.84, changePercent: 0.91, isPositive: true },
      { symbol: "ARKB", companyName: "ARK 21Shares Bitcoin ETF", market: "US", lastPrice: 37.18, changePercent: 0.90, isPositive: true },
      { symbol: "BRRR", companyName: "CoinShares Valkyrie Bitcoin Fund", market: "US", lastPrice: 31.61, changePercent: 0.89, isPositive: true },
      { symbol: "IBIT", companyName: "iShares Bitcoin Trust ETF", market: "US", lastPrice: 63.49, changePercent: 0.89, isPositive: true },
      { symbol: "FBTC", companyName: "", market: "US", lastPrice: 97.55, changePercent: 0.89, isPositive: true },
    ];
  }

  loadWarrenBuffettData() {
    this.stockInfo = {
      symbol: "BK4559",
      name: "Warren Buffett holdings",
      market: "US",
      price: 2756.07,
      change: 24.99,
      changePercent: 0.91,
      isPositive: true,
      status: "Not Yet Opened",
      openTime: "10/21 16:00:00 EDT",
      high: 2766.00,
      low: 2735.32,
      open: 2736.85,
      prevClose: 2731.08,
      volume: "287.9M",
      turnoverRate: 0.54,
      peRatio: 29.34,
      pbRatio: 6.26,
      marketCap: "10.05T",
      amplitude: 1.12,
      floatCap: "9.47T",
      gainers: 22,
      unchanged: 0,
      losers: 13
    };

    this.constituentStocks = [
      { symbol: "KO", companyName: "Coca-Cola", market: "US", lastPrice: 71.22, changePercent: 4.06, isPositive: true },
      { symbol: "POOL", companyName: "Pool", market: "US", lastPrice: 302.63, changePercent: 2.91, isPositive: true, hasWatchlist: true },
      { symbol: "AMZN", companyName: "Amazon.com", market: "US", lastPrice: 222.03, changePercent: 2.56, isPositive: true, hasWatchlist: true },
      { symbol: "SIRI", companyName: "Sirius XM", market: "US", lastPrice: 22.19, changePercent: 2.54, isPositive: true },
      { symbol: "MCO", companyName: "Moody's", market: "US", lastPrice: 484.92, changePercent: 2.20, isPositive: true },
      { symbol: "LPX", companyName: "Louisiana-Pacific", market: "US", lastPrice: 92.65, changePercent: 2.09, isPositive: true },
      { symbol: "JEF", companyName: "Jefferies Financial Group Inc.", market: "US", lastPrice: 55.07, changePercent: 1.91, isPositive: true },
      { symbol: "LEN", companyName: "Lennar", market: "US", lastPrice: 128.24, changePercent: 1.90, isPositive: true },
      { symbol: "AXP", companyName: "American Express", market: "US", lastPrice: 355.22, changePercent: 1.64, isPositive: true },
      { symbol: "NVR", companyName: "NVR Inc", market: "US", lastPrice: 7792.13, changePercent: 1.45, isPositive: true },
    ];
  }

  loadNancyPelosiData() {
    this.stockInfo = {
      symbol: "BK4598",
      name: "Nancy Pelosi Portfolio",
      market: "US",
      price: 2834.54,
      change: -2.64,
      changePercent: -0.09,
      isPositive: false,
      status: "Not Yet Opened",
      openTime: "10/21 16:00:00 EDT",
      high: 2842.35,
      low: 2824.99,
      open: 2837.33,
      prevClose: 2837.18,
      volume: "612.2M",
      turnoverRate: 0.65,
      peRatio: 36.40,
      pbRatio: 11.57,
      marketCap: "22.06T",
      amplitude: 0.61,
      floatCap: "20.97T",
      gainers: 17,
      unchanged: 0,
      losers: 7
    };

    this.constituentStocks = [
      { symbol: "WBD", companyName: "Warner Bros. Discovery", market: "US", lastPrice: 20.33, changePercent: 10.97, isPositive: true, hasWatchlist: true },
      { symbol: "CRM", companyName: "Salesforce.com", market: "US", lastPrice: 263.41, changePercent: 3.59, isPositive: true, hasWatchlist: true },
      { symbol: "AMZN", companyName: "Amazon.com", market: "US", lastPrice: 222.03, changePercent: 2.56, isPositive: true, hasWatchlist: true },
      { symbol: "DIS", companyName: "Walt Disney", market: "US", lastPrice: 114.30, changePercent: 2.09, isPositive: true, hasWatchlist: true },
      { symbol: "DBX", companyName: "Dropbox Inc.", market: "US", lastPrice: 29.82, changePercent: 1.81, isPositive: true },
      { symbol: "AXP", companyName: "American Express", market: "US", lastPrice: 355.22, changePercent: 1.64, isPositive: true },
      { symbol: "XYZ", companyName: "Block, Inc.", market: "US", lastPrice: 77.73, changePercent: 1.61, isPositive: true },
      { symbol: "MORN", companyName: "Morningstar", market: "US", lastPrice: 221.61, changePercent: 1.56, isPositive: true },
      { symbol: "CMCSA", companyName: "Comcast", market: "US", lastPrice: 29.97, changePercent: 1.35, isPositive: true },
      { symbol: "PYPL", companyName: "", market: "US", lastPrice: 70.05, changePercent: 1.23, isPositive: true },
    ];
  }

  goBack() {
    this.router.navigate(["/discover"]);
  }

  selectTimeframe(timeframe: string) {
    this.selectedTimeframe = timeframe;
  }

  openAIChat() {
    this.router.navigate(["/chatbot"]);
  }
}