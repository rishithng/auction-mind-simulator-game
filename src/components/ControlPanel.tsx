
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
    <Card className="bg-white/90 backdrop-blur-lg border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardContent className="p-4">
        <div className="flex items-center justify-between space-x-6">
          
          {/* Left: Controls */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Settings className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium">Controls</span>
            </div>
            
            <div className="flex space-x-2">
              {!isRunning ? (
                <Button 
                  onClick={onStart} 
                  size="sm"
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 h-8"
                >
                  <Play className="w-3 h-3 mr-1" />
                  Start
                </Button>
              ) : isPaused ? (
                <Button 
                  onClick={onStart} 
                  size="sm"
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 h-8"
                >
                  <Play className="w-3 h-3 mr-1" />
                  Resume
                </Button>
              ) : (
                <Button 
                  onClick={onPause} 
                  size="sm"
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 h-8"
                >
                  <Pause className="w-3 h-3 mr-1" />
                  Pause
                </Button>
              )}
              
              <Button 
                onClick={onRestart} 
                variant="outline" 
                size="sm"
                className="hover:bg-gray-50 h-8"
              >
                <RotateCcw className="w-3 h-3" />
              </Button>
            </div>
          </div>

          {/* Center: Progress Info */}
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="text-xs px-2 py-1">
              <Trophy className="w-3 h-3 mr-1" />
              Round {currentRound + 1}/{totalRounds}
            </Badge>
            {isRunning && (
              <div className="flex items-center space-x-1 text-gray-600">
                <Clock className="w-3 h-3" />
                <span className="text-sm">{timeRemaining}s</span>
              </div>
            )}
          </div>

          {/* Right: Settings */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 p-2 bg-purple-50 rounded-lg">
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
        </div>
      </CardContent>
    </Card>
  );
};

export default ControlPanel;
