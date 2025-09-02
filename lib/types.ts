export type AIMode = "linkedin" | "satire" | "formal" | "cynical";

export interface AIConfig {
  systemPrompt: string;
  temperature: number;
  maxTokens: number;
  model: string;
}

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  mode: AIMode;
}

export interface ModeSettings {
  temperature: number;
  creativity: number;
  focus: number;
}
