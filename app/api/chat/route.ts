import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import { AI_CONFIGS } from "@/lib/ai-config";
import { AIMode, Message, ModeSettings } from "@/lib/types";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const {
      messages,
      mode,
      settings,
    }: {
      messages: Message[];
      mode: AIMode;
      settings: ModeSettings;
    } = await req.json();

    const config = AI_CONFIGS[mode];
    const model = genAI.getGenerativeModel({ model: config.model });


    const conversationHistory = messages
      .filter((msg) => msg.mode === mode)
      .map((msg) => ({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.content }],
      }));

    const enhancedPrompt = `${config.systemPrompt}

Current settings:
- Temperature: ${settings.temperature} (${
      settings.temperature < 0.3
        ? "focused"
        : settings.temperature > 0.7
        ? "creative"
        : "balanced"
    })
- Creativity: ${settings.creativity} (${
      settings.creativity < 0.3
        ? "conservative"
        : settings.creativity > 0.7
        ? "highly creative"
        : "moderately creative"
    })
- Focus: ${settings.focus} (${
      settings.focus < 0.3
        ? "broad"
        : settings.focus > 0.7
        ? "highly focused"
        : "balanced focus"
    })

Adjust your response style accordingly.`;

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: enhancedPrompt }],
        },
        {
          role: "model",
          parts: [
            {
              text: "I understand. I'll adjust my responses based on the current mode and settings.",
            },
          ],
        },
        ...conversationHistory.slice(0, -1),
      ],
      generationConfig: {
        temperature: settings.temperature,
        maxOutputTokens: config.maxTokens,
      },
    });
    const lastMessage = messages[messages.length - 1];
    const result = await chat.sendMessage(lastMessage.content);
    const response = result.response.text();

    return NextResponse.json({ content: response });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Failed to process chat message" },
      { status: 500 }
    );
  }
}
