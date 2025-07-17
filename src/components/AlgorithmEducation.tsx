
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, 
  Calculator, 
  Users, 
  DollarSign, 
  PlayCircle, 
  BookOpen,
  Code,
  Lightbulb,
  TrendingUp,
  Target,
  Clock,
  Layers,
  GitBranch,
  Zap
} from "lucide-react";
import { toast } from "sonner";

interface AlgorithmStep {
  step: number;
  title: string;
  description: string;
  code?: string;
  complexity?: string;
}

interface AlgorithmInfo {
  name: string;
  icon: any;
  color: string;
  description: string;
  timeComplexity: string;
  spaceComplexity: string;
  advantages: string[];
  disadvantages: string[];
  steps: AlgorithmStep[];
  applications: string[];
  pseudocode: string;
}

const AlgorithmEducation = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>("greedy");
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const algorithms: Record<string, AlgorithmInfo> = {
    greedy: {
      name: "Greedy Algorithm",
      icon: Zap,
      color: "text-green-600",
      description: "Makes locally optimal choices at each step, hoping to find a global optimum. In auctions, it places bids based on immediate best decisions without considering future consequences.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      advantages: [
        "Fast execution and simple implementation",
        "Low memory requirements",
        "Works well for time-sensitive decisions",
        "Good for problems with greedy choice property"
      ],
      disadvantages: [
        "May not find the globally optimal solution",
        "Can be shortsighted in strategic scenarios",
        "Performance depends on problem structure",
        "No backtracking capability"
      ],
      applications: [
        "High-frequency trading",
        "Real-time bidding systems",
        "Quick decision scenarios",
        "Time-constrained auctions"
      ],
      pseudocode: `
function greedyBidding(currentPrice, budget, timeLeft):
    if currentPrice < estimatedValue * 0.7:
        if budget >= currentPrice + increment:
            return currentPrice + increment
    return null // Don't bid
      `,
      steps: [
        {
          step: 1,
          title: "Evaluate Current State",
          description: "Assess the current auction price and remaining budget",
          complexity: "O(1)"
        },
        {
          step: 2,
          title: "Apply Local Rule",
          description: "Make decision based on immediate conditions (price vs estimated value)",
          complexity: "O(1)"
        },
        {
          step: 3,
          title: "Execute Action",
          description: "Place bid immediately if conditions are met",
          complexity: "O(1)"
        },
        {
          step: 4,
          title: "Update State",
          description: "Update budget and continue to next opportunity",
          complexity: "O(1)"
        }
      ]
    },
    dynamic: {
      name: "Dynamic Programming",
      icon: Calculator,
      color: "text-blue-600",
      description: "Solves complex problems by breaking them down into simpler subproblems and storing results to avoid redundant calculations. Optimal for budget allocation in auctions.",
      timeComplexity: "O(n²)",
      spaceComplexity: "O(n)",
      advantages: [
        "Guarantees optimal solution",
        "Avoids redundant calculations",
        "Handles overlapping subproblems efficiently",
        "Excellent for budget optimization"
      ],
      disadvantages: [
        "Higher computational complexity",
        "Requires more memory",
        "May be overkill for simple problems",
        "Setup time can be significant"
      ],
      applications: [
        "Budget allocation across multiple auctions",
        "Long-term bidding strategies",
        "Portfolio optimization",
        "Value maximization problems"
      ],
      pseudocode: `
function dynamicBidding(items, budget, timeSteps):
    dp = array[items][budget][timeSteps]
    
    for each item i:
        for each budget b:
            for each time t:
                dp[i][b][t] = max(
                    bid(i, b, t) + dp[i-1][b-cost][t-1],
                    dp[i-1][b][t]
                )
    return dp[items][budget][timeSteps]
      `,
      steps: [
        {
          step: 1,
          title: "Define Subproblems",
          description: "Break auction decisions into states: (items, budget, time)",
          complexity: "O(1)"
        },
        {
          step: 2,
          title: "Initialize Base Cases",
          description: "Set up boundary conditions for the DP table",
          complexity: "O(n)"
        },
        {
          step: 3,
          title: "Fill DP Table",
          description: "Compute optimal solutions for each subproblem",
          complexity: "O(n²)"
        },
        {
          step: 4,
          title: "Trace Back Solution",
          description: "Reconstruct the optimal bidding sequence",
          complexity: "O(n)"
        }
      ]
    },
    minimax: {
      name: "Game Theory (Minimax)",
      icon: Users,
      color: "text-purple-600",
      description: "Game-theoretic approach that considers opponent strategies. Minimizes the worst-case scenario while maximizing own utility in competitive bidding situations.",
      timeComplexity: "O(b^d)",
      spaceComplexity: "O(bd)",
      advantages: [
        "Accounts for opponent behavior",
        "Strategic decision making",
        "Good for competitive environments",
        "Handles uncertainty well"
      ],
      disadvantages: [
        "Exponential time complexity",
        "Assumes rational opponents",
        "Requires opponent modeling",
        "Complex implementation"
      ],
      applications: [
        "Sealed-bid auctions",
        "Competitive bidding scenarios",
        "Strategic planning",
        "Multi-agent environments"
      ],
      pseudocode: `
function minimax(gameState, depth, isMaxPlayer):
    if depth == 0 or gameOver(gameState):
        return evaluate(gameState)
    
    if isMaxPlayer:
        bestValue = -infinity
        for each move in possibleMoves(gameState):
            value = minimax(makeMove(gameState, move), 
                           depth-1, false)
            bestValue = max(bestValue, value)
        return bestValue
    else:
        bestValue = +infinity
        for each move in possibleMoves(gameState):
            value = minimax(makeMove(gameState, move), 
                           depth-1, true)
            bestValue = min(bestValue, value)
        return bestValue
      `,
      steps: [
        {
          step: 1,
          title: "Model Game Tree",
          description: "Create decision tree with all possible moves and counter-moves",
          complexity: "O(b^d)"
        },
        {
          step: 2,
          title: "Evaluate Positions",
          description: "Assess utility of each terminal game state",
          complexity: "O(1)"
        },
        {
          step: 3,
          title: "Propagate Values",
          description: "Use minimax principle to propagate values up the tree",
          complexity: "O(b^d)"
        },
        {
          step: 4,
          title: "Select Best Move",
          description: "Choose the move that maximizes minimum guaranteed outcome",
          complexity: "O(b)"
        }
      ]
    },
    knapsack: {
      name: "Knapsack Optimization",
      icon: DollarSign,
      color: "text-orange-600",
      description: "Optimizes value-to-cost ratio by selecting the best combination of items within budget constraints. Perfect for portfolio bidding and resource allocation.",
      timeComplexity: "O(nW)",
      spaceComplexity: "O(nW)",
      advantages: [
        "Optimal resource allocation",
        "Handles multiple constraints",
        "Good for portfolio problems",
        "Maximizes utility per unit cost"
      ],
      disadvantages: [
        "Pseudo-polynomial complexity",
        "Requires discrete values",
        "Memory intensive for large problems",
        "Setup complexity"
      ],
      applications: [
        "Multi-item auction bidding",
        "Portfolio optimization",
        "Resource allocation",
        "Budget distribution"
      ],
      pseudocode: `
function knapsackBidding(items, budget):
    dp = array[items+1][budget+1]
    
    for i from 1 to items:
        for w from 1 to budget:
            if cost[i] <= w:
                dp[i][w] = max(
                    value[i] + dp[i-1][w-cost[i]],
                    dp[i-1][w]
                )
            else:
                dp[i][w] = dp[i-1][w]
    
    return dp[items][budget]
      `,
      steps: [
        {
          step: 1,
          title: "Define Items and Constraints",
          description: "List auction items with values, costs, and total budget",
          complexity: "O(n)"
        },
        {
          step: 2,
          title: "Initialize DP Table",
          description: "Create table for all item-budget combinations",
          complexity: "O(nW)"
        },
        {
          step: 3,
          title: "Fill Table Optimally",
          description: "Compute maximum value for each subproblem",
          complexity: "O(nW)"
        },
        {
          step: 4,
          title: "Extract Solution",
          description: "Backtrack to find which items to bid on",
          complexity: "O(n)"
        }
      ]
    }
  };

  const runStepByStep = async () => {
    setIsAnimating(true);
    const algorithm = algorithms[selectedAlgorithm];
    
    for (let i = 0; i < algorithm.steps.length; i++) {
      setCurrentStep(i);
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
    
    setIsAnimating(false);
    toast.success(`${algorithm.name} demonstration completed!`);
  };

  const currentAlgorithm = algorithms[selectedAlgorithm];

  return (
    <div className="space-y-6">
      {/* Algorithm Selector */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5" />
            <span>Algorithm Learning Center</span>
          </CardTitle>
          <CardDescription>
            Explore and understand the core algorithms used in optimal bidding strategies
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {Object.entries(algorithms).map(([key, algorithm]) => {
              const IconComponent = algorithm.icon;
              return (
                <Card 
                  key={key}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedAlgorithm === key ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                  }`}
                  onClick={() => setSelectedAlgorithm(key)}
                >
                  <CardContent className="p-4 text-center">
                    <IconComponent className={`w-8 h-8 mx-auto mb-2 ${algorithm.color}`} />
                    <h3 className="font-semibold text-sm">{algorithm.name}</h3>
                    <div className="mt-2 space-y-1">
                      <Badge variant="outline" className="text-xs">
                        Time: {algorithm.timeComplexity}
                      </Badge>
                      <br />
                      <Badge variant="outline" className="text-xs">
                        Space: {algorithm.spaceComplexity}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Algorithm Details */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="steps">Step-by-Step</TabsTrigger>
          <TabsTrigger value="code">Implementation</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <currentAlgorithm.icon className={`w-5 h-5 ${currentAlgorithm.color}`} />
                    <span>{currentAlgorithm.name}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700">{currentAlgorithm.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-800 mb-2">✅ Advantages</h4>
                      <ul className="text-sm space-y-1">
                        {currentAlgorithm.advantages.map((advantage, index) => (
                          <li key={index} className="text-blue-700">• {advantage}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-red-50 rounded-lg p-4">
                      <h4 className="font-semibold text-red-800 mb-2">⚠️ Disadvantages</h4>
                      <ul className="text-sm space-y-1">
                        {currentAlgorithm.disadvantages.map((disadvantage, index) => (
                          <li key={index} className="text-red-700">• {disadvantage}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="w-5 h-5" />
                    <span>Complexity Analysis</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Time Complexity</h4>
                    <Badge variant="secondary" className="text-lg font-mono">
                      {currentAlgorithm.timeComplexity}
                    </Badge>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Space Complexity</h4>
                    <Badge variant="secondary" className="text-lg font-mono">
                      {currentAlgorithm.spaceComplexity}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="w-5 h-5" />
                    <span>Best Use Cases</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-2">
                    {currentAlgorithm.applications.map((application, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-blue-500 mt-1">•</span>
                        <span>{application}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="steps" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Layers className="w-5 h-5" />
                  <span>Step-by-Step Execution</span>
                </div>
                <Button 
                  onClick={runStepByStep} 
                  disabled={isAnimating}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isAnimating ? (
                    <>
                      <Clock className="w-4 h-4 mr-2 animate-spin" />
                      Running...
                    </>
                  ) : (
                    <>
                      <PlayCircle className="w-4 h-4 mr-2" />
                      Run Demo
                    </>
                  )}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <Progress value={((currentStep + 1) / currentAlgorithm.steps.length) * 100} className="h-2" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {currentAlgorithm.steps.map((step, index) => (
                    <Card 
                      key={index}
                      className={`transition-all ${
                        index <= currentStep ? 'bg-blue-50 border-blue-200' : 'bg-gray-50'
                      } ${index === currentStep ? 'ring-2 ring-blue-500' : ''}`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            index <= currentStep ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'
                          }`}>
                            {step.step}
                          </div>
                          <h3 className="font-semibold text-sm">{step.title}</h3>
                        </div>
                        <p className="text-xs text-gray-600 mb-2">{step.description}</p>
                        {step.complexity && (
                          <Badge variant="outline" className="text-xs">
                            {step.complexity}
                          </Badge>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="code" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Code className="w-5 h-5" />
                <span>Implementation Details</span>
              </CardTitle>
              <CardDescription>
                Pseudocode and implementation concepts for {currentAlgorithm.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-900 rounded-lg p-6 text-green-400 font-mono text-sm overflow-x-auto">
                <pre>{currentAlgorithm.pseudocode}</pre>
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">🔧 Key Implementation Points</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Focus on the core algorithmic logic</li>
                    <li>• Handle edge cases appropriately</li>
                    <li>• Optimize for the specific auction context</li>
                    <li>• Consider real-time performance requirements</li>
                  </ul>
                </div>
                
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">💡 Optimization Tips</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Use memoization where applicable</li>
                    <li>• Implement early termination conditions</li>
                    <li>• Consider approximate solutions for speed</li>
                    <li>• Profile and optimize critical paths</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="applications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span>Real-World Applications</span>
              </CardTitle>
              <CardDescription>
                How {currentAlgorithm.name} is used in practice across different domains
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Auction Scenarios</h3>
                  {currentAlgorithm.applications.map((application, index) => (
                    <div key={index} className="border-l-4 border-blue-500 pl-4">
                      <h4 className="font-medium">{application}</h4>
                      <p className="text-sm text-gray-600">
                        Real-time implementation in competitive bidding environments
                      </p>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Industry Examples</h3>
                  <div className="space-y-3">
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4">
                      <h4 className="font-medium text-blue-800">Financial Trading</h4>
                      <p className="text-sm text-blue-700">
                        High-frequency trading algorithms for optimal execution
                      </p>
                    </div>
                    
                    <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4">
                      <h4 className="font-medium text-green-800">Ad Auctions</h4>
                      <p className="text-sm text-green-700">
                        Real-time bidding for digital advertising placements
                      </p>
                    </div>
                    
                    <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-4">
                      <h4 className="font-medium text-purple-800">Resource Allocation</h4>
                      <p className="text-sm text-purple-700">
                        Cloud computing and spectrum allocation auctions
                      </p>
                    </div>
                    
                    <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg p-4">
                      <h4 className="font-medium text-orange-800">Procurement</h4>
                      <p className="text-sm text-orange-700">
                        Government and corporate procurement systems
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AlgorithmEducation;
