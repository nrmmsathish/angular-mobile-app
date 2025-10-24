import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";

interface ChatMessage {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: Date;
  userName?: string;
  avatar?: string;
}

@Component({
  selector: "app-chatbot",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./chatbot.component.html",
  styleUrls: ["./chatbot.component.scss"],
})
export class ChatbotComponent implements OnInit {
  @ViewChild("chatContainer") chatContainer!: ElementRef;

  chatTitle = "Chat of Manoj and AI";
  chatDate = "Share on 2024/10/23";
  newMessage = "";
  isTyping = false;

  messages: ChatMessage[] = [
    {
      id: "1",
      type: "user",
      content:
        "Hi AI, can you provide a comprehensive analysis of Honda Motor Company?",
      timestamp: new Date("2024-10-23T09:15:00"),
      userName: "Vivek",
      avatar: "👤",
    },
    {
      id: "2",
      type: "ai",
      content:
        "Hello! I'd be happy to provide you with a comprehensive analysis of Honda Motor Co., Ltd. (HMC). Let me gather the latest information for you.",
      timestamp: new Date("2024-10-23T09:15:30"),
      userName: "AI",
      avatar: "🤖",
    },
    {
      id: "3",
      type: "ai",
      content: `**Comprehensive Analysis of Honda Motor Co., Ltd. (HMC)**

**1. Financial Overview**
• Stock Price (as of October 22, 2025): $31.28 (USD)
• Market Capitalization: $49.82 billion (USD)
• Earnings per Share (TTM): $2.94
• P/E Ratio (TTM): 10.65
• Dividend Yield: 1.34%
• Price-to-Book Ratio: 0.53
• Return on Equity (ROE): 5.46%
• Return on Assets (ROA): 1.99%

**Key Financial Metrics:**
• Analyst Target Price: Mean estimate of $36.96, with a range of $34.55 to $39.37
• Short Interest: Recent short volume data indicates fluctuating short interest, with a peak of $11.61K shares on September 30, 2025
• Capital Flow: Mixed capital flow trends over the past five years, with significant inflows and outflows`,
      timestamp: new Date("2024-10-23T09:16:00"),
      userName: "AI",
      avatar: "🤖",
    },
    {
      id: "4",
      type: "ai",
      content: `**2. Business Segments and Recent Developments**

Honda operates in the following segments:
• Automobiles: Including hybrid and electric vehicles (EVs)
• Motorcycles: A strong global presence, especially in emerging markets
• Power Products: Generators, lawnmowers, and marine engines
• Aircraft and Mobility Solutions: Expanding into autonomous driving and AI technologies

**Recent Developments:**
• Japan Mobility Show 2023: Honda will showcase new mobility products, including EVs and autonomous driving technologies
• Investment in H&M AI: Honda is accelerating its autonomous driving capabilities through additional investment in the AI startup H&M AI
• Sustainability Goals: Aiming for zero environmental impact and zero traffic fatalities by 2050`,
      timestamp: new Date("2024-10-23T09:16:45"),
      userName: "AI",
      avatar: "🤖",
    },
    {
      id: "5",
      type: "user",
      content:
        "That's great! What about the competitive positioning and risks?",
      timestamp: new Date("2024-10-23T09:17:15"),
      userName: "Manoj",
      avatar: "👤",
    },
    {
      id: "6",
      type: "ai",
      content: `**3. Competitive Positioning**
• Strengths: Strong brand recognition, diversified product portfolio, and focus on innovation (e.g., EVs and AI)
• Challenges: Intense competition in the automotive sector, especially from Tesla and traditional automakers transitioning to EVs

**4. Market Sentiment and Analyst Recommendations**
• Analyst Sentiment: Mixed, with 1 "buy" recommendation and 2 "hold" ratings
• Valuation: The stock is trading below its 52-week high of $34.89, with a forward P/E of 16.40, indicating potential upside if growth targets are met

**5. Shareholder and Institutional Ownership**
Top Shareholders:
• BlackRock, Inc. (8.32%)
• The Vanguard Group, Inc. (4.57%)
• Meiji Yasuda Life Insurance Company (3.55%)`,
      timestamp: new Date("2024-10-23T09:17:45"),
      userName: "AI",
      avatar: "🤖",
    },
    {
      id: "7",
      type: "ai",
      content: `**6. Risks**
• Macroeconomic Factors: Supply chain disruptions, rising interest rates, and geopolitical tensions
• Regulatory Risks: Stricter emissions and safety regulations

**Summary**
Honda Motor Co., Ltd. (HMC) is a diversified mobility company with a strong focus on innovation and sustainability. While its financial metrics indicate stability, the stock's valuation suggests potential upside if the company successfully executes its EV and autonomous driving strategies. Investors should monitor Honda's progress in these areas, as well as broader market trends affecting the automotive sector.

*Information is for reference only and does not constitute investment advice.*

🤖 AI Investment Assistant`,
      timestamp: new Date("2024-10-23T09:18:30"),
      userName: "AI",
      avatar: "🤖",
    },
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    this.scrollToBottom();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      if (this.chatContainer) {
        this.chatContainer.nativeElement.scrollTop =
          this.chatContainer.nativeElement.scrollHeight;
      }
    } catch (err) {}
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      const message: ChatMessage = {
        id: Date.now().toString(),
        type: "user",
        content: this.newMessage,
        timestamp: new Date(),
        userName: "You",
        avatar: "👤",
      };

      this.messages.push(message);
      this.newMessage = "";

      // Simulate AI typing
      this.isTyping = true;
      setTimeout(() => {
        this.simulateAIResponse();
      }, 1500);
    }
  }

  simulateAIResponse() {
    this.isTyping = false;
    const aiResponse: ChatMessage = {
      id: Date.now().toString(),
      type: "ai",
      content:
        "Thank you for your question! I'm here to help you with financial analysis and investment insights. Feel free to ask about any other stocks or financial topics.",
      timestamp: new Date(),
      userName: "AI",
      avatar: "🤖",
    };

    this.messages.push(aiResponse);
  }

  formatTime(timestamp: Date): string {
    return timestamp.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  }
  // Add this method to the ChatbotComponent class
  formatMessageContent(content: string): string {
    // Convert markdown-style formatting to HTML
    return content
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/• (.*?)(?=\n|$)/g, "<li>$1</li>")
      .replace(/(<li>.*<\/li>)/s, "<ul>$1</ul>")
      .replace(/\n/g, "<br>");
  }

  goBack() {
    this.router.navigate(["/discover"]);
  }
}
