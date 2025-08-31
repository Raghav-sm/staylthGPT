"use client";

import { AIMode, ModeSettings } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { UserButton } from "@clerk/nextjs";
import { Code2, PenTool, Search, Image, Settings } from "lucide-react";

interface SidebarProps {
  currentMode: AIMode;
  onModeChange: (mode: AIMode) => void;
  settings: ModeSettings;
  onSettingsChange: (settings: ModeSettings) => void;
}

const modeIcons = {
  coding: Code2,
  creative: PenTool,
  doubt: Search,
  image: Image,
};

const modeColors = {
  coding: "from-purple-600 to-blue-600",
  creative: "from-pink-600 to-rose-600",
  doubt: "from-blue-600 to-cyan-600",
  image: "from-green-600 to-teal-600",
};

export default function Sidebar({
  currentMode,
  onModeChange,
  settings,
  onSettingsChange,
}: SidebarProps) {
  const modes: { key: AIMode; label: string; description: string }[] = [
    { key: "coding", label: "Coding", description: "Precise code assistance" },
    { key: "creative", label: "Creative", description: "Expressive writing" },
    { key: "doubt", label: "Research", description: "Web-powered answers" },
    { key: "image", label: "Image Gen", description: "Visual creativity" },
  ];

  return (
    <aside className="w-80 bg-slate-800/50 backdrop-blur-xl border-r border-purple-500/20 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-purple-500/20">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            StaylthGPT
          </h1>
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>

      {/* Mode Selection */}
      <div className="flex-1 overflow-auto p-6">
        <div className="space-y-4">
          <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wide">
            Select Mode
          </h2>

          {modes.map((mode) => {
            const Icon = modeIcons[mode.key];
            const isActive = currentMode === mode.key;

            return (
              <Button
                key={mode.key}
                variant={isActive ? "default" : "ghost"}
                className={`w-full justify-start h-auto p-4 ${
                  isActive
                    ? `bg-gradient-to-r ${
                        modeColors[mode.key]
                      } hover:opacity-90`
                    : "hover:bg-slate-700/50"
                }`}
                onClick={() => onModeChange(mode.key)}
              >
                <Icon className="w-5 h-5 mr-3" />
                <div className="text-left">
                  <div className="font-medium">{mode.label}</div>
                  <div className="text-xs opacity-70">{mode.description}</div>
                </div>
              </Button>
            );
          })}
        </div>

        {/* Settings Panel */}
        <Card className="mt-8 bg-slate-700/30 border-slate-600/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Parameters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-xs text-gray-400 mb-2">
                <span>Temperature</span>
                <span>{settings.temperature.toFixed(1)}</span>
              </div>
              <Slider
                value={[settings.temperature]}
                onValueChange={(value) =>
                  onSettingsChange({ ...settings, temperature: value[0] })
                }
                max={1}
                min={0}
                step={0.1}
                className="w-full"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs text-gray-400 mb-2">
                <span>Creativity</span>
                <span>{settings.creativity.toFixed(1)}</span>
              </div>
              <Slider
                value={[settings.creativity]}
                onValueChange={(value) =>
                  onSettingsChange({ ...settings, creativity: value[0] })
                }
                max={1}
                min={0}
                step={0.1}
                className="w-full"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs text-gray-400 mb-2">
                <span>Focus</span>
                <span>{settings.focus.toFixed(1)}</span>
              </div>
              <Slider
                value={[settings.focus]}
                onValueChange={(value) =>
                  onSettingsChange({ ...settings, focus: value[0] })
                }
                max={1}
                min={0}
                step={0.1}
                className="w-full"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </aside>
  );
}
