"use client";

import { useState, useRef, useEffect } from "react";
import { AIMode, Message, ModeSettings } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2 } from "lucide-react";
import LinkedInMode from "@/components/modes/LinkedInMode";
import SatireMode from "@/components/modes/SatireMode";
import FormalMode from "@/components/modes/FormalMode";
import CynicalMode from "@/components/modes/CynicalMode";

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
      case "linkedin":
        return <LinkedInMode {...props} />;
      case "satire":
        return <SatireMode {...props} />;
      case "formal":
        return <FormalMode {...props} />;
      case "cynical":
        return <CynicalMode {...props} />;
      default:
        return <LinkedInMode {...props} />;
    }
  };

  return (
    <div className="flex flex-col h-full relative">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none select-none z-0" />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30 pointer-events-none select-none z-0" />

      {/* Chat Messages */}
      <div className="flex-1 overflow-auto p-6 relative z-10">
        {renderModeComponent()}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-neutral-800 p-6 bg-black/20 backdrop-blur-xl relative z-10">
        <div className="flex gap-4 items-end">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Enter text to transform into ${mode} tone...`}
            className="flex-1 min-h-[60px] bg-neutral-900/30 border-neutral-700/50 resize-none text-white rounded-2xl backdrop-blur-md"
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
            className="rounded-full h-12 w-12 bg-neutral-800/70 hover:bg-neutral-700/70 border border-neutral-600/50 backdrop-blur-md transition-all duration-300 hover:scale-105"
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
