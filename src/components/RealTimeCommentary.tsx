
import { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare,
  Brain,
  Target,
  Zap,
  Trophy,
  Clock
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

  // Auto-scroll to bottom when new comments are added
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [commentary]);

  const getTypeIcon = (type: string, strategy?: string) => {
    switch (type) {
      case 'strategy':
        if (strategy === 'greedy') return <Zap className="w-4 h-4 text-blue-500" />;
        if (strategy === 'dynamic') return <Brain className="w-4 h-4 text-green-500" />;
        if (strategy === 'minimax') return <Target className="w-4 h-4 text-purple-500" />;
        return <MessageSquare className="w-4 h-4" />;
      case 'action': return <Clock className="w-4 h-4 text-orange-500" />;
      case 'result': return <Trophy className="w-4 h-4 text-yellow-500" />;
      default: return <MessageSquare className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'strategy': return 'border-blue-200 bg-blue-50';
      case 'action': return 'border-orange-200 bg-orange-50';
      case 'result': return 'border-green-200 bg-green-50';
      default: return 'border-gray-200 bg-gray-50';
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
    <Card className="h-full bg-white/90 backdrop-blur-lg border border-white/20 shadow-xl">
      <CardHeader className="pb-3">
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
      </CardHeader>
      <CardContent className="pt-0">
        <ScrollArea className="h-64" ref={scrollAreaRef}>
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
                  className={`p-3 rounded-lg border-l-4 ${getTypeColor(entry.type)} animate-fade-in`}
                >
                  <div className="flex items-start justify-between mb-1">
                    <div className="flex items-center space-x-2">
                      {getTypeIcon(entry.type, entry.strategy)}
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${getStrategyColor(entry.strategy)} text-white border-0 px-2 py-0`}
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
                      <Badge className="bg-green-100 text-green-700 text-xs px-2 py-0">
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
