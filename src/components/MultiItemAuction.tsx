
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  PlayCircle, 
  PauseCircle, 
  RotateCcw, 
  Timer, 
  Trophy,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Target,
  Brain,
  Calculator,
  Users,
  ShoppingCart,
  Zap
} from "lucide-react";
import { toast } from "sonner";
import AuctionItemCard from "./AuctionItemCard";
import BidderCard from "./BidderCard";
import AuctionResults from "./AuctionResults";

interface AuctionItem {
  id: number;
  name: string;
  description: string;
  estimatedValue: number;
  startingPrice: number;
  currentPrice: number;
  category: string;
  image?: string;
  winner?: string;
  finalPrice?: number;
  sold: boolean;
}

interface Bidder {
  id: number;
  name: string;
  strategy: string;
  initialBudget: number;
  remainingBudget: number;
  currentBid: number;
  itemsWon: AuctionItem[];
  totalSpent: number;
  totalProfit: number;
  totalLoss: number;
  isActive: boolean;
  color: string;
  efficiency: number;
}

interface LogEntry {
  id: number;
  timestamp: string;
  round: number;
  itemName: string;
  bidder: string;
  message: string;
  amount?: number;
  type: 'bid' | 'win' | 'strategy' | 'system';
}

const MultiItemAuction = () => {
  const [currentRound, setCurrentRound] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(15);
  const [isRunning, setIsRunning] = useState(false);
  const [auctionProgress, setAuctionProgress] = useState(0);
  const [userBudget, setUserBudget] = useState(2000);
  const [userStrategy, setUserStrategy] = useState("greedy");
  const [showResults, setShowResults] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [logCounter, setLogCounter] = useState(0);

  const [auctionItems] = useState<AuctionItem[]>([
    {
      id: 1,
      name: "Vintage Painting",
      description: "19th century oil painting",
      estimatedValue: 300,
      startingPrice: 50,
      currentPrice: 50,
      category: "Art",
      sold: false
    },
    {
      id: 2,
      name: "Gaming Laptop",
      description: "High-performance gaming laptop",
      estimatedValue: 500,
      startingPrice: 200,
      currentPrice: 200,
      category: "Electronics",
      sold: false
    },
    {
      id: 3,
      name: "Antique Watch",
      description: "Swiss mechanical timepiece",
      estimatedValue: 400,
      startingPrice: 150,
      currentPrice: 150,
      category: "Jewelry",
      sold: false
    },
    {
      id: 4,
      name: "Rare Book Set",
      description: "First edition classics collection",
      estimatedValue: 250,
      startingPrice: 80,
      currentPrice: 80,
      category: "Books",
      sold: false
    },
    {
      id: 5,
      name: "Designer Camera",
      description: "Professional DSLR camera",
      estimatedValue: 600,
      startingPrice: 300,
      currentPrice: 300,
      category: "Electronics",
      sold: false
    }
  ]);

  const [bidders, setBidders] = useState<Bidder[]>([
    {
      id: 1,
      name: "Greedy Agent",
      strategy: "greedy",
      initialBudget: 2000,
      remainingBudget: 2000,
      currentBid: 0,
      itemsWon: [],
      totalSpent: 0,
      totalProfit: 0,
      totalLoss: 0,
      isActive: true,
      color: "bg-blue-500",
      efficiency: 0
    },
    {
      id: 2,
      name: "Dynamic Programming",
      strategy: "dynamic",
      initialBudget: 2000,
      remainingBudget: 2000,
      currentBid: 0,
      itemsWon: [],
      totalSpent: 0,
      totalProfit: 0,
      totalLoss: 0,
      isActive: true,
      color: "bg-green-500",
      efficiency: 0
    },
    {
      id: 3,
      name: "Minimax Strategy",
      strategy: "minimax",
      initialBudget: 2000,
      remainingBudget: 2000,
      currentBid: 0,
      itemsWon: [],
      totalSpent: 0,
      totalProfit: 0,
      totalLoss: 0,
      isActive: true,
      color: "bg-purple-500",
      efficiency: 0
    },
    {
      id: 4,
      name: "You",
      strategy: userStrategy,
      initialBudget: userBudget,
      remainingBudget: userBudget,
      currentBid: 0,
      itemsWon: [],
      totalSpent: 0,
      totalProfit: 0,
      totalLoss: 0,
      isActive: true,
      color: "bg-orange-500",
      efficiency: 0
    }
  ]);

  const currentItem = currentRound < auctionItems.length ? auctionItems[currentRound] : null;

  const addLog = (type: LogEntry['type'], message: string, bidder: string, amount?: number) => {
    const newLog: LogEntry = {
      id: logCounter,
      timestamp: new Date().toLocaleTimeString(),
      round: currentRound + 1,
      itemName: currentItem?.name || '',
      bidder,
      message,
      amount,
      type
    };
    setLogs(prev => [newLog, ...prev.slice(0, 29)]);
    setLogCounter(prev => prev + 1);
  };

  useEffect(() => {
    if (!isRunning || timeRemaining <= 0 || !currentItem) return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          finalizeCurrentRound();
          return 0;
        }
        return prev - 1;
      });

      simulateMultiItemBidding();
      setAuctionProgress(((15 - timeRemaining) / 15) * 100);
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, timeRemaining, currentRound]);

  const simulateMultiItemBidding = () => {
    if (!currentItem || currentItem.sold) return;

    setBidders(prev => prev.map(bidder => {
      if (bidder.name === "You" || !bidder.isActive || bidder.remainingBudget <= 0) return bidder;

      const futureItems = auctionItems.slice(currentRound + 1);
      let shouldBid = false;
      let bidAmount = 0;

      switch (bidder.strategy) {
        case "greedy":
          // Greedy: Bid aggressively on current item if it seems profitable
          if (currentItem.currentPrice < currentItem.estimatedValue * 0.8) {
            bidAmount = Math.min(
              currentItem.currentPrice + 25,
              Math.floor(currentItem.estimatedValue * 0.9),
              bidder.remainingBudget
            );
            shouldBid = bidAmount <= bidder.remainingBudget && bidAmount > currentItem.currentPrice;
            if (shouldBid) {
              addLog('strategy', `Greedy: Bidding aggressively on ${currentItem.name}`, bidder.name, bidAmount);
            }
          }
          break;

        case "dynamic":
          // DP: Consider future opportunities and budget allocation
          const totalFutureValue = futureItems.reduce((sum, item) => sum + item.estimatedValue, 0);
          const currentValue = currentItem.estimatedValue;
          const budgetRatio = bidder.remainingBudget / bidder.initialBudget;
          
          // Only bid if current item is significantly valuable or budget is high
          if (currentValue > totalFutureValue * 0.3 || budgetRatio > 0.7) {
            bidAmount = Math.min(
              Math.floor(currentItem.estimatedValue * 0.75),
              currentItem.currentPrice + 30,
              bidder.remainingBudget
            );
            shouldBid = bidAmount <= bidder.remainingBudget && bidAmount > currentItem.currentPrice;
            if (shouldBid) {
              addLog('strategy', `DP: Strategic bid considering future items`, bidder.name, bidAmount);
            }
          } else {
            addLog('strategy', `DP: Skipping ${currentItem.name} to save budget for future items`, bidder.name);
          }
          break;

        case "minimax":
          // Minimax: Counter other bidders' strategies
          const competitors = prev.filter(b => b.name !== bidder.name && b.isActive);
          const avgCompetitorBudget = competitors.reduce((sum, b) => sum + b.remainingBudget, 0) / competitors.length;
          
          if (bidder.remainingBudget > avgCompetitorBudget * 0.8) {
            bidAmount = Math.min(
              currentItem.currentPrice + 35,
              Math.floor(currentItem.estimatedValue * 0.85),
              bidder.remainingBudget
            );
            shouldBid = bidAmount <= bidder.remainingBudget && bidAmount > currentItem.currentPrice;
            if (shouldBid) {
              addLog('strategy', `Minimax: Strategic counter-bid`, bidder.name, bidAmount);
            }
          }
          break;
      }

      if (shouldBid && bidAmount > bidder.currentBid) {
        return { ...bidder, currentBid: bidAmount };
      }
      return bidder;
    }));
  };

  const finalizeCurrentRound = () => {
    if (!currentItem) return;

    const activeBidders = bidders.filter(b => b.isActive && b.currentBid > 0);
    const winner = activeBidders.reduce((prev, current) => 
      current.currentBid > prev.currentBid ? current : prev, 
      { currentBid: 0, name: '', strategy: '' } as any
    );

    if (winner.currentBid > 0) {
      const profit = currentItem.estimatedValue - winner.currentBid;
      const wonItem = {
        ...currentItem,
        winner: winner.name,
        finalPrice: winner.currentBid,
        sold: true
      };

      setBidders(prev => prev.map(bidder => {
        if (bidder.name === winner.name) {
          const newItemsWon = [...bidder.itemsWon, wonItem];
          const newTotalSpent = bidder.totalSpent + winner.currentBid;
          const newRemainingBudget = bidder.remainingBudget - winner.currentBid;
          const newTotalProfit = profit > 0 ? bidder.totalProfit + profit : bidder.totalProfit;
          const newTotalLoss = profit < 0 ? bidder.totalLoss + Math.abs(profit) : bidder.totalLoss;

          return {
            ...bidder,
            itemsWon: newItemsWon,
            totalSpent: newTotalSpent,
            remainingBudget: newRemainingBudget,
            totalProfit: newTotalProfit,
            totalLoss: newTotalLoss,
            currentBid: 0,
            efficiency: newTotalSpent > 0 ? ((newTotalProfit - newTotalLoss) / newTotalSpent) * 100 : 0
          };
        }
        return { ...bidder, currentBid: 0 };
      }));

      addLog('win', `Won ${currentItem.name} for ₹${winner.currentBid}`, winner.name, winner.currentBid);
      
      // Update the auction item
      auctionItems[currentRound] = wonItem;
    } else {
      addLog('system', `No bids received for ${currentItem.name}`, 'System');
    }

    // Move to next round or end auction
    setTimeout(() => {
      if (currentRound < auctionItems.length - 1) {
        setCurrentRound(prev => prev + 1);
        setTimeRemaining(15);
        setAuctionProgress(0);
        toast.info(`Round ${currentRound + 2} starting: ${auctionItems[currentRound + 1].name}`);
      } else {
        setIsRunning(false);
        setShowResults(true);
        toast.success("Auction completed! Check your results.");
      }
    }, 2000);
  };

  const startAuction = () => {
    setIsRunning(true);
    setCurrentRound(0);
    setTimeRemaining(15);
    setShowResults(false);
    setLogs([]);
    
    // Reset bidders
    setBidders(prev => prev.map(bidder => ({
      ...bidder,
      remainingBudget: bidder.name === "You" ? userBudget : bidder.initialBudget,
      initialBudget: bidder.name === "You" ? userBudget : bidder.initialBudget,
      strategy: bidder.name === "You" ? userStrategy : bidder.strategy,
      currentBid: 0,
      itemsWon: [],
      totalSpent: 0,
      totalProfit: 0,
      totalLoss: 0,
      isActive: true,
      efficiency: 0
    })));

    // Reset items
    auctionItems.forEach(item => {
      item.currentPrice = item.startingPrice;
      item.sold = false;
      item.winner = undefined;
      item.finalPrice = undefined;
    });

    addLog('system', 'Multi-item auction started!', 'System');
    toast.success("Multi-item auction started!");
  };

  const resetAuction = () => {
    setIsRunning(false);
    setCurrentRound(0);
    setTimeRemaining(15);
    setShowResults(false);
    setLogs([]);
    setAuctionProgress(0);
    
    // Reset everything
    setBidders(prev => prev.map(bidder => ({
      ...bidder,
      remainingBudget: bidder.name === "You" ? userBudget : bidder.initialBudget,
      currentBid: 0,
      itemsWon: [],
      totalSpent: 0,
      totalProfit: 0,
      totalLoss: 0,
      isActive: true,
      efficiency: 0
    })));

    auctionItems.forEach(item => {
      item.currentPrice = item.startingPrice;
      item.sold = false;
      item.winner = undefined;
      item.finalPrice = undefined;
    });

    toast.info("Auction reset");
  };

  const placeBid = () => {
    if (!isRunning || !currentItem) return;
    
    const userBidder = bidders.find(b => b.name === "You");
    if (!userBidder) return;

    const bidAmount = Math.min(currentItem.currentPrice + 25, userBidder.remainingBudget);
    
    if (bidAmount > userBidder.remainingBudget) {
      toast.error("Bid exceeds your remaining budget!");
      return;
    }

    setBidders(prev => prev.map(bidder => 
      bidder.name === "You" 
        ? { ...bidder, currentBid: bidAmount }
        : bidder
    ));
    
    currentItem.currentPrice = bidAmount;
    addLog('bid', `Manual bid placed on ${currentItem.name}`, "You", bidAmount);
    toast.success(`Bid placed: ₹${bidAmount}`);
  };

  if (showResults) {
    return <AuctionResults bidders={bidders} auctionItems={auctionItems} onRestart={resetAuction} />;
  }

  return (
    <div className="space-y-6">
      {/* Setup Panel */}
      <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <ShoppingCart className="w-5 h-5" />
            <span>Multi-Item Auction Setup</span>
          </CardTitle>
          <CardDescription>
            Configure your budget and strategy for the multi-round auction
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="budget">Your Budget (₹)</Label>
              <Input
                id="budget"
                type="number"
                value={userBudget}
                onChange={(e) => setUserBudget(Number(e.target.value))}
                min={1000}
                max={5000}
                step={100}
                disabled={isRunning}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="strategy">Your Strategy</Label>
              <Select value={userStrategy} onValueChange={setUserStrategy} disabled={isRunning}>
                <SelectTrigger>
                  <SelectValue placeholder="Select strategy" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="greedy">Greedy Algorithm</SelectItem>
                  <SelectItem value="dynamic">Dynamic Programming</SelectItem>
                  <SelectItem value="minimax">Game Theory (Minimax)</SelectItem>
                  <SelectItem value="knapsack">Knapsack Optimization</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end space-x-2">
              {!isRunning ? (
                <Button onClick={startAuction} className="flex-1 bg-green-600 hover:bg-green-700">
                  <PlayCircle className="w-4 h-4 mr-2" />
                  Start Auction
                </Button>
              ) : (
                <Button disabled className="flex-1 bg-gray-400">
                  <Zap className="w-4 h-4 mr-2" />
                  Running...
                </Button>
              )}
              <Button onClick={resetAuction} variant="outline">
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Round Display */}
      {currentItem && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <AuctionItemCard 
              item={currentItem}
              round={currentRound + 1}
              totalRounds={auctionItems.length}
              timeRemaining={timeRemaining}
              auctionProgress={auctionProgress}
              isRunning={isRunning}
              onPlaceBid={placeBid}
              userBudget={bidders.find(b => b.name === "You")?.remainingBudget || 0}
            />
          </div>

          <div className="space-y-4">
            {/* Bidders Panel */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>Live Bidders</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {bidders.map((bidder, index) => (
                  <BidderCard key={bidder.id} bidder={bidder} isLast={index === bidders.length - 1} />
                ))}
              </CardContent>
            </Card>

            {/* Auction Items Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5" />
                  <span>Auction Items</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-48">
                  <div className="space-y-2">
                    {auctionItems.map((item, index) => (
                      <div key={item.id} className={`p-3 rounded-lg border ${
                        index === currentRound ? 'border-blue-500 bg-blue-50' :
                        item.sold ? 'border-green-500 bg-green-50' :
                        'border-gray-200'
                      }`}>
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium text-sm">{item.name}</h4>
                            <p className="text-xs text-gray-600">Est. ₹{item.estimatedValue}</p>
                          </div>
                          <div className="text-right">
                            {item.sold ? (
                              <Badge className="bg-green-500 text-xs">Sold</Badge>
                            ) : index === currentRound ? (
                              <Badge className="bg-blue-500 text-xs">Current</Badge>
                            ) : (
                              <Badge variant="outline" className="text-xs">Pending</Badge>
                            )}
                          </div>
                        </div>
                        {item.winner && (
                          <p className="text-xs text-green-600 mt-1">
                            Winner: {item.winner} (₹{item.finalPrice})
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Live Commentary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="w-5 h-5" />
            <span>Live Commentary & Strategy Analysis</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-64">
            <div className="space-y-2">
              {logs.map((log) => (
                <div key={log.id} className={`p-3 rounded-lg border-l-4 ${
                  log.type === 'bid' ? 'border-blue-500 bg-blue-50' :
                  log.type === 'win' ? 'border-green-500 bg-green-50' :
                  log.type === 'strategy' ? 'border-purple-500 bg-purple-50' :
                  'border-gray-300 bg-gray-50'
                }`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-sm">
                        Round {log.round}: {log.itemName}
                      </p>
                      <p className="text-sm text-gray-700">{log.message}</p>
                      {log.amount && (
                        <p className="text-sm font-semibold text-green-600">₹{log.amount}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">{log.timestamp}</p>
                      <Badge variant="outline" className="text-xs">{log.bidder}</Badge>
                    </div>
                  </div>
                </div>
              ))}
              {logs.length === 0 && (
                <p className="text-gray-500 text-center py-8">
                  No activity yet. Start the auction to see live commentary!
                </p>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default MultiItemAuction;
