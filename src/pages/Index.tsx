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
  Rocket
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
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large gradient orbs */}
        <div className="absolute -top-10 -left-10 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -right-10 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-20 left-1/2 w-96 h-96 bg-gradient-to-r from-indigo-400/20 to-blue-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-2000"></div>
        
        {/* Medium gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-cyan-300/15 to-blue-300/15 rounded-full mix-blend-multiply filter blur-2xl animate-bounce duration-3000"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-purple-300/15 to-pink-300/15 rounded-full mix-blend-multiply filter blur-2xl animate-bounce duration-4000 delay-500"></div>
        
        {/* Small floating elements */}
        <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-blue-400/60 rounded-full animate-bounce delay-300"></div>
        <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-purple-400/60 rounded-full animate-bounce delay-700"></div>
        <div className="absolute bottom-1/4 left-1/3 w-2.5 h-2.5 bg-indigo-400/60 rounded-full animate-bounce delay-1100"></div>
        <div className="absolute bottom-1/3 right-1/3 w-2 h-2 bg-pink-400/60 rounded-full animate-bounce delay-1500"></div>
        <div className="absolute top-1/6 right-1/6 w-1.5 h-1.5 bg-emerald-400/60 rounded-full animate-bounce delay-900"></div>
        <div className="absolute bottom-1/6 left-1/6 w-1.5 h-1.5 bg-yellow-400/60 rounded-full animate-bounce delay-1300"></div>
        
        {/* Animated stars */}
        <Star className="absolute top-1/5 left-1/5 w-4 h-4 text-yellow-400/40 animate-pulse delay-200" />
        <Gem className="absolute top-2/5 right-1/5 w-5 h-5 text-purple-400/40 animate-pulse delay-600" />
        <Crown className="absolute bottom-1/5 right-2/5 w-4 h-4 text-orange-400/40 animate-pulse delay-1000" />
        <Rocket className="absolute bottom-2/5 left-1/6 w-4 h-4 text-blue-400/40 animate-pulse delay-1400" />
        
        {/* Geometric shapes */}
        <div className="absolute top-1/3 left-1/6 w-8 h-8 border-2 border-blue-300/30 rotate-45 animate-spin duration-[20s]"></div>
        <div className="absolute bottom-1/3 right-1/6 w-6 h-6 border-2 border-purple-300/30 rounded-full animate-spin duration-[15s]"></div>
        <div className="absolute top-2/3 right-1/3 w-4 h-4 bg-gradient-to-br from-pink-300/30 to-purple-300/30 animate-ping delay-2000"></div>
      </div>

      {/* Header */}
      <header className="bg-white/90 backdrop-blur-xl shadow-2xl border-b border-white/30 relative z-10 sticky top-0">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-2xl transform hover:scale-110 hover:rotate-3 transition-all duration-500 hover:shadow-3xl group">
                <Trophy className="w-8 h-8 text-white group-hover:animate-bounce" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-fade-in">
                  Smart Auction System
                </h1>
                <p className="text-gray-600 mt-1 animate-fade-in delay-200">Advanced Bidding Strategy Simulator & AI Laboratory</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-200 hover:from-green-200 hover:to-emerald-200 transition-all duration-300 shadow-lg hover:shadow-xl animate-pulse">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                AI System Active
              </Badge>
              <Button 
                variant="outline" 
                size="sm" 
                className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:border-blue-400 transition-all duration-300 hover:shadow-lg hover:scale-105 group"
              >
                <Settings className="w-4 h-4 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Stats Dashboard */}
      <section className="container mx-auto px-6 py-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-700 text-white border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 transform hover:-translate-y-2 group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Total Auctions</p>
                  <p className="text-3xl font-bold mt-1">{systemStats.totalAuctions.toLocaleString()}</p>
                  <div className="flex items-center mt-2 text-blue-200">
                    <ArrowRight className="w-3 h-3 mr-1 group-hover:translate-x-1 transition-transform duration-300" />
                    <span className="text-xs">+12% this week</span>
                  </div>
                </div>
                <BarChart3 className="w-10 h-10 text-blue-200 group-hover:animate-pulse group-hover:scale-110 transition-all duration-300" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-emerald-700 text-white border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 transform hover:-translate-y-2 group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">Success Rate</p>
                  <p className="text-3xl font-bold mt-1">{systemStats.successRate.toFixed(1)}%</p>
                  <div className="flex items-center mt-2 text-green-200">
                    <ArrowRight className="w-3 h-3 mr-1 group-hover:translate-x-1 transition-transform duration-300" />
                    <span className="text-xs">Optimal performance</span>
                  </div>
                </div>
                <Target className="w-10 h-10 text-green-200 group-hover:animate-pulse group-hover:scale-110 transition-all duration-300" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-indigo-700 text-white border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 transform hover:-translate-y-2 group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">Avg. Savings</p>
                  <p className="text-3xl font-bold mt-1">{systemStats.avgSavings.toFixed(1)}%</p>
                  <div className="flex items-center mt-2 text-purple-200">
                    <ArrowRight className="w-3 h-3 mr-1 group-hover:translate-x-1 transition-transform duration-300" />
                    <span className="text-xs">Cost optimization</span>
                  </div>
                </div>
                <DollarSign className="w-10 h-10 text-purple-200 group-hover:animate-pulse group-hover:scale-110 transition-all duration-300" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-red-700 text-white border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 transform hover:-translate-y-2 group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm font-medium">AI Strategies</p>
                  <p className="text-3xl font-bold mt-1">{systemStats.strategiesAnalyzed}</p>
                  <div className="flex items-center mt-2 text-orange-200">
                    <ArrowRight className="w-3 h-3 mr-1 group-hover:translate-x-1 transition-transform duration-300" />
                    <span className="text-xs">Active algorithms</span>
                  </div>
                </div>
                <Brain className="w-10 h-10 text-orange-200 group-hover:animate-pulse group-hover:scale-110 transition-all duration-300" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 lg:w-auto lg:grid-cols-6 bg-white/90 backdrop-blur-xl border border-white/30 shadow-2xl rounded-2xl p-2">
            <TabsTrigger 
              value="simulator" 
              className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white transition-all duration-300 hover:scale-105 data-[state=active]:shadow-lg rounded-xl"
            >
              <PlayCircle className="w-4 h-4" />
              <span>Simulator</span>
            </TabsTrigger>
            <TabsTrigger 
              value="comparison" 
              className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white transition-all duration-300 hover:scale-105 data-[state=active]:shadow-lg rounded-xl"
            >
              <TrendingUp className="w-4 h-4" />
              <span>Compare</span>
            </TabsTrigger>
            <TabsTrigger 
              value="scenarios" 
              className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white transition-all duration-300 hover:scale-105 data-[state=active]:shadow-lg rounded-xl"
            >
              <Zap className="w-4 h-4" />
              <span>Scenarios</span>
            </TabsTrigger>
            <TabsTrigger 
              value="strategies" 
              className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white transition-all duration-300 hover:scale-105 data-[state=active]:shadow-lg rounded-xl"
            >
              <BarChart3 className="w-4 h-4" />
              <span>Strategies</span>
            </TabsTrigger>
            <TabsTrigger 
              value="education" 
              className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white transition-all duration-300 hover:scale-105 data-[state=active]:shadow-lg rounded-xl"
            >
              <Lightbulb className="w-4 h-4" />
              <span>Learn</span>
            </TabsTrigger>
            <TabsTrigger 
              value="analysis" 
              className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white transition-all duration-300 hover:scale-105 data-[state=active]:shadow-lg rounded-xl"
            >
              <FileText className="w-4 h-4" />
              <span>Reports</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="simulator" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2">
                <Card className="bg-white/90 backdrop-blur-xl border border-white/30 shadow-2xl hover:shadow-3xl transition-all duration-500 rounded-2xl">
                  <CardHeader className="bg-gradient-to-r from-blue-50/80 to-purple-50/80 rounded-t-2xl">
                    <CardTitle className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                        <PlayCircle className="w-5 h-5 text-white" />
                      </div>
                      <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Auction Types</span>
                      <Sparkles className="w-5 h-5 text-purple-500 animate-pulse" />
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      Choose an auction format to simulate with different AI bidding strategies
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {auctionTypes.map((auction, index) => {
                        const IconComponent = auction.icon;
                        return (
                          <Card 
                            key={index} 
                            className="cursor-pointer hover:shadow-xl transition-all duration-500 border-2 hover:border-blue-400 hover:scale-105 transform bg-white/80 backdrop-blur-sm group rounded-xl"
                          >
                            <CardContent className="p-4">
                              <div className="flex items-start space-x-3">
                                <div className={`w-12 h-12 ${auction.color} rounded-xl flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                                  <IconComponent className="w-6 h-6 text-white" />
                                </div>
                                <div className="flex-1">
                                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">{auction.name}</h3>
                                  <p className="text-sm text-gray-600 mb-2 leading-relaxed">{auction.description}</p>
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
                <Card className="bg-white/90 backdrop-blur-xl border border-white/30 shadow-2xl hover:shadow-3xl transition-all duration-500 rounded-2xl">
                  <CardHeader className="bg-gradient-to-r from-purple-50/80 to-pink-50/80 rounded-t-2xl">
                    <CardTitle className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                        <Brain className="w-5 h-5 text-white" />
                      </div>
                      <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">AI Algorithms</span>
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      Advanced bidding strategy algorithms and their performance metrics
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 p-6">
                    {algorithms.map((algo, index) => {
                      const IconComponent = algo.icon;
                      return (
                        <div key={index} className="space-y-3 p-4 rounded-xl bg-gradient-to-r from-white/60 to-white/80 hover:from-white/80 hover:to-white/90 transition-all duration-300 hover:shadow-lg hover:scale-105 transform group">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <IconComponent className={`w-4 h-4 ${algo.color}`} />
                              </div>
                              <span className="font-semibold text-sm group-hover:text-blue-600 transition-colors duration-300">{algo.name}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                {algo.efficiency}%
                              </span>
                              <Sparkles className="w-3 h-3 text-yellow-500 group-hover:animate-spin" />
                            </div>
                          </div>
                          <Progress value={algo.efficiency} className="h-2 bg-gray-200" />
                          <p className="text-xs text-gray-600 leading-relaxed">{algo.description}</p>
                          {index < algorithms.length - 1 && <Separator className="mt-3 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />}
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
            <Card className="bg-white/90 backdrop-blur-xl border border-white/30 shadow-2xl rounded-2xl">
              <CardHeader className="bg-gradient-to-r from-green-50/80 to-blue-50/80 rounded-t-2xl">
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
            <Card className="bg-white/90 backdrop-blur-xl border border-white/30 shadow-2xl rounded-2xl">
              <CardHeader className="bg-gradient-to-r from-yellow-50/80 to-orange-50/80 rounded-t-2xl">
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
            <Card className="bg-white/90 backdrop-blur-xl border border-white/30 shadow-2xl rounded-2xl">
              <CardHeader className="bg-gradient-to-r from-indigo-50/80 to-purple-50/80 rounded-t-2xl">
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
