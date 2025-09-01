"use client";

import { Message, ModeSettings } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Code2, User, Bot } from "lucide-react";

interface CodingModeProps {
  messages: Message[];
  settings: ModeSettings;
  isLoading: boolean;
}

export default function CodingMode({
  messages,
  settings,
  isLoading,
}: CodingModeProps) {
  const codingMessages = messages.filter((msg) => msg.mode === "coding");

  return (
    <div className="space-y-4">
      {codingMessages.length === 0 && (
        <div className="text-center py-2">
          <p className="text-gray-400 text-sm opacity-70">
            Coding Mode | Get precise coding assistance, debug solutions, and
            technical guidance
          </p>
        </div>
      )}

      {codingMessages.map((message) => (
        <div
          key={message.id}
          className={`flex gap-4 ${
            message.role === "user" ? "justify-end" : "justify-start"
          }`}
        >
          {message.role === "assistant" && (
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4 text-white" />
            </div>
          )}

          <Card
            className={`max-w-3xl p-4 ${
              message.role === "user"
                ? "bg-purple-900/30 border-purple-700/50"
                : "bg-black/40 border-purple-600/30"
            }`}
          >
            <pre className="whitespace-pre-wrap text-sm font-mono text-gray-100">
              {message.content}
            </pre>
          </Card>

          {message.role === "user" && (
            <div className="w-8 h-8 rounded-full bg-purple-700 flex items-center justify-center flex-shrink-0">
              <User className="w-4 h-4 text-white" />
            </div>
          )}
        </div>
      ))}

      {isLoading && (
        <div className="flex gap-4 justify-start">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center flex-shrink-0">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <Card className="p-4 bg-black/40 border-purple-600/30">
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-75"></div>
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-150"></div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
