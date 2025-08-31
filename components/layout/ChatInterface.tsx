"use client";

import { useState, useRef, useEffect } from "react";
import { AIMode, Message, ModeSettings } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2 } from "lucide-react";
import CodingMode from "@/components/modes/CodingMode";
import CreativeMode from "@/components/modes/CreativeMode";
import DoubtMode from "@/components/modes/CreativeMode";
import ImageMode from "@/components/modes/ImageMode";

interface ChatInterfaceProps {
  mode: AIMode;
  messages: Message[];
  onMessagesChange: (messages: Message[]) => void;
  settings: ModeSettings;
}

export default function ChatInterface({
  mode,
  messages,
  onMessagesChange,
  settings,
}: ChatInterfaceProps) {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
      mode,
    };

    const updatedMessages = [...messages, userMessage];
    onMessagesChange(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages,
          mode,
          settings,
        }),
      });

      const data = await response.json();

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.content,
        timestamp: new Date(),
        mode,
      };

      onMessagesChange([...updatedMessages, aiMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderModeComponent = () => {
    const props = { messages, settings, isLoading };

    switch (mode) {
      case "coding":
        return <CodingMode {...props} />;
      case "creative":
        return <CreativeMode {...props} />;
      case "doubt":
        return <DoubtMode {...props} />;
      case "image":
        return <ImageMode {...props} />;
      default:
        return <CodingMode {...props} />;
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat Messages */}
      <div className="flex-1 overflow-auto p-6">
        {renderModeComponent()}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-purple-500/20 p-6 bg-slate-800/30 backdrop-blur-xl">
        <div className="flex gap-4">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Ask anything in ${mode} mode...`}
            className="flex-1 min-h-[60px] bg-slate-700/50 border-slate-600/50 resize-none"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!input.trim() || isLoading}
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
