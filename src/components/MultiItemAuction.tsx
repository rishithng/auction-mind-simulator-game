import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ShoppingCart,
  Users,
  Target
} from "lucide-react";
import { toast } from "sonner";
import AnimatedBidder from "./AnimatedBidder";
import TurnBasedAuction from "./TurnBasedAuction";
import RealTimeCommentary from "./RealTimeCommentary";
import ControlPanel from "./ControlPanel";
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
  avatar: string;
}

interface CommentaryEntry {
  id: number;
  timestamp: string;
  round: number;
  itemName: string;
  bidder: string;
  strategy: string;
  message: string;
  amount?: number;
  type: 'strategy' | 'action' | 'result' | 'system';
  icon: string;
}

const MultiItemAuction = () => {
  const [currentRound, setCurrentRound] = useState(0);
  const [currentBidderIndex, setCurrentBidderIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(15);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [slowMode, setSlowMode] = useState(true);
  const [auctionProgress, setAuctionProgress] = useState(0);
  const [userBudget, setUserBudget] = useState(2000);
  const [userStrategy, setUserStrategy] = useState("greedy");
  const [showResults, setShowResults] = useState(false);
  const [commentary, setCommentary] = useState<CommentaryEntry[]>([]);
  const [commentaryCounter, setCommentaryCounter] = useState(0);
  const [thinkingBidder, setThinkingBidder] = useState<string | null>(null);
  const [lastActions, setLastActions] = useState<Record<string, 'bid' | 'pass' | 'won' | null>>({});
  const [roundInProgress, setRoundInProgress] = useState(false);

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
      name: "Alice (Greedy)",
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
      efficiency: 0,
      avatar: "AG"
    },
    {
      id: 2,
      name: "Bob (Dynamic)",
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
      efficiency: 0,
      avatar: "BD"
    },
    {
      id: 3,
      name: "Charlie (Minimax)",
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
      efficiency: 0,
      avatar: "CM"
    },
    {
      id: 4,
      name: "You (Player)",
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
      efficiency: 0,
      avatar: "YP"
    }
  ]);

  const currentItem = currentRound < auctionItems.length ? auctionItems[currentRound] : null;
  const currentBidder = bidders[currentBidderIndex];

  const addCommentary = (
    type: CommentaryEntry['type'],
    message: string,
    bidder: string,
    strategy: string,
    amount?: number,
    icon: string = ''
  ) => {
    const newEntry: CommentaryEntry = {
      id: commentaryCounter,
      timestamp: new Date().toLocaleTimeString(),
      round: currentRound + 1,
      itemName: currentItem?.name || '',
      bidder,
      strategy,
      message,
      amount,
      type,
      icon
    };
    setCommentary(prev => [newEntry, ...prev.slice(0, 19)]);
    setCommentaryCounter(prev => prev + 1);
  };

  const simulateBidderDecision = async (bidder: Bidder) => {
    if (!currentItem || !isRunning || isPaused) return;

    setThinkingBidder(bidder.name);
    
    // Thinking delay for better UX
    await new Promise(resolve => setTimeout(resolve, slowMode ? 2000 : 500));
    
    const futureItems = auctionItems.slice(currentRound + 1);
    let shouldBid = false;
    let bidAmount = 0;

    switch (bidder.strategy) {
      case "greedy":
        if (currentItem.currentPrice < currentItem.estimatedValue * 0.8) {
          bidAmount = Math.min(
            currentItem.currentPrice + Math.floor(Math.random() * 50) + 25,
            Math.floor(currentItem.estimatedValue * 0.9),
            bidder.remainingBudget
          );
          shouldBid = bidAmount <= bidder.remainingBudget && bidAmount > currentItem.currentPrice;
          if (shouldBid) {
            addCommentary('strategy', `🧠 ${bidder.name} sees good profit potential → bidding aggressively!`, bidder.name, bidder.strategy, bidAmount);
          } else {
            addCommentary('strategy', `💭 ${bidder.name} thinks price is too high for profit`, bidder.name, bidder.strategy);
          }
        } else {
          addCommentary('strategy', `⚠️ ${bidder.name} skipping - current price too close to estimated value`, bidder.name, bidder.strategy);
        }
        break;

      case "dynamic":
        const totalFutureValue = futureItems.reduce((sum, item) => sum + item.estimatedValue, 0);
        const currentValue = currentItem.estimatedValue;
        const budgetRatio = bidder.remainingBudget / bidder.initialBudget;
        
        if (currentValue > totalFutureValue * 0.3 || budgetRatio > 0.7) {
          bidAmount = Math.min(
            Math.floor(currentItem.estimatedValue * 0.75),
            currentItem.currentPrice + Math.floor(Math.random() * 40) + 30,
            bidder.remainingBudget
          );
          shouldBid = bidAmount <= bidder.remainingBudget && bidAmount > currentItem.currentPrice;
          if (shouldBid) {
            addCommentary('strategy', `🧠 ${bidder.name} calculated this item is worth bidding on considering future opportunities`, bidder.name, bidder.strategy, bidAmount);
          }
        } else {
          addCommentary('strategy', `🧠 ${bidder.name} is saving budget for more valuable future items (remaining: ₹${bidder.remainingBudget})`, bidder.name, bidder.strategy);
        }
        break;

      case "minimax":
        const competitors = bidders.filter(b => b.name !== bidder.name && b.isActive);
        const avgCompetitorBudget = competitors.reduce((sum, b) => sum + b.remainingBudget, 0) / competitors.length;
        
        if (bidder.remainingBudget > avgCompetitorBudget * 0.8) {
          bidAmount = Math.min(
            currentItem.currentPrice + Math.floor(Math.random() * 45) + 35,
            Math.floor(currentItem.estimatedValue * 0.85),
            bidder.remainingBudget
          );
          shouldBid = bidAmount <= bidder.remainingBudget && bidAmount > currentItem.currentPrice;
          if (shouldBid) {
            addCommentary('strategy', `🎯 ${bidder.name} making strategic counter-move against competitors`, bidder.name, bidder.strategy, bidAmount);
          }
        } else {
          addCommentary('strategy', `🎯 ${bidder.name} conserving budget - competitors have more firepower`, bidder.name, bidder.strategy);
        }
        break;

      default:
        // User strategy - now automated
        shouldBid = Math.random() > 0.4; // 60% chance to bid
        if (shouldBid) {
          bidAmount = Math.min(
            currentItem.currentPrice + Math.floor(Math.random() * 40) + 20,
            bidder.remainingBudget
          );
          addCommentary('action', `🎮 ${bidder.name} (your automated strategy) decided to bid`, bidder.name, bidder.strategy, bidAmount);
        } else {
          addCommentary('action', `🎮 ${bidder.name} (your automated strategy) decided to pass this round`, bidder.name, bidder.strategy);
        }
        break;
    }

    setThinkingBidder(null);

    if (shouldBid && bidAmount > 0) {
      handleBidPlaced(bidder.name, bidAmount);
    } else {
      handleBidderPass(bidder.name);
    }
  };

  const handleBidPlaced = (bidderName: string, amount: number) => {
    setBidders(prev => prev.map(bidder => 
      bidder.name === bidderName 
        ? { ...bidder, currentBid: amount }
        : bidder
    ));
    
    if (currentItem) {
      currentItem.currentPrice = amount;
    }
    
    setLastActions(prev => ({ ...prev, [bidderName]: 'bid' }));
    addCommentary('action', `💰 Placed bid of ₹${amount}`, bidderName, bidders.find(b => b.name === bidderName)?.strategy || '', amount);
    
    // Move to next bidder
    setCurrentBidderIndex(prev => (prev + 1) % bidders.length);
  };

  const handleBidderPass = (bidderName: string) => {
    setLastActions(prev => ({ ...prev, [bidderName]: 'pass' }));
    addCommentary('action', `⏭️ Passed on this round`, bidderName, bidders.find(b => b.name === bidderName)?.strategy || '');
    
    // Move to next bidder
    setCurrentBidderIndex(prev => (prev + 1) % bidders.length);
  };

  // Main auction timer and logic
  useEffect(() => {
    if (!isRunning || isPaused || !currentItem || !roundInProgress) return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          finalizeCurrentRound();
          return 0;
        }
        return prev - 1;
      });

      setAuctionProgress(((15 - timeRemaining) / 15) * 100);
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, isPaused, timeRemaining, currentRound, roundInProgress]);

  // Handle bidder turns
  useEffect(() => {
    if (!isRunning || isPaused || !currentItem || !roundInProgress || thinkingBidder) return;

    const timer = setTimeout(() => {
      simulateBidderDecision(currentBidder);
    }, slowMode ? 1000 : 300);

    return () => clearTimeout(timer);
  }, [currentBidderIndex, isRunning, isPaused, roundInProgress, thinkingBidder]);

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

      setLastActions(prev => ({ ...prev, [winner.name]: 'won' }));
      addCommentary('result', `🏆 Won ${currentItem.name} for ₹${winner.currentBid} (Profit: ${profit > 0 ? '+' : ''}₹${profit})`, winner.name, winner.strategy, winner.currentBid);
      
      auctionItems[currentRound] = wonItem;
    } else {
      addCommentary('system', `No bids received for ${currentItem.name}`, 'System', 'system');
    }

    setRoundInProgress(false);

    // Move to next round or end auction
    setTimeout(() => {
      if (currentRound < auctionItems.length - 1) {
        setCurrentRound(prev => prev + 1);
        setCurrentBidderIndex(0);
        setTimeRemaining(15);
        setAuctionProgress(0);
        setRoundInProgress(true);
        setLastActions({});
        toast.info(`Round ${currentRound + 2} starting: ${auctionItems[currentRound + 1].name}`);
      } else {
        setIsRunning(false);
        setShowResults(true);
        toast.success("Auction completed! Check your results.");
      }
    }, 3000);
  };

  const startAuction = () => {
    if (isPaused) {
      setIsPaused(false);
      setRoundInProgress(true);
      return;
    }

    setIsRunning(true);
    setIsPaused(false);
    setCurrentRound(0);
    setCurrentBidderIndex(0);
    setTimeRemaining(15);
    setShowResults(false);
    setCommentary([]);
    setLastActions({});
    setRoundInProgress(true);
    
    // Reset bidders
    setBidders(prev => prev.map(bidder => ({
      ...bidder,
      remainingBudget: bidder.name === "You (Player)" ? userBudget : bidder.initialBudget,
      initialBudget: bidder.name === "You (Player)" ? userBudget : bidder.initialBudget,
      strategy: bidder.name === "You (Player)" ? userStrategy : bidder.strategy,
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

    addCommentary('system', 'Multi-item automatic auction started! 🚀', 'System', 'system');
    toast.success("Multi-item auction started! Watch the bidders compete automatically!");
  };

  const pauseAuction = () => {
    setIsPaused(true);
    setRoundInProgress(false);
    toast.info("Auction paused");
  };

  const resetAuction = () => {
    setIsRunning(false);
    setIsPaused(false);
    setCurrentRound(0);
    setCurrentBidderIndex(0);
    setTimeRemaining(15);
    setShowResults(false);
    setCommentary([]);
    setAuctionProgress(0);
    setRoundInProgress(false);
    setLastActions({});
    setThinkingBidder(null);
    
    // Reset everything
    setBidders(prev => prev.map(bidder => ({
      ...bidder,
      remainingBudget: bidder.name === "You (Player)" ? userBudget : bidder.initialBudget,
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

  const toggleSlowMode = (enabled: boolean) => {
    setSlowMode(enabled);
    toast.info(enabled ? "Slow mode enabled - detailed bidding" : "Fast mode enabled - quick auction");
  };

  if (showResults) {
    return <AuctionResults bidders={bidders} auctionItems={auctionItems} onRestart={resetAuction} />;
  }

  return (
    <div className="space-y-6 bg-gradient-to-br from-blue-50 via-white to-purple-50 min-h-screen p-6">
      {/* Setup Panel */}
      <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <ShoppingCart className="w-5 h-5" />
            <span>Automatic Multi-Item Auction</span>
          </CardTitle>
          <CardDescription>
            Watch four different bidding strategies compete automatically in real-time
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
              <Label htmlFor="strategy">Your Strategy (Automated)</Label>
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
            <div className="flex items-end">
              <ControlPanel
                isRunning={isRunning}
                isPaused={isPaused}
                slowMode={slowMode}
                onStart={startAuction}
                onPause={pauseAuction}
                onRestart={resetAuction}
                onSlowModeToggle={toggleSlowMode}
                currentRound={currentRound}
                totalRounds={auctionItems.length}
                timeRemaining={timeRemaining}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Current Auction */}
        <div className="xl:col-span-2 space-y-6">
          {currentItem && (
            <TurnBasedAuction
              item={currentItem}
              round={currentRound + 1}
              totalRounds={auctionItems.length}
              currentBidder={currentBidder?.name || ''}
              timeRemaining={timeRemaining}
              onBidPlaced={handleBidPlaced}
              onBidderPass={handleBidderPass}
              isActive={roundInProgress}
              roundProgress={auctionProgress}
            />
          )}

          {/* Animated Bidders */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>Live Bidders</span>
                {roundInProgress && (
                  <Badge className="bg-green-500 animate-pulse">LIVE</Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {bidders.map((bidder, index) => (
                  <AnimatedBidder
                    key={bidder.id}
                    bidder={bidder}
                    isCurrentTurn={index === currentBidderIndex && roundInProgress}
                    isThinking={thinkingBidder === bidder.name}
                    lastAction={lastActions[bidder.name] || null}
                    position={index}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <RealTimeCommentary
            commentary={commentary}
            currentRound={currentRound}
            isActive={roundInProgress}
          />

          {/* Auction Items Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-5 h-5" />
                <span>Auction Queue</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {auctionItems.map((item, index) => (
                  <div key={item.id} className={`p-3 rounded-lg border-2 transition-all ${
                    index === currentRound ? 'border-blue-500 bg-blue-50 scale-105' :
                    item.sold ? 'border-green-500 bg-green-50' :
                    'border-gray-200 hover:border-gray-300'
                  }`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-sm">{item.name}</h4>
                        <p className="text-xs text-gray-600">Est. ₹{item.estimatedValue}</p>
                        {index === currentRound && roundInProgress && (
                          <p className="text-xs text-blue-600 font-medium">Current: ₹{item.currentPrice}</p>
                        )}
                      </div>
                      <div className="text-right">
                        {item.sold ? (
                          <Badge className="bg-green-500 text-xs">✓ Sold</Badge>
                        ) : index === currentRound ? (
                          <Badge className="bg-blue-500 text-xs animate-pulse">🔥 Live</Badge>
                        ) : index < currentRound ? (
                          <Badge variant="outline" className="text-xs">⏭️ Past</Badge>
                        ) : (
                          <Badge variant="outline" className="text-xs">⏳ Queue</Badge>
                        )}
                      </div>
                    </div>
                    {item.winner && (
                      <p className="text-xs text-green-600 mt-1">
                        🏆 Winner: {item.winner} (₹{item.finalPrice})
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MultiItemAuction;
