
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  PlayCircle, 
  RotateCcw, 
  Timer, 
  TrendingUp,
  Brain,
  Trophy,
  Calculator,
  Zap,
  DollarSign,
  Target,
  Users,
  FileText
} from "lucide-react";
import { toast } from "sonner";

interface ScenarioBidder {
  id: number;
  name: string;
  strategy: string;
  budget: number;
  currentBid: number;
  totalSpent: number;
  profit: number;
  itemsWon: number;
  efficiency: number;
  color: string;
}

interface ScenarioItem {
  id: number;
  name: string;
  estimatedValue: number;
  startingPrice: number;
  currentPrice: number;
  winner?: string;
  finalPrice?: number;
}

interface Scenario {
  id: string;
  title: string;
  description: string;
  question: string;
  type: 'multi-item' | 'single-item' | 'budget-limited' | 'strategic';
  strategies: string[];
  items: ScenarioItem[];
  budgetLimit?: number;
}

const AuctionScenarios = () => {
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [bidders, setBidders] = useState<ScenarioBidder[]>([]);
  const [items, setItems] = useState<ScenarioItem[]>([]);
  const [auctionProgress, setAuctionProgress] = useState(0);
  const [results, setResults] = useState<any>(null);

  const scenarios: Scenario[] = [
    {
      id: "greedy-vs-dp",
      title: "Greedy vs Dynamic Programming",
      description: "Multi-item auction with budget constraints",
      question: "Who earns more profit when bidding on multiple items?",
      type: "multi-item",
      strategies: ["greedy", "dynamic"],
      items: [
        { id: 1, name: "Art Piece A", estimatedValue: 400, startingPrice: 100, currentPrice: 100 },
        { id: 2, name: "Art Piece B", estimatedValue: 600, startingPrice: 150, currentPrice: 150 },
        { id: 3, name: "Art Piece C", estimatedValue: 300, startingPrice: 80, currentPrice: 80 }
      ],
      budgetLimit: 800
    },
    {
      id: "vickrey-vs-sealed",
      title: "Vickrey vs Sealed-Bid",
      description: "Truth-telling mechanism comparison",
      question: "Does truth-telling pay off in Vickrey auctions?",
      type: "single-item",
      strategies: ["minimax", "knapsack"],
      items: [
        { id: 1, name: "Premium Collectible", estimatedValue: 750, startingPrice: 200, currentPrice: 200 }
      ]
    },
    {
      id: "budget-limited",
      title: "Budget-Limited Scenario",
      description: "Low budget vs high-value items",
      question: "How do bidders prioritize with limited budgets?",
      type: "budget-limited",
      strategies: ["greedy", "knapsack"],
      items: [
        { id: 1, name: "High-Value Item", estimatedValue: 1000, startingPrice: 300, currentPrice: 300 },
        { id: 2, name: "Medium-Value Item", estimatedValue: 500, startingPrice: 150, currentPrice: 150 }
      ],
      budgetLimit: 400
    },
    {
      id: "minimax-battle",
      title: "Multiple Minimax Bidders",
      description: "Strategic tension between game theory agents",
      question: "Who wins under strategic tension?",
      type: "strategic",
      strategies: ["minimax", "minimax"],
      items: [
        { id: 1, name: "Strategic Asset", estimatedValue: 800, startingPrice: 250, currentPrice: 250 }
      ]
    }
  ];

  const initializeScenario = (scenario: Scenario) => {
    const newBidders: ScenarioBidder[] = scenario.strategies.map((strategy, index) => ({
      id: index + 1,
      name: `${strategy.charAt(0).toUpperCase() + strategy.slice(1)} Agent ${index + 1}`,
      strategy,
      budget: scenario.budgetLimit || 1000,
      currentBid: 0,
      totalSpent: 0,
      profit: 0,
      itemsWon: 0,
      efficiency: 0,
      color: index === 0 ? "bg-blue-500" : "bg-green-500"
    }));

    setBidders(newBidders);
    setItems([...scenario.items]);
    setTimeRemaining(30);
    setAuctionProgress(0);
    setResults(null);
  };

  useEffect(() => {
    if (selectedScenario) {
      initializeScenario(selectedScenario);
    }
  }, [selectedScenario]);

  useEffect(() => {
    if (!isRunning || timeRemaining <= 0) return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          setIsRunning(false);
          finalizeAuction();
          return 0;
        }
        return prev - 1;
      });

      simulateScenarioBidding();
      setAuctionProgress(((30 - timeRemaining) / 30) * 100);
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, timeRemaining]);

  const simulateScenarioBidding = () => {
    if (!selectedScenario) return;

    setBidders(prev => prev.map(bidder => {
      if (bidder.totalSpent >= bidder.budget) return bidder;

      let bidAmount = 0;
      const remainingBudget = bidder.budget - bidder.totalSpent;
      const timeRatio = timeRemaining / 30;

      // Find highest value item within budget
      const affordableItems = items.filter(item => 
        item.currentPrice <= remainingBudget && !item.winner
      );

      if (affordableItems.length === 0) return bidder;

      const targetItem = affordableItems.reduce((best, current) => 
        current.estimatedValue > best.estimatedValue ? current : best
      );

      switch (bidder.strategy) {
        case "greedy":
          if (targetItem.estimatedValue > targetItem.currentPrice * 1.3) {
            bidAmount = Math.min(targetItem.currentPrice + 50, remainingBudget);
          }
          break;
        case "dynamic":
          const optimalBid = targetItem.estimatedValue * (0.7 - timeRatio * 0.2);
          if (targetItem.currentPrice < optimalBid) {
            bidAmount = Math.min(optimalBid, remainingBudget);
          }
          break;
        case "minimax":
          const competitorBids = prev.filter(b => b.id !== bidder.id);
          const maxCompetitorBid = Math.max(...competitorBids.map(b => b.currentBid), 0);
          bidAmount = Math.min(maxCompetitorBid + 75, remainingBudget);
          break;
        case "knapsack":
          const valueRatio = targetItem.estimatedValue / targetItem.currentPrice;
          if (valueRatio > 1.5) {
            bidAmount = Math.min(targetItem.estimatedValue * 0.8, remainingBudget);
          }
          break;
      }

      if (bidAmount > bidder.currentBid && bidAmount <= remainingBudget) {
        // Update item price
        setItems(prevItems => prevItems.map(item => 
          item.id === targetItem.id ? { ...item, currentPrice: bidAmount } : item
        ));

        const efficiency = ((targetItem.estimatedValue - bidAmount) / targetItem.estimatedValue) * 100;
        return { 
          ...bidder, 
          currentBid: bidAmount,
          efficiency: Math.max(0, efficiency)
        };
      }

      return bidder;
    }));
  };

  const finalizeAuction = () => {
    const finalResults: any = {
      totalProfit: {},
      itemsWon: {},
      efficiency: {},
      spending: {}
    };

    // Determine winners for each item
    const updatedItems = items.map(item => {
      const highestBidder = bidders.reduce((prev, current) => 
        current.currentBid > prev.currentBid ? current : prev
      );
      
      return {
        ...item,
        winner: highestBidder.name,
        finalPrice: highestBidder.currentBid
      };
    });

    // Calculate final profits and statistics
    const updatedBidders = bidders.map(bidder => {
      const wonItems = updatedItems.filter(item => item.winner === bidder.name);
      const totalValue = wonItems.reduce((sum, item) => sum + item.estimatedValue, 0);
      const totalSpent = wonItems.reduce((sum, item) => sum + (item.finalPrice || 0), 0);
      const profit = totalValue - totalSpent;

      finalResults.totalProfit[bidder.strategy] = profit;
      finalResults.itemsWon[bidder.strategy] = wonItems.length;
      finalResults.efficiency[bidder.strategy] = bidder.efficiency;
      finalResults.spending[bidder.strategy] = totalSpent;

      return {
        ...bidder,
        totalSpent,
        profit,
        itemsWon: wonItems.length
      };
    });

    setBidders(updatedBidders);
    setItems(updatedItems);
    setResults(finalResults);
    
    const winner = updatedBidders.reduce((prev, current) => 
      current.profit > prev.profit ? current : prev
    );
    
    toast.success(`Scenario complete! Winner: ${winner.name} with $${winner.profit} profit`);
  };

  const startScenario = () => {
    if (!selectedScenario) {
      toast.error("Please select a scenario first!");
      return;
    }
    setIsRunning(true);
    initializeScenario(selectedScenario);
    toast.success(`${selectedScenario.title} scenario started!`);
  };

  const resetScenario = () => {
    setIsRunning(false);
    if (selectedScenario) {
      initializeScenario(selectedScenario);
    }
    toast.info("Scenario reset");
  };

  return (
    <div className="space-y-6">
      {/* Scenario Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="w-5 h-5" />
            <span>Auction Scenarios</span>
          </CardTitle>
          <CardDescription>
            Test specific bidding strategies in controlled scenarios
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {scenarios.map((scenario) => (
              <Card 
                key={scenario.id} 
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedScenario?.id === scenario.id ? 'border-blue-500 bg-blue-50' : ''
                }`}
                onClick={() => setSelectedScenario(scenario)}
              >
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">{scenario.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{scenario.description}</p>
                  <p className="text-sm font-medium text-blue-600 mb-3">{scenario.question}</p>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{scenario.type}</Badge>
                    <div className="flex space-x-1">
                      {scenario.strategies.map((strategy, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {strategy}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Scenario Simulation */}
      {selectedScenario && (
        <>
          {/* Items Display */}
          <Card>
            <CardHeader>
              <CardTitle>Auction Items</CardTitle>
              <CardDescription>Items available in this scenario</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {items.map((item) => (
                  <div key={item.id} className="border rounded-lg p-4">
                    <h4 className="font-medium">{item.name}</h4>
                    <div className="mt-2 space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Est. Value:</span>
                        <span className="font-medium">${item.estimatedValue}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Current Price:</span>
                        <span className="font-medium">${item.currentPrice}</span>
                      </div>
                      {item.winner && (
                        <div className="flex justify-between text-green-600">
                          <span>Winner:</span>
                          <span className="font-medium">{item.winner}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Bidders Display */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {bidders.map((bidder) => (
              <Card key={bidder.id} className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className={`w-4 h-4 rounded-full ${bidder.color}`}></div>
                      <span>{bidder.name}</span>
                    </div>
                    {bidder.profit > 0 && <Trophy className="w-5 h-5 text-green-600" />}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-blue-600">
                        ${bidder.currentBid}
                      </div>
                      <p className="text-xs text-gray-600">Current Bid</p>
                    </div>
                    <div>
                      <div className={`text-2xl font-bold ${bidder.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        ${bidder.profit}
                      </div>
                      <p className="text-xs text-gray-600">Profit</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Budget Used:</span>
                      <span>{((bidder.totalSpent / bidder.budget) * 100).toFixed(1)}%</span>
                    </div>
                    <Progress value={(bidder.totalSpent / bidder.budget) * 100} className="h-2" />
                  </div>

                  <Separator />

                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div className="text-center">
                      <p className="text-gray-600">Items Won</p>
                      <p className="font-semibold">{bidder.itemsWon}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-gray-600">Efficiency</p>
                      <p className="font-semibold">{bidder.efficiency.toFixed(1)}%</p>
                    </div>
                    <div className="text-center">
                      <p className="text-gray-600">Spent</p>
                      <p className="font-semibold">${bidder.totalSpent}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Control Panel */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center space-y-4">
                <div className="text-center">
                  <h3 className="font-semibold text-lg">{selectedScenario.title}</h3>
                  <p className="text-gray-600">{selectedScenario.question}</p>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Timer className="w-4 h-4" />
                    <span className="font-mono text-lg">
                      {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
                    </span>
                  </div>
                  <Progress value={auctionProgress} className="w-32 h-2" />
                </div>

                <div className="flex space-x-3">
                  {!isRunning ? (
                    <Button onClick={startScenario} className="bg-green-600 hover:bg-green-700">
                      <PlayCircle className="w-4 h-4 mr-2" />
                      Start Scenario
                    </Button>
                  ) : (
                    <Button disabled className="bg-gray-400">
                      <Timer className="w-4 h-4 mr-2" />
                      Running...
                    </Button>
                  )}
                  <Button onClick={resetScenario} variant="outline">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset
                  </Button>
                </div>

                {/* Results Summary */}
                {results && (
                  <div className="w-full max-w-2xl bg-gray-50 rounded-lg p-6 mt-6">
                    <h3 className="font-semibold text-lg mb-4 flex items-center">
                      <Trophy className="w-5 h-5 mr-2 text-green-600" />
                      Scenario Results
                    </h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      {Object.entries(results.totalProfit).map(([strategy, profit]) => (
                        <div key={strategy} className="flex justify-between">
                          <span className="capitalize">{strategy} Profit:</span>
                          <span className={`font-medium ${profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            ${profit}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default AuctionScenarios;
