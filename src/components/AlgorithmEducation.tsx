
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  BookOpen, 
  Brain, 
  Target, 
  Zap, 
  Calculator, 
  TrendingUp, 
  Timer, 
  Users, 
  DollarSign,
  PlayCircle,
  ArrowRight,
  CheckCircle,
  Info,
  Lightbulb,
  Eye,
  Lock,
  Gavel,
  Clock,
  AlertCircle,
  Star,
  Award,
  TrendingDown
} from "lucide-react";

const AlgorithmEducation = () => {
  const [selectedAuction, setSelectedAuction] = useState("english");
  const [selectedStrategy, setSelectedStrategy] = useState("greedy");

  const auctionTypes = [
    {
      id: "english",
      name: "English Auction",
      icon: TrendingUp,
      description: "Open ascending-price auction where bidders openly compete",
      details: {
        mechanism: "The most common auction format where bidders can see all bids and openly compete by placing incrementally higher bids. The auction continues until no bidder is willing to place a higher bid.",
        advantages: [
          "Complete transparency - all bids are visible",
          "Maximizes seller revenue through competitive bidding",
          "Simple to understand and participate in",
          "Encourages active participation from all bidders",
          "Real-time price discovery"
        ],
        disadvantages: [
          "Can intimidate smaller or inexperienced bidders",
          "May lead to emotional overbidding",
          "Bidders might collude to keep prices low",
          "Time-consuming process",
          "Winner's curse potential"
        ],
        realWorld: "Art auctions at Sotheby's and Christie's, antique sales, livestock markets, real estate auctions, charity fundraising events",
        howItWorks: [
          "Auctioneer announces the item and starting/reserve price",
          "Bidders raise hands, call out, or signal to place higher bids",
          "Each new bid must exceed the previous by a minimum increment",
          "Auctioneer calls 'going once, going twice' before finalizing",
          "Highest bidder wins and pays their exact bid amount",
          "If reserve price isn't met, item may be withdrawn"
        ],
        biddingTips: [
          "Set a maximum budget beforehand and stick to it",
          "Observe other bidders' behavior patterns",
          "Bid confidently but avoid emotional decisions",
          "Consider bidding in odd amounts to discourage others",
          "Wait for momentum to slow before entering"
        ],
        psychology: "Creates excitement and urgency. Bidders often get caught up in the competitive atmosphere, leading to higher final prices. The visibility of other bids can both encourage and intimidate participants.",
        optimalStrategy: "Bid your true valuation minus a small margin. Enter when momentum slows to avoid driving up prices unnecessarily."
      },
      color: "from-green-500 to-emerald-600",
      complexity: "Beginner",
      timeToComplete: "Variable (5-30 minutes)"
    },
    {
      id: "dutch",
      name: "Dutch Auction",
      icon: Timer,
      description: "Descending-price auction where price drops until someone accepts",
      details: {
        mechanism: "Price starts at a high level and gradually decreases at predetermined intervals or continuously until a bidder accepts the current price. The first bidder to accept wins immediately at that price.",
        advantages: [
          "Quick resolution - no prolonged bidding wars",
          "Efficient price discovery",
          "Eliminates strategic waiting games",
          "Good for perishable or time-sensitive items",
          "Reduces auction house costs"
        ],
        disadvantages: [
          "May not maximize seller revenue",
          "Requires good timing and market knowledge",
          "First-mover advantage can be unfair",
          "Bidders might wait too long and miss out",
          "Less excitement than ascending auctions"
        ],
        realWorld: "Dutch flower markets (Aalsmeer), IPO share offerings, Google AdWords auctions, perishable goods markets, treasury bill auctions",
        howItWorks: [
          "Auctioneer sets a high starting price above expected value",
          "Price decreases in predetermined increments",
          "Decrease intervals can be time-based or manual",
          "First bidder to signal acceptance wins immediately",
          "Winner pays the price at which they accepted",
          "No further bidding occurs after acceptance"
        ],
        biddingTips: [
          "Research market values thoroughly beforehand",
          "Calculate your maximum acceptable price",
          "Don't wait too long - others might jump in first",
          "Consider the decreasing rate when timing your bid",
          "Be ready to act quickly when price is right"
        ],
        psychology: "Creates tension through scarcity and time pressure. Bidders must balance getting a good price with the risk of losing the item to someone else.",
        optimalStrategy: "Accept when price reaches your valuation. Waiting longer risks losing to other bidders, but jumping too early means overpaying."
      },
      color: "from-blue-500 to-cyan-600",
      complexity: "Intermediate",
      timeToComplete: "Fast (1-10 minutes)"
    },
    {
      id: "sealed",
      name: "Sealed-bid Auction",
      icon: Lock,
      description: "Private simultaneous bidding where all bids are kept secret",
      details: {
        mechanism: "All bidders submit their bids simultaneously in sealed envelopes or through a secure system, without knowing what others have bid. Bids are opened together, and the highest bidder wins.",
        advantages: [
          "No bidding pressure or intimidation",
          "Prevents collusion between bidders",
          "Fair for all participants regardless of experience",
          "Efficient single-round process",
          "Good for large-scale procurement"
        ],
        disadvantages: [
          "High information uncertainty",
          "Risk of significant under or overbidding",
          "No opportunity to adjust based on competition",
          "Winner's curse is common",
          "Requires careful market research"
        ],
        realWorld: "Government contracts, construction project bids, online advertising auctions, procurement processes, military contracts",
        howItWorks: [
          "All bidders receive identical information packets",
          "Bidders prepare and submit sealed bids by deadline",
          "Bids are opened simultaneously in front of witnesses",
          "Highest bidder is declared winner",
          "Winner typically pays their full bid amount",
          "Process is usually documented for transparency"
        ],
        biddingTips: [
          "Research comparable transactions thoroughly",
          "Factor in winner's curse - bid below true valuation",
          "Consider number of competitors in your strategy",
          "Prepare detailed cost analysis",
          "Submit bid with safety margins"
        ],
        psychology: "Eliminates social pressure but increases analytical pressure. Bidders must make decisions based solely on their own analysis without external cues.",
        optimalStrategy: "Bid below your true valuation by an amount proportional to uncertainty and number of competitors. More competitors require larger discounts."
      },
      color: "from-purple-500 to-indigo-600",
      complexity: "Advanced",
      timeToComplete: "Extended preparation (days to weeks)"
    },
    {
      id: "vickrey",
      name: "Vickrey Auction",
      icon: Brain,
      description: "Second-price sealed auction encouraging truthful bidding",
      details: {
        mechanism: "A sealed-bid auction where the highest bidder wins but pays only the second-highest bid amount. This unique payment structure is designed to encourage bidders to bid their true valuation.",
        advantages: [
          "Encourages truthful bidding strategies",
          "Theoretically efficient allocation",
          "Reduces strategic manipulation",
          "Winner pays fair market price",
          "Eliminates winner's curse"
        ],
        disadvantages: [
          "Complex to understand for participants",
          "Trust issues with payment calculation",
          "Rare in practice due to complexity",
          "Potential for manipulation by auctioneers",
          "Difficult to verify second-highest bid"
        ],
        realWorld: "Google AdWords (modified version), some government spectrum auctions, academic research settings, philanthropic auctions, some online marketplaces",
        howItWorks: [
          "All bidders submit sealed bids simultaneously",
          "Auctioneer opens all bids privately",
          "Highest bidder is identified as winner",
          "Winner pays the second-highest bid amount",
          "All other bidders pay nothing",
          "Results are announced with payment details"
        ],
        biddingTips: [
          "Bid your true valuation - it's the optimal strategy",
          "Don't try to game the system by bidding low",
          "Don't bid more than your true value",
          "Focus on accurate valuation rather than strategy",
          "Trust the mechanism's incentive structure"
        ],
        psychology: "Removes strategic complexity, allowing bidders to focus on valuation rather than game theory. However, many bidders struggle to trust the mechanism initially.",
        optimalStrategy: "Always bid exactly your true valuation. Any other strategy is suboptimal in a true Vickrey auction."
      },
      color: "from-orange-500 to-red-600",
      complexity: "Expert",
      timeToComplete: "Medium (preparation + single round)"
    }
  ];

  const strategies = [
    {
      id: "greedy",
      name: "Greedy Strategy",
      icon: Zap,
      description: "Makes quick decisions based on immediate value without future planning",
      complexity: "Beginner",
      efficiency: 85,
      details: {
        concept: "A straightforward approach that evaluates each bidding opportunity independently and makes immediate decisions based on current information. It prioritizes speed and simplicity over optimization.",
        algorithm: "For each item: if (estimated_value > current_price + margin) then bid; else skip. No consideration of budget constraints or future opportunities.",
        strengths: [
          "Extremely fast execution and decision making",
          "Simple logic that's easy to understand and implement",
          "Excellent for time-sensitive auction environments",
          "Low computational requirements",
          "Works well when items are independent",
          "Good for single-item auctions"
        ],
        weaknesses: [
          "May overspend early and run out of budget",
          "Doesn't consider opportunity cost of future items",
          "Can lead to suboptimal budget allocation",
          "Vulnerable to strategic manipulation by opponents",
          "Ignores auction dynamics and competitor behavior",
          "Poor performance in multi-round scenarios"
        ],
        bestFor: "Single-item auctions, time-critical decisions, when speed matters more than optimization, auctions with independent items",
        realWorldUse: "Day trading algorithms, flash sales, emergency procurement, commodities trading",
        improvementTips: [
          "Set clear value thresholds before bidding",
          "Implement basic budget tracking",
          "Add simple competitor analysis",
          "Consider time remaining in auction"
        ]
      },
      color: "text-blue-600",
      winRate: "65%"
    },
    {
      id: "dynamic",
      name: "Dynamic Programming",
      icon: Calculator,
      description: "Optimal budget allocation considering all future scenarios and constraints",
      complexity: "Advanced",
      efficiency: 92,
      details: {
        concept: "Uses mathematical optimization to find the theoretically best bidding strategy by considering all possible future scenarios, budget constraints, and item combinations. Builds optimal solutions bottom-up.",
        algorithm: "Creates a table of optimal decisions for each state (remaining budget, remaining items). Works backward from final state to determine optimal action at each decision point.",
        strengths: [
          "Mathematically proven optimal solution",
          "Considers all future opportunities and constraints",
          "Maximizes expected value within budget limits",
          "Handles complex multi-item scenarios perfectly",
          "Adapts to changing auction conditions",
          "Excellent for long-term strategy"
        ],
        weaknesses: [
          "Computationally expensive for large problems",
          "Requires complete information about future items",
          "May be too slow for real-time auctions",
          "Complex to implement and debug",
          "Assumes perfect information and rational opponents",
          "Difficult to explain to stakeholders"
        ],
        bestFor: "Multi-item auctions with budget constraints, strategic procurement, long-term optimization scenarios, when computational resources are available",
        realWorldUse: "Government procurement systems, resource allocation in large corporations, investment portfolio optimization",
        improvementTips: [
          "Use approximation techniques for large problems",
          "Implement caching for repeated calculations",
          "Combine with heuristics for speed",
          "Add uncertainty modeling"
        ]
      },
      color: "text-green-600",
      winRate: "78%"
    },
    {
      id: "minimax",
      name: "Game Theory (Minimax)",
      icon: Target,
      description: "Strategic approach considering opponent behavior and counter-moves",
      complexity: "Expert",
      efficiency: 88,
      details: {
        concept: "Assumes all opponents are rational actors and uses game theory to make decisions that minimize maximum possible loss while maximizing minimum gain. Considers opponent responses to your actions.",
        algorithm: "For each possible action, evaluate all opponent responses and their counter-responses. Choose the action that gives the best worst-case outcome.",
        strengths: [
          "Accounts for intelligent opponent behavior",
          "Strong performance against skilled competitors",
          "Provides strategic depth and sophistication",
          "Robust against manipulation attempts",
          "Good for competitive environments",
          "Adapts to opponent strategies over time"
        ],
        weaknesses: [
          "Extremely complex calculations required",
          "Assumes all opponents are perfectly rational",
          "May be overly conservative in practice",
          "Requires extensive opponent modeling",
          "Computationally intensive",
          "Can miss opportunities due to conservative approach"
        ],
        bestFor: "Competitive auction environments, experienced opponents, high-stakes bidding, strategic markets with repeat players",
        realWorldUse: "Financial markets, spectrum auctions, strategic business acquisitions, professional sports drafts",
        improvementTips: [
          "Implement opponent learning algorithms",
          "Use statistical analysis of opponent behavior",
          "Balance conservatism with opportunity",
          "Add randomization to prevent exploitation"
        ]
      },
      color: "text-purple-600",
      winRate: "72%"
    },
    {
      id: "knapsack",
      name: "Knapsack Optimization",
      icon: DollarSign,
      description: "Value maximization within strict budget and capacity constraints",
      complexity: "Intermediate",
      efficiency: 90,
      details: {
        concept: "Treats the auction as a classic knapsack problem, where the goal is to select the combination of items that provides maximum total value while staying within budget and other constraints.",
        algorithm: "Uses dynamic programming on a value-weight matrix where 'weight' is the bid amount and 'value' is the expected utility. Finds optimal item combinations within budget.",
        strengths: [
          "Excellent budget management and constraint handling",
          "Optimizes for maximum value extraction",
          "Works well with multiple constraint types",
          "Proven mathematical foundation",
          "Good balance of efficiency and effectiveness",
          "Handles capacity limits effectively"
        ],
        weaknesses: [
          "Requires accurate value estimates for all items",
          "May miss strategic bidding opportunities",
          "Static approach that doesn't adapt during auction",
          "Assumes independence between item values",
          "Doesn't account for opponent behavior",
          "Can be suboptimal in dynamic environments"
        ],
        bestFor: "Fixed budget scenarios, value-focused bidding strategies, procurement with multiple constraints, bulk purchasing decisions",
        realWorldUse: "Corporate procurement departments, investment fund allocation, resource distribution, supply chain optimization",
        improvementTips: [
          "Improve value estimation techniques",
          "Add dynamic price adjustment",
          "Include risk assessment in values",
          "Consider item synergies and combinations"
        ]
      },
      color: "text-orange-600",
      winRate: "70%"
    }
  ];

  const selectedAuctionData = auctionTypes.find(a => a.id === selectedAuction);
  const selectedStrategyData = strategies.find(s => s.id === selectedStrategy);

  return (
    <div className="space-y-6">
      <Card className="bg-white/90 backdrop-blur-lg border border-white/20 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-blue-600" />
            <span>Complete Auction & Strategy Guide</span>
          </CardTitle>
          <CardDescription>
            Master auction mechanisms and AI bidding strategies with comprehensive explanations, real-world examples, and practical tips
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="auctions" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 bg-white/80 backdrop-blur-sm">
          <TabsTrigger value="auctions" className="flex items-center space-x-2">
            <Gavel className="w-4 h-4" />
            <span>Auction Mechanisms</span>
          </TabsTrigger>
          <TabsTrigger value="strategies" className="flex items-center space-x-2">
            <Brain className="w-4 h-4" />
            <span>AI Bidding Strategies</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="auctions" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Auction Selection */}
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Auction Types</CardTitle>
                <CardDescription>Select an auction mechanism to explore</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {auctionTypes.map((auction) => {
                  const IconComponent = auction.icon;
                  return (
                    <Button
                      key={auction.id}
                      variant={selectedAuction === auction.id ? "default" : "outline"}
                      className="w-full justify-start h-auto p-3"
                      onClick={() => setSelectedAuction(auction.id)}
                    >
                      <div className="flex items-center space-x-3 text-left">
                        <div className={`w-8 h-8 bg-gradient-to-br ${auction.color} rounded-lg flex items-center justify-center`}>
                          <IconComponent className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-sm">{auction.name}</div>
                          <div className="text-xs text-gray-600 mb-1">{auction.description}</div>
                          <div className="flex items-center justify-between">
                            <Badge variant="outline" className="text-xs">{auction.complexity}</Badge>
                            <span className="text-xs text-gray-500">{auction.timeToComplete}</span>
                          </div>
                        </div>
                      </div>
                    </Button>
                  );
                })}
              </CardContent>
            </Card>

            {/* Auction Details */}
            <div className="lg:col-span-2">
              {selectedAuctionData && (
                <Card className="bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <selectedAuctionData.icon className="w-5 h-5" />
                      <span>{selectedAuctionData.name}</span>
                      <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs">
                        {selectedAuctionData.complexity}
                      </Badge>
                    </CardTitle>
                    <CardDescription>{selectedAuctionData.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Mechanism Overview */}
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center space-x-2">
                        <Info className="w-4 h-4 text-blue-500" />
                        <span>How It Works</span>
                      </h4>
                      <p className="text-sm text-gray-700 mb-4 leading-relaxed">{selectedAuctionData.details.mechanism}</p>
                      <div className="space-y-2">
                        {selectedAuctionData.details.howItWorks.map((step, index) => (
                          <div key={index} className="flex items-start space-x-3 p-2 bg-blue-50/50 rounded-lg">
                            <Badge variant="outline" className="w-6 h-6 rounded-full flex items-center justify-center p-0 text-xs bg-blue-100">
                              {index + 1}
                            </Badge>
                            <span className="text-sm text-gray-700 flex-1">{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    {/* Advantages and Disadvantages */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center space-x-2 text-green-600">
                          <CheckCircle className="w-4 h-4" />
                          <span>Advantages</span>
                        </h4>
                        <ul className="space-y-2">
                          {selectedAuctionData.details.advantages.map((advantage, index) => (
                            <li key={index} className="text-sm text-gray-700 flex items-start space-x-2">
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span>{advantage}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3 flex items-center space-x-2 text-red-600">
                          <AlertCircle className="w-4 h-4" />
                          <span>Disadvantages</span>
                        </h4>
                        <ul className="space-y-2">
                          {selectedAuctionData.details.disadvantages.map((disadvantage, index) => (
                            <li key={index} className="text-sm text-gray-700 flex items-start space-x-2">
                              <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span>{disadvantage}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <Separator />

                    {/* Bidding Tips */}
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center space-x-2 text-purple-600">
                        <Lightbulb className="w-4 h-4" />
                        <span>Strategic Bidding Tips</span>
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {selectedAuctionData.details.biddingTips.map((tip, index) => (
                          <div key={index} className="flex items-start space-x-2 p-3 bg-purple-50/50 rounded-lg">
                            <Star className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{tip}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    {/* Psychology and Strategy */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center space-x-2 text-orange-600">
                          <Brain className="w-4 h-4" />
                          <span>Psychology</span>
                        </h4>
                        <p className="text-sm text-gray-700 leading-relaxed">{selectedAuctionData.details.psychology}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3 flex items-center space-x-2 text-indigo-600">
                          <Target className="w-4 h-4" />
                          <span>Optimal Strategy</span>
                        </h4>
                        <p className="text-sm text-gray-700 leading-relaxed">{selectedAuctionData.details.optimalStrategy}</p>
                      </div>
                    </div>

                    <Separator />

                    {/* Real World Examples */}
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center space-x-2 text-yellow-600">
                        <Award className="w-4 h-4" />
                        <span>Real-World Applications</span>
                      </h4>
                      <p className="text-sm text-gray-700 leading-relaxed bg-yellow-50/50 p-3 rounded-lg">{selectedAuctionData.details.realWorld}</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="strategies" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Strategy Selection */}
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">AI Strategies</CardTitle>
                <CardDescription>Select a bidding strategy to explore</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {strategies.map((strategy) => {
                  const IconComponent = strategy.icon;
                  return (
                    <Button
                      key={strategy.id}
                      variant={selectedStrategy === strategy.id ? "default" : "outline"}
                      className="w-full justify-start h-auto p-3"
                      onClick={() => setSelectedStrategy(strategy.id)}
                    >
                      <div className="flex items-center space-x-3 text-left w-full">
                        <IconComponent className={`w-5 h-5 ${strategy.color}`} />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <div className="font-medium text-sm">{strategy.name}</div>
                            <Badge variant="outline" className="text-xs">{strategy.efficiency}%</Badge>
                          </div>
                          <div className="text-xs text-gray-600 mb-2">{strategy.description}</div>
                          <div className="flex items-center justify-between">
                            <Badge className="text-xs">{strategy.complexity}</Badge>
                            <span className="text-xs text-green-600 font-medium">Win: {strategy.winRate}</span>
                          </div>
                          <Progress value={strategy.efficiency} className="h-1 mt-2" />
                        </div>
                      </div>
                    </Button>
                  );
                })}
              </CardContent>
            </Card>

            {/* Strategy Details */}
            <div className="lg:col-span-2">
              {selectedStrategyData && (
                <Card className="bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <selectedStrategyData.icon className={`w-5 h-5 ${selectedStrategyData.color}`} />
                        <span>{selectedStrategyData.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{selectedStrategyData.complexity}</Badge>
                        <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                          {selectedStrategyData.efficiency}% Efficiency
                        </Badge>
                        <Badge className="bg-green-500 text-white">
                          {selectedStrategyData.winRate} Win Rate
                        </Badge>
                      </div>
                    </CardTitle>
                    <CardDescription>{selectedStrategyData.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Core Concept */}
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center space-x-2">
                        <Brain className="w-4 h-4 text-purple-500" />
                        <span>Core Concept</span>
                      </h4>
                      <p className="text-sm text-gray-700 leading-relaxed">{selectedStrategyData.details.concept}</p>
                    </div>

                    <Separator />

                    {/* Algorithm */}
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center space-x-2">
                        <Calculator className="w-4 h-4 text-blue-500" />
                        <span>Algorithm Logic</span>
                      </h4>
                      <div className="bg-gray-100 rounded-lg p-4">
                        <code className="text-sm text-gray-800 leading-relaxed">{selectedStrategyData.details.algorithm}</code>
                      </div>
                    </div>

                    <Separator />

                    {/* Strengths and Weaknesses */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center space-x-2 text-green-600">
                          <CheckCircle className="w-4 h-4" />
                          <span>Strengths</span>
                        </h4>
                        <ul className="space-y-2">
                          {selectedStrategyData.details.strengths.map((strength, index) => (
                            <li key={index} className="text-sm text-gray-700 flex items-start space-x-2">
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span>{strength}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3 flex items-center space-x-2 text-red-600">
                          <AlertCircle className="w-4 h-4" />
                          <span>Limitations</span>
                        </h4>
                        <ul className="space-y-2">
                          {selectedStrategyData.details.weaknesses.map((weakness, index) => (
                            <li key={index} className="text-sm text-gray-700 flex items-start space-x-2">
                              <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span>{weakness}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <Separator />

                    {/* Best Use Cases */}
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center space-x-2 text-orange-600">
                        <Target className="w-4 h-4" />
                        <span>Optimal Use Cases</span>
                      </h4>
                      <p className="text-sm text-gray-700 leading-relaxed bg-orange-50/50 p-3 rounded-lg">{selectedStrategyData.details.bestFor}</p>
                    </div>

                    <Separator />

                    {/* Real World Applications and Improvements */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center space-x-2 text-indigo-600">
                          <Award className="w-4 h-4" />
                          <span>Real-World Use</span>
                        </h4>
                        <p className="text-sm text-gray-700 leading-relaxed">{selectedStrategyData.details.realWorldUse}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3 flex items-center space-x-2 text-purple-600">
                          <TrendingUp className="w-4 h-4" />
                          <span>Improvement Tips</span>
                        </h4>
                        <ul className="space-y-1">
                          {selectedStrategyData.details.improvementTips.map((tip, index) => (
                            <li key={index} className="text-sm text-gray-700 flex items-start space-x-2">
                              <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AlgorithmEducation;
