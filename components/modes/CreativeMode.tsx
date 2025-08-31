"use client";

import { Message, ModeSettings } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { PenTool, User, Bot } from "lucide-react";

interface CreativeModeProps {
  messages: Message[];
  settings: ModeSettings;
  isLoading: boolean;
}

export default function CreativeMode({
  messages,
  settings,
  isLoading,
}: CreativeModeProps) {
  const creativeMessages = messages.filter((msg) => msg.mode === "creative");

  if (creativeMessages.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <Card className="p-8 bg-slate-800/50 border-pink-500/20 text-center max-w-md">
          <PenTool className="w-12 h-12 mx-auto mb-4 text-pink-400" />
          <h3 className="text-xl font-semibold text-white mb-2">
            Creative Mode
          </h3>
          <p className="text-gray-300">
            Unleash your creativity with expressive writing, storytelling, and
            imaginative content. Optimized for originality and engagement.
          </p>
          <div className="mt-4 text-sm text-gray-400">
            Temperature: {settings.temperature} | Creativity:{" "}
            {settings.creativity}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {creativeMessages.map((message) => (
        <div
          key={message.id}
          className={`flex gap-4 ${
            message.role === "user" ? "justify-end" : "justify-start"
          }`}
        >
          {message.role === "assistant" && (
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-600 to-rose-600 flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
          )}

          <Card
            className={`max-w-3xl p-4 ${
              message.role === "user"
                ? "bg-pink-600/20 border-pink-500/30"
                : "bg-slate-800/50 border-pink-500/20"
            }`}
          >
            <div className="whitespace-pre-wrap text-gray-100 leading-relaxed">
              {message.content}
            </div>
          </Card>

          {message.role === "user" && (
            <div className="w-8 h-8 rounded-full bg-pink-600 flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
          )}
        </div>
      ))}

      {isLoading && (
        <div className="flex gap-4 justify-start">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-600 to-rose-600 flex items-center justify-center">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <Card className="p-4 bg-slate-800/50 border-pink-500/20">
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse delay-75"></div>
              <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse delay-150"></div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
