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

const modeDescriptions = {
  coding: "Precise code assistance and debugging",
  creative: "Expressive writing and creative content",
  doubt: "Web-powered research and answers",
  image: "AI image generation and visual creativity",
};

export default function Sidebar({
  currentMode,
  onModeChange,
  settings,
  onSettingsChange,
}: SidebarProps) {
  const modes: { key: AIMode; label: string }[] = [
    { key: "coding", label: "Coding" },
    { key: "creative", label: "Creative" },
    { key: "doubt", label: "Research" },
    { key: "image", label: "Image Gen" },
  ];

  return (
    <aside className="w-80 bg-gray-900/80 backdrop-blur-xl border-r border-gray-800 flex flex-col relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 pointer-events-none select-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none select-none" />

      <div className="p-6 border-b border-gray-800 relative z-10">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-white">
            Staylth<span className="text-gray-400">GPT</span>
          </h1>
          <UserButton afterSignOutUrl="/" />
        </div>

        {/* Mode Description */}
        <div className="text-center mt-4 mb-2">
          <p className="text-sm text-gray-400">
            {modeDescriptions[currentMode]}
          </p>
        </div>
      </div>

      {/* Mode Selection */}
      <div className="flex-1 overflow-auto p-6 relative z-10">
        <div className="space-y-4">
          <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-4 text-center">
            Select Mode
          </h2>

          {modes.map((mode) => {
            const Icon = modeIcons[mode.key];
            const isActive = currentMode === mode.key;

            return (
              <Button
                key={mode.key}
                variant="ghost"
                className={`w-full justify-start h-auto p-4 transition-all duration-300 ${
                  isActive
                    ? "bg-gray-800/70 text-white border border-gray-600"
                    : "bg-transparent text-gray-400 hover:bg-gray-800/40 hover:text-white border border-transparent"
                } rounded-lg`}
                onClick={() => onModeChange(mode.key)}
              >
                <Icon className="w-5 h-5 mr-3" />
                <div className="font-medium">{mode.label}</div>
              </Button>
            );
          })}
        </div>

        {/* Settings Panel */}
        <Card className="mt-8 bg-gray-800/50 border-gray-700 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2 text-gray-300">
              <Settings className="w-4 h-4" />
              Parameters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
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
