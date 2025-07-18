
import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  MessageSquare,
  Brain,
  Target,
  Zap,
  Trophy,
  Clock,
  ArrowDown,
  Pause,
  Play
} from "lucide-react";

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

interface RealTimeCommentaryProps {
  commentary: CommentaryEntry[];
  currentRound: number;
  isActive: boolean;
}

const RealTimeCommentary = ({ commentary, currentRound, isActive }: RealTimeCommentaryProps) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [autoScroll, setAutoScroll] = useState(true);
  const [isNearBottom, setIsNearBottom] = useState(true);

  // Check if user is near bottom of scroll area
  const checkScrollPosition = () => {
    if (scrollAreaRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollAreaRef.current;
      const isNear = scrollHeight - scrollTop - clientHeight < 50;
      setIsNearBottom(isNear);
    }
  };

  // Auto-scroll to bottom when new comments are added, but only if auto-scroll is enabled and user is near bottom
  useEffect(() => {
    if (autoScroll && isNearBottom && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [commentary, autoScroll, isNearBottom]);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    setAutoScroll(true);
  };

  const getTypeIcon = (type: string, strategy?: string) => {
    switch (type) {
      case 'strategy':
        if (strategy === 'greedy') return <Zap className="w-3 h-3 text-blue-500" />;
        if (strategy === 'dynamic') return <Brain className="w-3 h-3 text-green-500" />;
        if (strategy === 'minimax') return <Target className="w-3 h-3 text-purple-500" />;
        return <MessageSquare className="w-3 h-3" />;
      case 'action': return <Clock className="w-3 h-3 text-orange-500" />;
      case 'result': return <Trophy className="w-3 h-3 text-yellow-500" />;
      default: return <MessageSquare className="w-3 h-3 text-gray-500" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'strategy': return 'border-blue-200 bg-blue-50/50';
      case 'action': return 'border-orange-200 bg-orange-50/50';
      case 'result': return 'border-green-200 bg-green-50/50';
      default: return 'border-gray-200 bg-gray-50/50';
    }
  };

  const getStrategyColor = (strategy: string) => {
    switch (strategy) {
      case 'greedy': return 'bg-blue-500';
      case 'dynamic': return 'bg-green-500';
      case 'minimax': return 'bg-purple-500';
      default: return 'bg-orange-500';
    }
  };

  return (
    <Card className="h-full bg-white/90 backdrop-blur-lg border border-white/20 shadow-lg">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2 text-sm">
            <MessageSquare className="w-4 h-4 text-purple-600" />
            <span>Live Commentary</span>
            {isActive && (
              <Badge className="bg-red-500 animate-pulse text-xs px-2 py-0">
                <div className="w-1.5 h-1.5 bg-white rounded-full mr-1"></div>
                LIVE
              </Badge>
            )}
          </CardTitle>
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setAutoScroll(!autoScroll)}
              className="h-6 w-6 p-0"
            >
              {autoScroll ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            </Button>
            {!isNearBottom && (
              <Button
                variant="ghost"
                size="sm"
                onClick={scrollToBottom}
                className="h-6 w-6 p-0"
              >
                <ArrowDown className="w-3 h-3" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <ScrollArea 
          className="h-64" 
          ref={scrollAreaRef}
          onScrollCapture={checkScrollPosition}
        >
          <div className="space-y-2 pr-2">
            {commentary.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Commentary will appear here</p>
              </div>
            ) : (
              commentary.map((entry) => (
                <div
                  key={entry.id}
                  className={`p-2 rounded-lg border-l-3 ${getTypeColor(entry.type)} animate-fade-in`}
                >
                  <div className="flex items-start justify-between mb-1">
                    <div className="flex items-center space-x-2">
                      {getTypeIcon(entry.type, entry.strategy)}
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${getStrategyColor(entry.strategy)} text-white border-0 px-1.5 py-0`}
                      >
                        {entry.bidder}
                      </Badge>
                      <span className="text-xs text-gray-500">R{entry.round}</span>
                    </div>
                    <span className="text-xs text-gray-400">{entry.timestamp}</span>
                  </div>
                  
                  <div className="mb-1">
                    <span className="font-medium text-xs text-gray-700">
                      {entry.itemName}
                    </span>
                  </div>
                  
                  <p className="text-xs text-gray-800 leading-relaxed">
                    {entry.message}
                  </p>
                  
                  {entry.amount && (
                    <div className="mt-1">
                      <Badge className="bg-green-100 text-green-700 text-xs px-1.5 py-0">
                        ₹{entry.amount}
                      </Badge>
                    </div>
                  )}
                </div>
              ))
            )}
            {/* Invisible element to scroll to */}
            <div ref={bottomRef} />
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default RealTimeCommentary;
