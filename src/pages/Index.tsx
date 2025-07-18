
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
  Calculator,
  FileText,
  Zap,
  Sparkles,
  ArrowRight
} from "lucide-react";
import AuctionSimulator from "@/components/AuctionSimulator";
import StrategyComparison from "@/components/StrategyComparison";
import AlgorithmEducation from "@/components/AlgorithmEducation";
import StrategyComparisonSimulator from "@/components/StrategyComparisonSimulator";
import AuctionScenarios from "@/components/AuctionScenarios";
import AnalysisReport from "@/components/AnalysisReport";
import { toast } from "sonner";

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
      color: "bg-gradient-to-br from-green-500 to-emerald-600"
    },
    {
      name: "Dutch Auction",
      description: "Descending-price auction",
      icon: Timer,
      complexity: "Intermediate",
      color: "bg-gradient-to-br from-blue-500 to-cyan-600"
    },
    {
      name: "Sealed-bid",
      description: "Private simultaneous bidding",
      icon: Target,
      complexity: "Advanced",
      color: "bg-gradient-to-br from-purple-500 to-indigo-600"
    },
    {
      name: "Vickrey",
      description: "Second-price sealed auction",
      icon: Brain,
      complexity: "Expert",
      color: "bg-gradient-to-br from-orange-500 to-red-600"
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-1/2 -right-4 w-72 h-72 bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-gradient-to-r from-indigo-400/30 to-blue-400/30 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
        
        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-300"></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-purple-400 rounded-full animate-bounce delay-700"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce delay-1100"></div>
        <div className="absolute bottom-1/3 right-1/3 w-1 h-1 bg-pink-400 rounded-full animate-bounce delay-1500"></div>
      </div>

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg shadow-lg border-b border-white/20 relative z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-all duration-300 hover:shadow-xl">
                <Trophy className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Smart Auction System
                </h1>
                <p className="text-sm text-gray-600">Optimal Bidding Strategy Simulator</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200 hover:bg-green-200 transition-colors duration-200">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                Live System
              </Badge>
              <Button 
                variant="outline" 
                size="sm" 
                className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:border-blue-300 transition-all duration-300 hover:shadow-md hover:scale-105"
              >
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Dashboard */}
      <section className="container mx-auto px-6 py-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 transform">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Total Auctions</p>
                  <p className="text-2xl font-bold">{systemStats.totalAuctions.toLocaleString()}</p>
                </div>
                <BarChart3 className="w-8 h-8 text-blue-200 animate-pulse" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 transform">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Success Rate</p>
                  <p className="text-2xl font-bold">{systemStats.successRate.toFixed(1)}%</p>
                </div>
                <Target className="w-8 h-8 text-green-200 animate-pulse" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 transform">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Avg. Savings</p>
                  <p className="text-2xl font-bold">{systemStats.avgSavings.toFixed(1)}%</p>
                </div>
                <DollarSign className="w-8 h-8 text-purple-200 animate-pulse" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 transform">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm">Strategies</p>
                  <p className="text-2xl font-bold">{systemStats.strategiesAnalyzed}</p>
                </div>
                <Brain className="w-8 h-8 text-orange-200 animate-pulse" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 lg:w-auto lg:grid-cols-6 bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg">
            <TabsTrigger 
              value="simulator" 
              className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white transition-all duration-300 hover:scale-105"
            >
              <PlayCircle className="w-4 h-4" />
              <span>Simulator</span>
            </TabsTrigger>
            <TabsTrigger 
              value="comparison" 
              className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white transition-all duration-300 hover:scale-105"
            >
              <TrendingUp className="w-4 h-4" />
              <span>Compare</span>
            </TabsTrigger>
            <TabsTrigger 
              value="scenarios" 
              className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white transition-all duration-300 hover:scale-105"
            >
              <Zap className="w-4 h-4" />
              <span>Scenarios</span>
            </TabsTrigger>
            <TabsTrigger 
              value="strategies" 
              className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white transition-all duration-300 hover:scale-105"
            >
              <BarChart3 className="w-4 h-4" />
              <span>Strategies</span>
            </TabsTrigger>
            <TabsTrigger 
              value="education" 
              className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white transition-all duration-300 hover:scale-105"
            >
              <Lightbulb className="w-4 h-4" />
              <span>Learn</span>
            </TabsTrigger>
            <TabsTrigger 
              value="analysis" 
              className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white transition-all duration-300 hover:scale-105"
            >
              <FileText className="w-4 h-4" />
              <span>Reports</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="simulator" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2">
                <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <PlayCircle className="w-5 h-5 text-blue-600" />
                      <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Auction Types</span>
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      Choose an auction format to simulate with different bidding strategies
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {auctionTypes.map((auction, index) => {
                        const IconComponent = auction.icon;
                        return (
                          <Card 
                            key={index} 
                            className="cursor-pointer hover:shadow-lg transition-all duration-300 border-2 hover:border-blue-300 hover:scale-105 transform bg-white/60 backdrop-blur-sm group"
                          >
                            <CardContent className="p-4">
                              <div className="flex items-start space-x-3">
                                <div className={`w-10 h-10 ${auction.color} rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                  <IconComponent className="w-5 h-5 text-white" />
                                </div>
                                <div className="flex-1">
                                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">{auction.name}</h3>
                                  <p className="text-sm text-gray-600 mb-2">{auction.description}</p>
                                  <Badge variant="outline" className="text-xs border-blue-200 text-blue-700 group-hover:bg-blue-50 transition-colors duration-300">
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
                <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Brain className="w-5 h-5 text-purple-600" />
                      <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Algorithms</span>
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      Bidding strategy algorithms and their efficiency
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {algorithms.map((algo, index) => {
                      const IconComponent = algo.icon;
                      return (
                        <div key={index} className="space-y-2 p-3 rounded-lg bg-white/40 hover:bg-white/60 transition-all duration-300 hover:shadow-md">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <IconComponent className={`w-4 h-4 ${algo.color}`} />
                              <span className="font-medium text-sm">{algo.name}</span>
                            </div>
                            <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                              {algo.efficiency}%
                            </span>
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
            <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Strategy Head-to-Head Comparison</span>
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

          <TabsContent value="scenarios">
            <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-yellow-600" />
                  <span className="bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">Specialized Auction Scenarios</span>
                </CardTitle>
                <CardDescription>
                  Test specific scenarios like multi-item auctions, budget constraints, and strategic battles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AuctionScenarios />
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
            <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-indigo-600" />
                  <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Performance Analysis & Reports</span>
                </CardTitle>
                <CardDescription>
                  Generate detailed analysis reports and insights from auction simulations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AnalysisReport />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
};

export default Index;
