import { bootstrapApplication } from "@angular/platform-browser";
import { provideRouter, Routes } from "@angular/router";
import { AppComponent } from "./app/app.component";
import { AcademyComponent } from "./app/pages/academy/academy";
import { DiscoverComponent } from "./app/pages/discover/discover.component";
import { EarningsCalendarComponent } from "./app/pages/earnings/earnings.component";
import { ScreenerComponent } from "./app/pages/screener/screener.component";
import { CourseComponent } from "./app/pages/course/course.component";
import { ChatbotComponent } from "./app/pages/chatbot/chatbot.component";
const routes: Routes = [
  { path: "", redirectTo: "/academy", pathMatch: "full" },
  { path: "discover", component: DiscoverComponent },
  { path: "academy", component: AcademyComponent },
  { path: "home", component: DiscoverComponent },
  { path: "screener", component: ScreenerComponent },
  { path: "course", component: CourseComponent },
  { path: "earnings-calendar", component: EarningsCalendarComponent },
  { path: "quotes", component: DiscoverComponent },
  { path: "wealth", component: DiscoverComponent },
  { path: "portfolio", component: DiscoverComponent },
  { path: "profile", component: DiscoverComponent },
  { path: "chatbot", component: ChatbotComponent },
];

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)],
}).catch((err) => console.error(err));
