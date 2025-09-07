import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare, Send, Bot } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

export function AIAssistantSection() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "assistant",
      content: "How can I help you analyze the real estate market today?",
      timestamp: "Now"
    }
  ]);

  const suggestions = [
    "Find properties with 10%+ cap rates",
    "Show me BRRRR opportunities in Austin", 
    "What's the market trend for tax liens?",
    "Analyze my portfolio diversification"
  ];

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    const newMessage = {
      id: messages.length + 1,
      type: "user",
      content: message,
      timestamp: "Just now"
    };
    
    setMessages([...messages, newMessage]);
    setMessage("");
    
    // Simulate AI response
    setTimeout(() => {
      const response = {
        id: messages.length + 2,
        type: "assistant", 
        content: "I understand you're looking for analysis. Let me process that for you...",
        timestamp: "Just now"
      };
      setMessages(prev => [...prev, response]);
    }, 1000);
  };

  return (
    <Card className="institutional-card h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <MessageSquare className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <CardTitle className="text-lg">Janus AI Assistant</CardTitle>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-xs text-muted-foreground">AI Assistant Online</span>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4 h-[calc(100%-100px)] flex flex-col">
        {/* Messages Area */}
        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-3">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-lg ${
                  msg.type === 'user' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-primary/10 border border-primary/20'
                }`}>
                  {msg.type === 'assistant' && (
                    <div className="flex items-center gap-2 mb-1">
                      <Bot className="w-3 h-3 text-primary" />
                      <span className="text-xs font-medium text-primary">Janus AI</span>
                    </div>
                  )}
                  <p className="text-sm break-words">{msg.content}</p>
                  <p className="text-xs opacity-70 mt-1">{msg.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Quick Suggestions */}
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground font-medium">Quick Actions:</p>
          <div className="grid grid-cols-1 gap-2">
            {suggestions.map((suggestion, index) => (
              <Badge 
                key={index}
                variant="outline" 
                className="justify-start text-left p-2 h-auto cursor-pointer hover:bg-primary/10 hover:border-primary/30 transition-colors break-words"
                onClick={() => setMessage(suggestion)}
              >
                {suggestion}
              </Badge>
            ))}
          </div>
        </div>

        {/* Message Input */}
        <div className="flex gap-2">
          <Input 
            placeholder="Ask about properties, market trends..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="bg-secondary/20 border-border/50"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage();
              }
            }}
          />
          <Button 
            size="sm" 
            className="glass text-foreground hover:bg-white/10 border border-white/20 shrink-0"
            disabled={!message.trim()}
            onClick={handleSendMessage}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        
        <p className="text-xs text-muted-foreground">
          Powered by GPT-4 with real-time market data
        </p>
      </CardContent>
    </Card>
  );
}