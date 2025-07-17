
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Trophy,
  TrendingUp,
  TrendingDown,
  RotateCcw,
  Target,
  DollarSign,
  ShoppingCart,
  Award,
  Calculator
} from "lucide-react";

interface AuctionItem {
  id: number;
  name: string;
  description: string;
  estimatedValue: number;
  finalPrice?: number;
  winner?: string;
  sold: boolean;
}

interface Bidder {
  id: number;
  name: string;
  strategy: string;
  initialBudget: number;
  remainingBudget: number;
  itemsWon: AuctionItem[];
  totalSpent: number;
  totalProfit: number;
  totalLoss: number;
  efficiency: number;
  color: string;
}

interface AuctionResultsProps {
  bidders: Bidder[];
  auctionItems: AuctionItem[];
  onRestart: () => void;
}

const AuctionResults = ({ bidders, auctionItems, onRestart }: AuctionResultsProps) => {
  const sortedBidders = [...bidders].sort((a, b) => {
    const netProfitA = a.totalProfit - a.totalLoss;
    const netProfitB = b.totalProfit - b.totalLoss;
    return netProfitB - netProfitA;
  });

  const topPerformer = sortedBidders[0];
  const totalItemsSold = auctionItems.filter(item => item.sold).length;
  const totalRevenue = auctionItems.reduce((sum, item) => sum + (item.finalPrice || 0), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-2 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center space-x-2 text-2xl">
            <Trophy className="w-8 h-8 text-yellow-500" />
            <span>Auction Results</span>
          </CardTitle>
          <CardDescription>
            Multi-item auction completed! Here's how each strategy performed.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="bg-white rounded-lg p-4">
              <ShoppingCart className="w-6 h-6 mx-auto mb-2 text-blue-500" />
              <p className="text-2xl font-bold text-blue-600">{totalItemsSold}</p>
              <p className="text-sm text-gray-600">Items Sold</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <DollarSign className="w-6 h-6 mx-auto mb-2 text-green-500" />
              <p className="text-2xl font-bold text-green-600">₹{totalRevenue}</p>
              <p className="text-sm text-gray-600">Total Revenue</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <Award className="w-6 h-6 mx-auto mb-2 text-yellow-500" />
              <p className="text-lg font-bold text-yellow-600">{topPerformer.name}</p>
              <p className="text-sm text-gray-600">Top Performer</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bidder Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="w-5 h-5" />
            <span>Bidder Performance Analysis</span>
          </CardTitle>
          <CardDescription>
            Detailed breakdown of each bidder's performance and strategy effectiveness
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {sortedBidders.map((bidder, index) => {
              const netProfit = bidder.totalProfit - bidder.totalLoss;
              const roi = bidder.totalSpent > 0 ? ((netProfit / bidder.totalSpent) * 100) : 0;
              
              return (
                <div key={bidder.id} className="border rounded-lg p-6 bg-gray-50">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        {index === 0 && <Trophy className="w-5 h-5 text-yellow-500" />}
                        <div className={`w-4 h-4 rounded-full ${bidder.color}`}></div>
                        <h3 className="text-lg font-semibold">{bidder.name}</h3>
                        <Badge variant="outline">{bidder.strategy}</Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Rank #{index + 1}</p>
                      <div className={`text-lg font-bold flex items-center space-x-1 ${
                        netProfit > 0 ? 'text-green-600' : netProfit < 0 ? 'text-red-600' : 'text-gray-500'
                      }`}>
                        {netProfit > 0 ? <TrendingUp className="w-4 h-4" /> : 
                         netProfit < 0 ? <TrendingDown className="w-4 h-4" /> : null}
                        <span>₹{Math.abs(netProfit)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Items Won</p>
                      <p className="text-xl font-bold">{bidder.itemsWon.length}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Total Spent</p>
                      <p className="text-xl font-bold">₹{bidder.totalSpent}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Total Profit</p>
                      <p className="text-xl font-bold text-green-600">₹{bidder.totalProfit}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Total Loss</p>
                      <p className="text-xl font-bold text-red-600">₹{bidder.totalLoss}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">ROI</p>
                      <p className={`text-xl font-bold ${roi > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {roi.toFixed(1)}%
                      </p>
                    </div>
                  </div>

                  {bidder.itemsWon.length > 0 && (
                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-medium mb-3 flex items-center space-x-2">
                        <ShoppingCart className="w-4 h-4" />
                        <span>Items Purchased</span>
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {bidder.itemsWon.map((item) => {
                          const itemProfit = item.estimatedValue - (item.finalPrice || 0);
                          return (
                            <div key={item.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                              <div>
                                <p className="font-medium">{item.name}</p>
                                <p className="text-sm text-gray-600">Paid: ₹{item.finalPrice}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm text-gray-600">Est. Value: ₹{item.estimatedValue}</p>
                                <p className={`font-semibold ${
                                  itemProfit > 0 ? 'text-green-600' : 'text-red-600'
                                }`}>
                                  {itemProfit > 0 ? '+' : ''}₹{itemProfit}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {index < sortedBidders.length - 1 && <Separator className="mt-6" />}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Strategy Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calculator className="w-5 h-5" />
            <span>Strategy Analysis & Insights</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold">Key Insights:</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start space-x-2">
                  <span className="text-blue-500">•</span>
                  <span><strong>Greedy Strategy:</strong> Tends to bid aggressively early but may exhaust budget quickly</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-500">•</span>
                  <span><strong>Dynamic Programming:</strong> Optimizes for long-term gains, often skipping early items</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-purple-500">•</span>
                  <span><strong>Minimax:</strong> Focuses on countering competitors' moves strategically</span>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Performance Metrics:</h4>
              <div className="space-y-2">
                {sortedBidders.slice(0, 3).map((bidder, index) => (
                  <div key={bidder.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="text-sm">{bidder.strategy} efficiency:</span>
                    <span className="font-semibold">{bidder.efficiency.toFixed(1)}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Button */}
      <div className="text-center">
        <Button onClick={onRestart} className="bg-blue-600 hover:bg-blue-700 px-8 py-3">
          <RotateCcw className="w-4 h-4 mr-2" />
          Start New Auction
        </Button>
      </div>
    </div>
  );
};

export default AuctionResults;
