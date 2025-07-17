
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  Trophy,
  TrendingUp,
  TrendingDown
} from "lucide-react";

interface AuctionItem {
  id: number;
  name: string;
  estimatedValue: number;
  finalPrice?: number;
}

interface Bidder {
  id: number;
  name: string;
  strategy: string;
  initialBudget: number;
  remainingBudget: number;
  currentBid: number;
  itemsWon: AuctionItem[];
  totalSpent: number;
  totalProfit: number;
  totalLoss: number;
  isActive: boolean;
  color: string;
  efficiency: number;
}

interface BidderCardProps {
  bidder: Bidder;
  isLast: boolean;
}

const BidderCard = ({ bidder, isLast }: BidderCardProps) => {
  const budgetUsedPercentage = ((bidder.initialBudget - bidder.remainingBudget) / bidder.initialBudget) * 100;
  const netProfit = bidder.totalProfit - bidder.totalLoss;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${bidder.color}`}></div>
          <span className="font-medium text-sm">{bidder.name}</span>
          {bidder.itemsWon.length > 0 && (
            <Trophy className="w-4 h-4 text-yellow-500" />
          )}
          {!bidder.isActive && (
            <Badge variant="destructive" className="text-xs">Out</Badge>
          )}
        </div>
        <div className="text-right">
          <div className="text-sm font-semibold">₹{bidder.currentBid}</div>
          <div className="text-xs text-gray-500">Current Bid</div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 text-xs text-center">
        <div>
          <p className="text-gray-600">Items Won</p>
          <p className="font-semibold">{bidder.itemsWon.length}</p>
        </div>
        <div>
          <p className="text-gray-600">Total Spent</p>
          <p className="font-semibold">₹{bidder.totalSpent}</p>
        </div>
        <div>
          <p className="text-gray-600">Net Profit</p>
          <div className={`font-semibold flex items-center justify-center space-x-1 ${
            netProfit > 0 ? 'text-green-600' : netProfit < 0 ? 'text-red-600' : 'text-gray-500'
          }`}>
            {netProfit > 0 ? <TrendingUp className="w-3 h-3" /> : netProfit < 0 ? <TrendingDown className="w-3 h-3" /> : null}
            <span>₹{Math.abs(netProfit)}</span>
          </div>
        </div>
      </div>

      <div className="space-y-1">
        <div className="flex justify-between text-xs text-gray-600">
          <span>Budget Used: ₹{bidder.initialBudget - bidder.remainingBudget}</span>
          <span>{budgetUsedPercentage.toFixed(1)}%</span>
        </div>
        <Progress value={budgetUsedPercentage} className="h-1" />
      </div>

      {bidder.itemsWon.length > 0 && (
        <div className="bg-green-50 rounded-lg p-2">
          <p className="text-xs font-medium text-green-800 mb-1">Items Won:</p>
          <div className="space-y-1">
            {bidder.itemsWon.map((item, index) => (
              <div key={item.id} className="flex justify-between text-xs">
                <span className="text-green-700">{item.name}</span>
                <span className="font-semibold">₹{item.finalPrice}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {!isLast && <Separator />}
    </div>
  );
};

export default BidderCard;
