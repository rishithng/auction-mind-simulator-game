
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
  Clock,
  Sparkles,
  Star,
  Trophy,
  Coins,
  Wallet,
  Activity
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
      case "knapsack": return <Wallet className="w-4 h-4" />;
      default: return <User className="w-4 h-4" />;
    }
  };

  const getStrategyColor = (strategy: string) => {
    switch (strategy) {
      case "greedy": return "from-blue-500 to-blue-600";
      case "dynamic": return "from-emerald-500 to-emerald-600";
      case "minimax": return "from-purple-500 to-purple-600";
      case "knapsack": return "from-orange-500 to-orange-600";
      default: return "from-gray-500 to-gray-600";
    }
  };

  const budgetPercentage = (bidder.remainingBudget / bidder.initialBudget) * 100;
  const netProfit = bidder.totalProfit - bidder.totalLoss;

  const getAnimationClasses = () => {
    if (isThinking) return "animate-gentle-glow";
    if (lastAction === 'bid') return "animate-subtle-scale";
    if (lastAction === 'won') return "animate-fade-slide-up";
    return "";
  };

  const getBorderGradient = () => {
    if (isCurrentTurn) return "bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-500";
    if (lastAction === 'won') return "bg-gradient-to-br from-emerald-400 to-emerald-600";
    if (lastAction === 'bid') return "bg-gradient-to-br from-blue-400 to-blue-600";
    return "bg-gradient-to-br from-border to-border";
  };

  return (
    <div className={`relative group transition-all duration-500 ${getAnimationClasses()}`}>
      {/* Gradient border wrapper */}
      <div className={`absolute inset-0 rounded-xl p-[2px] ${getBorderGradient()} transition-all duration-500`}>
        <div className="h-full w-full rounded-xl bg-card" />
      </div>
      
      <div className={`relative p-6 rounded-xl bg-card/95 backdrop-blur-sm transition-all duration-500 hover:bg-card/100 ${
        isCurrentTurn ? 'shadow-2xl shadow-yellow-500/20 scale-105' : 'shadow-lg hover:shadow-xl'
      }`}>
        
        {/* Floating particles for current turn */}
        {isCurrentTurn && (
          <>
            <div className="absolute -top-1 -left-1 w-2 h-2 bg-yellow-400 rounded-full animate-particle-float opacity-60"></div>
            <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-amber-400 rounded-full animate-particle-float opacity-60" style={{ animationDelay: '2s' }}></div>
            <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-yellow-500 rounded-full animate-particle-float opacity-60" style={{ animationDelay: '4s' }}></div>
          </>
        )}

        {/* Current Turn Indicator */}
        {isCurrentTurn && (
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <Badge className="bg-gradient-to-r from-yellow-500 to-amber-500 text-white animate-gentle-glow shadow-lg">
              <Clock className="w-3 h-3 mr-1" />
              <span className="font-medium">Active</span>
            </Badge>
          </div>
        )}

        {/* Avatar and Basic Info */}
        <div className="flex items-center space-x-4 mb-4">
          <div className="relative">
            <Avatar className={`w-16 h-16 border-4 bg-gradient-to-br ${getStrategyColor(bidder.strategy)} shadow-lg ${
              isThinking ? 'animate-gentle-glow' : ''
            } transition-all duration-300`}>
              <AvatarFallback className="text-white text-lg font-bold bg-transparent">
                {bidder.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            {/* Strategy Icon with subtle animation */}
            <div className={`absolute -bottom-1 -right-1 w-7 h-7 bg-gradient-to-br ${getStrategyColor(bidder.strategy)} rounded-full flex items-center justify-center shadow-lg border-2 border-background group-hover:animate-float transition-all duration-300`}>
              {getStrategyIcon(bidder.strategy)}
            </div>
          </div>

          <div className="flex-1">
            <h3 className="font-bold text-lg text-foreground">{bidder.name}</h3>
            <p className="text-sm text-muted-foreground capitalize flex items-center space-x-1">
              <Activity className="w-3 h-3" />
              <span>{bidder.strategy} Strategy</span>
            </p>
            {bidder.currentBid > 0 && (
              <Badge variant="outline" className="mt-1 bg-primary/10 border-primary/30">
                <Coins className="w-3 h-3 mr-1" />
                Current Bid: ₹{bidder.currentBid}
              </Badge>
            )}
          </div>

          {/* Last Action Indicator with enhanced styling */}
          {lastAction && (
            <div className={`px-3 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
              lastAction === 'bid' ? 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 dark:from-blue-900/30 dark:to-blue-800/30 dark:text-blue-300' :
              lastAction === 'pass' ? 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 dark:from-gray-800/30 dark:to-gray-700/30 dark:text-gray-300' :
              lastAction === 'won' ? 'bg-gradient-to-r from-emerald-100 to-emerald-200 text-emerald-800 dark:from-emerald-900/30 dark:to-emerald-800/30 dark:text-emerald-300' : ''
            } shadow-sm`}>
              <div className="flex items-center space-x-1">
                {lastAction === 'bid' && <Zap className="w-3 h-3" />}
                {lastAction === 'pass' && <Clock className="w-3 h-3" />}
                {lastAction === 'won' && <Trophy className="w-3 h-3" />}
                <span>
                  {lastAction === 'bid' ? 'Bid Placed' : 
                   lastAction === 'pass' ? 'Passed' : 
                   lastAction === 'won' ? 'Won Item!' : ''}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Budget Progress with enhanced styling */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground flex items-center space-x-1">
              <Wallet className="w-3 h-3" />
              <span>Budget Remaining</span>
            </span>
            <span className="font-medium text-foreground">₹{bidder.remainingBudget.toLocaleString()}</span>
          </div>
          <div className="relative">
            <Progress value={budgetPercentage} className="h-3 bg-muted" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer rounded-full opacity-30"></div>
          </div>
          <div className="text-xs text-muted-foreground mt-1 flex justify-between">
            <span>{budgetPercentage.toFixed(1)}% remaining</span>
            <span>of ₹{bidder.initialBudget.toLocaleString()}</span>
          </div>
        </div>

        {/* Performance Stats with better icons and animations */}
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="bg-muted/50 rounded-lg p-3 hover:bg-muted/70 transition-all duration-300 group">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Trophy className="w-4 h-4 text-amber-500 group-hover:animate-float" />
              <p className="text-xs text-muted-foreground">Items Won</p>
            </div>
            <p className="font-bold text-lg text-foreground">{bidder.itemsWon.length}</p>
          </div>
          <div className="bg-blue-50/50 dark:bg-blue-950/20 rounded-lg p-3 hover:bg-blue-50/70 dark:hover:bg-blue-950/30 transition-all duration-300 group">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Coins className="w-4 h-4 text-blue-500 group-hover:animate-float" />
              <p className="text-xs text-muted-foreground">Total Spent</p>
            </div>
            <p className="font-bold text-lg text-blue-600 dark:text-blue-400">₹{bidder.totalSpent.toLocaleString()}</p>
          </div>
          <div className="bg-emerald-50/50 dark:bg-emerald-950/20 rounded-lg p-3 hover:bg-emerald-50/70 dark:hover:bg-emerald-950/30 transition-all duration-300 group">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Star className="w-4 h-4 text-emerald-500 group-hover:animate-float" />
              <p className="text-xs text-muted-foreground">Net Profit</p>
            </div>
            <div className={`font-bold text-lg flex items-center justify-center space-x-1 ${
              netProfit > 0 ? 'text-emerald-600 dark:text-emerald-400' : 
              netProfit < 0 ? 'text-red-600 dark:text-red-400' : 'text-muted-foreground'
            }`}>
              {netProfit > 0 ? <TrendingUp className="w-4 h-4" /> : 
               netProfit < 0 ? <TrendingDown className="w-4 h-4" /> : null}
              <span>₹{Math.abs(netProfit).toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Items Won Preview with enhanced styling */}
        {bidder.itemsWon.length > 0 && (
          <div className="mt-4 bg-gradient-to-r from-emerald-50/50 to-emerald-100/50 dark:from-emerald-950/20 dark:to-emerald-900/20 rounded-lg p-3 border border-emerald-200/30 dark:border-emerald-800/30">
            <p className="text-xs font-medium text-emerald-800 dark:text-emerald-300 mb-2 flex items-center space-x-1">
              <Sparkles className="w-3 h-3" />
              <span>Recent Wins:</span>
            </p>
            <div className="space-y-1">
              {bidder.itemsWon.slice(-2).map((item, index) => (
                <div key={item.id} className="flex justify-between text-xs hover:bg-emerald-100/30 dark:hover:bg-emerald-800/20 rounded px-2 py-1 transition-colors duration-200">
                  <span className="text-emerald-700 dark:text-emerald-300 truncate">{item.name}</span>
                  <span className="font-semibold text-emerald-800 dark:text-emerald-200">₹{item.finalPrice.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Thinking Animation with enhanced styling */}
        {isThinking && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm rounded-xl flex items-center justify-center">
            <div className="text-center">
              <div className="relative mb-3">
                <div className="animate-spin rounded-full h-10 w-10 border-2 border-primary/20 border-t-primary mx-auto"></div>
                <div className="absolute inset-0 rounded-full h-10 w-10 border border-primary/10 animate-ping"></div>
              </div>
              <p className="text-sm text-muted-foreground font-medium">Analyzing...</p>
              <p className="text-xs text-muted-foreground/70">Computing optimal bid</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnimatedBidder;
