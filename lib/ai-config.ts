import { AIConfig, AIMode } from "./types";

export const AI_CONFIGS: Record<AIMode, AIConfig> = {
  coding: {
    systemPrompt: `You are a precise coding assistant. Provide accurate, well-documented code solutions. 
    Focus on best practices, performance, and maintainability. Always explain your reasoning and include comments.`,
    temperature: 0.2,
    maxTokens: 2048,
    model: "gemini-2.0-flash",
  },
  creative: {
    systemPrompt: `You are a creative writing assistant. Help with storytelling, poetry, creative content, and expressive writing. 
    Be imaginative, engaging, and help develop compelling narratives and characters.`,
    temperature: 0.8,
    maxTokens: 2048,
    model: "gemini-2.0-flash",
  },
  doubt: {
    systemPrompt: `You are a research assistant. Provide comprehensive, well-researched answers with proper citations. 
    Help clarify doubts, explain complex concepts, and provide factual information from reliable sources.`,
    temperature: 0.4,
    maxTokens: 2048,
    model: "gemini-2.0-flash",
  },
  image: {
    systemPrompt: `You are an image generation assistant. Help create detailed prompts for image generation, 
    suggest visual concepts, and guide users through the creative process of visual storytelling.`,
    temperature: 0.6,
    maxTokens: 1024,
    model: "gemini-pro-vision",
  },
};
