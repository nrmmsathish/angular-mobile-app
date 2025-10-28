import { bootstrapApplication } from "@angular/platform-browser";
import { provideRouter, Routes, withHashLocation } from "@angular/router";
import { AppComponent } from "./app/app.component";
import { AcademyComponent } from "./app/pages/academy/academy";
import { DiscoverComponent } from "./app/pages/discover/discover.component";
import { EarningsCalendarComponent } from "./app/pages/earnings/earnings.component";
import { ScreenerComponent } from "./app/pages/screener/screener.component";
import { CourseComponent } from "./app/pages/course/course.component";
import { ChatbotComponent } from "./app/pages/chatbot/chatbot.component";
import { StockDetailComponent } from "./app/pages/stock-detail/stock-detail.component";
import { OnboardingComponent } from "./app/pages/onboarding/onboarding.component";
import { GamifiedOnboardingComponent } from "./app/pages/gamified-onboarding/gamified-onboarding.component";
import { CompleteFormsComponent } from "./app/pages/complete-forms/complete-forms.component";
import { CitiHomeComponent } from "./app/pages/citi-home/citi-home.component";
import { DashboardComponent } from "./app/pages/dashboard/dashboard.component";
import { SignupComponent } from "./app/pages/signup/signup.component";
import { CardQuestionnaireComponent } from "./app/pages/card-questionnaire/card-questionnaire.component";
import { CardRecommendationResultComponent } from "./app/pages/card-recommendation-result/card-recommendation-result.component";
import { CardApplicationSuccessComponent } from "./app/pages/card-application-success/card-application-success.component";
const routes: Routes = [
  { path: "", redirectTo: "/citi-home", pathMatch: "full" },
  { path: "citi-home", component: CitiHomeComponent },
  { path: "dashboard", component: DashboardComponent },
  { path: "signup", component: SignupComponent },
  { path: "card-questionnaire", component: CardQuestionnaireComponent },
  { path: "card-recommendation-result", component: CardRecommendationResultComponent },
  { path: "card-application-success", component: CardApplicationSuccessComponent },
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
  { path: "onboarding", component: OnboardingComponent },
  { path: "gamified-onboarding", component: GamifiedOnboardingComponent },
  { path: "complete-forms", component: CompleteFormsComponent },
  { path: "indian-concept", component: StockDetailComponent },
  { path: "bitcoin-etf", component: StockDetailComponent },
  { path: "warren-buffett", component: StockDetailComponent },
  { path: "nancy-pelosi", component: StockDetailComponent },
];

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes, withHashLocation())],
}).catch((err) => console.error(err));
