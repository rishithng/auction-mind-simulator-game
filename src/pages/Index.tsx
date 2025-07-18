
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
  ArrowRight,
  Star,
  Gem,
  Crown,
  Rocket,
  Activity
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
      color: "bg-gradient-to-br from-emerald-500 to-green-600"
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
      icon: Zap,
      efficiency: 85,
      color: "text-emerald-600"
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative">
      {/* Minimal Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -right-20 w-64 h-64 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-20 left-1/2 w-64 h-64 bg-gradient-to-r from-indigo-400/10 to-blue-400/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-2000"></div>
        
        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400/40 rounded-full animate-bounce delay-300"></div>
        <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-purple-400/40 rounded-full animate-bounce delay-700"></div>
        <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-indigo-400/40 rounded-full animate-bounce delay-1100"></div>
        <div className="absolute bottom-1/3 right-1/3 w-1.5 h-1.5 bg-pink-400/40 rounded-full animate-bounce delay-1500"></div>
      </div>

      {/* Minimal Header */}
      <header className="bg-white/80 backdrop-blur-xl shadow-sm border-b border-white/20 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Smart Auction System
                </h1>
                <p className="text-sm text-gray-600">AI-Powered Bidding Strategy Simulator</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200">
                <Activity className="w-3 h-3 mr-1" />
                Live
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Minimal Stats Dashboard */}
      <section className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600 font-medium">Auctions</p>
                  <p className="text-xl font-bold text-gray-900">{systemStats.totalAuctions.toLocaleString()}</p>
                </div>
                <BarChart3 className="w-6 h-6 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600 font-medium">Success Rate</p>
                  <p className="text-xl font-bold text-gray-900">{systemStats.successRate.toFixed(1)}%</p>
                </div>
                <Target className="w-6 h-6 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600 font-medium">Avg. Savings</p>
                  <p className="text-xl font-bold text-gray-900">{systemStats.avgSavings.toFixed(1)}%</p>
                </div>
                <DollarSign className="w-6 h-6 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600 font-medium">AI Strategies</p>
                  <p className="text-xl font-bold text-gray-900">{systemStats.strategiesAnalyzed}</p>
                </div>
                <Brain className="w-6 h-6 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-white/80 backdrop-blur-sm border border-white/30 shadow-lg rounded-xl p-1">
            <TabsTrigger 
              value="simulator" 
              className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white transition-all duration-300 rounded-lg text-xs"
            >
              <PlayCircle className="w-3 h-3" />
              <span>Simulator</span>
            </TabsTrigger>
            <TabsTrigger 
              value="comparison" 
              className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white transition-all duration-300 rounded-lg text-xs"
            >
              <TrendingUp className="w-3 h-3" />
              <span>Compare</span>
            </TabsTrigger>
            <TabsTrigger 
              value="scenarios" 
              className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white transition-all duration-300 rounded-lg text-xs"
            >
              <Zap className="w-3 h-3" />
              <span>Scenarios</span>
            </TabsTrigger>
            <TabsTrigger 
              value="strategies" 
              className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white transition-all duration-300 rounded-lg text-xs"
            >
              <BarChart3 className="w-3 h-3" />
              <span>Strategies</span>
            </TabsTrigger>
            <TabsTrigger 
              value="education" 
              className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white transition-all duration-300 rounded-lg text-xs"
            >
              <Lightbulb className="w-3 h-3" />
              <span>Learn</span>
            </TabsTrigger>
            <TabsTrigger 
              value="analysis" 
              className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white transition-all duration-300 rounded-lg text-xs"
            >
              <FileText className="w-3 h-3" />
              <span>Reports</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="simulator" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div className="lg:col-span-2">
                <Card className="bg-white/80 backdrop-blur-sm border border-white/30 shadow-lg rounded-xl">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center space-x-2 text-lg">
                      <PlayCircle className="w-5 h-5 text-blue-600" />
                      <span>Auction Types</span>
                    </CardTitle>
                    <CardDescription className="text-sm">
                      Choose an auction format to simulate with AI bidding strategies
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {auctionTypes.map((auction, index) => {
                        const IconComponent = auction.icon;
                        return (
                          <Card 
                            key={index} 
                            className="cursor-pointer hover:shadow-lg transition-all duration-300 border hover:border-blue-300 bg-white/60 backdrop-blur-sm group rounded-lg"
                          >
                            <CardContent className="p-3">
                              <div className="flex items-start space-x-3">
                                <div className={`w-10 h-10 ${auction.color} rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                                  <IconComponent className="w-5 h-5 text-white" />
                                </div>
                                <div className="flex-1">
                                  <h3 className="font-medium text-gray-900 text-sm">{auction.name}</h3>
                                  <p className="text-xs text-gray-600 mb-2">{auction.description}</p>
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
                <Card className="bg-white/80 backdrop-blur-sm border border-white/30 shadow-lg rounded-xl">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center space-x-2 text-lg">
                      <Brain className="w-5 h-5 text-purple-600" />
                      <span>AI Algorithms</span>
                    </CardTitle>
                    <CardDescription className="text-sm">
                      Bidding strategy performance metrics
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3 pt-0">
                    {algorithms.map((algo, index) => {
                      const IconComponent = algo.icon;
                      return (
                        <div key={index} className="space-y-2 p-3 rounded-lg bg-white/50 hover:bg-white/70 transition-all duration-300">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <IconComponent className={`w-4 h-4 ${algo.color}`} />
                              <span className="font-medium text-sm">{algo.name}</span>
                            </div>
                            <span className="text-sm font-bold text-gray-900">
                              {algo.efficiency}%
                            </span>
                          </div>
                          <Progress value={algo.efficiency} className="h-1.5" />
                          <p className="text-xs text-gray-600">{algo.description}</p>
                          {index < algorithms.length - 1 && <Separator className="mt-2" />}
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
            <Card className="bg-white/80 backdrop-blur-sm border border-white/30 shadow-lg rounded-xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <span>Strategy Head-to-Head Comparison</span>
                </CardTitle>
                <CardDescription>
                  Watch different bidding strategies compete in real-time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <StrategyComparisonSimulator />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="scenarios">
            <Card className="bg-white/80 backdrop-blur-sm border border-white/30 shadow-lg rounded-xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-yellow-600" />
                  <span>Specialized Auction Scenarios</span>
                </CardTitle>
                <CardDescription>
                  Test specific scenarios like multi-item auctions and budget constraints
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

          <TabsContent value="analysis">
            <Card className="bg-white/80 backdrop-blur-sm border border-white/30 shadow-lg rounded-xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-indigo-600" />
                  <span>Performance Analysis & Reports</span>
                </CardTitle>
                <CardDescription>
                  Generate detailed analysis reports from auction simulations
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
