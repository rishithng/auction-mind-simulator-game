
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
  Clock
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
        mechanism: "Bidders can see all bids and compete by placing higher bids until no one is willing to bid higher.",
        advantages: ["Transparent process", "Maximizes seller revenue", "Simple to understand"],
        disadvantages: ["Can intimidate smaller bidders", "May lead to overbidding"],
        realWorld: "Art auctions, antique sales, livestock markets",
        howItWorks: [
          "Auctioneer starts with a reserve price",
          "Bidders raise their hands or call out higher bids",
          "Highest bidder wins when no one bids higher",
          "Winner pays their bid amount"
        ]
      },
      color: "from-green-500 to-emerald-600"
    },
    {
      id: "dutch",
      name: "Dutch Auction",
      icon: Timer,
      description: "Descending-price auction where price drops until someone bids",
      details: {
        mechanism: "Price starts high and gradually decreases until a bidder accepts the current price.",
        advantages: ["Quick resolution", "First-come advantage", "No bidding wars"],
        disadvantages: ["May not maximize revenue", "Requires good timing"],
        realWorld: "Flower markets in Netherlands, IPO shares, perishable goods",
        howItWorks: [
          "Auctioneer starts with a high price",
          "Price decreases at regular intervals",
          "First bidder to accept wins immediately",
          "Winner pays the accepted price"
        ]
      },
      color: "from-blue-500 to-cyan-600"
    },
    {
      id: "sealed",
      name: "Sealed-bid Auction",
      icon: Lock,
      description: "Private simultaneous bidding where bids are kept secret",
      details: {
        mechanism: "All bidders submit sealed bids simultaneously without knowing others' bids.",
        advantages: ["No bidding pressure", "Strategic complexity", "Fair for all participants"],
        disadvantages: ["Information uncertainty", "May underbid"],
        realWorld: "Government contracts, construction bids, online advertising",
        howItWorks: [
          "All bidders submit bids in sealed envelopes",
          "Bids are opened simultaneously",
          "Highest bidder wins",
          "Winner pays their bid amount (first-price)"
        ]
      },
      color: "from-purple-500 to-indigo-600"
    },
    {
      id: "vickrey",
      name: "Vickrey Auction",
      icon: Brain,
      description: "Second-price sealed auction with strategic truth-telling",
      details: {
        mechanism: "Sealed-bid auction where highest bidder wins but pays the second-highest bid.",
        advantages: ["Encourages truthful bidding", "Theoretically optimal", "Reduces strategic manipulation"],
        disadvantages: ["Complex to understand", "Trust issues with payment"],
        realWorld: "Online advertising (modified versions), academic research, some government auctions",
        howItWorks: [
          "All bidders submit sealed bids",
          "Highest bidder wins the auction",
          "Winner pays the second-highest bid amount",
          "Encourages bidding true valuation"
        ]
      },
      color: "from-orange-500 to-red-600"
    }
  ];

  const strategies = [
    {
      id: "greedy",
      name: "Greedy Strategy",
      icon: Zap,
      description: "Makes quick decisions based on immediate value",
      complexity: "Beginner",
      efficiency: 85,
      details: {
        concept: "Always chooses the option that looks best right now, without considering future consequences.",
        algorithm: "If (item_value > current_price) then bid, else skip",
        strengths: ["Fast execution", "Simple logic", "Good for time-sensitive auctions"],
        weaknesses: ["May overspend early", "Doesn't consider future items", "Suboptimal budget allocation"],
        bestFor: "Quick auctions, single-item bidding, when speed matters more than optimization"
      },
      color: "text-blue-600"
    },
    {
      id: "dynamic",
      name: "Dynamic Programming",
      icon: Calculator,
      description: "Optimal budget allocation considering all future items",
      complexity: "Advanced",
      efficiency: 92,
      details: {
        concept: "Calculates the optimal bidding strategy by considering all possible future scenarios and outcomes.",
        algorithm: "Builds a table of optimal decisions for each budget state and remaining items",
        strengths: ["Mathematically optimal", "Considers future items", "Maximizes expected value"],
        weaknesses: ["Computationally expensive", "Requires complete information", "May be slow"],
        bestFor: "Multi-item auctions, budget constraints, when optimization is critical"
      },
      color: "text-green-600"
    },
    {
      id: "minimax",
      name: "Game Theory (Minimax)",
      icon: Target,
      description: "Considers opponent strategies and counter-moves",
      complexity: "Expert",
      efficiency: 88,
      details: {
        concept: "Assumes opponents are rational and tries to minimize the maximum loss while maximizing minimum gain.",
        algorithm: "Evaluates opponent responses and chooses moves that minimize worst-case outcomes",
        strengths: ["Opponent-aware", "Strategic depth", "Good against skilled opponents"],
        weaknesses: ["Complex calculations", "Assumes rational opponents", "May be overly conservative"],
        bestFor: "Competitive environments, experienced opponents, strategic auctions"
      },
      color: "text-purple-600"
    },
    {
      id: "knapsack",
      name: "Knapsack Optimization",
      icon: DollarSign,
      description: "Maximizes value within budget constraints",
      complexity: "Intermediate",
      efficiency: 90,
      details: {
        concept: "Treats auction as a knapsack problem, selecting items that maximize total value within budget.",
        algorithm: "Uses dynamic programming to find optimal combination of items within budget constraint",
        strengths: ["Budget-aware", "Value optimization", "Handles constraints well"],
        weaknesses: ["Requires value estimates", "May miss strategic opportunities", "Static approach"],
        bestFor: "Fixed budgets, value-focused bidding, multiple similar items"
      },
      color: "text-orange-600"
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
            <span>Auction Theory & AI Strategies</span>
          </CardTitle>
          <CardDescription>
            Learn about different auction mechanisms and AI bidding strategies with interactive examples
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="auctions" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 bg-white/80 backdrop-blur-sm">
          <TabsTrigger value="auctions" className="flex items-center space-x-2">
            <Gavel className="w-4 h-4" />
            <span>Auction Types</span>
          </TabsTrigger>
          <TabsTrigger value="strategies" className="flex items-center space-x-2">
            <Brain className="w-4 h-4" />
            <span>AI Strategies</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="auctions" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Auction Selection */}
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Auction Mechanisms</CardTitle>
                <CardDescription>Select an auction type to learn more</CardDescription>
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
                        <div>
                          <div className="font-medium text-sm">{auction.name}</div>
                          <div className="text-xs text-gray-600">{auction.description}</div>
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
                    </CardTitle>
                    <CardDescription>{selectedAuctionData.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center space-x-2">
                        <Info className="w-4 h-4 text-blue-500" />
                        <span>How it Works</span>
                      </h4>
                      <p className="text-sm text-gray-700 mb-3">{selectedAuctionData.details.mechanism}</p>
                      <div className="space-y-2">
                        {selectedAuctionData.details.howItWorks.map((step, index) => (
                          <div key={index} className="flex items-start space-x-2">
                            <Badge variant="outline" className="w-6 h-6 rounded-full flex items-center justify-center p-0 text-xs">
                              {index + 1}
                            </Badge>
                            <span className="text-sm text-gray-700">{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center space-x-2 text-green-600">
                          <CheckCircle className="w-4 h-4" />
                          <span>Advantages</span>
                        </h4>
                        <ul className="space-y-1">
                          {selectedAuctionData.details.advantages.map((advantage, index) => (
                            <li key={index} className="text-sm text-gray-700 flex items-center space-x-2">
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                              <span>{advantage}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2 flex items-center space-x-2 text-orange-600">
                          <Eye className="w-4 h-4" />
                          <span>Disadvantages</span>
                        </h4>
                        <ul className="space-y-1">
                          {selectedAuctionData.details.disadvantages.map((disadvantage, index) => (
                            <li key={index} className="text-sm text-gray-700 flex items-center space-x-2">
                              <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                              <span>{disadvantage}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h4 className="font-semibold mb-2 flex items-center space-x-2">
                        <Lightbulb className="w-4 h-4 text-yellow-500" />
                        <span>Real-World Examples</span>
                      </h4>
                      <p className="text-sm text-gray-700">{selectedAuctionData.details.realWorld}</p>
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
                <CardDescription>Select a strategy to learn more</CardDescription>
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
                          <div className="flex items-center justify-between">
                            <div className="font-medium text-sm">{strategy.name}</div>
                            <Badge variant="outline" className="text-xs">{strategy.efficiency}%</Badge>
                          </div>
                          <div className="text-xs text-gray-600">{strategy.description}</div>
                          <Progress value={strategy.efficiency} className="h-1 mt-1" />
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
                      </div>
                    </CardTitle>
                    <CardDescription>{selectedStrategyData.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center space-x-2">
                        <Brain className="w-4 h-4 text-purple-500" />
                        <span>Core Concept</span>
                      </h4>
                      <p className="text-sm text-gray-700">{selectedStrategyData.details.concept}</p>
                    </div>

                    <Separator />

                    <div>
                      <h4 className="font-semibold mb-2 flex items-center space-x-2">
                        <Calculator className="w-4 h-4 text-blue-500" />
                        <span>Algorithm</span>
                      </h4>
                      <div className="bg-gray-100 rounded-lg p-3">
                        <code className="text-sm text-gray-800">{selectedStrategyData.details.algorithm}</code>
                      </div>
                    </div>

                    <Separator />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center space-x-2 text-green-600">
                          <CheckCircle className="w-4 h-4" />
                          <span>Strengths</span>
                        </h4>
                        <ul className="space-y-1">
                          {selectedStrategyData.details.strengths.map((strength, index) => (
                            <li key={index} className="text-sm text-gray-700 flex items-center space-x-2">
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                              <span>{strength}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2 flex items-center space-x-2 text-red-600">
                          <Eye className="w-4 h-4" />
                          <span>Weaknesses</span>
                        </h4>
                        <ul className="space-y-1">
                          {selectedStrategyData.details.weaknesses.map((weakness, index) => (
                            <li key={index} className="text-sm text-gray-700 flex items-center space-x-2">
                              <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                              <span>{weakness}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h4 className="font-semibold mb-2 flex items-center space-x-2">
                        <Target className="w-4 h-4 text-orange-500" />
                        <span>Best Used For</span>
                      </h4>
                      <p className="text-sm text-gray-700">{selectedStrategyData.details.bestFor}</p>
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
