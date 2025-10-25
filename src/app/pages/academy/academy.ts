import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";

interface Course {
  id: number;
  title: string;
  subtitle: string;
  plays: string;
  image: string;
  category: string;
}

@Component({
  selector: "app-academy",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./academy.html",
  styleUrls: ["./academy.scss"],
})
export class AcademyComponent {
  constructor(private router: Router) {}
  stockCourses: Course[] = [
    {
      id: 1,
      title: "US Stock Basic",
      subtitle: "How to invest in US stocks",
      plays: "Play 126.9k",
      image: "assets/images/us-stock-basic.jpg",
      category: "Stock",
    },
  ];

  etfCourses: Course[] = [
    {
      id: 2,
      title: "ETFs for beginners",
      subtitle: "Practical skills of ETF",
      plays: "Play 194.7k",
      image: "assets/images/etf-beginners.jpg",
      category: "ETF",
    },
    {
      id: 3,
      title: "Consumer industry investment c...",
      subtitle: "Learn in 3-days",
      plays: "Play 21.7k",
      image: "assets/images/consumer-industry.jpg",
      category: "ETF",
    },
  ];

  optionsCourses: Course[] = [
    {
      id: 4,
      title: "Combination of options courses",
      subtitle: "Systematic Learning of Combination Opti...",
      plays: "Play 105.1k",
      image: "assets/images/options-combination.jpg",
      category: "Options",
    },
    {
      id: 5,
      title: "Options trading",
      subtitle: "Options step 1",
      plays: "Play 235.4k",
      image: "assets/images/options-trading.jpg",
      category: "Options",
    },
    {
      id: 6,
      title: "Options crash course",
      subtitle: "Options basics | Greek letters | Five strat...",
      plays: "Play 62.5k",
      image: "assets/images/options-crash.jpg",
      category: "Options",
    },
  ];

  getImageClass(id: number): string {
    const classes: { [key: number]: string } = {
      2: "etf-yellow",
      3: "etf-blue",
    };
    return classes[id] || "";
  }

  getOptionsImageClass(id: number): string {
    const classes: { [key: number]: string } = {
      4: "options-colorful",
      5: "options-blue",
      6: "options-yellow",
    };
    return classes[id] || "";
  }

  getOptionsBadgeClass(id: number): string {
    return id === 3 ? "dark" : "";
  }
  navigateToCourse(courseTitle: string) {
    if (courseTitle === "US Stock Basic") {
      this.router.navigate(["/course"]);
    }
  }
}
