"use client";

import { useAIMode } from "@/hooks/use-ai-mode";
import Sidebar from "@/components/layout/Sidebar";
import ChatInterface from "@/components/layout/ChatInterface";
import { useState } from "react";
import { Message } from "@/lib/types";
import { BackgroundEffects } from "@/components/ui/BackgroundEffects";
import { Spotlight } from "@/components/ui/Spotlight";

export default function Dashboard() {
  const { currentMode, settings, switchMode, setSettings } = useAIMode();
  const [messages, setMessages] = useState<Message[]>([]);

  return (
    <div className="flex h-screen bg-gray-950 relative overflow-hidden">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <Spotlight className="top-10 left-full w-[50vw] h-[80vh]" fill="gray" />

      <BackgroundEffects />

      <Sidebar
        currentMode={currentMode}
        onModeChange={switchMode}
        settings={settings}
        onSettingsChange={setSettings}
      />
      <main className="flex-1 flex flex-col relative z-10">
        <ChatInterface
          mode={currentMode}
          messages={messages}
          onMessagesChange={setMessages}
          settings={settings}
        />
      </main>
    </div>
  );
}
