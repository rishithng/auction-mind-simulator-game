
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Brain,
  Target,
  Zap,
  User,
  TrendingUp,
  TrendingDown,
  Clock
} from "lucide-react";

interface Bidder {
  id: number;
  name: string;
  strategy: string;
  initialBudget: number;
  remainingBudget: number;
  currentBid: number;
  itemsWon: any[];
  totalSpent: number;
  totalProfit: number;
  totalLoss: number;
  isActive: boolean;
  color: string;
  efficiency: number;
  avatar: string;
}

interface AnimatedBidderProps {
  bidder: Bidder;
  isCurrentTurn: boolean;
  isThinking: boolean;
  lastAction: 'bid' | 'pass' | 'won' | null;
  position: number;
}

const AnimatedBidder = ({ bidder, isCurrentTurn, isThinking, lastAction, position }: AnimatedBidderProps) => {
  const getStrategyIcon = (strategy: string) => {
    switch (strategy) {
      case "greedy": return <Zap className="w-4 h-4" />;
      case "dynamic": return <Brain className="w-4 h-4" />;
      case "minimax": return <Target className="w-4 h-4" />;
      default: return <User className="w-4 h-4" />;
    }
  };

  const getStrategyColor = (strategy: string) => {
    switch (strategy) {
      case "greedy": return "bg-blue-500";
      case "dynamic": return "bg-green-500";
      case "minimax": return "bg-purple-500";
      default: return "bg-orange-500";
    }
  };

  const budgetPercentage = (bidder.remainingBudget / bidder.initialBudget) * 100;
  const netProfit = bidder.totalProfit - bidder.totalLoss;

  const getActionAnimation = () => {
    if (isThinking) return "animate-pulse";
    if (lastAction === 'bid') return "animate-bounce";
    if (lastAction === 'won') return "animate-scale-in";
    return "";
  };

  return (
    <div className={`relative p-6 rounded-xl border-2 transition-all duration-500 ${
      isCurrentTurn 
        ? 'border-yellow-400 bg-gradient-to-br from-yellow-50 to-amber-50 shadow-lg scale-105' 
        : 'border-gray-200 bg-white'
    } ${getActionAnimation()}`}>
      
      {/* Current Turn Indicator */}
      {isCurrentTurn && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <Badge className="bg-yellow-500 text-white animate-pulse">
            <Clock className="w-3 h-3 mr-1" />
            Your Turn
          </Badge>
        </div>
      )}

      {/* Avatar and Basic Info */}
      <div className="flex items-center space-x-4 mb-4">
        <div className="relative">
          <Avatar className={`w-16 h-16 border-4 ${getStrategyColor(bidder.strategy)} ${
            isThinking ? 'animate-pulse' : ''
          }`}>
            <AvatarFallback className="text-white text-lg font-bold">
              {bidder.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          
          {/* Strategy Icon */}
          <div className={`absolute -bottom-1 -right-1 w-6 h-6 ${getStrategyColor(bidder.strategy)} rounded-full flex items-center justify-center`}>
            {getStrategyIcon(bidder.strategy)}
          </div>
        </div>

        <div className="flex-1">
          <h3 className="font-bold text-lg">{bidder.name}</h3>
          <p className="text-sm text-gray-600 capitalize">{bidder.strategy} Strategy</p>
          {bidder.currentBid > 0 && (
            <Badge variant="outline" className="mt-1">
              Current Bid: ₹{bidder.currentBid}
            </Badge>
          )}
        </div>

        {/* Last Action Indicator */}
        {lastAction && (
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
            lastAction === 'bid' ? 'bg-blue-100 text-blue-700' :
            lastAction === 'pass' ? 'bg-gray-100 text-gray-700' :
            lastAction === 'won' ? 'bg-green-100 text-green-700' : ''
          }`}>
            {lastAction === 'bid' ? '💰 Bid' : 
             lastAction === 'pass' ? '⏭️ Pass' : 
             lastAction === 'won' ? '🏆 Won' : ''}
          </div>
        )}
      </div>

      {/* Budget Progress */}
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-600">Budget Remaining</span>
          <span className="font-medium">₹{bidder.remainingBudget}</span>
        </div>
        <Progress value={budgetPercentage} className="h-2" />
        <div className="text-xs text-gray-500 mt-1">
          {budgetPercentage.toFixed(1)}% of ₹{bidder.initialBudget}
        </div>
      </div>

      {/* Performance Stats */}
      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="bg-gray-50 rounded-lg p-2">
          <p className="text-xs text-gray-600">Items Won</p>
          <p className="font-bold text-lg">{bidder.itemsWon.length}</p>
        </div>
        <div className="bg-blue-50 rounded-lg p-2">
          <p className="text-xs text-gray-600">Total Spent</p>
          <p className="font-bold text-lg text-blue-600">₹{bidder.totalSpent}</p>
        </div>
        <div className="bg-green-50 rounded-lg p-2">
          <p className="text-xs text-gray-600">Net Profit</p>
          <div className={`font-bold text-lg flex items-center justify-center space-x-1 ${
            netProfit > 0 ? 'text-green-600' : netProfit < 0 ? 'text-red-600' : 'text-gray-500'
          }`}>
            {netProfit > 0 ? <TrendingUp className="w-4 h-4" /> : 
             netProfit < 0 ? <TrendingDown className="w-4 h-4" /> : null}
            <span>₹{Math.abs(netProfit)}</span>
          </div>
        </div>
      </div>

      {/* Items Won Preview */}
      {bidder.itemsWon.length > 0 && (
        <div className="mt-4 bg-green-50 rounded-lg p-3">
          <p className="text-xs font-medium text-green-800 mb-2">Recent Wins:</p>
          <div className="space-y-1">
            {bidder.itemsWon.slice(-2).map((item, index) => (
              <div key={item.id} className="flex justify-between text-xs">
                <span className="text-green-700 truncate">{item.name}</span>
                <span className="font-semibold">₹{item.finalPrice}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Thinking Animation */}
      {isThinking && (
        <div className="absolute inset-0 bg-white bg-opacity-80 rounded-xl flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
            <p className="text-sm text-gray-600">Thinking...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnimatedBidder;
