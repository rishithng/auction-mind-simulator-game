
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  PlayCircle, 
  RotateCcw, 
  Timer, 
  TrendingUp,
  Brain,
  Trophy,
  Calculator,
  Zap
} from "lucide-react";
import { toast } from "sonner";

interface ComparisonBidder {
  id: number;
  name: string;
  strategy: string;
  budget: number;
  currentBid: number;
  isActive: boolean;
  color: string;
  profit: number;
  won: boolean;
  efficiency: number;
}

interface AuctionItem {
  id: number;
  name: string;
  description: string;
  startingPrice: number;
  estimatedValue: number;
  category: string;
}

const StrategyComparisonSimulator = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentPrice, setCurrentPrice] = useState(100);
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [selectedItem, setSelectedItem] = useState<AuctionItem | null>(null);
  const [auctionProgress, setAuctionProgress] = useState(0);
  const [winner, setWinner] = useState<ComparisonBidder | null>(null);
  const [strategy1, setStrategy1] = useState("greedy");
  const [strategy2, setStrategy2] = useState("dynamic");

  const [bidders, setBidders] = useState<ComparisonBidder[]>([
    { id: 1, name: "Strategy A", strategy: "greedy", budget: 1000, currentBid: 0, isActive: true, color: "bg-blue-500", profit: 0, won: false, efficiency: 0 },
    { id: 2, name: "Strategy B", strategy: "dynamic", budget: 1000, currentBid: 0, isActive: true, color: "bg-green-500", profit: 0, won: false, efficiency: 0 }
  ]);

  const auctionItems: AuctionItem[] = [
    {
      id: 1,
      name: "Vintage Art Piece",
      description: "19th century oil painting",
      startingPrice: 100,
      estimatedValue: 750,
      category: "Art"
    },
    {
      id: 2,
      name: "Rare Book Collection",
      description: "First edition classics",
      startingPrice: 200,
      estimatedValue: 1200,
      category: "Books"
    },
    {
      id: 3,
      name: "Antique Watch",
      description: "Swiss mechanical timepiece",
      startingPrice: 300,
      estimatedValue: 900,
      category: "Jewelry"
    }
  ];

  const strategyDescriptions = {
    greedy: "Bids aggressively early, targeting quick wins",
    dynamic: "Uses optimal timing based on remaining time",
    minimax: "Analyzes opponents and counters their moves",
    knapsack: "Maximizes value within budget constraints"
  };

  useEffect(() => {
    setBidders(prev => prev.map((bidder, index) => ({
      ...bidder,
      strategy: index === 0 ? strategy1 : strategy2,
      name: `Strategy ${index === 0 ? 'A' : 'B'} (${index === 0 ? strategy1 : strategy2})`
    })));
  }, [strategy1, strategy2]);

  useEffect(() => {
    if (selectedItem) {
      setCurrentPrice(selectedItem.startingPrice);
    }
  }, [selectedItem]);

  useEffect(() => {
    if (!isRunning || timeRemaining <= 0) return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          setIsRunning(false);
          determineWinner();
          return 0;
        }
        return prev - 1;
      });

      simulateStrategyBidding();
      setAuctionProgress(((30 - timeRemaining) / 30) * 100);
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, timeRemaining]);

  const simulateStrategyBidding = () => {
    setBidders(prev => prev.map(bidder => {
      if (!bidder.isActive) return bidder;

      let newBid = bidder.currentBid;
      const remainingBudget = bidder.budget - bidder.currentBid;
      const estimatedValue = selectedItem?.estimatedValue || 500;
      const timeRatio = timeRemaining / 30;

      switch (bidder.strategy) {
        case "greedy":
          if (currentPrice < estimatedValue * 0.7 && remainingBudget > currentPrice * 0.1) {
            newBid = Math.min(currentPrice + 30, bidder.budget);
          }
          break;
        case "dynamic":
          const optimalBid = estimatedValue * (0.8 - timeRatio * 0.3);
          if (currentPrice < optimalBid && remainingBudget > optimalBid - currentPrice) {
            newBid = Math.min(Math.floor(optimalBid), bidder.budget);
          }
          break;
        case "minimax":
          const competitor = prev.find(b => b.id !== bidder.id);
          const strategicBid = competitor ? competitor.currentBid * 1.15 : currentPrice + 25;
          if (strategicBid < estimatedValue * 0.85 && remainingBudget > strategicBid - currentPrice) {
            newBid = Math.min(strategicBid, bidder.budget);
          }
          break;
        case "knapsack":
          const valueRatio = estimatedValue / bidder.budget;
          const optimalKnapsackBid = Math.min(estimatedValue * 0.75, bidder.budget * 0.8);
          if (currentPrice < optimalKnapsackBid && remainingBudget > optimalKnapsackBid - currentPrice) {
            newBid = Math.min(optimalKnapsackBid, bidder.budget);
          }
          break;
      }

      if (newBid > bidder.currentBid && newBid <= bidder.budget) {
        setCurrentPrice(newBid);
        const efficiency = ((estimatedValue - newBid) / estimatedValue) * 100;
        return { ...bidder, currentBid: newBid, efficiency: Math.max(0, efficiency) };
      }

      if (remainingBudget < 50) {
        return { ...bidder, isActive: false };
      }

      return bidder;
    }));
  };

  const determineWinner = () => {
    const activeBidders = bidders.filter(b => b.isActive);
    const highestBidder = activeBidders.reduce((prev, current) => 
      prev.currentBid > current.currentBid ? prev : current
    );
    
    const updatedBidders = bidders.map(bidder => {
      const won = bidder.id === highestBidder.id;
      const profit = won ? (selectedItem?.estimatedValue || 0) - bidder.currentBid : 0;
      return { ...bidder, won, profit };
    });
    
    setBidders(updatedBidders);
    setWinner(highestBidder);
    toast.success(`Winner: ${highestBidder.name} with bid $${highestBidder.currentBid}`);
  };

  const startComparison = () => {
    if (!selectedItem) {
      toast.error("Please select an auction item first!");
      return;
    }
    setIsRunning(true);
    setWinner(null);
    setTimeRemaining(30);
    setAuctionProgress(0);
    toast.success("Strategy comparison started!");
  };

  const resetComparison = () => {
    setIsRunning(false);
    setCurrentPrice(selectedItem?.startingPrice || 100);
    setTimeRemaining(30);
    setAuctionProgress(0);
    setWinner(null);
    setBidders(prev => prev.map(bidder => ({
      ...bidder,
      currentBid: 0,
      isActive: true,
      profit: 0,
      won: false,
      efficiency: 0
    })));
    toast.info("Comparison reset");
  };

  return (
    <div className="space-y-6">
      {/* Strategy Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="w-5 h-5" />
            <span>Strategy Comparison Setup</span>
          </CardTitle>
          <CardDescription>
            Compare two bidding strategies head-to-head in real-time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Auction Item</label>
              <Select value={selectedItem?.id.toString() || ""} onValueChange={(value) => {
                const item = auctionItems.find(i => i.id.toString() === value);
                setSelectedItem(item || null);
              }}>
                <SelectTrigger>
                  <SelectValue placeholder="Select item" />
                </SelectTrigger>
                <SelectContent>
                  {auctionItems.map(item => (
                    <SelectItem key={item.id} value={item.id.toString()}>
                      {item.name} (${item.startingPrice})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Strategy A</label>
              <Select value={strategy1} onValueChange={setStrategy1}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="greedy">Greedy Algorithm</SelectItem>
                  <SelectItem value="dynamic">Dynamic Programming</SelectItem>
                  <SelectItem value="minimax">Game Theory (Minimax)</SelectItem>
                  <SelectItem value="knapsack">Knapsack Optimization</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Strategy B</label>
              <Select value={strategy2} onValueChange={setStrategy2}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="greedy">Greedy Algorithm</SelectItem>
                  <SelectItem value="dynamic">Dynamic Programming</SelectItem>
                  <SelectItem value="minimax">Game Theory (Minimax)</SelectItem>
                  <SelectItem value="knapsack">Knapsack Optimization</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comparison Arena */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {bidders.map((bidder, index) => (
          <Card key={bidder.id} className={`border-2 ${bidder.won ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className={`w-4 h-4 rounded-full ${bidder.color}`}></div>
                  <span>{bidder.name}</span>
                  {bidder.won && <Trophy className="w-5 h-5 text-green-600" />}
                </div>
                {!bidder.isActive && <Badge variant="destructive">Out</Badge>}
              </CardTitle>
              <CardDescription>
                {strategyDescriptions[bidder.strategy as keyof typeof strategyDescriptions]}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">
                  ${bidder.currentBid.toLocaleString()}
                </div>
                <p className="text-sm text-gray-600">Current Bid</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Budget Used:</span>
                  <span>{((bidder.currentBid / bidder.budget) * 100).toFixed(1)}%</span>
                </div>
                <Progress value={(bidder.currentBid / bidder.budget) * 100} className="h-2" />
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Efficiency</p>
                  <p className="font-semibold flex items-center">
                    <Zap className="w-4 h-4 mr-1 text-yellow-500" />
                    {bidder.efficiency.toFixed(1)}%
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Profit</p>
                  <p className={`font-semibold ${bidder.profit > 0 ? 'text-green-600' : bidder.profit < 0 ? 'text-red-600' : 'text-gray-500'}`}>
                    {bidder.profit > 0 ? `+$${bidder.profit}` : `$${bidder.profit}`}
                  </p>
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
            {selectedItem && (
              <div className="text-center bg-gray-50 rounded-lg p-4 w-full max-w-md">
                <h3 className="font-semibold">{selectedItem.name}</h3>
                <p className="text-sm text-gray-600">{selectedItem.description}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm">Est. Value: ${selectedItem.estimatedValue}</span>
                  <Badge variant="outline">{selectedItem.category}</Badge>
                </div>
              </div>
            )}

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Timer className="w-4 h-4" />
                <span className="font-mono text-lg">
                  {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
                </span>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold">Current Price: ${currentPrice}</div>
                <Progress value={auctionProgress} className="w-32 h-2 mt-1" />
              </div>
            </div>

            <div className="flex space-x-3">
              {!isRunning ? (
                <Button onClick={startComparison} className="bg-green-600 hover:bg-green-700">
                  <PlayCircle className="w-4 h-4 mr-2" />
                  Start Comparison
                </Button>
              ) : (
                <Button disabled className="bg-gray-400">
                  <Timer className="w-4 h-4 mr-2" />
                  Running...
                </Button>
              )}
              <Button onClick={resetComparison} variant="outline">
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>

            {winner && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center w-full max-w-md">
                <Trophy className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold text-green-800">Comparison Winner!</h3>
                <p className="text-green-700">{winner.name}</p>
                <p className="text-sm text-green-600">
                  Winning Bid: ${winner.currentBid} | Profit: ${winner.profit}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StrategyComparisonSimulator;
