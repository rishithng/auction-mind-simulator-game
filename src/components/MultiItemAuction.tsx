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
  Target,
  Sparkles,
  TrendingUp,
  Zap
} from "lucide-react";
import { toast } from "sonner";
import AnimatedBidder from "./AnimatedBidder";
import TurnBasedAuction from "./TurnBasedAuction";
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
  strategicPreference?: string[];
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
      avatar: "AG",
      strategicPreference: ["Electronics", "Art"]
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
      avatar: "BD",
      strategicPreference: ["Jewelry", "Books"]
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
      avatar: "CM",
      strategicPreference: ["Art", "Electronics"]
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
      avatar: "YP",
      strategicPreference: ["Electronics", "Jewelry"]
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

    // Show live notification
    if (type !== 'system' && isRunning) {
      toast(
        `${bidder} - ${strategy}`,
        {
          description: message,
          duration: 2000,
          icon: type === 'result' ? '🏆' : type === 'action' ? '💰' : '🧠',
        }
      );
    }
  };

  const calculateBidderScore = (bidder: Bidder, item: AuctionItem) => {
    let score = 0;
    
    // Base score from value vs price ratio
    const valueRatio = item.estimatedValue / item.currentPrice;
    score += valueRatio * 30;
    
    // Budget consideration
    const budgetRatio = bidder.remainingBudget / bidder.initialBudget;
    score += budgetRatio * 20;
    
    // Strategic preference bonus
    if (bidder.strategicPreference?.includes(item.category)) {
      score += 25;
    }
    
    // Competition analysis
    const activeBidders = bidders.filter(b => b.name !== bidder.name && b.isActive);
    const avgCompetitorBudget = activeBidders.reduce((sum, b) => sum + b.remainingBudget, 0) / activeBidders.length;
    
    if (bidder.remainingBudget > avgCompetitorBudget) {
      score += 15;
    }
    
    // Future opportunity cost
    const futureItems = auctionItems.slice(currentRound + 1);
    const futureValue = futureItems.reduce((sum, futureItem) => {
      if (bidder.strategicPreference?.includes(futureItem.category)) {
        return sum + futureItem.estimatedValue;
      }
      return sum;
    }, 0);
    
    if (item.estimatedValue > futureValue * 0.3) {
      score += 10;
    }
    
    return score + (Math.random() * 20); // Add some randomness
  };

  const simulateBidderDecision = async (bidder: Bidder) => {
    if (!currentItem || !isRunning || isPaused) return;

    setThinkingBidder(bidder.name);
    
    // Thinking delay for better UX
    await new Promise(resolve => setTimeout(resolve, slowMode ? 1500 : 400));
    
    let shouldBid = false;
    let bidAmount = 0;
    
    // Calculate strategic score for this item
    const strategicScore = calculateBidderScore(bidder, currentItem);
    
    // Different strategies have different thresholds
    let bidThreshold = 50;
    switch (bidder.strategy) {
      case "greedy":
        bidThreshold = 45; // More aggressive
        break;
      case "dynamic":
        bidThreshold = 60; // More calculated
        break;
      case "minimax":
        bidThreshold = 55; // Balanced
        break;
      default:
        bidThreshold = 50;
        break;
    }

    shouldBid = strategicScore > bidThreshold && bidder.remainingBudget > currentItem.currentPrice + 50;

    if (shouldBid) {
      // More sophisticated bid calculation
      const maxBid = Math.min(
        Math.floor(currentItem.estimatedValue * (0.7 + Math.random() * 0.2)),
        bidder.remainingBudget
      );
      
      const minIncrement = Math.floor(25 + Math.random() * 40);
      bidAmount = Math.min(
        currentItem.currentPrice + minIncrement,
        maxBid
      );

      if (bidAmount <= currentItem.currentPrice || bidAmount > bidder.remainingBudget) {
        shouldBid = false;
      } else {
        addCommentary('strategy', `🎯 Strategic score: ${strategicScore.toFixed(1)} - Bidding ${bidAmount}!`, bidder.name, bidder.strategy, bidAmount);
      }
    } else {
      const reasons = [
        `Strategic score too low (${strategicScore.toFixed(1)})`,
        `Saving budget for preferred items`,
        `Current price too high for strategy`,
        `Better opportunities ahead`
      ];
      addCommentary('strategy', `🤔 ${reasons[Math.floor(Math.random() * reasons.length)]}`, bidder.name, bidder.strategy);
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
    
    // Move to next bidder
    setCurrentBidderIndex(prev => (prev + 1) % bidders.length);
  };

  const handleBidderPass = (bidderName: string) => {
    setLastActions(prev => ({ ...prev, [bidderName]: 'pass' }));
    
    // Move to next bidder
    setCurrentBidderIndex(prev => (prev + 1) % bidders.length);
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

      setLastActions(prev => ({ ...prev, [winner.name]: 'won' }));
      addCommentary('result', `🏆 Won ${currentItem.name} for ₹${winner.currentBid} (Est. profit: ${profit > 0 ? '+' : ''}₹${profit})`, winner.name, winner.strategy, winner.currentBid);
      
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
        toast.info(`Round ${currentRound + 2}: ${auctionItems[currentRound + 1].name}`, {
          icon: '🔥',
          duration: 2000,
        });
      } else {
        setIsRunning(false);
        setShowResults(true);
        toast.success("🎉 Auction completed! Check your results.", {
          duration: 4000,
        });
      }
    }, 2500);
  };

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

  useEffect(() => {
    if (!isRunning || isPaused || !currentItem || !roundInProgress || thinkingBidder) return;

    const timer = setTimeout(() => {
      simulateBidderDecision(currentBidder);
    }, slowMode ? 800 : 200);

    return () => clearTimeout(timer);
  }, [currentBidderIndex, isRunning, isPaused, roundInProgress, thinkingBidder]);

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

    addCommentary('system', '🚀 Smart auction started with improved AI strategies!', 'System', 'system');
    toast.success("🎯 Smart auction started! AI bidders will compete strategically!", {
      duration: 3000,
    });
  };

  const pauseAuction = () => {
    setIsPaused(true);
    setRoundInProgress(false);
    toast.info("⏸️ Auction paused", { duration: 2000 });
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

    toast.info("🔄 Auction reset", { duration: 2000 });
  };

  const toggleSlowMode = (enabled: boolean) => {
    setSlowMode(enabled);
    toast.info(enabled ? "🐌 Detailed mode - watch every move" : "🚀 Fast mode - quick decisions", {
      duration: 2000,
    });
  };

  if (showResults) {
    return <AuctionResults bidders={bidders} auctionItems={auctionItems} onRestart={resetAuction} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background relative overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Main gradient orbs with enhanced animation */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-r from-primary/15 via-primary/10 to-transparent rounded-full mix-blend-multiply filter blur-3xl animate-float"></div>
        <div className="absolute top-1/2 -right-32 w-96 h-96 bg-gradient-to-r from-secondary/15 via-accent/10 to-transparent rounded-full mix-blend-multiply filter blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute -bottom-32 left-1/2 w-96 h-96 bg-gradient-to-r from-primary/12 via-muted/8 to-transparent rounded-full mix-blend-multiply filter blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
        
        {/* Enhanced floating elements */}
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-primary/50 rounded-full animate-particle-float shadow-lg"></div>
        <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-secondary/50 rounded-full animate-particle-float shadow-lg" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-4 h-4 bg-accent/50 rounded-full animate-particle-float shadow-lg" style={{ animationDelay: '4s' }}></div>
        <div className="absolute bottom-1/3 right-1/3 w-3 h-3 bg-primary/50 rounded-full animate-particle-float shadow-lg" style={{ animationDelay: '6s' }}></div>
        
        {/* Animated grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(var(--primary)/0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--primary)/0.02)_1px,transparent_1px)] bg-[size:64px_64px] animate-pulse opacity-40"></div>
        
        {/* Subtle shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent animate-shimmer"></div>
      </div>

      <div className="relative z-10 space-y-8 p-6">
        {/* Enhanced Setup Panel */}
        <Card className="border-0 bg-card/80 backdrop-blur-xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.01] group">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-3 text-xl">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg group-hover:animate-gentle-glow">
                <ShoppingCart className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Smart Multi-Item Auction
              </span>
              <div className="flex items-center space-x-1 animate-gentle-glow">
                <Sparkles className="w-4 h-4 text-yellow-500" />
                <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs shadow-lg">
                  AI Enhanced
                </Badge>
              </div>
            </CardTitle>
            <CardDescription className="text-base text-muted-foreground">
              Experience intelligent bidding strategies competing in real-time with enhanced AI algorithms
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="budget" className="text-sm font-semibold flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-emerald-500" />
                  <span>Your Budget (₹)</span>
                </Label>
                <Input
                  id="budget"
                  type="number"
                  value={userBudget}
                  onChange={(e) => setUserBudget(Number(e.target.value))}
                  min={1000}
                  max={5000}
                  step={100}
                  disabled={isRunning}
                  className="h-12 bg-background/90 backdrop-blur-sm border-2 border-primary/20 focus:border-primary/50 transition-all duration-300 hover:bg-background group-hover:shadow-lg"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="strategy" className="text-sm font-semibold flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-purple-500" />
                  <span>Your AI Strategy</span>
                </Label>
                <Select value={userStrategy} onValueChange={setUserStrategy} disabled={isRunning}>
                  <SelectTrigger className="h-12 bg-background/90 backdrop-blur-sm border-2 border-secondary/20 focus:border-secondary/50 transition-all duration-300 hover:bg-background group-hover:shadow-lg">
                    <SelectValue placeholder="Select AI strategy" />
                  </SelectTrigger>
                  <SelectContent className="bg-background/95 backdrop-blur-xl border-border/50">
                    <SelectItem value="greedy">⚡ Greedy Algorithm</SelectItem>
                    <SelectItem value="dynamic">🧠 Dynamic Programming</SelectItem>
                    <SelectItem value="minimax">🎯 Game Theory (Minimax)</SelectItem>
                    <SelectItem value="knapsack">💼 Knapsack Optimization</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Separator className="bg-gradient-to-r from-transparent via-border to-transparent" />
            
            {/* Enhanced Control Panel */}
            <div className="bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 rounded-xl p-4 backdrop-blur-sm border border-border/30">
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
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Current Auction - Enhanced styling */}
          <div className="xl:col-span-3 space-y-8">
            {currentItem && (
              <div className="animate-fade-slide-up">
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
              </div>
            )}

            {/* Enhanced Animated Bidders */}
            <Card className="border-0 bg-card/80 backdrop-blur-xl shadow-2xl hover:shadow-3xl transition-all duration-500 group">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-lg group-hover:animate-gentle-glow">
                    <Users className="w-4 h-4 text-white" />
                  </div>
                  <span>AI Bidders Competition</span>
                  {roundInProgress && (
                    <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white animate-gentle-glow shadow-lg">
                      <div className="w-2 h-2 bg-white rounded-full mr-2 animate-ping"></div>
                      LIVE
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {bidders.map((bidder, index) => (
                    <div key={bidder.id} className="animate-fade-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                      <AnimatedBidder
                        bidder={bidder}
                        isCurrentTurn={index === currentBidderIndex && roundInProgress}
                        isThinking={thinkingBidder === bidder.name}
                        lastAction={lastActions[bidder.name] || null}
                        position={index}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Sidebar - Auction Queue */}
          <div className="xl:col-span-1">
            <Card className="border-0 bg-card/80 backdrop-blur-xl shadow-2xl hover:shadow-3xl transition-all duration-500 sticky top-6 group">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center shadow-lg group-hover:animate-gentle-glow">
                    <Target className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-lg">Auction Queue</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {auctionItems.map((item, index) => (
                    <div 
                      key={item.id} 
                      className={`p-4 rounded-xl border-2 transition-all duration-500 hover:scale-105 group/item ${
                        index === currentRound ? 
                          'border-primary bg-gradient-to-r from-primary/10 to-secondary/10 shadow-xl scale-110 animate-gentle-glow' :
                        item.sold ? 
                          'border-emerald-500 bg-gradient-to-r from-emerald-50/50 to-emerald-100/50 dark:from-emerald-950/20 dark:to-emerald-900/20 shadow-md' :
                        'border-border bg-card/60 hover:border-border/70 hover:bg-card/80'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold text-sm text-foreground">{item.name}</h4>
                          <p className="text-xs text-muted-foreground">Est. ₹{item.estimatedValue.toLocaleString()}</p>
                          {index === currentRound && roundInProgress && (
                            <p className="text-xs text-primary font-bold animate-gentle-glow">
                              Live: ₹{item.currentPrice.toLocaleString()}
                            </p>
                          )}
                        </div>
                        <div className="text-right">
                          {item.sold ? (
                            <Badge className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-xs shadow-md">
                              ✓ Sold
                            </Badge>
                          ) : index === currentRound ? (
                            <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs animate-gentle-glow shadow-lg">
                              🔥 Live
                            </Badge>
                          ) : index < currentRound ? (
                            <Badge variant="outline" className="text-xs border-muted-foreground/30">
                              ⏭️ Past
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="text-xs border-primary/30 text-primary">
                              ⏳ Queue
                            </Badge>
                          )}
                        </div>
                      </div>
                      {item.winner && (
                        <div className="mt-2 p-2 bg-emerald-100/80 dark:bg-emerald-950/40 rounded-lg border border-emerald-200/50 dark:border-emerald-800/50">
                          <p className="text-xs text-emerald-700 dark:text-emerald-300 font-medium">
                            🏆 Winner: {item.winner}
                          </p>
                          <p className="text-xs text-emerald-600 dark:text-emerald-400">
                            Final Price: ₹{item.finalPrice?.toLocaleString()}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiItemAuction;
