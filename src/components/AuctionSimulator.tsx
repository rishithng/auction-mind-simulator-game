
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  PlayCircle, 
  PauseCircle, 
  RotateCcw, 
  Users, 
  DollarSign, 
  Timer, 
  TrendingUp,
  Brain,
  Target,
  Trophy
} from "lucide-react";
import { toast } from "sonner";

interface Bidder {
  id: number;
  name: string;
  strategy: string;
  budget: number;
  currentBid: number;
  isActive: boolean;
  color: string;
}

interface AuctionItem {
  id: number;
  name: string;
  description: string;
  startingPrice: number;
  estimatedValue: number;
  category: string;
}

const AuctionSimulator = () => {
  const [auctionType, setAuctionType] = useState<string>("english");
  const [isRunning, setIsRunning] = useState(false);
  const [currentPrice, setCurrentPrice] = useState(100);
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [selectedItem, setSelectedItem] = useState<AuctionItem | null>(null);
  const [userBudget, setUserBudget] = useState(1000);
  const [userStrategy, setUserStrategy] = useState("greedy");
  const [auctionProgress, setAuctionProgress] = useState(0);
  const [winner, setWinner] = useState<Bidder | null>(null);

  const [bidders, setBidders] = useState<Bidder[]>([
    { id: 1, name: "Alice (Greedy)", strategy: "greedy", budget: 800, currentBid: 0, isActive: true, color: "bg-blue-500" },
    { id: 2, name: "Bob (Dynamic)", strategy: "dynamic", budget: 1200, currentBid: 0, isActive: true, color: "bg-green-500" },
    { id: 3, name: "Carol (Minimax)", strategy: "minimax", budget: 950, currentBid: 0, isActive: true, color: "bg-purple-500" },
    { id: 4, name: "You", strategy: userStrategy, budget: userBudget, currentBid: 0, isActive: true, color: "bg-orange-500" }
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

      // Simulate AI bidding behavior
      if (auctionType === "english") {
        simulateEnglishAuctionBids();
      } else if (auctionType === "dutch") {
        simulateDutchAuctionPrice();
      }

      setAuctionProgress(((60 - timeRemaining) / 60) * 100);
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, timeRemaining, auctionType]);

  const simulateEnglishAuctionBids = () => {
    setBidders(prev => prev.map(bidder => {
      if (bidder.name === "You" || !bidder.isActive) return bidder;

      // Algorithm-based bidding logic
      let newBid = bidder.currentBid;
      const remainingBudget = bidder.budget - bidder.currentBid;
      const estimatedValue = selectedItem?.estimatedValue || 500;

      switch (bidder.strategy) {
        case "greedy":
          // Greedy: Bid incrementally if below 70% of estimated value
          if (currentPrice < estimatedValue * 0.7 && remainingBudget > currentPrice * 0.1) {
            newBid = Math.min(currentPrice + 25, bidder.budget);
          }
          break;
        case "dynamic":
          // Dynamic Programming: Optimal bidding based on time and competition
          const timeRatio = timeRemaining / 60;
          const optimalBid = estimatedValue * (0.8 - timeRatio * 0.2);
          if (currentPrice < optimalBid && remainingBudget > optimalBid - currentPrice) {
            newBid = Math.min(Math.floor(optimalBid), bidder.budget);
          }
          break;
        case "minimax":
          // Game Theory: Counter other bidders' strategies
          const avgCompetitorBid = prev.filter(b => b.name !== bidder.name && b.isActive)
            .reduce((sum, b) => sum + b.currentBid, 0) / 3;
          const strategicBid = Math.max(avgCompetitorBid * 1.1, currentPrice + 15);
          if (strategicBid < estimatedValue * 0.85 && remainingBudget > strategicBid - currentPrice) {
            newBid = Math.min(strategicBid, bidder.budget);
          }
          break;
      }

      if (newBid > bidder.currentBid && newBid <= bidder.budget) {
        setCurrentPrice(newBid);
        return { ...bidder, currentBid: newBid };
      }

      // Deactivate if out of budget
      if (remainingBudget < 50) {
        return { ...bidder, isActive: false };
      }

      return bidder;
    }));
  };

  const simulateDutchAuctionPrice = () => {
    setCurrentPrice(prev => Math.max(prev - 20, 50));
  };

  const determineWinner = () => {
    const activeBidders = bidders.filter(b => b.isActive);
    const highestBidder = activeBidders.reduce((prev, current) => 
      prev.currentBid > current.currentBid ? prev : current
    );
    setWinner(highestBidder);
    toast.success(`Auction ended! Winner: ${highestBidder.name} with bid $${highestBidder.currentBid}`);
  };

  const startAuction = () => {
    if (!selectedItem) {
      toast.error("Please select an auction item first!");
      return;
    }
    setIsRunning(true);
    setWinner(null);
    setTimeRemaining(60);
    setAuctionProgress(0);
    toast.success("Auction started!");
  };

  const pauseAuction = () => {
    setIsRunning(false);
    toast.info("Auction paused");
  };

  const resetAuction = () => {
    setIsRunning(false);
    setCurrentPrice(selectedItem?.startingPrice || 100);
    setTimeRemaining(60);
    setAuctionProgress(0);
    setWinner(null);
    setBidders(prev => prev.map(bidder => ({
      ...bidder,
      currentBid: 0,
      isActive: true,
      budget: bidder.name === "You" ? userBudget : bidder.budget
    })));
    toast.info("Auction reset");
  };

  const placeBid = () => {
    if (!isRunning) return;
    
    const userBidder = bidders.find(b => b.name === "You");
    if (!userBidder) return;

    const bidAmount = currentPrice + 25;
    if (bidAmount > userBudget) {
      toast.error("Bid exceeds your budget!");
      return;
    }

    setBidders(prev => prev.map(bidder => 
      bidder.name === "You" 
        ? { ...bidder, currentBid: bidAmount }
        : bidder
    ));
    setCurrentPrice(bidAmount);
    toast.success(`Bid placed: $${bidAmount}`);
  };

  return (
    <div className="space-y-6">
      {/* Auction Setup */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="w-5 h-5" />
            <span>Auction Setup</span>
          </CardTitle>
          <CardDescription>
            Configure your auction parameters and select bidding strategy
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="auction-type">Auction Type</Label>
              <Select value={auctionType} onValueChange={setAuctionType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English Auction</SelectItem>
                  <SelectItem value="dutch">Dutch Auction</SelectItem>
                  <SelectItem value="sealed">Sealed-bid</SelectItem>
                  <SelectItem value="vickrey">Vickrey</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="auction-item">Auction Item</Label>
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
              <Label htmlFor="budget">Your Budget ($)</Label>
              <Input
                id="budget"
                type="number"
                value={userBudget}
                onChange={(e) => setUserBudget(Number(e.target.value))}
                min={100}
                max={5000}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="strategy">Your Strategy</Label>
              <Select value={userStrategy} onValueChange={setUserStrategy}>
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
          </div>
        </CardContent>
      </Card>

      {/* Live Auction */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <PlayCircle className="w-5 h-5" />
                  <span>Live Auction</span>
                  {isRunning && <Badge className="bg-red-500">LIVE</Badge>}
                </div>
                <div className="flex items-center space-x-2">
                  <Timer className="w-4 h-4" />
                  <span className="font-mono">{Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {selectedItem && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-lg">{selectedItem.name}</h3>
                  <p className="text-gray-600">{selectedItem.description}</p>
                  <div className="flex items-center justify-between mt-2">
                    <Badge variant="outline">{selectedItem.category}</Badge>
                    <span className="text-sm text-gray-500">
                      Est. Value: ${selectedItem.estimatedValue}
                    </span>
                  </div>
                </div>
              )}

              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  ${currentPrice.toLocaleString()}
                </div>
                <p className="text-gray-600">Current {auctionType === "dutch" ? "Price" : "Highest Bid"}</p>
              </div>

              <Progress value={auctionProgress} className="h-2" />

              <div className="flex justify-center space-x-3">
                {!isRunning ? (
                  <Button onClick={startAuction} className="bg-green-600 hover:bg-green-700">
                    <PlayCircle className="w-4 h-4 mr-2" />
                    Start Auction
                  </Button>
                ) : (
                  <Button onClick={pauseAuction} variant="outline">
                    <PauseCircle className="w-4 h-4 mr-2" />
                    Pause
                  </Button>
                )}
                <Button onClick={resetAuction} variant="outline">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
                {isRunning && auctionType === "english" && (
                  <Button onClick={placeBid} className="bg-blue-600 hover:bg-blue-700">
                    <DollarSign className="w-4 h-4 mr-2" />
                    Bid ${currentPrice + 25}
                  </Button>
                )}
              </div>

              {winner && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                  <Trophy className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-green-800">Auction Winner!</h3>
                  <p className="text-green-700">{winner.name} - ${winner.currentBid}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Bidders Panel */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>Bidders</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {bidders.map((bidder, index) => (
                <div key={bidder.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${bidder.color}`}></div>
                      <span className="font-medium text-sm">{bidder.name}</span>
                      {!bidder.isActive && <Badge variant="destructive" className="text-xs">Out</Badge>}
                    </div>
                    <span className="text-sm font-semibold">${bidder.currentBid}</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-gray-600">
                      <span>Budget: ${bidder.budget}</span>
                      <span>Remaining: ${bidder.budget - bidder.currentBid}</span>
                    </div>
                    <Progress 
                      value={(bidder.currentBid / bidder.budget) * 100} 
                      className="h-1"
                    />
                  </div>
                  {index < bidders.length - 1 && <Separator />}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AuctionSimulator;
