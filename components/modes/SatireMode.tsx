"use client";

import { Message, ModeSettings } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Laugh, User, Bot } from "lucide-react";

interface SatireModeProps {
  messages: Message[];
  settings: ModeSettings;
  isLoading: boolean;
}

export default function SatireMode({
  messages,
  settings,
  isLoading,
}: SatireModeProps) {
  const satireMessages = messages.filter((msg) => msg.mode === "satire");

  return (
    <div className="space-y-4">
      {satireMessages.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-400 text-sm opacity-70">
            Satire Mode | Add humor and irony to your text
          </p>
        </div>
      )}

      {satireMessages.map((message) => (
        <div
          key={message.id}
          className={`flex gap-4 ${
            message.role === "user" ? "justify-end" : "justify-start"
          }`}
        >
          {message.role === "assistant" && (
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-600 to-orange-600 flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4 text-white" />
            </div>
          )}

          <Card
            className={`max-w-3xl p-4 ${
              message.role === "user"
                ? "bg-yellow-900/30 border-yellow-700/50"
                : "bg-black/40 border-yellow-600/30"
            }`}
          >
            <div className="whitespace-pre-wrap text-gray-100 leading-relaxed">
              {message.content}
            </div>
          </Card>

          {message.role === "user" && (
            <div className="w-8 h-8 rounded-full bg-yellow-700 flex items-center justify-center flex-shrink-0">
              <User className="w-4 h-4 text-white" />
            </div>
          )}
        </div>
      ))}

      {isLoading && (
        <div className="flex gap-4 justify-start">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-600 to-orange-600 flex items-center justify-center flex-shrink-0">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <Card className="p-4 bg-black/40 border-yellow-600/30">
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse delay-75"></div>
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse delay-150"></div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
