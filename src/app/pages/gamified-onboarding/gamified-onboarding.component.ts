import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RewardService, RewardEvent } from '../../services/reward.service';
import { Subscription } from 'rxjs';

interface Task {
  id: string;
  title: string;
  description: string;
  icon: string;
  points: number;
  completed: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  estimatedTime: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  requirement: string;
}

@Component({
  selector: 'app-gamified-onboarding',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gamified-onboarding.component.html',
  styleUrls: ['./gamified-onboarding.component.scss']
})
export class GamifiedOnboardingComponent implements OnInit, OnDestroy {
  playerLevel = 1;
  currentXP = 150;
  nextLevelXP = 500;
  totalPoints = 0;
  streak = 3;
  
  tasks: Task[] = [
    {
      id: '1',
      title: 'Complete Net Worth Assessment',
      description: 'Tell us about your financial standing to get personalized advice',
      icon: '🏠',
      points: 100,
      completed: true,
      difficulty: 'easy',
      category: 'Profile Setup',
      estimatedTime: '3 min'
    },
    {
      id: '2',
      title: 'Risk Profile Questionnaire',
      description: 'Discover your investment personality and risk tolerance',
      icon: '📊',
      points: 150,
      completed: true,
      difficulty: 'medium',
      category: 'Assessment',
      estimatedTime: '5 min'
    },
    {
      id: '3',
      title: 'Knowledge Assessment',
      description: 'Test your understanding of investment concepts',
      icon: '🧠',
      points: 200,
      completed: false,
      difficulty: 'hard',
      category: 'Learning',
      estimatedTime: '8 min'
    },
    {
      id: '4',
      title: 'Set Investment Goals',
      description: 'Define your financial objectives and timeline',
      icon: '🎯',
      points: 120,
      completed: false,
      difficulty: 'medium',
      category: 'Planning',
      estimatedTime: '4 min'
    },
    {
      id: '5',
      title: 'Account Verification',
      description: 'Verify your identity to unlock all features',
      icon: '🔐',
      points: 80,
      completed: true,
      difficulty: 'easy',
      category: 'Security',
      estimatedTime: '2 min'
    },
    {
      id: '6',
      title: 'First Investment',
      description: 'Make your first investment to start your journey',
      icon: '💎',
      points: 300,
      completed: false,
      difficulty: 'hard',
      category: 'Action',
      estimatedTime: '6 min'
    }
  ];

  achievements: Achievement[] = [
    {
      id: 'first_step',
      title: 'First Steps',
      description: 'Complete your first task',
      icon: '👶',
      unlocked: true,
      requirement: 'Complete any task'
    },
    {
      id: 'risk_master',
      title: 'Risk Master',
      description: 'Complete risk assessment',
      icon: '🎯',
      unlocked: true,
      requirement: 'Complete risk profile'
    },
    {
      id: 'knowledge_seeker',
      title: 'Knowledge Seeker',
      description: 'Pass the knowledge assessment',
      icon: '🎓',
      unlocked: false,
      requirement: 'Score 80%+ in assessment'
    },
    {
      id: 'goal_setter',
      title: 'Goal Setter',
      description: 'Set your investment goals',
      icon: '🏆',
      unlocked: false,
      requirement: 'Complete goal setting'
    }
  ];

  private animationInterval: any;
  private rewardSubscription!: Subscription;
  showLevelUp = false;
  showPointsAnimation = false;
  showRewardNotification = false;
  animatedPoints = 0;
  currentReward: RewardEvent | null = null;

  constructor(private router: Router, private rewardService: RewardService) {}

  ngOnInit() {
    this.calculateProgress();
    this.startPointsAnimation();
    
    // Subscribe to reward notifications
    this.rewardSubscription = this.rewardService.currentReward$.subscribe(reward => {
      if (reward) {
        this.currentReward = reward;
        this.showRewardNotification = true;
        this.addRewardPoints(reward.points);
        
        // Hide notification after 3 seconds
        setTimeout(() => {
          this.showRewardNotification = false;
        }, 3000);
      }
    });
  }

  ngOnDestroy() {
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
    }
    if (this.rewardSubscription) {
      this.rewardSubscription.unsubscribe();
    }
  }

  calculateProgress() {
    const completedTasks = this.tasks.filter(task => task.completed);
    const taskPoints = completedTasks.reduce((sum, task) => sum + task.points, 0);
    const rewardPoints = this.rewardService.getTotalPoints();
    this.totalPoints = taskPoints + rewardPoints;
    this.currentXP = 150 + this.totalPoints;
  }

  addRewardPoints(points: number) {
    // Animate the points increase
    this.showPointsAnimation = true;
    this.calculateProgress();
    
    // Check for level up
    if (this.currentXP >= this.nextLevelXP) {
      this.levelUp();
    }
    
    // Hide animation after delay
    setTimeout(() => {
      this.showPointsAnimation = false;
    }, 2000);
  }

  startPointsAnimation() {
    const targetPoints = this.totalPoints;
    let currentPoints = 0;
    const increment = Math.ceil(targetPoints / 50);
    
    this.animationInterval = setInterval(() => {
      currentPoints += increment;
      if (currentPoints >= targetPoints) {
        this.animatedPoints = targetPoints;
        clearInterval(this.animationInterval);
      } else {
        this.animatedPoints = currentPoints;
      }
    }, 30);
  }

  get progressPercentage(): number {
    return Math.min((this.currentXP / this.nextLevelXP) * 100, 100);
  }

  get completedTasksCount(): number {
    return this.tasks.filter(task => task.completed).length;
  }

  get totalTasksCount(): number {
    return this.tasks.length;
  }

  get unlockedAchievementsCount(): number {
    return this.achievements.filter(achievement => achievement.unlocked).length;
  }

  completeTask(taskId: string) {
    const task = this.tasks.find(t => t.id === taskId);
    if (task && !task.completed) {
      task.completed = true;
      this.showPointsAnimation = true;
      this.calculateProgress();
      
      // Check for level up
      if (this.currentXP >= this.nextLevelXP) {
        this.levelUp();
      }

      // Hide animation after delay
      setTimeout(() => {
        this.showPointsAnimation = false;
      }, 2000);

      // Navigate to actual task
      this.navigateToTask(task);
    }
  }

  levelUp() {
    this.playerLevel++;
    this.nextLevelXP = this.nextLevelXP * 1.5;
    this.showLevelUp = true;
    
    setTimeout(() => {
      this.showLevelUp = false;
    }, 3000);
  }

  navigateToTask(task: Task) {
    // Navigate to appropriate task based on category
    switch (task.category) {
      case 'Profile Setup':
        this.router.navigate(['/complete-forms']);
        break;
      case 'Assessment':
        this.router.navigate(['/screener']);
        break;
      case 'Learning':
        this.router.navigate(['/academy']).then(() => {
          // Scroll to top after navigation
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        break;
      case 'Planning':
        this.router.navigate(['/complete-forms']);
        break;
      case 'Security':
        this.router.navigate(['/complete-forms']);
        break;
      case 'Action':
        this.router.navigate(['/discover']);
        break;
      default:
        console.log('Navigate to:', task.title);
    }
  }

  getDifficultyColor(difficulty: string): string {
    switch (difficulty) {
      case 'easy': return '#4ade80';
      case 'medium': return '#f59e0b';
      case 'hard': return '#ef4444';
      default: return '#6b7280';
    }
  }

  goBack() {
    this.router.navigate(['/onboarding']);
  }

  claimReward(achievement: Achievement) {
    if (achievement.unlocked) {
      console.log('Claiming reward for:', achievement.title);
      // Add reward claiming logic here
    }
  }
}