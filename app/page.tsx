import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { BentoGrid } from "@/components/magicui/bento-grid";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Zap,
  ArrowRight,
  Code2,
  PenTool,
  Search,
  Image,
  Sparkles,
} from "lucide-react";
import { Terminal, TypingAnimation } from "@/components/magicui/terminal";
import { Spotlight } from "@/components/ui/Spotlight";

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Spotlight Effects */}
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <Spotlight className="top-10 left-full w-[50vw] h-[80vh]" fill="gray" />

      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-950 to-black pointer-events-none select-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#33333322_1px,transparent_1px),linear-gradient(to_bottom,#33333322_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] pointer-events-none select-none" />

      {/* Floating Elements */}
      <div className="absolute left-1/4 top-1/4 h-40 w-40 sm:h-64 sm:w-64 rounded-full bg-gray-800/20 blur-3xl pointer-events-none select-none" />
      <div className="absolute right-1/4 bottom-1/4 h-40 w-40 sm:h-64 sm:w-64 rounded-full bg-gray-700/20 blur-3xl pointer-events-none select-none" />

      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Column - Brand & Description */}
          <div className="flex-1 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gray-400 animate-pulse"></div>
                <p className="text-sm text-gray-400 uppercase tracking-wider">
                  AI-Powered Tool Suite
                </p>
              </div>

              <h1 className="text-6xl md:text-7xl font-bold">
                Staylth
                <span className="text-gray-400">GPT</span>
              </h1>

              <p className="text-xl text-gray-300 max-w-2xl leading-relaxed">
                Your personalized AI assistant that adapts to your mood and
                needs. From coding to creative writing, research to image
                generation - switch between modes for the perfect assistance
                experience.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <SignInButton mode="modal">
                <Button
                  size="lg"
                  className="group relative overflow-hidden bg-gray-800 text-white px-8 py-6 text-base font-medium hover:bg-gray-700 transition-all duration-300 border border-gray-700 hover:scale-105"
                >
                  <Zap className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </SignInButton>

              <Button
                variant="outline"
                size="lg"
                className="px-8 py-6 text-base border-gray-700 text-gray-300 hover:text-white hover:border-gray-500"
              >
                View Demo
              </Button>
            </div>

            <div className="flex items-center gap-4 pt-8">
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse"></div>
                <span className="text-sm text-gray-400">
                  Powered by Google AI
                </span>
              </div>
              <div className="h-4 w-px bg-gray-700"></div>
              <div className="flex items-center">
                <Sparkles className="w-4 h-4 text-gray-400 mr-2" />
                <span className="text-sm text-gray-400">
                  Real-time processing
                </span>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <Terminal className="h-[400px]">
              <TypingAnimation duration={30}>
                $ staylthgpt --mode coding
              </TypingAnimation>
              <TypingAnimation duration={30} delay={1000}>
                Analyzing your code structure...
              </TypingAnimation>
              <TypingAnimation duration={30} delay={2000}>
                Found 3 optimization opportunities
              </TypingAnimation>
              <TypingAnimation duration={30} delay={3000}>
                Generating improved solution...
              </TypingAnimation>
              <TypingAnimation duration={30} delay={4000}>
                Solution ready! Efficiency improved by 42%
              </TypingAnimation>
              <TypingAnimation duration={30} delay={5000}>
                $ staylthgpt --mode creative
              </TypingAnimation>
              <TypingAnimation duration={30} delay={6000}>
                Switching to creative writing mode...
              </TypingAnimation>
            </Terminal>
          </div>
        </div>



        {/* Bottom CTA */}
        <div className="text-center mt-24 border-t border-gray-800 pt-16">
          <h2 className="text-3xl font-bold mb-6">
            Ready to transform your workflow?
          </h2>
          <SignInButton mode="modal">
            <Button
              size="lg"
              className="group relative overflow-hidden bg-gray-800 text-white px-8 py-6 text-base font-medium hover:bg-gray-700 transition-all duration-300 border border-gray-700"
            >
              <Zap className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
              Start using StaylthGPT now
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </SignInButton>
        </div>
      </div>
    </main>
  );
}
