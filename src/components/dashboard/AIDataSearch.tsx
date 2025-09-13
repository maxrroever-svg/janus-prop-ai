import { useState, useRef, useEffect } from "react";
import { Search, Bot, User, FileText, TrendingUp, MapPin, Calendar, Filter, History, Brain, Zap, BarChart3, Building, DollarSign, Clock, Star, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

interface SearchResult {
  id: string;
  type: 'document' | 'deal' | 'report';
  title: string;
  excerpt: string;
  source: string;
  confidence: number;
  metadata?: {
    date?: string;
    location?: string;
    value?: string;
  };
}

interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  results?: SearchResult[];
  timestamp: Date;
}

export function AIDataSearch() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTimeframe, setSelectedTimeframe] = useState("all");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'assistant',
      content: "Hi! I'm your AI data assistant. I can help you search through your deal documents, reports, and data. Try asking me something like 'Show me rent growth in ZIP 90210' or 'What are the key risks from recent inspections?'",
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([
    "Historic rent growth ZIP 90210",
    "Inspection risks summary",
    "Cap rates by property type"
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const categories = [
    { value: "all", label: "All Data", icon: Brain },
    { value: "deals", label: "Deals", icon: Building },
    { value: "documents", label: "Documents", icon: FileText },
    { value: "reports", label: "Reports", icon: BarChart3 },
    { value: "financials", label: "Financials", icon: DollarSign }
  ];

  const timeframes = [
    { value: "all", label: "All Time" },
    { value: "30d", label: "Last 30 Days" },
    { value: "90d", label: "Last 3 Months" },
    { value: "1y", label: "Last Year" }
  ];

  const quickInsights = [
    { label: "Total Deals", value: "47", change: "+12%", icon: Building, color: "text-blue-600" },
    { label: "Avg Cap Rate", value: "6.2%", change: "+0.3%", icon: TrendingUp, color: "text-green-600" },
    { label: "Documents", value: "234", change: "+18", icon: FileText, color: "text-purple-600" },
    { label: "Portfolio Value", value: "$12.4M", change: "+$2.1M", icon: DollarSign, color: "text-emerald-600" }
  ];

  const sampleSuggestions = [
    { text: "Show me historic rent growth in ZIP 12345", category: "Market Analysis" },
    { text: "Summarize key risks from last inspection reports", category: "Risk Assessment" },
    { text: "What's the average cap rate for my multifamily properties?", category: "Performance" },
    { text: "Find deals with NOI over $100k in Los Angeles", category: "Deal Sourcing" },
    { text: "Compare property performance year over year", category: "Analytics" },
    { text: "Show me properties needing maintenance attention", category: "Operations" }
  ];

  const mockSearch = (searchQuery: string): SearchResult[] => {
    const results: SearchResult[] = [
      {
        id: '1',
        type: 'document',
        title: 'Market Analysis Report - ZIP 12345',
        excerpt: 'Rent growth in ZIP 12345 has averaged 4.2% annually over the past 3 years, with Q4 2023 showing 5.1% year-over-year growth...',
        source: 'Q4_2023_Market_Report.pdf',
        confidence: 0.92,
        metadata: {
          date: '2023-12-15',
          location: 'ZIP 12345'
        }
      },
      {
        id: '2',
        type: 'deal',
        title: 'Wilshire Boulevard Portfolio',
        excerpt: 'Property shows strong rental performance with 12% rent increase over 24 months. Current market rent $3,200/unit vs area median $2,950...',
        source: 'Deal Analysis',
        confidence: 0.87,
        metadata: {
          location: 'Wilshire Blvd, LA',
          value: '$2.4M'
        }
      },
      {
        id: '3',
        type: 'report',
        title: 'Property Inspection - 2847 Wilshire',
        excerpt: 'Key risks identified: HVAC system requires replacement (est. $45K), roof repair needed within 18 months ($25K), electrical upgrades recommended...',
        source: 'Inspection_Report_Nov2023.pdf',
        confidence: 0.85,
        metadata: {
          date: '2023-11-20',
          location: '2847 Wilshire Blvd'
        }
      }
    ];
    
    return results;
  };

  const handleSearch = async (searchQuery?: string) => {
    const queryToUse = searchQuery || query;
    if (!queryToUse.trim()) return;

    // Add to search history
    if (!searchHistory.includes(queryToUse)) {
      setSearchHistory(prev => [queryToUse, ...prev.slice(0, 4)]);
    }

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: queryToUse,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setQuery("");

    // Simulate API call with filters
    setTimeout(() => {
      const results = mockSearch(queryToUse);
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: `I found ${results.length} relevant items in your ${selectedCategory === 'all' ? 'data' : selectedCategory}. Here's what I discovered:`,
        results,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'document':
        return <FileText className="w-4 h-4" />;
      case 'deal':
        return <TrendingUp className="w-4 h-4" />;
      case 'report':
        return <MapPin className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return "bg-green-500";
    if (confidence >= 0.8) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="h-[700px] flex flex-col">
      <Tabs defaultValue="search" className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="search" className="flex items-center gap-2">
            <Search className="w-4 h-4" />
            AI Search
          </TabsTrigger>
          <TabsTrigger value="insights" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Insights
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <History className="w-4 h-4" />
            History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="search" className="flex-1 flex flex-col space-y-4">
          {/* Search Controls */}
          <div className="flex gap-3 p-4 bg-muted/30 rounded-lg">
            <div className="flex-1">
              <Input
                placeholder="Ask about your deals, documents, or market data..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="h-10"
                disabled={isLoading}
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    <div className="flex items-center gap-2">
                      <cat.icon className="w-4 h-4" />
                      {cat.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
              <SelectTrigger className="w-[130px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {timeframes.map((tf) => (
                  <SelectItem key={tf.value} value={tf.value}>
                    {tf.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={() => handleSearch()} disabled={isLoading || !query.trim()}>
              <Search className="w-4 h-4" />
            </Button>
          </div>

          {/* Quick Suggestions */}
          {messages.length <= 1 && (
            <div className="grid grid-cols-2 gap-3">
              {sampleSuggestions.map((suggestion, index) => (
                <Card key={index} className="hover:bg-muted/50 cursor-pointer transition-colors" onClick={() => handleSearch(suggestion.text)}>
                  <CardContent className="p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Zap className="w-4 h-4 text-primary" />
                      <Badge variant="secondary" className="text-xs">{suggestion.category}</Badge>
                    </div>
                    <p className="text-sm text-foreground">{suggestion.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto space-y-4 p-4 bg-muted/10 rounded-lg">
            {messages.map((message) => (
              <div key={message.id} className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex gap-3 max-w-[85%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.type === 'user' ? 'bg-primary text-primary-foreground' : 'bg-gradient-to-br from-blue-500 to-purple-600 text-white'
                  }`}>
                    {message.type === 'user' ? <User className="w-5 h-5" /> : <Brain className="w-5 h-5" />}
                  </div>
                  
                  <div className={`rounded-xl p-4 ${
                    message.type === 'user' 
                      ? 'bg-primary text-primary-foreground ml-auto' 
                      : 'bg-background border border-border shadow-sm'
                  }`}>
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    
                    {message.results && (
                      <div className="mt-4 space-y-3">
                        {message.results.map((result) => (
                          <Card key={result.id} className="text-left hover:shadow-md transition-shadow">
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between gap-3 mb-3">
                                <div className="flex items-center gap-3">
                                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                    result.type === 'document' ? 'bg-blue-100 text-blue-600' :
                                    result.type === 'deal' ? 'bg-green-100 text-green-600' :
                                    'bg-purple-100 text-purple-600'
                                  }`}>
                                    {getTypeIcon(result.type)}
                                  </div>
                                  <div>
                                    <h4 className="font-semibold text-sm">{result.title}</h4>
                                    <Badge variant="outline" className="text-xs mt-1">
                                      {result.source}
                                    </Badge>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Progress value={result.confidence * 100} className="w-16 h-2" />
                                  <span className="text-xs text-muted-foreground font-medium">{Math.round(result.confidence * 100)}%</span>
                                </div>
                              </div>
                              
                              <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{result.excerpt}</p>
                              
                              <div className="flex items-center justify-between">
                                {result.metadata && (
                                  <div className="flex gap-3 text-xs text-muted-foreground">
                                    {result.metadata.date && (
                                      <span className="flex items-center gap-1">
                                        <Calendar className="w-3 h-3" />
                                        {result.metadata.date}
                                      </span>
                                    )}
                                    {result.metadata.location && (
                                      <span className="flex items-center gap-1">
                                        <MapPin className="w-3 h-3" />
                                        {result.metadata.location}
                                      </span>
                                    )}
                                    {result.metadata.value && (
                                      <span className="flex items-center gap-1">
                                        <DollarSign className="w-3 h-3" />
                                        {result.metadata.value}
                                      </span>
                                    )}
                                  </div>
                                )}
                                <Button variant="ghost" size="sm">
                                  <Bookmark className="w-4 h-4" />
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center">
                  <Brain className="w-5 h-5" />
                </div>
                <div className="bg-background border border-border rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                    <span className="text-sm text-muted-foreground">Analyzing your data...</span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </TabsContent>

        <TabsContent value="insights" className="flex-1">
          <div className="space-y-4">
            {/* Quick Insights */}
            <div className="grid grid-cols-4 gap-4">
              {quickInsights.map((insight, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{insight.label}</p>
                        <p className="text-2xl font-bold">{insight.value}</p>
                        <p className={`text-xs ${insight.color}`}>{insight.change}</p>
                      </div>
                      <insight.icon className={`w-8 h-8 ${insight.color}`} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Data Categories */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Data Categories
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {categories.slice(1).map((category) => (
                    <div key={category.value} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                      <div className="flex items-center gap-3">
                        <category.icon className="w-5 h-5 text-primary" />
                        <span className="font-medium">{category.label}</span>
                      </div>
                      <Badge variant="secondary">
                        {category.value === 'deals' ? '47' : 
                         category.value === 'documents' ? '234' :
                         category.value === 'reports' ? '89' : '156'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history" className="flex-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="w-5 h-5" />
                Recent Searches
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {searchHistory.map((search, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{search}</span>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => handleSearch(search)}>
                      <Search className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}