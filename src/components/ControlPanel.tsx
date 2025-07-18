
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Play,
  Pause,
  RotateCcw,
  Settings,
  FastForward,
  Trophy,
  Clock
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
  return (
    <Card className="bg-white/90 backdrop-blur-lg border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center space-x-2 text-sm">
          <Settings className="w-4 h-4 text-blue-600" />
          <span>Controls</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-0">
        
        {/* Auction Controls */}
        <div className="space-y-2">
          <div className="flex space-x-2">
            {!isRunning ? (
              <Button 
                onClick={onStart} 
                size="sm"
                className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
              >
                <Play className="w-3 h-3 mr-1" />
                Start
              </Button>
            ) : isPaused ? (
              <Button 
                onClick={onStart} 
                size="sm"
                className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
              >
                <Play className="w-3 h-3 mr-1" />
                Resume
              </Button>
            ) : (
              <Button 
                onClick={onPause} 
                size="sm"
                className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
              >
                <Pause className="w-3 h-3 mr-1" />
                Pause
              </Button>
            )}
            
            <Button 
              onClick={onRestart} 
              variant="outline" 
              size="sm"
              className="hover:bg-gray-50"
            >
              <RotateCcw className="w-3 h-3" />
            </Button>
          </div>

          {/* Progress Info */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-3 text-xs">
            <div className="flex justify-between items-center mb-1">
              <Badge variant="outline" className="text-xs px-2 py-0">
                <Trophy className="w-3 h-3 mr-1" />
                {currentRound + 1}/{totalRounds}
              </Badge>
              {isRunning && (
                <div className="flex items-center space-x-1 text-gray-600">
                  <Clock className="w-3 h-3" />
                  <span>{timeRemaining}s</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="space-y-2">
          <div className="flex items-center justify-between p-2 bg-purple-50 rounded-lg">
            <Label htmlFor="slow-mode" className="text-xs font-medium flex items-center space-x-1">
              <FastForward className="w-3 h-3 text-purple-500" />
              <span>Slow Mode</span>
            </Label>
            <Switch
              id="slow-mode"
              checked={slowMode}
              onCheckedChange={onSlowModeToggle}
              className="scale-75"
            />
          </div>
        </div>

        {/* Quick Guide */}
        <div className="bg-blue-50 rounded-lg p-2 text-xs">
          <div className="font-medium text-blue-800 mb-1">Strategies:</div>
          <div className="space-y-1 text-blue-700">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>⚡ Greedy: Quick decisions</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>🧠 DP: Future planning</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>🎯 Minimax: Counter moves</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ControlPanel;
