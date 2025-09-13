import { useState, useRef, useEffect } from "react";
import { Search, Bot, User, FileText, TrendingUp, MapPin, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

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
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'assistant',
      content: "Hi! I'm your AI data assistant. I can help you search through your deal documents, reports, and data. Try asking me something like 'Show me rent growth in ZIP 90210' or 'What are the key risks from recent inspections?'",
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sampleSuggestions = [
    "Show me historic rent growth in ZIP 12345",
    "Summarize key risks from last inspection reports", 
    "What's the average cap rate for my multifamily properties?",
    "Find deals with NOI over $100k in Los Angeles"
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

  const handleSearch = async () => {
    if (!query.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: query,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setQuery("");

    // Simulate API call
    setTimeout(() => {
      const results = mockSearch(query);
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: `I found ${results.length} relevant items in your data. Here's what I discovered:`,
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
    <div className="h-[600px] flex flex-col">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 p-4 bg-muted/20 rounded-t-lg">
        {messages.map((message) => (
          <div key={message.id} className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-3 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.type === 'user' ? 'bg-primary text-primary-foreground' : 'bg-accent text-accent-foreground'
              }`}>
                {message.type === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              
              <div className={`rounded-lg p-3 ${
                message.type === 'user' 
                  ? 'bg-primary text-primary-foreground ml-auto' 
                  : 'bg-background border border-border'
              }`}>
                <p className="text-sm">{message.content}</p>
                
                {message.results && (
                  <div className="mt-3 space-y-2">
                    {message.results.map((result) => (
                      <Card key={result.id} className="text-left">
                        <CardContent className="p-3">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div className="flex items-center gap-2">
                              {getTypeIcon(result.type)}
                              <h4 className="font-medium text-sm">{result.title}</h4>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full ${getConfidenceColor(result.confidence)}`} />
                              <span className="text-xs text-muted-foreground">{Math.round(result.confidence * 100)}%</span>
                            </div>
                          </div>
                          
                          <p className="text-xs text-muted-foreground mb-2">{result.excerpt}</p>
                          
                          <div className="flex items-center justify-between">
                            <Badge variant="outline" className="text-xs">
                              {result.source}
                            </Badge>
                            
                            {result.metadata && (
                              <div className="flex gap-2 text-xs text-muted-foreground">
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
                              </div>
                            )}
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
            <div className="w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-background border border-border rounded-lg p-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.1s' }} />
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                <span className="text-sm text-muted-foreground ml-2">Searching your data...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions */}
      {messages.length <= 1 && (
        <div className="p-4 bg-background border-t border-b border-border">
          <p className="text-sm text-muted-foreground mb-3">Try asking:</p>
          <div className="flex flex-wrap gap-2">
            {sampleSuggestions.map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="text-xs h-auto py-1 px-2"
                onClick={() => setQuery(suggestion)}
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 bg-background border-t border-border rounded-b-lg">
        <div className="flex gap-2">
          <Input
            placeholder="Ask about your deals, documents, or market data..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="flex-1"
            disabled={isLoading}
          />
          <Button onClick={handleSearch} disabled={isLoading || !query.trim()}>
            <Search className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}