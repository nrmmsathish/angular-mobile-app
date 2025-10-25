import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private currentPageSubject = new BehaviorSubject<string>('Academy');
  currentPage$ = this.currentPageSubject.asObservable();

  setCurrentPage(pageName: string) {
    this.currentPageSubject.next(pageName);
  }

  getCurrentPage(): string {
    return this.currentPageSubject.value;
  }
}