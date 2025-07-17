
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  PlayCircle, 
  Target,
  TrendingUp,
  ShoppingCart
} from "lucide-react";
import MultiItemAuction from "./MultiItemAuction";

const AuctionSimulator = () => {
  const [activeTab, setActiveTab] = useState("multi-item");

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="w-5 h-5" />
            <span>Auction Simulator</span>
          </CardTitle>
          <CardDescription>
            Experience different auction formats and bidding strategies
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="multi-item" className="flex items-center space-x-2">
                <ShoppingCart className="w-4 h-4" />
                <span>Multi-Item Auction</span>
              </TabsTrigger>
              <TabsTrigger value="single-item" className="flex items-center space-x-2">
                <PlayCircle className="w-4 h-4" />
                <span>Single Item</span>
              </TabsTrigger>
              <TabsTrigger value="comparison" className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4" />
                <span>Strategy Battle</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="multi-item">
              <MultiItemAuction />
            </TabsContent>

            <TabsContent value="single-item">
              <div className="text-center py-12">
                <PlayCircle className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">Single Item Auction</h3>
                <p className="text-gray-500">Coming soon! Traditional single-item auction format.</p>
              </div>
            </TabsContent>

            <TabsContent value="comparison">
              <div className="text-center py-12">
                <TrendingUp className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">Strategy Battle</h3>
                <p className="text-gray-500">Coming soon! Head-to-head strategy comparison.</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuctionSimulator;
