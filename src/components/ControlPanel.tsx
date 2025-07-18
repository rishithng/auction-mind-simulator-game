
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Play,
  Pause,
  RotateCcw,
  Settings,
  Info,
  Zap,
  Brain,
  Target,
  User,
  Clock,
  FastForward,
  Sparkles,
  Trophy,
  TrendingUp
} from "lucide-react";

interface ControlPanelProps {
  isRunning: boolean;
  isPaused: boolean;
  slowMode: boolean;
  onStart: () => void;
  onPause: () => void;
  onRestart: () => void;
  onSlowModeToggle: (enabled: boolean) => void;
  currentRound: number;
  totalRounds: number;
  timeRemaining: number;
}

const ControlPanel = ({
  isRunning,
  isPaused,
  slowMode,
  onStart,
  onPause,
  onRestart,
  onSlowModeToggle,
  currentRound,
  totalRounds,
  timeRemaining
}: ControlPanelProps) => {
  const strategies = [
    {
      name: "Greedy",
      icon: <Zap className="w-4 h-4" />,
      color: "bg-gradient-to-br from-blue-500 to-blue-600",
      description: "Bids aggressively on items with good profit margins",
      emoji: "⚡"
    },
    {
      name: "Dynamic Programming",
      icon: <Brain className="w-4 h-4" />,
      color: "bg-gradient-to-br from-green-500 to-green-600",
      description: "Considers future opportunities before bidding",
      emoji: "🧠"
    },
    {
      name: "Minimax",
      icon: <Target className="w-4 h-4" />,
      color: "bg-gradient-to-br from-purple-500 to-purple-600",
      description: "Anticipates and counters opponents' strategies",
      emoji: "🎯"
    },
    {
      name: "User",
      icon: <User className="w-4 h-4" />,
      color: "bg-gradient-to-br from-orange-500 to-orange-600",
      description: "Your chosen strategy (now automated)",
      emoji: "👤"
    }
  ];

  return (
    <Card className="bg-white/90 backdrop-blur-lg border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-lg border-b border-white/20">
        <CardTitle className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center shadow-lg">
            <Settings className="w-5 h-5 text-white" />
          </div>
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Control Panel
          </span>
          <Sparkles className="w-5 h-5 text-purple-500 animate-pulse" />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        
        {/* Auction Controls */}
        <div className="space-y-4">
          <h4 className="font-semibold flex items-center space-x-2 text-gray-800">
            <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
              <Play className="w-3 h-3 text-white" />
            </div>
            <span>Auction Controls</span>
          </h4>
          
          <div className="flex space-x-3">
            {!isRunning ? (
              <Button 
                onClick={onStart} 
                className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-0"
              >
                <Play className="w-4 h-4 mr-2" />
                <span className="font-semibold">Start Auction</span>
              </Button>
            ) : isPaused ? (
              <Button 
                onClick={onStart} 
                className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-0"
              >
                <Play className="w-4 h-4 mr-2" />
                <span className="font-semibold">Resume</span>
              </Button>
            ) : (
              <Button 
                onClick={onPause} 
                className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-0"
              >
                <Pause className="w-4 h-4 mr-2" />
                <span className="font-semibold">Pause</span>
              </Button>
            )}
            
            <Button 
              onClick={onRestart} 
              variant="outline" 
              className="hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 hover:border-gray-300 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 border-2"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              <span className="font-semibold">Restart</span>
            </Button>
          </div>

          {/* Progress Info */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-200/50 shadow-inner">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-blue-500" />
                <span>Progress</span>
              </span>
              <Badge 
                variant="outline" 
                className="bg-white/80 border-blue-300 text-blue-700 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <Trophy className="w-3 h-3 mr-1" />
                Round {currentRound + 1} of {totalRounds}
              </Badge>
            </div>
            {isRunning && (
              <div className="flex items-center space-x-2 text-sm bg-white/60 rounded-lg p-2 shadow-sm">
                <Clock className="w-4 h-4 text-gray-500 animate-pulse" />
                <span className="font-medium text-gray-700">Time remaining: {timeRemaining}s</span>
              </div>
            )}
          </div>
        </div>

        <Separator className="bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

        {/* Settings */}
        <div className="space-y-4">
          <h4 className="font-semibold flex items-center space-x-2 text-gray-800">
            <div className="w-6 h-6 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
              <Settings className="w-3 h-3 text-white" />
            </div>
            <span>Settings</span>
          </h4>
          
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200/50 hover:shadow-md transition-all duration-300">
            <div className="space-y-1">
              <Label htmlFor="slow-mode" className="text-sm font-semibold text-gray-800 flex items-center space-x-2">
                <FastForward className="w-4 h-4 text-purple-500" />
                <span>Slow Mode</span>
              </Label>
              <p className="text-xs text-gray-600 leading-relaxed">
                Step-by-step bidding with delays for better visualization
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Switch
                id="slow-mode"
                checked={slowMode}
                onCheckedChange={onSlowModeToggle}
                className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-purple-500 data-[state=checked]:to-pink-500"
              />
            </div>
          </div>
        </div>

        <Separator className="bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

        {/* Strategy Guide */}
        <div className="space-y-4">
          <h4 className="font-semibold flex items-center space-x-2 text-gray-800">
            <div className="w-6 h-6 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center">
              <Info className="w-3 h-3 text-white" />
            </div>
            <span>Strategy Guide</span>
          </h4>
          
          <div className="space-y-3">
            {strategies.map((strategy, index) => (
              <div 
                key={index} 
                className="flex items-start space-x-3 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200/50 hover:shadow-lg hover:border-gray-300/50 transition-all duration-300 hover:scale-102 transform group"
              >
                <div className={`w-10 h-10 ${strategy.color} rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {strategy.icon}
                </div>
                <div className="flex-1">
                  <h5 className="font-semibold text-sm text-gray-800 group-hover:text-blue-600 transition-colors duration-300 flex items-center space-x-2">
                    <span>{strategy.name}</span>
                    <span className="text-lg">{strategy.emoji}</span>
                  </h5>
                  <p className="text-xs text-gray-600 leading-relaxed mt-1">
                    {strategy.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rules */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-100 border-2 border-blue-200/50 rounded-xl p-5 shadow-inner hover:shadow-lg transition-shadow duration-300">
          <h5 className="font-semibold text-blue-800 mb-3 flex items-center space-x-2">
            <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
              <Info className="w-3 h-3 text-white" />
            </div>
            <span>How it works:</span>
          </h5>
          <ul className="text-xs text-blue-700 space-y-2 leading-relaxed">
            <li className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
              <span>Each bidder takes turns to bid or pass</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
              <span>Bidders use different strategies to decide</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
              <span>Highest bidder wins when round ends</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
              <span>Winners pay their bid amount</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
              <span>Profit = Item Value - Amount Paid</span>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default ControlPanel;
