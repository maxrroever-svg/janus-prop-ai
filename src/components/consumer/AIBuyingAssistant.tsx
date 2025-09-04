import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageSquare, Send, Bot } from "lucide-react";

const commonQuestions = [
  "What is earnest money?",
  "How do home inspections work?",
  "What are contingencies?",
  "How long does closing take?",
  "What is PMI?",
  "When do I need an appraisal?"
];

export const AIBuyingAssistant = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "ai",
      content: "Hi! I'm your AI buying assistant. I can explain any part of the homebuying process in plain English. What would you like to know?"
    }
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    setMessages(prev => [...prev, {
      id: Date.now(),
      type: "user",
      content: inputValue
    }]);
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        type: "ai", 
        content: "That's a great question! Let me explain that for you..."
      }]);
    }, 1000);
    
    setInputValue("");
  };

  const handleQuestionClick = (question: string) => {
    setInputValue(question);
  };

  return (
    <Card className="institutional-card sticky top-8 h-fit">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Bot className="h-5 w-5 text-accent" />
          <span>AI Buying Assistant</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="h-64 overflow-y-auto space-y-3 p-3 bg-muted/30 rounded-lg">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg text-sm ${
                  message.type === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card text-foreground border border-border'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
        </div>

        <div className="flex space-x-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask me anything about buying a home..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <Button onClick={handleSendMessage} size="sm" className="btn-professional">
            <Send className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-foreground">Common Questions:</p>
          <div className="grid grid-cols-1 gap-2">
            {commonQuestions.map((question, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                className="text-left justify-start h-auto p-2 text-xs"
                onClick={() => handleQuestionClick(question)}
              >
                {question}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};