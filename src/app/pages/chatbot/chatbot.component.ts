import { Component, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent implements AfterViewChecked {
  @ViewChild('chatMessages') private chatMessages!: ElementRef;
  messages: ChatMessage[] = [];
  currentMessage = '';
  private shouldScrollToBottom = false;

  constructor(private router: Router) {
    this.messages.push({
      id: '1',
      type: 'assistant',
      content: 'Good day! I am your investment banking advisor. How may I assist you today?',
      timestamp: new Date()
    });
  }

  sendMessage() {
    if (!this.currentMessage.trim()) return;
    
    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: this.currentMessage,
      timestamp: new Date()
    };
    this.messages.push(userMessage);
    this.shouldScrollToBottom = true;
    
    // Store current message for response generation
    const userInput = this.currentMessage;
    this.currentMessage = '';
    
    // Generate AI response after a short delay
    setTimeout(() => {
      const response = this.generateInvestmentResponse(userInput);
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response,
        timestamp: new Date()
      };
      this.messages.push(aiMessage);
      this.shouldScrollToBottom = true;
    }, 1000);
  }

  ngAfterViewChecked() {
    if (this.shouldScrollToBottom) {
      this.scrollToBottom();
      this.shouldScrollToBottom = false;
    }
  }

  private scrollToBottom(): void {
    try {
      this.chatMessages.nativeElement.scrollTop = this.chatMessages.nativeElement.scrollHeight;
    } catch(err) {
      console.log('Could not scroll to bottom:', err);
    }
  }

  private generateInvestmentResponse(userInput: string): string {
    const input = userInput.toLowerCase();
    
    const responses = [
      'Based on current market analysis, I recommend diversifying your portfolio across technology, healthcare, and renewable energy sectors.',
      'Our latest research indicates strong growth potential in emerging markets, particularly in Asia-Pacific regions.',
      'Consider dollar-cost averaging for volatile positions to minimize risk exposure while maintaining upside potential.',
      'The Federal Reserve\'s monetary policy suggests maintaining defensive positions in fixed income securities.',
      'ESG investing continues to show strong performance metrics with lower volatility compared to traditional indices.',
      'Current market volatility presents opportunities for value investing in fundamentally strong companies.',
      'I recommend reviewing your risk tolerance and adjusting your asset allocation accordingly for optimal returns.'
    ];
    
    // Simple keyword-based responses
    if (input.includes('portfolio') || input.includes('invest')) {
      return responses[0];
    } else if (input.includes('market') || input.includes('trend')) {
      return responses[1];
    } else if (input.includes('risk') || input.includes('safe')) {
      return responses[2];
    } else {
      // Return a random professional response
      return responses[Math.floor(Math.random() * responses.length)];
    }
  }

  formatTime(timestamp: Date): string {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  goBack() {
    this.router.navigate(['/discover']);
  }
}
