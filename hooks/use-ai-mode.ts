"use client";

import { useState } from "react";
import { AIMode, ModeSettings } from "@/lib/types";

export function useAIMode() {
  const [currentMode, setCurrentMode] = useState<AIMode>("coding");
  const [settings, setSettings] = useState<ModeSettings>({
    temperature: 0.5,
    creativity: 0.5,
    focus: 0.5,
  });

  const switchMode = (mode: AIMode) => {
    setCurrentMode(mode);
    switch (mode) {
      case "coding":
        setSettings({ temperature: 0.2, creativity: 0.3, focus: 0.9 });
        break;
      case "creative":
        setSettings({ temperature: 0.8, creativity: 0.9, focus: 0.4 });
        break;
      case "doubt":
        setSettings({ temperature: 0.4, creativity: 0.5, focus: 0.8 });
        break;
      case "image":
        setSettings({ temperature: 0.6, creativity: 0.8, focus: 0.6 });
        break;
    }
  };

  return {
    currentMode,
    settings,
    switchMode,
    setSettings,
  };
}
