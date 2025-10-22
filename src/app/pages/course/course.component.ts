import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";

interface Stock {
  symbol: string;
  company: string;
  market: string;
  price: number;
  change: string;
  changePercent: string;
  isPositive: boolean;
}

@Component({
  selector: "app-course",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./course.component.html",
  styleUrls: ["./course.component.scss"],
})
export class CourseComponent {
  postTitle = "Day1.Financial term|What is a stock?";
  authorName = "Tiger_Academ...";
  postDate = "2023/03/29 14:51";
  followingStatus = "Following";

  commentCount = 52;
  likeCount = 223;
  shareCount = 21;

  stocks: Stock[] = [
    {
      symbol: "META",
      company: "META",
      market: "US",
      price: 734.3,
      change: "+0.14%",
      changePercent: "24H",
      isPositive: true,
    },
    {
      symbol: "NVDA",
      company: "NVDA",
      market: "US",
      price: 181.46,
      change: "+0.17%",
      changePercent: "24H",
      isPositive: true,
    },
    {
      symbol: "00700",
      company: "00700",
      market: "HK",
      price: 618.0,
      change: "-1.98%",
      changePercent: "",
      isPositive: false,
    },
  ];

  stockDefinition = `Stock is a certificate of ownership issued by a corporation. To raise capital, the company issues a certificate of ownership to each shareholder. In return, the company pays dividends and bonuses to shareholders.`;

  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(["/academy"]);
  }

  toggleFollow() {
    // Handle follow/unfollow logic
    console.log("Toggle follow");
  }

  addComment() {
    // Handle add comment
    console.log("Add comment");
  }

  likePost() {
    // Handle like post
    console.log("Like post");
  }

  sharePost() {
    // Handle share post
    console.log("Share post");
  }

  addToWatchlist(stock: Stock) {
    // Handle add to watchlist
    console.log("Add to watchlist:", stock.symbol);
  }

  favoriteStock(stock: Stock) {
    // Handle favorite stock
    console.log("Favorite stock:", stock.symbol);
  }
}
