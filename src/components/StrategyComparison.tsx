
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from "recharts";
import { 
  TrendingUp, 
  Brain, 
  Calculator, 
  Users, 
  DollarSign, 
  PlayCircle,
  Trophy,
  Target,
  Clock
} from "lucide-react";
import { toast } from "sonner";

interface StrategyPerformance {
  name: string;
  wins: number;
  avgSavings: number;
  efficiency: number;
  speed: number;
  accuracy: number;
  color: string;
  icon: any;
  description: string;
}

interface SimulationResult {
  strategy: string;
  auctionType: string;
  finalPrice: number;
  savings: number;
  timeToDecision: number;
  success: boolean;
}

const StrategyComparison = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [simulationResults, setSimulationResults] = useState<SimulationResult[]>([]);
  const [activeView, setActiveView] = useState("overview");

  const strategies: StrategyPerformance[] = [
    {
      name: "Greedy Algorithm",
      wins: 34,
      avgSavings: 18.5,
      efficiency: 85,
      speed: 95,
      accuracy: 78,
      color: "#10B981",
      icon: PlayCircle,
      description: "Fast decisions, immediate local optimization"
    },
    {
      name: "Dynamic Programming",
      wins: 42,
      avgSavings: 28.3,
      efficiency: 92,
      speed: 70,
      accuracy: 94,
      color: "#3B82F6",
      icon: Calculator,
      description: "Optimal solutions considering all constraints"
    },
    {
      name: "Game Theory (Minimax)",
      wins: 38,
      avgSavings: 24.7,
      efficiency: 88,
      speed: 60,
      accuracy: 89,
      color: "#8B5CF6",
      icon: Users,
      description: "Strategic decisions considering opponents"
    },
    {
      name: "Knapsack Optimization",
      wins: 36,
      avgSavings: 22.1,
      efficiency: 90,
      speed: 75,
      accuracy: 87,
      color: "#F59E0B",
      icon: DollarSign,
      description: "Budget-value optimization approach"
    }
  ];

  const performanceData = [
    { metric: "Win Rate", greedy: 85, dynamic: 92, minimax: 88, knapsack: 90 },
    { metric: "Avg Savings", greedy: 18.5, dynamic: 28.3, minimax: 24.7, knapsack: 22.1 },
    { metric: "Speed", greedy: 95, dynamic: 70, minimax: 60, knapsack: 75 },
    { metric: "Accuracy", greedy: 78, dynamic: 94, minimax: 89, knapsack: 87 }
  ];

  const auctionTypePerformance = [
    { auctionType: "English", greedy: 82, dynamic: 95, minimax: 91, knapsack: 88 },
    { auctionType: "Dutch", greedy: 88, dynamic: 89, minimax: 85, knapsack: 92 },
    { auctionType: "Sealed-bid", greedy: 75, dynamic: 90, minimax: 92, knapsack: 87 },
    { auctionType: "Vickrey", greedy: 80, dynamic: 94, minimax: 89, knapsack: 91 }
  ];

  const radarData = strategies.map(strategy => ({
    strategy: strategy.name.split(' ')[0],
    efficiency: strategy.efficiency,
    speed: strategy.speed,
    accuracy: strategy.accuracy,
    savings: strategy.avgSavings * 3 // Scale for radar chart
  }));

  const pieData = strategies.map(strategy => ({
    name: strategy.name.split(' ')[0],
    value: strategy.wins,
    color: strategy.color
  }));

  const runSimulation = async () => {
    setIsRunning(true);
    setProgress(0);
    setSimulationResults([]);
    
    // Simulate running 100 auctions
    for (let i = 0; i < 100; i++) {
      await new Promise(resolve => setTimeout(resolve, 50));
      setProgress((i + 1));
      
      // Generate random simulation results
      const auctionTypes = ["English", "Dutch", "Sealed-bid", "Vickrey"];
      const strategyNames = strategies.map(s => s.name);
      
      const result: SimulationResult = {
        strategy: strategyNames[Math.floor(Math.random() * strategyNames.length)],
        auctionType: auctionTypes[Math.floor(Math.random() * auctionTypes.length)],
        finalPrice: 200 + Math.random() * 800,
        savings: Math.random() * 40,
        timeToDecision: Math.random() * 5,
        success: Math.random() > 0.15
      };
      
      setSimulationResults(prev => [...prev, result]);
    }
    
    setIsRunning(false);
    toast.success("Simulation completed! 100 auctions analyzed.");
  };

  const getStrategyMetrics = (strategyName: string) => {
    const results = simulationResults.filter(r => r.strategy === strategyName);
    if (results.length === 0) return { avgSavings: 0, successRate: 0, avgTime: 0 };
    
    return {
      avgSavings: results.reduce((sum, r) => sum + r.savings, 0) / results.length,
      successRate: (results.filter(r => r.success).length / results.length) * 100,
      avgTime: results.reduce((sum, r) => sum + r.timeToDecision, 0) / results.length
    };
  };

  return (
    <div className="space-y-6">
      {/* Simulation Control */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="w-5 h-5" />
            <span>Strategy Performance Simulation</span>
          </CardTitle>
          <CardDescription>
            Run comprehensive simulations to compare algorithm performance across different auction types
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="space-y-1">
              <p className="font-medium">Monte Carlo Simulation</p>
              <p className="text-sm text-gray-600">
                {isRunning ? `Running simulation: ${progress}/100 auctions` : "Ready to simulate 100 auction scenarios"}
              </p>
            </div>
            <Button 
              onClick={runSimulation} 
              disabled={isRunning}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isRunning ? (
                <>
                  <Clock className="w-4 h-4 mr-2 animate-spin" />
                  Running...
                </>
              ) : (
                <>
                  <PlayCircle className="w-4 h-4 mr-2" />
                  Run Simulation
                </>
              )}
            </Button>
          </div>
          {isRunning && (
            <Progress value={progress} className="h-2" />
          )}
        </CardContent>
      </Card>

      {/* Strategy Overview */}
      <Tabs value={activeView} onValueChange={setActiveView} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="comparison">Comparison</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {strategies.map((strategy, index) => {
              const IconComponent = strategy.icon;
              const metrics = getStrategyMetrics(strategy.name);
              
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: strategy.color }}
                      >
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm">{strategy.name}</h3>
                        <p className="text-xs text-gray-600">{strategy.wins} wins</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Efficiency</span>
                          <span>{strategy.efficiency}%</span>
                        </div>
                        <Progress value={strategy.efficiency} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Speed</span>
                          <span>{strategy.speed}%</span>
                        </div>
                        <Progress value={strategy.speed} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Accuracy</span>
                          <span>{strategy.accuracy}%</span>
                        </div>
                        <Progress value={strategy.accuracy} className="h-2" />
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-3 border-t">
                      <p className="text-xs text-gray-600">{strategy.description}</p>
                    </div>
                    
                    {simulationResults.length > 0 && (
                      <div className="mt-3 pt-3 border-t space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Sim Savings:</span>
                          <span className="font-medium">{metrics.avgSavings.toFixed(1)}%</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span>Success Rate:</span>
                          <span className="font-medium">{metrics.successRate.toFixed(1)}%</span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>Comparison across key performance indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="metric" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="greedy" fill="#10B981" name="Greedy" />
                    <Bar dataKey="dynamic" fill="#3B82F6" name="Dynamic" />
                    <Bar dataKey="minimax" fill="#8B5CF6" name="Minimax" />
                    <Bar dataKey="knapsack" fill="#F59E0B" name="Knapsack" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Win Distribution</CardTitle>
                <CardDescription>Success rate by strategy type</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}`}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="comparison" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Auction Type Performance</CardTitle>
                <CardDescription>Strategy effectiveness by auction format</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={auctionTypePerformance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="auctionType" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="greedy" stroke="#10B981" strokeWidth={2} />
                    <Line type="monotone" dataKey="dynamic" stroke="#3B82F6" strokeWidth={2} />
                    <Line type="monotone" dataKey="minimax" stroke="#8B5CF6" strokeWidth={2} />
                    <Line type="monotone" dataKey="knapsack" stroke="#F59E0B" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Strategy Radar</CardTitle>
                <CardDescription>Multi-dimensional performance comparison</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="strategy" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar
                      name="Efficiency"
                      dataKey="efficiency"
                      stroke="#3B82F6"
                      fill="#3B82F6"
                      fillOpacity={0.3}
                    />
                    <Radar
                      name="Speed"
                      dataKey="speed"
                      stroke="#10B981"
                      fill="#10B981"
                      fillOpacity={0.3}
                    />
                    <Radar
                      name="Accuracy"
                      dataKey="accuracy"
                      stroke="#8B5CF6"
                      fill="#8B5CF6"
                      fillOpacity={0.3}
                    />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-5 h-5" />
                <span>Algorithm Analysis & Recommendations</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Best Use Cases</h3>
                  
                  <div className="space-y-3">
                    <div className="border-l-4 border-green-500 pl-4">
                      <h4 className="font-medium text-green-700">Greedy Algorithm</h4>
                      <p className="text-sm text-gray-600">
                        Ideal for time-sensitive auctions where quick decisions are crucial. 
                        Best performance in Dutch auctions and when speed matters more than optimal outcomes.
                      </p>
                    </div>
                    
                    <div className="border-l-4 border-blue-500 pl-4">
                      <h4 className="font-medium text-blue-700">Dynamic Programming</h4>
                      <p className="text-sm text-gray-600">
                        Perfect for budget-constrained scenarios requiring optimal solutions. 
                        Excels in English and Vickrey auctions with complex value calculations.
                      </p>
                    </div>
                    
                    <div className="border-l-4 border-purple-500 pl-4">
                      <h4 className="font-medium text-purple-700">Game Theory (Minimax)</h4>
                      <p className="text-sm text-gray-600">
                        Best for competitive environments with sophisticated opponents. 
                        Superior performance in sealed-bid auctions requiring strategic thinking.
                      </p>
                    </div>
                    
                    <div className="border-l-4 border-orange-500 pl-4">
                      <h4 className="font-medium text-orange-700">Knapsack Optimization</h4>
                      <p className="text-sm text-gray-600">
                        Optimal for multi-item auctions and portfolio bidding. 
                        Balanced performance across all auction types with budget optimization.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Performance Insights</h3>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-medium text-blue-800 mb-2">💡 Key Findings</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Dynamic Programming shows 28.3% average savings</li>
                      <li>• Greedy Algorithm provides 95% faster decisions</li>
                      <li>• Minimax excels in competitive sealed-bid scenarios</li>
                      <li>• Knapsack offers balanced performance across metrics</li>
                    </ul>
                  </div>
                  
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-medium text-green-800 mb-2">🎯 Recommendations</h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• Use Dynamic Programming for high-value auctions</li>
                      <li>• Choose Greedy for real-time trading environments</li>
                      <li>• Apply Minimax when facing strategic opponents</li>
                      <li>• Leverage Knapsack for portfolio optimization</li>
                    </ul>
                  </div>
                  
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <h4 className="font-medium text-orange-800 mb-2">⚠️ Limitations</h4>
                    <ul className="text-sm text-orange-700 space-y-1">
                      <li>• Greedy may miss optimal solutions</li>
                      <li>• Dynamic Programming requires more computation</li>
                      <li>• Minimax assumes rational opponents</li>
                      <li>• Knapsack needs accurate value estimations</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              {simulationResults.length > 0 && (
                <div className="mt-6 pt-6 border-t">
                  <h3 className="font-semibold text-lg mb-4">Live Simulation Results</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {strategies.map((strategy) => {
                      const metrics = getStrategyMetrics(strategy.name);
                      return (
                        <div key={strategy.name} className="bg-gray-50 rounded-lg p-4">
                          <h4 className="font-medium text-sm mb-2">{strategy.name.split(' ')[0]}</h4>
                          <div className="space-y-1 text-xs">
                            <div className="flex justify-between">
                              <span>Avg Savings:</span>
                              <span className="font-medium">{metrics.avgSavings.toFixed(1)}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Success Rate:</span>
                              <span className="font-medium">{metrics.successRate.toFixed(1)}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Avg Time:</span>
                              <span className="font-medium">{metrics.avgTime.toFixed(2)}s</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StrategyComparison;
