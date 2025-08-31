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

  if (codingMessages.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <Card className="p-8 bg-slate-800/50 border-purple-500/20 text-center max-w-md">
          <Code2 className="w-12 h-12 mx-auto mb-4 text-purple-400" />
          <h3 className="text-xl font-semibold text-white mb-2">Coding Mode</h3>
          <p className="text-gray-300">
            Get precise coding assistance, debug solutions, and technical
            guidance. Optimized for accuracy and best practices.
          </p>
          <div className="mt-4 text-sm text-gray-400">
            Temperature: {settings.temperature} | Focus: {settings.focus}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {codingMessages.map((message) => (
        <div
          key={message.id}
          className={`flex gap-4 ${
            message.role === "user" ? "justify-end" : "justify-start"
          }`}
        >
          {message.role === "assistant" && (
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
          )}

          <Card
            className={`max-w-3xl p-4 ${
              message.role === "user"
                ? "bg-blue-600/20 border-blue-500/30"
                : "bg-slate-800/50 border-purple-500/20"
            }`}
          >
            <pre className="whitespace-pre-wrap text-sm font-mono text-gray-100">
              {message.content}
            </pre>
          </Card>

          {message.role === "user" && (
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
          )}
        </div>
      ))}

      {isLoading && (
        <div className="flex gap-4 justify-start">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <Card className="p-4 bg-slate-800/50 border-purple-500/20">
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
