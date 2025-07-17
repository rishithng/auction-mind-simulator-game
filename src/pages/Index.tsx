import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  TrendingUp, 
  Brain, 
  Target, 
  DollarSign, 
  Timer, 
  Users, 
  BarChart3,
  PlayCircle,
  Settings,
  Trophy,
  Lightbulb,
  Calculator
} from "lucide-react";
import AuctionSimulator from "@/components/AuctionSimulator";
import StrategyComparison from "@/components/StrategyComparison";
import AlgorithmEducation from "@/components/AlgorithmEducation";
import { toast } from "sonner";
import StrategyComparisonSimulator from "@/components/StrategyComparisonSimulator";

const Index = () => {
  const [activeTab, setActiveTab] = useState("simulator");
  const [systemStats, setSystemStats] = useState({
    totalAuctions: 1247,
    successRate: 87.3,
    avgSavings: 23.4,
    strategiesAnalyzed: 5
  });

  useEffect(() => {
    // Simulate real-time stats updates
    const interval = setInterval(() => {
      setSystemStats(prev => ({
        ...prev,
        totalAuctions: prev.totalAuctions + Math.floor(Math.random() * 3),
        successRate: Math.max(80, Math.min(95, prev.successRate + (Math.random() - 0.5) * 2))
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const auctionTypes = [
    {
      name: "English Auction",
      description: "Open ascending-price auction",
      icon: TrendingUp,
      complexity: "Beginner",
      color: "bg-green-500"
    },
    {
      name: "Dutch Auction",
      description: "Descending-price auction",
      icon: Timer,
      complexity: "Intermediate",
      color: "bg-blue-500"
    },
    {
      name: "Sealed-bid",
      description: "Private simultaneous bidding",
      icon: Target,
      complexity: "Advanced",
      color: "bg-purple-500"
    },
    {
      name: "Vickrey",
      description: "Second-price sealed auction",
      icon: Brain,
      complexity: "Expert",
      color: "bg-orange-500"
    }
  ];

  const algorithms = [
    {
      name: "Greedy Strategy",
      description: "Quick bid selection for immediate decisions",
      icon: PlayCircle,
      efficiency: 85,
      color: "text-green-600"
    },
    {
      name: "Dynamic Programming",
      description: "Optimal bids under budget constraints",
      icon: Calculator,
      efficiency: 92,
      color: "text-blue-600"
    },
    {
      name: "Game Theory (Minimax)",
      description: "Opponent-aware strategic bidding",
      icon: Users,
      efficiency: 88,
      color: "text-purple-600"
    },
    {
      name: "Knapsack Optimization",
      description: "Budget vs reward trade-off analysis",
      icon: DollarSign,
      efficiency: 90,
      color: "text-orange-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-lg border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Trophy className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Smart Auction System</h1>
                <p className="text-sm text-gray-600">Optimal Bidding Strategy Simulator</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Live System
              </Badge>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Dashboard */}
      <section className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Total Auctions</p>
                  <p className="text-2xl font-bold">{systemStats.totalAuctions.toLocaleString()}</p>
                </div>
                <BarChart3 className="w-8 h-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Success Rate</p>
                  <p className="text-2xl font-bold">{systemStats.successRate.toFixed(1)}%</p>
                </div>
                <Target className="w-8 h-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Avg. Savings</p>
                  <p className="text-2xl font-bold">{systemStats.avgSavings.toFixed(1)}%</p>
                </div>
                <DollarSign className="w-8 h-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm">Strategies</p>
                  <p className="text-2xl font-bold">{systemStats.strategiesAnalyzed}</p>
                </div>
                <Brain className="w-8 h-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:grid-cols-5">
            <TabsTrigger value="simulator" className="flex items-center space-x-2">
              <PlayCircle className="w-4 h-4" />
              <span>Simulator</span>
            </TabsTrigger>
            <TabsTrigger value="comparison" className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4" />
              <span>Compare</span>
            </TabsTrigger>
            <TabsTrigger value="strategies" className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span>Strategies</span>
            </TabsTrigger>
            <TabsTrigger value="education" className="flex items-center space-x-2">
              <Lightbulb className="w-4 h-4" />
              <span>Learn</span>
            </TabsTrigger>
            <TabsTrigger value="analysis" className="flex items-center space-x-2">
              <Calculator className="w-4 h-4" />
              <span>Analysis</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="simulator" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <PlayCircle className="w-5 h-5" />
                      <span>Auction Types</span>
                    </CardTitle>
                    <CardDescription>
                      Choose an auction format to simulate with different bidding strategies
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {auctionTypes.map((auction, index) => {
                        const IconComponent = auction.icon;
                        return (
                          <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow border-2 hover:border-blue-200">
                            <CardContent className="p-4">
                              <div className="flex items-start space-x-3">
                                <div className={`w-10 h-10 ${auction.color} rounded-lg flex items-center justify-center`}>
                                  <IconComponent className="w-5 h-5 text-white" />
                                </div>
                                <div className="flex-1">
                                  <h3 className="font-semibold text-gray-900">{auction.name}</h3>
                                  <p className="text-sm text-gray-600 mb-2">{auction.description}</p>
                                  <Badge variant="outline" className="text-xs">
                                    {auction.complexity}
                                  </Badge>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Brain className="w-5 h-5" />
                      <span>Algorithms</span>
                    </CardTitle>
                    <CardDescription>
                      Bidding strategy algorithms and their efficiency
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {algorithms.map((algo, index) => {
                      const IconComponent = algo.icon;
                      return (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <IconComponent className={`w-4 h-4 ${algo.color}`} />
                              <span className="font-medium text-sm">{algo.name}</span>
                            </div>
                            <span className="text-sm font-semibold">{algo.efficiency}%</span>
                          </div>
                          <Progress value={algo.efficiency} className="h-2" />
                          <p className="text-xs text-gray-600">{algo.description}</p>
                          {index < algorithms.length - 1 && <Separator className="mt-3" />}
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              </div>
            </div>

            <AuctionSimulator />
          </TabsContent>

          <TabsContent value="comparison">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5" />
                  <span>Strategy Head-to-Head Comparison</span>
                </CardTitle>
                <CardDescription>
                  Watch two different bidding strategies compete in real-time to see which performs better
                </CardDescription>
              </CardHeader>
              <CardContent>
                <StrategyComparisonSimulator />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="strategies">
            <StrategyComparison />
          </TabsContent>

          <TabsContent value="education">
            <AlgorithmEducation />
          </TabsContent>

          <TabsContent value="analysis" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Analysis</CardTitle>
                <CardDescription>
                  Detailed analysis of algorithm performance across different auction scenarios
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">Advanced Analytics</h3>
                  <p className="text-gray-500 mb-4">
                    Run simulations to generate detailed performance reports
                  </p>
                  <Button 
                    onClick={() => toast.success("Analysis feature coming soon with detailed metrics and charts!")}
                  >
                    Generate Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
};

export default Index;
