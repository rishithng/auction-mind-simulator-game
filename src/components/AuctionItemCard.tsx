
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Timer, 
  DollarSign, 
  TrendingUp,
  Target,
  Palette
} from "lucide-react";

interface AuctionItem {
  id: number;
  name: string;
  description: string;
  estimatedValue: number;
  startingPrice: number;
  currentPrice: number;
  category: string;
  sold: boolean;
}

interface AuctionItemCardProps {
  item: AuctionItem;
  round: number;
  totalRounds: number;
  timeRemaining: number;
  auctionProgress: number;
  isRunning: boolean;
  onPlaceBid: () => void;
  userBudget: number;
}

const AuctionItemCard = ({
  item,
  round,
  totalRounds,
  timeRemaining,
  auctionProgress,
  isRunning,
  onPlaceBid,
  userBudget
}: AuctionItemCardProps) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Art": return <Palette className="w-5 h-5" />;
      case "Electronics": return <Target className="w-5 h-5" />;
      case "Jewelry": return <TrendingUp className="w-5 h-5" />;
      default: return <DollarSign className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Art": return "bg-purple-500";
      case "Electronics": return "bg-blue-500";
      case "Jewelry": return "bg-yellow-500";
      case "Books": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const potentialProfit = item.estimatedValue - item.currentPrice;
  const nextBidAmount = item.currentPrice + 25;
  const canAffordBid = nextBidAmount <= userBudget;

  return (
    <Card className="border-2 border-blue-200 shadow-lg">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <div className={`w-10 h-10 ${getCategoryColor(item.category)} rounded-lg flex items-center justify-center`}>
                {getCategoryIcon(item.category)}
              </div>
              <div>
                <h2 className="text-xl font-bold">{item.name}</h2>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            </CardTitle>
          </div>
          <div className="text-right">
            <Badge className="bg-blue-500 mb-2">
              Round {round}/{totalRounds}
            </Badge>
            <div className="flex items-center space-x-2">
              <Timer className="w-4 h-4" />
              <span className="font-mono text-lg">
                {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Item Details */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-sm text-gray-600">Starting Price</p>
            <p className="text-lg font-semibold">₹{item.startingPrice}</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-3">
            <p className="text-sm text-gray-600">Current Price</p>
            <p className="text-2xl font-bold text-blue-600">₹{item.currentPrice}</p>
          </div>
          <div className="bg-green-50 rounded-lg p-3">
            <p className="text-sm text-gray-600">Estimated Value</p>
            <p className="text-lg font-semibold text-green-600">₹{item.estimatedValue}</p>
          </div>
        </div>

        {/* Profit Analysis */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4">
          <h3 className="font-semibold mb-2">Profit Analysis</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Potential Profit at Current Price</p>
              <p className={`text-lg font-bold ${potentialProfit > 0 ? 'text-green-600' : 'text-red-600'}`}>
                ₹{potentialProfit}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Your Remaining Budget</p>
              <p className="text-lg font-bold text-blue-600">₹{userBudget}</p>
            </div>
          </div>
        </div>

        {/* Progress and Controls */}
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Auction Progress</span>
              <span>{Math.round(auctionProgress)}%</span>
            </div>
            <Progress value={auctionProgress} className="h-3" />
          </div>

          <div className="flex space-x-3">
            {isRunning ? (
              <Button 
                onClick={onPlaceBid} 
                className={`flex-1 ${canAffordBid ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400'}`}
                disabled={!canAffordBid}
              >
                <DollarSign className="w-4 h-4 mr-2" />
                {canAffordBid ? `Bid ₹${nextBidAmount}` : 'Insufficient Budget'}
              </Button>
            ) : (
              <Button disabled className="flex-1 bg-gray-400">
                <Timer className="w-4 h-4 mr-2" />
                Auction Not Running
              </Button>
            )}
          </div>

          {!canAffordBid && isRunning && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-sm text-red-600">
                ⚠️ You don't have enough budget to place the next bid (₹{nextBidAmount})
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AuctionItemCard;
