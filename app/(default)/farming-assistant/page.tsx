"use client";

import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PageHeader } from "@/components/ui/page-header";
import {
  Bot,
  Send,
  Loader2,
  Leaf,
  Droplet,
  Thermometer,
  Wind,
  Sun,
} from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function FarmingAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm your AI farming assistant. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // TODO: Implement actual AI response
    // For now, simulate a response
    setTimeout(() => {
      const assistantMessage: Message = {
        role: "assistant",
        content:
          "Based on your question, I recommend checking the soil moisture levels and adjusting irrigation accordingly. Would you like me to show you the current sensor readings?",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="container mx-auto px-4 py-4 space-y-4">
      <PageHeader title="Farming Assistant" />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Main Chat Area */}
        <div className="lg:col-span-3">
          <Card className="h-[calc(100vh-12rem)] flex flex-col">
            <CardHeader className="border-b">
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-green-500" />
                AI Farming Assistant
              </CardTitle>
            </CardHeader>

            <CardContent className="flex-1 p-0">
              <ScrollArea ref={scrollRef} className="h-full p-4">
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        message.role === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.role === "user"
                            ? "bg-green-500 text-white"
                            : "bg-muted"
                        }`}
                      >
                        <div className="text-sm">{message.content}</div>
                        <div className="text-xs mt-1 opacity-70">
                          {message.timestamp.toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-muted rounded-lg p-3">
                        <Loader2 className="h-4 w-4 animate-spin" />
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>

            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about farming advice..."
                  className="flex-1"
                />
                <Button onClick={handleSend} disabled={isLoading}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Actions Sidebar */}
        <div className="space-y-4 min-w-[260px] max-w-[320px] w-full mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="outline"
                className="w-full flex flex-col items-center justify-center whitespace-normal text-center min-h-[56px] max-w-full py-2"
              >
                <Leaf className="h-4 w-4 mb-1" />
                <span>Check Plant Health</span>
              </Button>
              <Button
                variant="outline"
                className="w-full flex flex-col items-center justify-center whitespace-normal text-center min-h-[56px] max-w-full py-2"
              >
                <Droplet className="h-4 w-4 mb-1" />
                <span>View Irrigation Status</span>
              </Button>
              <Button
                variant="outline"
                className="w-full flex flex-col items-center justify-center whitespace-normal text-center min-h-[56px] max-w-full py-2"
              >
                <Thermometer className="h-4 w-4 mb-1" />
                <span>Check Weather Forecast</span>
              </Button>
              <Button
                variant="outline"
                className="w-full flex flex-col items-center justify-center whitespace-normal text-center min-h-[56px] max-w-full py-2"
              >
                <Wind className="h-4 w-4 mb-1" />
                <span>Monitor Soil Conditions</span>
              </Button>
              <Button
                variant="outline"
                className="w-full flex flex-col items-center justify-center whitespace-normal text-center min-h-[56px] max-w-full py-2"
              >
                <Sun className="h-4 w-4 mb-1" />
                <span>View Light Levels</span>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">
                Common Questions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="ghost"
                className="w-full flex flex-col items-center justify-center text-sm whitespace-normal text-center min-h-[36px] max-w-full py-2"
                onClick={() => setInput("How do I improve soil quality?")}
              >
                <span>How do I improve soil quality?</span>
              </Button>
              <Button
                variant="ghost"
                className="w-full flex flex-col items-center justify-center text-sm whitespace-normal text-center min-h-[36px] max-w-full py-2"
                onClick={() => setInput("When should I water my crops?")}
              >
                <span>When should I water my crops?</span>
              </Button>
              <Button
                variant="ghost"
                className="w-full flex flex-col items-center justify-center text-sm whitespace-normal text-center min-h-[36px] max-w-full py-2"
                onClick={() => setInput("What pests should I watch out for?")}
              >
                <span>What pests should I watch out for?</span>
              </Button>
              <Button
                variant="ghost"
                className="w-full flex flex-col items-center justify-center text-sm whitespace-normal text-center min-h-[36px] max-w-full py-2"
                onClick={() => setInput("How do I optimize fertilizer use?")}
              >
                <span>How do I optimize fertilizer use?</span>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
