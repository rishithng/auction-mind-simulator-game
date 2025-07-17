
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  Timer,
  Trophy,
  DollarSign,
  Target,
  Palette,
  Gavel
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
  winner?: string;
  finalPrice?: number;
}

interface TurnBasedAuctionProps {
  item: AuctionItem;
  round: number;
  totalRounds: number;
  currentBidder: string;
  timeRemaining: number;
  onBidPlaced: (bidder: string, amount: number) => void;
  onBidderPass: (bidder: string) => void;
  isActive: boolean;
  roundProgress: number;
}

const TurnBasedAuction = ({
  item,
  round,
  totalRounds,
  currentBidder,
  timeRemaining,
  onBidPlaced,
  onBidderPass,
  isActive,
  roundProgress
}: TurnBasedAuctionProps) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Art": return <Palette className="w-6 h-6" />;
      case "Electronics": return <Target className="w-6 h-6" />;
      case "Jewelry": return <Trophy className="w-6 h-6" />;
      default: return <DollarSign className="w-6 h-6" />;
    }
  };

  const getCategoryGradient = (category: string) => {
    switch (category) {
      case "Art": return "from-purple-500 to-pink-500";
      case "Electronics": return "from-blue-500 to-cyan-500";
      case "Jewelry": return "from-yellow-500 to-orange-500";
      case "Books": return "from-green-500 to-emerald-500";
      default: return "from-gray-500 to-slate-500";
    }
  };

  const potentialProfit = item.estimatedValue - item.currentPrice;

  return (
    <Card className="overflow-hidden border-2 border-blue-200 shadow-xl">
      <CardHeader className="relative">
        {/* Background gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryGradient(item.category)} opacity-10`}></div>
        
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center space-x-4">
              <div className={`w-16 h-16 bg-gradient-to-br ${getCategoryGradient(item.category)} rounded-xl flex items-center justify-center text-white shadow-lg`}>
                {getCategoryIcon(item.category)}
              </div>
              <div>
                <CardTitle className="text-2xl font-bold">{item.name}</CardTitle>
                <p className="text-gray-600">{item.description}</p>
                <Badge className={`mt-2 bg-gradient-to-r ${getCategoryGradient(item.category)}`}>
                  {item.category}
                </Badge>
              </div>
            </div>
            
            <div className="text-right">
              <Badge className="bg-blue-500 text-white mb-2">
                Round {round}/{totalRounds}
              </Badge>
              <div className="flex items-center space-x-2">
                <Timer className="w-5 h-5 text-gray-500" />
                <span className="font-mono text-xl font-bold">
                  {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
                </span>
              </div>
            </div>
          </div>

          {/* Current Turn Indicator */}
          {isActive && (
            <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-3 mb-4">
              <div className="flex items-center justify-center space-x-2">
                <Gavel className="w-5 h-5 text-yellow-600" />
                <span className="font-semibold text-yellow-800">
                  {currentBidder}'s turn to bid
                </span>
              </div>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Price Information */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-xl">
            <p className="text-sm text-gray-600 mb-1">Starting Price</p>
            <p className="text-xl font-bold text-gray-800">₹{item.startingPrice}</p>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
            <p className="text-sm text-blue-600 mb-1">Current Bid</p>
            <p className="text-3xl font-bold text-blue-700">₹{item.currentPrice}</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-xl">
            <p className="text-sm text-green-600 mb-1">Estimated Value</p>
            <p className="text-xl font-bold text-green-700">₹{item.estimatedValue}</p>
          </div>
        </div>

        {/* Profit Analysis */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4">
          <h3 className="font-semibold mb-3 flex items-center space-x-2">
            <Target className="w-5 h-5" />
            <span>Profit Analysis</span>
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Potential Profit at Current Price</p>
              <p className={`text-2xl font-bold ${potentialProfit > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {potentialProfit > 0 ? '+' : ''}₹{potentialProfit}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Profit Margin</p>
              <p className={`text-2xl font-bold ${potentialProfit > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {item.estimatedValue > 0 ? ((potentialProfit / item.estimatedValue) * 100).toFixed(1) : 0}%
              </p>
            </div>
          </div>
        </div>

        {/* Round Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Round Progress</span>
            <span>{Math.round(roundProgress)}%</span>
          </div>
          <Progress value={roundProgress} className="h-3" />
        </div>

        {/* Auction Status */}
        <div className="text-center">
          {isActive ? (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-800 font-medium">
                🔥 Auction in progress - watching {currentBidder} make their move...
              </p>
            </div>
          ) : item.sold ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-800 font-medium">
                🏆 Sold to {item.winner} for ₹{item.finalPrice}
              </p>
            </div>
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <p className="text-gray-600">
                ⏳ Waiting for auction to start...
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TurnBasedAuction;
