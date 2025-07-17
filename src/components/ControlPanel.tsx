
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
  FastForward
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
      color: "bg-blue-500",
      description: "Bids aggressively on items with good profit margins"
    },
    {
      name: "Dynamic Programming",
      icon: <Brain className="w-4 h-4" />,
      color: "bg-green-500",
      description: "Considers future opportunities before bidding"
    },
    {
      name: "Minimax",
      icon: <Target className="w-4 h-4" />,
      color: "bg-purple-500",
      description: "Anticipates and counters opponents' strategies"
    },
    {
      name: "User",
      icon: <User className="w-4 h-4" />,
      color: "bg-orange-500",
      description: "Your chosen strategy (now automated)"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Settings className="w-5 h-5" />
          <span>Control Panel</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Auction Controls */}
        <div className="space-y-4">
          <h4 className="font-semibold flex items-center space-x-2">
            <Play className="w-4 h-4" />
            <span>Auction Controls</span>
          </h4>
          
          <div className="flex space-x-2">
            {!isRunning ? (
              <Button onClick={onStart} className="flex-1 bg-green-600 hover:bg-green-700">
                <Play className="w-4 h-4 mr-2" />
                Start Auction
              </Button>
            ) : isPaused ? (
              <Button onClick={onStart} className="flex-1 bg-blue-600 hover:bg-blue-700">
                <Play className="w-4 h-4 mr-2" />
                Resume
              </Button>
            ) : (
              <Button onClick={onPause} className="flex-1 bg-yellow-600 hover:bg-yellow-700">
                <Pause className="w-4 h-4 mr-2" />
                Pause
              </Button>
            )}
            
            <Button onClick={onRestart} variant="outline">
              <RotateCcw className="w-4 h-4 mr-2" />
              Restart
            </Button>
          </div>

          {/* Progress Info */}
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Progress</span>
              <Badge variant="outline">
                Round {currentRound + 1} of {totalRounds}
              </Badge>
            </div>
            {isRunning && (
              <div className="flex items-center space-x-2 text-sm">
                <Clock className="w-4 h-4 text-gray-500" />
                <span>Time remaining: {timeRemaining}s</span>
              </div>
            )}
          </div>
        </div>

        <Separator />

        {/* Settings */}
        <div className="space-y-4">
          <h4 className="font-semibold flex items-center space-x-2">
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </h4>
          
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="slow-mode" className="text-sm font-medium">
                Slow Mode
              </Label>
              <p className="text-xs text-gray-500">
                Step-by-step bidding with delays
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <FastForward className="w-4 h-4 text-gray-400" />
              <Switch
                id="slow-mode"
                checked={slowMode}
                onCheckedChange={onSlowModeToggle}
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* Strategy Guide */}
        <div className="space-y-4">
          <h4 className="font-semibold flex items-center space-x-2">
            <Info className="w-4 h-4" />
            <span>Strategy Guide</span>
          </h4>
          
          <div className="space-y-3">
            {strategies.map((strategy, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className={`w-8 h-8 ${strategy.color} rounded-full flex items-center justify-center text-white`}>
                  {strategy.icon}
                </div>
                <div className="flex-1">
                  <h5 className="font-medium text-sm">{strategy.name}</h5>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {strategy.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rules */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h5 className="font-medium text-blue-800 mb-2">How it works:</h5>
          <ul className="text-xs text-blue-700 space-y-1">
            <li>• Each bidder takes turns to bid or pass</li>
            <li>• Bidders use different strategies to decide</li>
            <li>• Highest bidder wins when round ends</li>
            <li>• Winners pay their bid amount</li>
            <li>• Profit = Item Value - Amount Paid</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default ControlPanel;
