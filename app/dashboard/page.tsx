"use client";

import { useAIMode } from "@/hooks/use-ai-mode";
import Sidebar from "@/components/layout/Sidebar";
import ChatInterface from "@/components/layout/ChatInterface";
import { useState } from "react";
import { Message } from "@/lib/types";

export default function Dashboard() {
  const { currentMode, settings, switchMode, setSettings } = useAIMode();
  const [messages, setMessages] = useState<Message[]>([]);

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Sidebar
        currentMode={currentMode}
        onModeChange={switchMode}
        settings={settings}
        onSettingsChange={setSettings}
      />
      <main className="flex-1 flex flex-col">
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
