"use client";

import { Terminal, TypingAnimation } from "@/components/magicui/terminal";

export function LandingTerminal() {
  return (
    <Terminal className="h-[400px]">
      <TypingAnimation duration={30}>
        $ tunepekar set-tone linkedin
      </TypingAnimation>
      <TypingAnimation duration={30} delay={1000}>
        ✔ Tone set to: Professional (LinkedIn)
      </TypingAnimation>
      <TypingAnimation duration={30} delay={2000}>
        Preview → "Excited to share my latest project milestone..."
      </TypingAnimation>

      <TypingAnimation duration={30} delay={4000}>
        $ tunepekar set-tone cynical
      </TypingAnimation>
      <TypingAnimation duration={30} delay={5000}>
        ✔ Tone set to: Cynical
      </TypingAnimation>
      <TypingAnimation duration={30} delay={6000}>
        Preview → "Oh great, another 'innovative' startup. Just what we needed."
      </TypingAnimation>

      <TypingAnimation duration={30} delay={8000}>
        $ tunepekar set-tone satire
      </TypingAnimation>
      <TypingAnimation duration={30} delay={9000}>
        ✔ Tone set to: Satire
      </TypingAnimation>
      <TypingAnimation duration={30} delay={10000}>
        Preview → "Breaking news: coffee still the leading cause of
        productivity."
      </TypingAnimation>

      <TypingAnimation duration={30} delay={12000}>
        $ tunepekar set-tone slang
      </TypingAnimation>
      <TypingAnimation duration={30} delay={13000}>
        ✔ Tone set to: Slang
      </TypingAnimation>
      <TypingAnimation duration={30} delay={14000}>
        Preview → "Bruh, this app just vibes different fr fr 🚀"
      </TypingAnimation>
    </Terminal>
  );
}
