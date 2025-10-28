import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="loading-overlay" *ngIf="loadingService.loading$ | async">
      <div class="loading-container">
        <!-- Minimalist animated dots -->
        <div class="loading-dots">
          <div class="dot dot-1"></div>
          <div class="dot dot-2"></div>
          <div class="dot dot-3"></div>
        </div>
        
        <!-- Subtle progress bar -->
        <div class="progress-bar">
          <div class="progress-fill"></div>
        </div>
        
        <!-- Optional loading text -->
        <div class="loading-text">Loading...</div>
      </div>
    </div>
  `,
  styles: [`
    .loading-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(15, 23, 42, 0.95);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      animation: fadeIn 0.3s ease-out;
    }

    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 24px;
    }

    .loading-dots {
      display: flex;
      gap: 8px;
      align-items: center;
    }

    .dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: linear-gradient(45deg, #3b82f6, #8b5cf6);
      animation: dotPulse 1.5s ease-in-out infinite;
    }

    .dot-1 {
      animation-delay: 0s;
    }

    .dot-2 {
      animation-delay: 0.3s;
    }

    .dot-3 {
      animation-delay: 0.6s;
    }

    .progress-bar {
      width: 200px;
      height: 3px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 2px;
      overflow: hidden;
      position: relative;
    }

    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #3b82f6, #8b5cf6, #06b6d4);
      background-size: 200% 100%;
      border-radius: 2px;
      animation: progressSlide 2s ease-in-out infinite;
    }

    .loading-text {
      color: rgba(255, 255, 255, 0.8);
      font-size: 14px;
      font-weight: 500;
      letter-spacing: 0.5px;
      animation: textFade 2s ease-in-out infinite;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    @keyframes dotPulse {
      0%, 80%, 100% {
        transform: scale(0.8);
        opacity: 0.5;
      }
      40% {
        transform: scale(1.2);
        opacity: 1;
      }
    }

    @keyframes progressSlide {
      0% {
        transform: translateX(-100%);
        background-position: 0% 50%;
      }
      50% {
        transform: translateX(0%);
        background-position: 100% 50%;
      }
      100% {
        transform: translateX(100%);
        background-position: 0% 50%;
      }
    }

    @keyframes textFade {
      0%, 100% {
        opacity: 0.6;
      }
      50% {
        opacity: 1;
      }
    }
  `]
})
export class LoadingComponent {
  constructor(public loadingService: LoadingService) {}
}