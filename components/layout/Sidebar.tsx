"use client";

import { AIMode, ModeSettings } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { ChevronDown, ChevronUp, Linkedin, Laugh, School, Eye, PanelLeft } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SidebarProps {
  currentMode: AIMode;
  onModeChange: (mode: AIMode) => void;
  settings: ModeSettings;
  onSettingsChange: (settings: ModeSettings) => void;
}

const modeIcons = {
  linkedin: Linkedin,
  satire: Laugh,
  formal: School,
  cynical: Eye,
};

const modeDescriptions = {
  linkedin: "Professional networking content",
  satire: "Humorous and ironic content",
  formal: "Professional and academic writing",
  cynical: "Skeptical and critical perspective",
};

export default function Sidebar({
  currentMode,
  onModeChange,
  settings,
  onSettingsChange,
}: SidebarProps) {
  const [showSettings, setShowSettings] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  const modes: { key: AIMode; label: string }[] = [
    { key: "linkedin", label: "LinkedIn" },
    { key: "satire", label: "Satire" },
    { key: "formal", label: "Formal" },
    { key: "cynical", label: "Cynical" },
  ];

  // If sidebar is closed, just show the toggle button
  if (!isSidebarOpen) {
    return (
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="fixed left-0 top-4 z-50"
      >
        <Button
          onClick={() => setIsSidebarOpen(true)}
          className="h-12 w-12 rounded-r-full bg-neutral-800/80 hover:bg-neutral-700/80 border border-neutral-700 shadow-lg transition-all duration-300 hover:scale-105"
          size="icon"
        >
          <PanelLeft className="h-5 w-5" />
        </Button>
      </motion.div>
    );
  }

  return (
    <AnimatePresence>
      <motion.aside
        initial={{ x: -320, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -320, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="w-80 bg-black/50 backdrop-blur-xl border-r border-neutral-800 flex flex-col relative h-auto"
        style={{ height: 'fit-content', minHeight: '100%' }}
      >
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-neutral-950 to-black pointer-events-none select-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none select-none" />

        {/* Close button */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="absolute right-2 top-2 z-20"
        >
          <Button
            onClick={() => setIsSidebarOpen(false)}
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full bg-neutral-800/50 hover:bg-neutral-700/50 text-neutral-400 transition-all duration-300 hover:scale-110"
          >
            <PanelLeft className="h-4 w-4" />
          </Button>
        </motion.div>

        <div className="p-4 border-b border-neutral-800 relative z-10">
          {/* Mode Description */}
          <motion.div 
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-center"
          >
            <p className="text-sm text-neutral-400">
              {modeDescriptions[currentMode]}
            </p>
          </motion.div>
        </div>

        {/* Mode Selection */}
        <div className="flex-1 p-4 relative z-10">
          <motion.div 
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="space-y-3"
          >
            <h2 className="text-sm font-medium text-neutral-400 uppercase tracking-wide text-center">
              Select Tone
            </h2>

            {modes.map((mode, index) => {
              const Icon = modeIcons[mode.key];
              const isActive = currentMode === mode.key;

              return (
                <motion.div
                  key={mode.key}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                >
                  <Button
                    variant="ghost"
                    className={`w-full justify-start h-auto p-3 transition-all duration-300 rounded-full ${
                      isActive
                        ? "bg-neutral-800/70 text-white border border-neutral-600 shadow-md"
                        : "bg-transparent text-neutral-400 hover:bg-neutral-800/40 hover:text-white border border-transparent"
                    }`}
                    onClick={() => onModeChange(mode.key)}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    <div className="font-medium">{mode.label}</div>
                  </Button>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Settings Panel with Dropdown */}
          <motion.div 
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6"
          >
            <Button
              variant="ghost"
              className="w-full justify-between bg-neutral-900/50 border border-neutral-800 hover:bg-neutral-800/40 rounded-xl transition-all duration-300"
              onClick={() => setShowSettings(!showSettings)}
            >
              <span className="text-sm text-neutral-300">Tone Parameters</span>
              <motion.div
                animate={{ rotate: showSettings ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {showSettings ? (
                  <ChevronUp className="w-4 h-4 text-neutral-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-neutral-400" />
                )}
              </motion.div>
            </Button>

            <AnimatePresence>
              {showSettings && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <Card className="mt-2 bg-neutral-900/50 border-neutral-800 backdrop-blur-sm rounded-xl overflow-hidden">
                    <CardContent className="space-y-4 pt-4">
                      <motion.div
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                      >
                        <div className="flex justify-between text-xs text-neutral-400 mb-2">
                          <span>Intensity</span>
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
                      </motion.div>

                      <motion.div
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.15 }}
                      >
                        <div className="flex justify-between text-xs text-neutral-400 mb-2">
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
                      </motion.div>

                      <motion.div
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <div className="flex justify-between text-xs text-neutral-400 mb-2">
                          <span>Formality</span>
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
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.aside>
    </AnimatePresence>
  );
}