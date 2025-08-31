"use client";

import { Message, ModeSettings } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Image, User, Bot } from "lucide-react";

interface ImageModeProps {
  messages: Message[];
  settings: ModeSettings;
  isLoading: boolean;
}

export default function ImageMode({
  messages,
  settings,
  isLoading,
}: ImageModeProps) {
  const imageMessages = messages.filter((msg) => msg.mode === "image");

  if (imageMessages.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <Card className="p-8 bg-slate-800/50 border-green-500/20 text-center max-w-md">
          <Image className="w-12 h-12 mx-auto mb-4 text-green-400" />
          <h3 className="text-xl font-semibold text-white mb-2">
            Image Generation
          </h3>
          <p className="text-gray-300">
            Create stunning visuals with AI-powered image generation. Perfect
            for creative projects and visual storytelling.
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
      {imageMessages.map((message) => (
        <div
          key={message.id}
          className={`flex gap-4 ${
            message.role === "user" ? "justify-end" : "justify-start"
          }`}
        >
          {message.role === "assistant" && (
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-600 to-teal-600 flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
          )}

          <Card
            className={`max-w-3xl p-4 ${
              message.role === "user"
                ? "bg-green-600/20 border-green-500/30"
                : "bg-slate-800/50 border-green-500/20"
            }`}
          >
            <div className="whitespace-pre-wrap text-gray-100 leading-relaxed">
              {message.content}
            </div>
          </Card>

          {message.role === "user" && (
            <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
          )}
        </div>
      ))}

      {isLoading && (
        <div className="flex gap-4 justify-start">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-600 to-teal-600 flex items-center justify-center">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <Card className="p-4 bg-slate-800/50 border-green-500/20">
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-75"></div>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-150"></div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
