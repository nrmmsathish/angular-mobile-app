import { Component, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface ChatMessage {
  id: string;
  type: 'user' | 'assistant' | 'status';
  content: string;
  timestamp: Date;
  isComplete?: boolean;
}

interface ProcessingStatus {
  text: string;
  completed: boolean;
}

interface QuestionSet {
  title: string;
  questions: string[];
  context: string;
}

interface UserProfile {
  age: number;
  location: string;
  maritalStatus: string;
  profession: string;
  aum: string;
  interests: string[];
  riskProfile: string;
  lifestage: string;
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
  @ViewChild('messageInput') private messageInput!: ElementRef;
  
  messages: ChatMessage[] = [];
  currentMessage = '';
  isTyping = false;
  isRefreshing = false;
  currentQuestionSetIndex = 0;
  private shouldScrollToBottom = false;
  
  // Processing status tracking
  processingStatuses: ProcessingStatus[] = [];
  currentProcessingStep = 0;
  isProcessing = false;
  currentResponseText = '';
  isWritingResponse = false;

  // User Profile for Personalization
  userProfile: UserProfile = {
    age: 55,
    location: 'Singapore',
    maritalStatus: 'Married',
    profession: 'Professional',
    aum: '1.5M USD',
    interests: ['Travel', 'International Markets', 'Cultural Experiences'],
    riskProfile: 'Moderate-Conservative',
    lifestage: 'Pre-Retirement Planning'
  };

  questionSets: QuestionSet[] = [
    {
      title: "Singapore Wealth Management",
      context: "singapore_wealth",
      questions: [
        "How to optimize my S$2.1M portfolio in Singapore?",
        "Best SGX ETFs for Singapore residents?",
        "Singapore tax-efficient investment strategies",
        "CPF optimization for high net worth individuals",
        "Private banking options in Singapore",
        "Offshore investment structures for Singapore residents"
      ]
    },
    {
      title: "Pre-Retirement at 55",
      context: "pre_retirement",
      questions: [
        "10-year retirement countdown strategy",
        "Should I reduce risk as I approach 65?",
        "Healthcare planning for Singapore retirees",
        "Estate planning for married couples",
        "Annuity options in Singapore market",
        "Transition from accumulation to preservation"
      ]
    },
    {
      title: "Travel & Global Investing",
      context: "travel_global",
      questions: [
        "Multi-currency portfolio for frequent travelers",
        "Best travel rewards credit cards in Singapore",
        "International property investment opportunities",
        "Currency hedging for travel expenses",
        "Global real estate for retirement income",
        "Tax implications of overseas investments"
      ]
    },
    {
      title: "High Net Worth Strategies",
      context: "hnw_strategies",
      questions: [
        "Private equity opportunities for $1.5M portfolio",
        "Alternative investments in Singapore",
        "Family office setup considerations",
        "Structured products for wealth preservation",
        "Cross-border tax planning strategies",
        "Succession planning for married professionals"
      ]
    },
    {
      title: "Singapore Market Focus",
      context: "singapore_market",
      questions: [
        "SGX dividend aristocrats for income",
        "Singapore REITs vs global REITs",
        "MAS regulatory changes impact",
        "Singapore banks investment outlook",
        "Tech sector opportunities in Southeast Asia",
        "ESG investing in Asian markets"
      ]
    },
    {
      title: "Lifestyle & Legacy Planning",
      context: "lifestyle_legacy",
      questions: [
        "Funding dream retirement travels",
        "Creating passive income streams",
        "Insurance needs for married couples",
        "Charitable giving strategies in Singapore",
        "Multiple residence planning",
        "Wealth transfer to next generation"
      ]
    }
  ];

  suggestions = [
    "What's the current market outlook?",
    "Help me diversify my portfolio",
    "Explain cryptocurrency investing",
    "Best long-term investment strategies",
    "How to start investing with $1000?",
    "Risk management techniques"
  ];

  get currentQuestionSet(): QuestionSet {
    return this.questionSets[this.currentQuestionSetIndex];
  }

  constructor(private router: Router) {
    // Start with empty messages to show welcome screen
  }

  selectSuggestion(suggestion: string) {
    this.currentMessage = suggestion;
    this.sendMessage();
  }

  refreshQuestions() {
    if (this.isRefreshing) return;
    
    this.isRefreshing = true;
    
    // Cycle to next question set
    setTimeout(() => {
      this.currentQuestionSetIndex = (this.currentQuestionSetIndex + 1) % this.questionSets.length;
      this.isRefreshing = false;
    }, 600); // Animation duration
  }

  sendMessage() {
    if (!this.currentMessage.trim() || this.isTyping || this.isProcessing) return;
    
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
    
    // Start processing flow
    this.startProcessingFlow(userInput);
  }

  private startProcessingFlow(userInput: string) {
    this.isProcessing = true;
    this.currentProcessingStep = 0;
    
    // Define processing steps with intelligent, human-like flow
    this.processingStatuses = [
      { text: '🤔 Analyzing your question...', completed: false },
      { text: '📚 Reviewing your investment profile and preferences...', completed: false },
      { text: '🇸🇬 Checking latest Singapore market conditions...', completed: false },
      { text: '💡 Connecting insights to your travel lifestyle...', completed: false },
      { text: '✍️ Crafting personalized recommendations...', completed: false }
    ];

    // Add status message
    const statusMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      type: 'status',
      content: '',
      timestamp: new Date()
    };
    this.messages.push(statusMessage);
    this.shouldScrollToBottom = true;

    // Execute processing steps
    this.executeProcessingStep(userInput);
  }

  private executeProcessingStep(userInput: string) {
    if (this.currentProcessingStep < this.processingStatuses.length) {
      // Mark current step as completed
      if (this.currentProcessingStep > 0) {
        this.processingStatuses[this.currentProcessingStep - 1].completed = true;
      }

      // Wait for current step with faster processing
      setTimeout(() => {
        this.currentProcessingStep++;
        this.executeProcessingStep(userInput);
      }, 400 + Math.random() * 200); // 400-600ms per step
    } else {
      // All processing steps completed
      this.processingStatuses[this.processingStatuses.length - 1].completed = true;
      
      setTimeout(() => {
        this.finishProcessingAndStartTyping(userInput);
      }, 300);
    }
  }

  private finishProcessingAndStartTyping(userInput: string) {
    // Remove status message
    this.messages = this.messages.filter(msg => msg.type !== 'status');
    this.isProcessing = false;
    
    // Generate response and start typing animation
    const fullResponse = this.generateInvestmentResponse(userInput);
    
    // Add empty AI message
    const aiMessage: ChatMessage = {
      id: (Date.now() + 2).toString(),
      type: 'assistant',
      content: '',
      timestamp: new Date(),
      isComplete: false
    };
    this.messages.push(aiMessage);
    this.shouldScrollToBottom = true;
    
    // Start typing animation
    this.typeResponseLineByLine(fullResponse, aiMessage.id);
  }

  private typeResponseLineByLine(fullResponse: string, messageId: string) {
    this.isWritingResponse = true;
    const lines = fullResponse.split('\n');
    let currentLineIndex = 0;
    let currentCharIndex = 0;
    let accumulatedText = '';

    const typeNextCharacter = () => {
      if (currentLineIndex < lines.length) {
        const currentLine = lines[currentLineIndex];
        
        if (currentCharIndex < currentLine.length) {
          // Add next character
          accumulatedText += currentLine[currentCharIndex];
          currentCharIndex++;
          
          // Update message content
          const messageIndex = this.messages.findIndex(msg => msg.id === messageId);
          if (messageIndex !== -1) {
            this.messages[messageIndex].content = accumulatedText;
            this.shouldScrollToBottom = true;
          }
          
          // Continue typing with variable speed
          const typingSpeed = this.getTypingSpeed(currentLine[currentCharIndex - 1]);
          setTimeout(typeNextCharacter, typingSpeed);
        } else {
          // Current line finished, add line break and move to next line
          if (currentLineIndex < lines.length - 1) {
            accumulatedText += '\n';
            const messageIndex = this.messages.findIndex(msg => msg.id === messageId);
            if (messageIndex !== -1) {
              this.messages[messageIndex].content = accumulatedText;
              this.shouldScrollToBottom = true;
            }
          }
          
          currentLineIndex++;
          currentCharIndex = 0;
          
          // Shorter pause between lines for smoother flow
          setTimeout(typeNextCharacter, 50);
        }
      } else {
        // Typing completed
        const messageIndex = this.messages.findIndex(msg => msg.id === messageId);
        if (messageIndex !== -1) {
          this.messages[messageIndex].isComplete = true;
        }
        this.isWritingResponse = false;
      }
    };

    // Start typing with shorter initial delay
    setTimeout(typeNextCharacter, 200);
  }

  private getTypingSpeed(character: string): number {
    // Faster, smoother typing speed
    if (character === ' ') return 10;
    if (character === '.' || character === '!' || character === '?') return 50;
    if (character === ',') return 30;
    return 8 + Math.random() * 12; // 8-20ms per character
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  onInput(event: any) {
    // No auto-resizing needed for single-line input
  }

  private resizeTextarea() {
    // Removed auto-resize functionality for single-line input
  }

  ngAfterViewChecked() {
    if (this.shouldScrollToBottom) {
      this.scrollToBottom();
      this.shouldScrollToBottom = false;
    }
  }

  private scrollToBottom(): void {
    try {
      if (this.chatMessages?.nativeElement) {
        this.chatMessages.nativeElement.scrollTop = this.chatMessages.nativeElement.scrollHeight;
      }
    } catch(err) {
      console.log('Could not scroll to bottom:', err);
    }
  }

  private generateInvestmentResponse(userInput: string): string {
    const input = userInput.toLowerCase();
    
    // Check if the question matches current context
    const currentContext = this.currentQuestionSet.context;
    
    const responses = {
      singapore_wealth: [
        "**Singapore Wealth Optimization for Your S$2.1M Portfolio**\n\n🇸🇬 **MAS-Compliant Strategy for 55-Year-Old Professional:**\n\n**Core Allocation (60%):**\n• **SGX Blue Chips** (25%): DBS, OCBC, UOB - stable dividends, local expertise\n• **Singapore REITs** (20%): CapitaLand Integrated, Mapletree Logistics - 4-6% yields\n• **SGX ETFs** (15%): SPDR STI ETF, Nikko AM SGD Investment Grade Bond ETF\n\n**International Exposure (30%):**\n• **Global Developed Markets**: MSCI World ETF (SGD-hedged)\n• **Asian Growth**: Phillip FTSE ASEAN 40 ETF\n• **USD Bonds**: For travel funding and currency diversification\n\n**Alternative Assets (10%):**\n• **Private REITs**: Ascendas-Singbridge portfolio\n• **Structured Products**: Principal-protected notes linked to travel/hospitality sector\n\n💰 **Tax Efficiency**: Utilize SRS contributions (S$15,300 annually) for tax relief while building retirement corpus.",
        
        "**CPF Optimization Strategy for High Net Worth Singapore Resident**\n\n🏛️ **Advanced CPF Planning at 55:**\n\n**CPF-SA Enhancement:**\n• Top up to Full Retirement Sum (S$198,800 in 2024)\n• Enjoy 4% guaranteed returns (risk-free)\n• Tax deduction up to S$8,000 annually\n\n**Strategic Withdrawals:**\n• CPF-OA funds for property investment or approved investments\n• Consider CPF Investment Scheme (CPFIS) for higher returns\n• Plan for CPF LIFE annuity optimization at 65\n\n**Private Banking Integration:**\n• DBS Private Bank minimum S$1.5M - matches your portfolio\n• UOB Privilege Private minimum S$2M - slight stretch but premium services\n• Access to pre-IPO opportunities and structured products\n\n🌏 **Cross-Border Considerations:**\n• Singapore-sourced income tax exemptions\n• Double taxation agreements for travel/overseas investments\n• Estate planning with Singapore's forced heirship laws"
      ],
      
      pre_retirement: [
        "**10-Year Pre-Retirement Countdown Strategy (Age 55-65)**\n\n🎯 **Decade Transition Plan for Singapore Professional:**\n\n**Years 55-58 (Wealth Accumulation Phase):**\n• Maintain 70% equity, 30% bonds allocation\n• Maximize earning years with aggressive savings\n• Target S$300,000 annual savings from professional income\n• Build travel fund: S$50,000 annually for dream destinations\n\n**Years 58-62 (Risk Reduction Phase):**\n• Shift to 60% equity, 40% bonds\n• Increase Singapore government bonds allocation\n• Consider guaranteed income products (annuities)\n• Plan career transition or consulting opportunities\n\n**Years 62-65 (Pre-Retirement Phase):**\n• Conservative 50% equity, 50% bonds\n• Secure healthcare coverage beyond company benefits\n• Finalize estate planning and will updates\n• Test retirement lifestyle with extended travels\n\n💡 **Singapore-Specific Milestones:**\n• Age 55: CPF withdrawal eligibility begins\n• Age 65: CPF LIFE payments commence\n• Healthcare: Medisave minimum sum planning",
        
        "**Healthcare & Estate Planning for Married Couples in Singapore**\n\n🏥 **Healthcare Cost Planning:**\n\n**Private Healthcare Strategy:**\n• Integrated Shield Plans: Upgrade to private hospital coverage\n• Budget S$10,000-15,000 annually for comprehensive health insurance\n• Long-term care insurance: ElderShield Plus or CareShield Life\n• Medical tourism budget: S$20,000 for specialized treatments abroad\n\n**Estate Planning Essentials:**\n• **Will Preparation**: Singapore law requires specific format\n• **Lasting Power of Attorney**: Financial and healthcare decisions\n• **Trust Structures**: Consider family trust for >S$2M estates\n• **CPF Nomination**: Ensure smooth transfer to spouse\n\n🌍 **International Considerations:**\n• Travel insurance with global coverage (S$5,000-10,000 annually)\n• International health coverage for extended travel periods\n• Emergency repatriation insurance\n• Consider dual-residency planning if relocating post-retirement"
      ],
      
      travel_global: [
        "**Multi-Currency Portfolio for the Travel-Loving Professional**\n\n✈️ **Travel-Optimized Investment Strategy:**\n\n**Currency Diversification (S$1.5M Portfolio):**\n• **SGD Base** (40% - S$600,000): Singapore assets for stability\n• **USD Exposure** (30% - S$450,000): US markets, universal travel currency\n• **EUR Holdings** (15% - S$225,000): European travel and diversification\n• **JPY/Other** (15% - S$225,000): Asia-Pacific travel and opportunities\n\n**Travel-Friendly Investment Vehicles:**\n• **Global Investment Platforms**: Interactive Brokers, Saxo Bank Singapore\n• **Multi-Currency Savings**: DBS Multiplier, OCBC 360 accounts\n• **Travel Credit Cards**: DBS Altitude, Citi PremiereMiles (optimize points)\n• **International REITs**: European, US, Japan property exposure\n\n🌏 **International Property Strategy:**\n• **Vacation Homes**: Consider Malaysia (MM2H), Thailand (Elite Visa)\n• **Investment Properties**: London (post-Brexit opportunities), Tokyo (Olympics legacy)\n• **REITs Alternative**: Global real estate exposure without direct ownership\n\n💳 **Travel Rewards Optimization:**\n• Target 100,000+ miles annually through investment spending\n• Premium credit cards: Annual fees justified by travel benefits\n• Private banking travel services and concierge",
        
        "**Global Real Estate & Currency Hedging for Frequent Travelers**\n\n🏠 **International Property Investment Matrix:**\n\n**Prime Destinations for Singapore Residents:**\n• **London, UK**: Post-Brexit value, strong rental yields (4-6%)\n• **Tokyo, Japan**: 2024 Olympics legacy, depreciating yen opportunity\n• **Melbourne, Australia**: Strong Singapore ties, stable democracy\n• **Vancouver, Canada**: Pacific gateway, immigration-friendly\n\n**Currency Risk Management:**\n• **Natural Hedging**: Earn SGD, spend multiple currencies while traveling\n• **Currency ETFs**: SPDR currency ETFs for major travel destinations\n• **Forward Contracts**: Lock in exchange rates for planned major trips\n• **Multi-Currency Deposits**: Hedge through banking products\n\n✈️ **Travel Fund Strategy:**\n• Allocate S$100,000 (7% of portfolio) specifically for travel\n• High-yield savings in travel destination currencies\n• Travel-focused investment funds (hospitality, airlines REITs)\n• Premium credit card annual spending targets for maximum rewards"
      ],
      
      hnw_strategies: [
        "**High Net Worth Investment Strategies for S$1.5M Portfolio**\n\n💎 **Sophisticated Investment Access:**\n\n**Private Market Opportunities:**\n• **Minimum Investments**: Most private equity funds require S$250,000+ minimums\n• **Access Platforms**: Fundsmith Private, iCapital Network Singapore\n• **Target Allocation**: 10-15% (S$150,000-225,000) in alternatives\n• **Due Diligence**: 2-3 year investment horizons, illiquidity consideration\n\n**Structured Products Portfolio:**\n• **Principal-Protected Notes**: 80-90% capital protection with upside participation\n• **Market-Linked CDs**: Linked to travel/hospitality sector performance\n• **Dual Currency Investments**: SGD/USD, SGD/EUR for travel currency needs\n• **Yield Enhancement**: 4-8% annual returns vs traditional bonds\n\n**Family Office Considerations:**\n• **Minimum Threshold**: Typically S$5-10M for dedicated family office\n• **Multi-Family Office**: Share costs with other families (S$1-5M suitable)\n• **Services**: Investment management, tax planning, estate administration\n• **Singapore Providers**: Citi Private Bank, Julius Baer, Pictet\n\n🏛️ **Private Banking Tier Analysis:**\n• **DBS Treasures Private Client**: S$1.5M minimum - perfect fit\n• **Benefits**: Dedicated RM, premium investment access, travel privileges\n• **Alternative**: OCBC Premier Private (S$2M) - slight stretch but premium services",
        
        "**Succession Planning & Cross-Border Tax Optimization**\n\n👨‍👩‍👧‍👦 **Estate Planning for Married High Net Worth Professionals:**\n\n**Singapore Estate Structure:**\n• **Simple Will**: For estates under S$3M\n• **Trust Consideration**: If planning to exceed S$2M by retirement\n• **CPF Nomination**: Bypass probate for CPF savings\n• **Joint Investments**: Survivorship benefits for spouse\n\n**Tax-Efficient Structures:**\n• **SRS Maximization**: S$15,300 annual contributions\n• **Life Insurance**: Whole life policies for estate liquidity\n• **Offshore Structures**: Singapore resident but global investments\n• **Double Tax Treaties**: Optimize tax on international investments\n\n**Succession Timeline:**\n• **Immediate**: Update wills, insurance beneficiaries\n• **5-Year**: Consider trust structures if wealth grows\n• **10-Year**: Full estate plan review before retirement\n• **Legacy**: Charitable giving strategies in Singapore\n\n💼 **Professional Practice Considerations:**\n• Business succession planning if own practice\n• Professional indemnity insurance continuation\n• Consulting income optimization in early retirement"
      ],
      
      singapore_market: [
        "**SGX Investment Strategy for Sophisticated Singapore Investor**\n\n🇸🇬 **SGX Portfolio Optimization for S$1.5M Investor:**\n\n**Core SGX Holdings (40% allocation - S$600,000):**\n• **Banking Trio** (15%): DBS (40%), OCBC (35%), UOB (25%) - 4-5% dividend yields\n• **Singapore REITs** (15%): CapitaLand Integrated Commercial Trust, Mapletree Pan Asia Commercial Trust\n• **Telecoms & Utilities** (10%): Singtel, SP Group - defensive dividend plays\n\n**Growth Opportunities:**\n• **Sea Limited (SE)**: Singapore-based regional tech giant\n• **Genting Singapore**: Tourism recovery play, IR expansion\n• **Singapore Exchange (SGX)**: Meta-investment in Singapore's growth\n• **Wilmar International**: Agricultural commodities, ESG transition\n\n**REIT Strategy for Income:**\n• Target 5-7% dividend yields from Singapore REITs\n• **Industrial REITs**: Mapletree Industrial Trust, Ascendas REIT\n• **Retail REITs**: CapitaLand Mall Trust, Frasers Centrepoint Trust\n• **Healthcare REITs**: Parkway Life REIT - aging population theme\n\n📊 **MAS Regulatory Advantage:**\n• Strong regulatory framework benefits long-term investors\n• Currency stability with managed float system\n• Political stability premium in uncertain global environment",
        
        "**Southeast Asian Growth Strategy from Singapore Base**\n\n🌏 **Regional Investment Opportunities:**\n\n**ASEAN Exposure through SGX:**\n• **Phillip FTSE ASEAN 40 ETF**: Broad regional exposure\n• **Individual Country ETFs**: Thailand (SPDR), Malaysia (CIMB)\n• **Singapore-Listed Regional Companies**: Jardine Matheson, Hongkong Land\n\n**Tech Sector Focus:**\n• **Sea Limited**: E-commerce, gaming, fintech across Southeast Asia\n• **Grab Holdings**: Super-app platform covering multiple countries\n• **Regional Tech ETFs**: Access through US-listed Southeast Asian funds\n\n**ESG Integration:**\n• **Sustainable Asia ETFs**: Environmental and social governance focus\n• **Green Bonds**: Singapore government green bond issuances\n• **ESG REITs**: Properties with sustainability certifications\n• **Impact Investing**: Microfinance and social impact bonds in region\n\n💡 **Singapore Hub Advantage:**\n• Access to regional IPOs and pre-listing opportunities\n• Time zone advantage for Asian market trading\n• Language and cultural bridges to regional markets\n• Regulatory sophistication attracts quality regional listings"
      ],
      
      lifestyle_legacy: [
        "**Funding Your Dream Retirement Travel Lifestyle**\n\n✈️ **Travel-Focused Retirement Income Strategy:**\n\n**Passive Income Target: S$200,000 Annually**\n• **Dividend Portfolio** (S$120,000): 6% yield from SGX dividend aristocrats\n• **REIT Income** (S$60,000): 4% yield from diversified REIT portfolio\n• **Bond Ladder** (S$20,000): 2-3% from Singapore government bonds\n\n**Travel Fund Structure:**\n• **Annual Travel Budget**: S$80,000 (luxury travel, extended stays)\n• **Quarterly Trips**: S$20,000 per quarter for international destinations\n• **Special Experiences**: S$40,000 annually for luxury cruises, safari trips\n• **Currency Buffers**: Maintain 6-month travel budget in destination currencies\n\n**Income-Generating Travel Investments:**\n• **Hotel REITs**: Global hotel chains, Singapore hospitality trusts\n• **Tourism Stocks**: Singapore Airlines, Genting, cruise lines\n• **Travel Credit Card Rewards**: Annual spending optimization\n• **Vacation Rental Properties**: International markets with strong tourism\n\n🏖️ **Retirement Lifestyle Funding:**\n• **Primary Residence**: Paid-off Singapore property for stability\n• **Vacation Homes**: Consider Malaysia, Thailand for extended stays\n• **Concierge Services**: Private banking travel benefits and planning\n• **Healthcare Travel**: Medical tourism budget for premium care",
        
        "**Wealth Transfer & Charitable Legacy in Singapore**\n\n👨‍👩‍👧‍👦 **Next Generation Wealth Planning:**\n\n**Education Funding Strategy:**\n• **International Education**: Budget S$200,000 per child for overseas university\n• **Education Insurance**: Whole life policies maturing at education age\n• **529-Style Savings**: Singapore Savings Bonds for education funding\n• **Currency Planning**: USD/GBP exposure for international education costs\n\n**Charitable Giving Optimization:**\n• **Tax Deductions**: Singapore allows 2.5x tax deduction for approved charities\n• **Donor Advised Funds**: Flexible charitable giving vehicles\n• **Family Foundation**: Consider for S$500,000+ charitable intentions\n• **Volunteer Time**: Active involvement in charitable organizations\n\n**Legacy Planning Timeline:**\n• **Age 55-60**: Establish basic estate planning documents\n• **Age 60-65**: Consider trust structures for wealth transfer\n• **Age 65+**: Optimize for estate duty (though minimal in Singapore)\n• **Ongoing**: Regular review with changes in wealth/family situation\n\n🌟 **Values-Based Investing:**\n• **ESG Funds**: Align investments with personal values\n• **Impact Investing**: Measurable social/environmental outcomes\n• **Community Development**: Support Singapore's social enterprises\n• **Cultural Preservation**: Invest in heritage and arts initiatives"
      ],
      
      default: [
        "**Personalized Investment Guidance for Singapore-Based Professional**\n\nBased on your profile as a 55-year-old married professional in Singapore with S$1.5M AUM who loves to travel, here's my tailored analysis:\n\n🎯 **Your Unique Investment Priorities:**\n\n**Pre-Retirement Focus (10 years to 65):**\n• Wealth preservation with moderate growth\n• Income generation for current travel lifestyle\n• Singapore tax optimization strategies\n• Healthcare and estate planning preparation\n\n**Travel-Integrated Portfolio:**\n• Multi-currency exposure for global travel\n• Travel rewards optimization through investments\n• International property considerations\n• Currency hedging for major travel expenses\n\n**Singapore Advantages:**\n• Strong regulatory environment for investors\n• Access to Asian growth markets\n• Tax-efficient investment structures\n• High-quality healthcare and infrastructure\n\n**Immediate Action Items:**\n• CPF optimization review\n• Private banking relationship evaluation\n• Estate planning document updates\n• Travel-focused investment strategy\n\nWhat specific aspect of your financial planning would you like to explore further?"
      ]
    };
    
    // Enhanced keyword matching with context priority
    if (input.includes('benefits')) {
      return this.getBenefitsResponse();
    } else if (input.includes('travel')) {
      return this.getTravelResponse();
    } else if (input.includes('singapore') || input.includes('sgx') || input.includes('cpf') || currentContext === 'singapore_wealth' || currentContext === 'singapore_market') {
      return currentContext === 'singapore_market' ? 
        responses.singapore_market[Math.floor(Math.random() * responses.singapore_market.length)] :
        responses.singapore_wealth[Math.floor(Math.random() * responses.singapore_wealth.length)];
    } else if (input.includes('retirement') || input.includes('retire') || input.includes('65') || input.includes('pension') || currentContext === 'pre_retirement') {
      return responses.pre_retirement[Math.floor(Math.random() * responses.pre_retirement.length)];
    } else if (input.includes('currency') || input.includes('global') || input.includes('international') || currentContext === 'travel_global') {
      return responses.travel_global[Math.floor(Math.random() * responses.travel_global.length)];
    } else if (input.includes('private') || input.includes('wealth') || input.includes('alternative') || input.includes('structured') || currentContext === 'hnw_strategies') {
      return responses.hnw_strategies[Math.floor(Math.random() * responses.hnw_strategies.length)];
    } else if (input.includes('legacy') || input.includes('estate') || input.includes('charitable') || input.includes('family') || currentContext === 'lifestyle_legacy') {
      return responses.lifestyle_legacy[Math.floor(Math.random() * responses.lifestyle_legacy.length)];
    } else if (input.includes('portfolio') || input.includes('diversif') || input.includes('allocation') || input.includes('risk')) {
      return responses.hnw_strategies[Math.floor(Math.random() * responses.hnw_strategies.length)];
    } else {
      return responses.default[0];
    }
  }

  private getTravelResponse(): string {
    return "**Citi Private Client vs Citigold Travel Benefits for Singapore Professionals**\n\n🏦 **Premium Travel Banking Comparison:**\n\nCiti Private Client (CPC) customers in Singapore enjoy more extensive travel-related and investment benefits than Citigold customers, reflecting the higher tier of service and eligibility. CPC delivers premium lifestyle perks and advanced investment options, while Citigold offers competitive privileges suitable for affluent, but not ultra-high-net-worth, individuals.\n\n✈️ **Travel Benefits Comparison**\n\n**🛂 Airport Lounge Access**\n• **CPC:** Up to 16 visits/year via Priority Pass & DragonPass\n• **Citigold:** 2 visits/year via Mastercard Travel Pass\n\n**🏨 Hotel Privileges**\n• **CPC:** Higher-tier memberships at Wyndham and other chains\n• **Citigold:** Standard perks with selected partners\n\n**⛳ Golf Benefits**\n• **CPC:** 11 complimentary games at global courses\n• **Citigold:** 4 complimentary green fees at select courses\n\n**🛎️ Concierge Services**\n• **CPC:** 24/7 global concierge and lifestyle assistance\n• **Citigold:** Limited concierge support\n\n**🛡️ Travel Insurance**\n• **CPC:** Coverage up to US$500,000 per trip\n• **Citigold:** Standard travel insurance coverage\n\n**💱 Currency Exchange**\n• **CPC:** Waived fees, global wallet access\n• **Citigold:** Competitive rates, some waivers\n\n**📱 Global Data Roaming**\n• **CPC:** 3GB data in 120+ countries with FlexiRoam\n• **Citigold:** Not included or limited\n\n💰 **Investment Benefits Comparison**\n\n**📈 Investment Products**\n• **CPC:** Access to exclusive products for accredited investors, alternatives, bespoke solutions\n• **Citigold:** Broad wealth management & market insights; limited exclusivity\n\n**👥 Advisory Support**\n• **CPC:** Dedicated Wealth Team; advanced portfolio analytics\n• **Citigold:** Personal Client Advisor, team support\n\n**💸 Commission-Free Trades**\n• **CPC:** Extended commission-free period on select markets (new accounts)\n• **Citigold:** 6 months commission-free on buy trades in US/HK (new accounts)\n\n**🎁 Points & Rewards**\n• **CPC:** Higher-value welcome gifts, complimentary points transfer (2/year)\n• **Citigold:** Welcome gifts, standard reward program\n\n**🏛️ Accredited Investor Offerings**\n• **CPC:** Access to alternative investments, legacy planning, estate advisory\n• **Citigold:** Some access if accredited, limited family office support\n\n🎯 **Quick Comparison Summary**\n\n**✈️ Travel Advantages (CPC vs Citigold):**\n• Airport Lounges: **16 visits** vs 2 visits (8x more access)\n• Golf Games: **11 complimentary** vs 4 games (2.75x more)\n• Travel Insurance: **US$500K** vs standard coverage\n• Concierge: **24/7 global** vs limited support\n• Data Roaming: **3GB in 120+ countries** vs not included\n\n**💼 Investment Advantages (CPC vs Citigold):**\n• Products: **Exclusive alternatives** vs limited exclusivity\n• Support: **Dedicated wealth team** vs shared advisor\n• Access: **Alternative investments** vs limited access\n\n💡 **Bottom Line for Your Profile**\n\nFor a 55-year-old Singapore professional with S$1.5M AUM who loves travel, **Citi Private Client provides 8x more airport lounge access, 2.75x more golf benefits, premium travel insurance, and exclusive investment opportunities** that perfectly match your lifestyle and wealth level.";
  }

  private getBenefitsResponse(): string {
    return "**Citi Private Client vs Citigold Benefits Comparison for Singapore High Net Worth Professionals**\n\n🏦 **Premium Banking Benefits Analysis for Your S$1.5M Portfolio:**\n\nCiti Private Client (CPC) customers in Singapore enjoy more extensive travel-related and investment benefits than Citigold customers, reflecting the higher tier of service and eligibility. CPC delivers premium lifestyle perks and advanced investment options, while Citigold offers competitive privileges suitable for affluent, but not ultra-high-net-worth, individuals.\n\n✈️ **Travel Benefits Comparison**\n\n**AIRPORT LOUNGE ACCESS**\n🔸 **CPC Customer**: Up to 16 visits/year via Priority Pass & DragonPass\n🔸 **Citigold Customer**: 2 visits/year via Mastercard Travel Pass\n\n**HOTEL PRIVILEGES**\n🔸 **CPC Customer**: Higher-tier memberships at Wyndham and other chains\n🔸 **Citigold Customer**: Standard perks with selected partners\n\n**GOLF BENEFITS**\n🔸 **CPC Customer**: 11 complimentary games at global courses\n🔸 **Citigold Customer**: 4 complimentary green fees at select courses\n\n**CONCIERGE SERVICES**\n🔸 **CPC Customer**: 24/7 global concierge and lifestyle assistance\n🔸 **Citigold Customer**: Limited concierge support\n\n**TRAVEL INSURANCE**\n🔸 **CPC Customer**: Coverage up to US$500,000 per trip\n🔸 **Citigold Customer**: Standard travel insurance coverage\n\n**CURRENCY EXCHANGE**\n🔸 **CPC Customer**: Waived fees, global wallet access\n🔸 **Citigold Customer**: Competitive rates, some waivers\n\n**GLOBAL DATA ROAMING**\n🔸 **CPC Customer**: 3GB data in 120+ countries with FlexiRoam\n🔸 **Citigold Customer**: Not included or limited\n\n💰 **Investment Benefits Comparison**\n\n**INVESTMENT PRODUCTS**\n🔸 **CPC Customer**: Access to exclusive products for accredited investors, alternatives, bespoke solutions\n🔸 **Citigold Customer**: Broad wealth management & market insights; limited exclusivity\n\n**ADVISORY SUPPORT**\n🔸 **CPC Customer**: Dedicated Wealth Team; advanced portfolio analytics\n🔸 **Citigold Customer**: Personal Client Advisor, team support\n\n**COMMISSION-FREE TRADES**\n🔸 **CPC Customer**: Extended commission-free period on select markets (new accounts)\n🔸 **Citigold Customer**: 6 months commission-free on buy trades in US/HK (new accounts)\n\n**POINTS & REWARDS**\n🔸 **CPC Customer**: Higher-value welcome gifts, complimentary points transfer (2/year)\n🔸 **Citigold Customer**: Welcome gifts, standard reward program\n\n**ACCREDITED INVESTOR OFFERINGS**\n🔸 **CPC Customer**: Access to alternative investments, legacy planning, estate advisory\n🔸 **Citigold Customer**: Some access if accredited, limited family office support\n\n🎯 **Recommendation for Your Profile:**\n\nBased on your S$1.5M AUM and travel lifestyle, **Citi Private Client** is the optimal choice:\n\n**Key Advantages for You:**\n• **Travel Optimization**: 16 annual lounge visits perfect for frequent international travel\n• **Golf Benefits**: 11 complimentary games globally align with leisure preferences\n• **Investment Access**: Exclusive alternative investments suitable for your portfolio size\n• **Concierge Services**: 24/7 global support for travel planning and lifestyle management\n• **Enhanced Insurance**: US$500,000 travel coverage for peace of mind during extensive travel\n\n**Eligibility Considerations:**\n• **CPC Minimum**: Typically S$1.5M - S$2M (you meet the threshold)\n• **Citigold Alternative**: S$200,000 minimum if CPC unavailable\n• **Service Quality**: Dedicated wealth team vs shared advisor model\n\n**Strategic Integration:**\n• **Currency Management**: Global wallet perfect for multi-destination travel\n• **Investment Coordination**: Alternative investments complement your existing portfolio\n• **Lifestyle Enhancement**: Golf and travel benefits maximize your leisure investment\n• **Estate Planning**: Advanced advisory supports your pre-retirement planning\n\n💡 **Summary for Singapore-Based Professional:**\n\nCPC customers gain high-end travel privileges, including substantially more airport lounge access, global concierge service, and golf games at premium courses worldwide, alongside advanced travel insurance and data roaming perks. For investments, CPC delivers exclusive product access, comprehensive support, and specialized advisory for wealth creation and preservation, whereas Citigold's offerings, while robust, are comparatively modest and targeted toward a broader affluent segment.\n\nGiven your profile as a 55-year-old married professional with significant assets and travel passion, Citi Private Client provides the premium service level that matches your lifestyle and investment sophistication requirements.";
  }

  formatMessage(content: string): string {
    // Convert markdown-style formatting to HTML
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/•/g, '&bull;')
      .replace(/\n/g, '<br>');
  }

  copyMessage(content: string) {
    // Remove HTML tags for copying plain text
    const plainText = content.replace(/<[^>]*>/g, '').replace(/&bull;/g, '•');
    navigator.clipboard.writeText(plainText).then(() => {
      // Could add a toast notification here
      console.log('Message copied to clipboard');
    });
  }

  formatTime(timestamp: Date): string {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  goBack() {
    this.router.navigate(['/discover']);
  }
}