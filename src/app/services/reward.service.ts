import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface RewardEvent {
  id: string;
  title: string;
  description: string;
  points: number;
  icon: string;
  timestamp: Date;
  type: 'task_completion' | 'form_update' | 'achievement_unlock';
}

@Injectable({
  providedIn: 'root'
})
export class RewardService {
  private rewardEvents = new BehaviorSubject<RewardEvent[]>([]);
  private currentReward = new BehaviorSubject<RewardEvent | null>(null);

  rewardEvents$ = this.rewardEvents.asObservable();
  currentReward$ = this.currentReward.asObservable();

  private rewards: RewardEvent[] = [];

  addReward(reward: Omit<RewardEvent, 'id' | 'timestamp'>) {
    const newReward: RewardEvent = {
      ...reward,
      id: this.generateId(),
      timestamp: new Date()
    };
    
    this.rewards.push(newReward);
    this.rewardEvents.next([...this.rewards]);
    this.currentReward.next(newReward);

    // Clear current reward after 3 seconds
    setTimeout(() => {
      this.currentReward.next(null);
    }, 3000);
  }

  getRewards(): RewardEvent[] {
    return [...this.rewards];
  }

  getTotalPoints(): number {
    return this.rewards.reduce((total, reward) => total + reward.points, 0);
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  // Predefined reward templates
  static readonly FORM_UPDATE_REWARD: Omit<RewardEvent, 'id' | 'timestamp'> = {
    title: 'Form Updated!',
    description: 'Successfully updated investment forms',
    points: 100,
    icon: '📋',
    type: 'form_update'
  };

  static readonly PROFILE_COMPLETION_REWARD: Omit<RewardEvent, 'id' | 'timestamp'> = {
    title: 'Profile Completed!',
    description: 'Investor profile successfully completed',
    points: 200,
    icon: '✅',
    type: 'task_completion'
  };

  static readonly FIRST_FORM_REWARD: Omit<RewardEvent, 'id' | 'timestamp'> = {
    title: 'First Form Master!',
    description: 'Completed your first investment form',
    points: 150,
    icon: '🎯',
    type: 'achievement_unlock'
  };
}