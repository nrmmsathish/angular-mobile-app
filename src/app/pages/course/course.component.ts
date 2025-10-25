import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";

interface CourseDay {
  day: number;
  title: string;
  completed: boolean;
}

interface Stock {
  symbol: string;
  market: string;
  price: number;
  change: string;
  period: string;
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
  selectedDay = 0; // No day selected initially
  showDetailContent = false; // Start with overview mode
  lastSelectedDay = 0; // Track the last selected day
  
  courseDays: CourseDay[] = [
    { day: 1, title: "Day1.What is a stock ?", completed: false },
    { day: 2, title: "Day2.What is a fund ?", completed: false },
    { day: 3, title: "Day3.What is an ETF ?", completed: false },
    { day: 4, title: "Day4.What is an Reits ?", completed: false },
    { day: 5, title: "Day5.Blue Chip stocks", completed: false },
    { day: 6, title: "Day6.Growth vs Value stocks", completed: false },
    { day: 7, title: "Day7.Dividend investing", completed: false },
    { day: 8, title: "Day8.Market analysis basics", completed: false },
  ];

  stocks: Stock[] = [
    {
      symbol: "META",
      market: "US",
      price: 734.30,
      change: "+0.14%",
      period: "24H",
      isPositive: true,
    },
    {
      symbol: "NVDA",
      market: "US",
      price: 181.46,
      change: "+0.17%",
      period: "24H",
      isPositive: true,
    },
    {
      symbol: "00700",
      market: "HK",
      price: 618.000,
      change: "-1.98%",
      period: "",
      isPositive: false,
    },
  ];

  constructor(private router: Router) {}

  goBack() {
    if (this.showDetailContent) {
      // If in detail mode, go back to overview
      this.showDetailContent = false;
    } else {
      // If in overview mode, go back to academy
      this.router.navigate(["/academy"]);
    }
  }

  selectDay(day: number) {
    // Update current selection
    this.selectedDay = day;
    
    // Mark the currently selected day as completed when it's visited
    const currentDay = this.courseDays.find(d => d.day === day);
    if (currentDay) {
      currentDay.completed = true;
    }
    
    this.lastSelectedDay = day;
    
    if (day === 1 || day === 2 || day === 3) {
      this.showDetailContent = true;
    } else {
      this.showDetailContent = false;
    }
    console.log('Selected day:', day);
  }
}
