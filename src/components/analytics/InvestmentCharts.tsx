import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, ComposedChart } from 'recharts';
import { TrendingUp, DollarSign, Target, Calendar, AlertTriangle, Activity, BarChart3, PieChart as PieChartIcon } from "lucide-react";

// Mock performance data with advanced metrics
const performanceData = [
  { 
    month: 'Jan', 
    portfolio: 1200000, 
    returns: 85000, 
    deals: 3, 
    irr: 14.2, 
    leverage: 0.65, 
    cashflow: 12500,
    vacancyRate: 5.2,
    capex: 8500
  },
  { 
    month: 'Feb', 
    portfolio: 1380000, 
    returns: 98000, 
    deals: 5, 
    irr: 15.8, 
    leverage: 0.68, 
    cashflow: 18200,
    vacancyRate: 4.8,
    capex: 12300
  },
  { 
    month: 'Mar', 
    portfolio: 1520000, 
    returns: 112000, 
    deals: 4, 
    irr: 16.4, 
    leverage: 0.62, 
    cashflow: 22800,
    vacancyRate: 3.9,
    capex: 15600
  },
  { 
    month: 'Apr', 
    portfolio: 1680000, 
    returns: 125000, 
    deals: 6, 
    irr: 17.1, 
    leverage: 0.64, 
    cashflow: 28400,
    vacancyRate: 4.2,
    capex: 18900
  },
  { 
    month: 'May', 
    portfolio: 1850000, 
    returns: 140000, 
    deals: 4, 
    irr: 18.2, 
    leverage: 0.59, 
    cashflow: 31200,
    vacancyRate: 3.5,
    capex: 21500
  },
  { 
    month: 'Jun', 
    portfolio: 2100000, 
    returns: 165000, 
    deals: 7, 
    irr: 19.5, 
    leverage: 0.61, 
    cashflow: 38600,
    vacancyRate: 3.1,
    capex: 24800
  }
];

// Risk metrics
const riskMetrics = [
  { metric: 'Sharpe Ratio', value: 1.85, benchmark: 1.2, status: 'outperforming' },
  { metric: 'Beta', value: 0.78, benchmark: 1.0, status: 'defensive' },
  { metric: 'Max Drawdown', value: -8.4, benchmark: -12.0, status: 'outperforming' },
  { metric: 'Volatility', value: 12.3, benchmark: 18.5, status: 'outperforming' },
  { metric: 'VaR (95%)', value: -4.2, benchmark: -6.8, status: 'outperforming' }
];

// Debt service coverage ratios
const dscr = [
  { month: 'Jan', ratio: 1.45 },
  { month: 'Feb', ratio: 1.52 },
  { month: 'Mar', ratio: 1.61 },
  { month: 'Apr', ratio: 1.58 },
  { month: 'May', ratio: 1.67 },
  { month: 'Jun', ratio: 1.73 }
];

const roiByProperty = [
  { name: 'Townhouses', roi: 14.2, count: 12 },
  { name: 'Multi-Family', roi: 16.8, count: 8 },
  { name: 'Single Family', roi: 12.4, count: 15 },
  { name: 'Condos', roi: 18.9, count: 5 },
  { name: 'Commercial', roi: 22.1, count: 3 }
];

const regionData = [
  { name: 'Brooklyn', value: 45, deals: 18 },
  { name: 'Queens', value: 25, deals: 12 },
  { name: 'Bronx', value: 15, deals: 8 },
  { name: 'Manhattan', value: 10, deals: 4 },
  { name: 'Other', value: 5, deals: 3 }
];

const COLORS = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

export function InvestmentCharts() {
  return (
    <div className="space-y-6">
      {/* Key Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">IRR</p>
                <p className="text-2xl font-semibold text-foreground">19.5%</p>
                <p className="text-xs text-success">+2.3% vs target</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gold/10 rounded-lg">
                <DollarSign className="w-5 h-5 text-gold" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Cash Yield</p>
                <p className="text-2xl font-semibold text-foreground">12.8%</p>
                <p className="text-xs text-success">Above benchmark</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-ice/10 rounded-lg">
                <Target className="w-5 h-5 text-ice" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">DSCR</p>
                <p className="text-2xl font-semibold text-foreground">1.73x</p>
                <p className="text-xs text-success">Strong coverage</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-warning/10 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Vacancy Rate</p>
                <p className="text-2xl font-semibold text-foreground">3.1%</p>
                <p className="text-xs text-success">Below market avg</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Core Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Portfolio Growth */}
        <Card className="institutional-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Portfolio Growth
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="portfolio" 
                    stroke="hsl(var(--primary))" 
                    fill="hsl(var(--primary))" 
                    fillOpacity={0.1}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Returns */}
        <Card className="institutional-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-primary" />
              Monthly Returns
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="returns" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Advanced Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* IRR & Cash Flow Performance */}
        <Card className="institutional-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              IRR & Cash Flow Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                  <YAxis yAxisId="left" stroke="hsl(var(--muted-foreground))" />
                  <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar yAxisId="left" dataKey="cashflow" fill="hsl(var(--primary))" opacity={0.3} />
                  <Line yAxisId="right" type="monotone" dataKey="irr" stroke="hsl(var(--primary))" strokeWidth={3} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* DSCR Tracking */}
        <Card className="institutional-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              Debt Service Coverage Ratio
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dscr}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                  <YAxis domain={[1.0, 2.0]} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="ratio" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Risk Metrics */}
        <Card className="institutional-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-primary" />
              Risk Metrics vs Benchmarks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {riskMetrics.map((metric) => (
                <div key={metric.metric} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">{metric.metric}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-lg">{metric.value}%</span>
                      <Badge 
                        className={metric.status === 'outperforming' ? 
                          'bg-success/10 text-success border-success/20' : 
                          'bg-warning/10 text-warning border-warning/20'
                        }
                      >
                        {metric.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>Benchmark: {metric.benchmark}%</span>
                    <span>•</span>
                    <span className={metric.value > metric.benchmark ? 'text-success' : 'text-warning'}>
                      {((metric.value - metric.benchmark) / Math.abs(metric.benchmark) * 100).toFixed(1)}% difference
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Portfolio Composition & Leverage */}
        <Card className="institutional-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChartIcon className="w-5 h-5 text-primary" />
              Portfolio Leverage Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-secondary/30 rounded-lg">
                  <p className="text-2xl font-bold text-foreground">61%</p>
                  <p className="text-sm text-muted-foreground">Current LTV</p>
                </div>
                <div className="text-center p-4 bg-secondary/30 rounded-lg">
                  <p className="text-2xl font-bold text-foreground">$1.28M</p>
                  <p className="text-sm text-muted-foreground">Total Debt</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Weighted Avg Interest Rate</span>
                  <span className="font-semibold">4.85%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Debt Yield</span>
                  <span className="font-semibold">8.2%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Interest Coverage Ratio</span>
                  <span className="font-semibold">2.4x</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Lease-Adjusted Coverage</span>
                  <span className="font-semibold">1.9x</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Advanced Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="institutional-card">
          <CardHeader>
            <CardTitle className="text-base">Market Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Alpha vs Market</span>
                <span className="font-semibold text-success">+4.2%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Information Ratio</span>
                <span className="font-semibold">1.68</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Tracking Error</span>
                <span className="font-semibold">2.4%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="institutional-card">
          <CardHeader>
            <CardTitle className="text-base">Operating Efficiency</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Operating Expense Ratio</span>
                <span className="font-semibold">28.5%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">NOI Margin</span>
                <span className="font-semibold">71.5%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Rent Growth (YoY)</span>
                <span className="font-semibold text-success">+5.8%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="institutional-card">
          <CardHeader>
            <CardTitle className="text-base">Portfolio Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Portfolio Turnover</span>
                <span className="font-semibold">8.2%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Capital Reserves</span>
                <span className="font-semibold">$245k</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">ESG Score</span>
                <span className="font-semibold">A-</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}