import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Zap, ArrowRight } from "lucide-react";
import { Spotlight } from "@/components/ui/Spotlight"; 

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <main className="flex min-h-screen items-center justify-center p-8 relative overflow-hidden bg-gray-950">
      {/* Spotlight Effects */}
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <Spotlight className="top-10 left-full w-[50vw] h-[80vh]" fill="purple" />

      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 pointer-events-none select-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] pointer-events-none select-none" />

      {/* Floating Elements */}
      <div className="absolute left-1/4 top-1/4 h-40 w-40 sm:h-64 sm:w-64 rounded-full bg-gray-800/20 blur-3xl pointer-events-none select-none" />
      <div className="absolute right-1/4 bottom-1/4 h-40 w-40 sm:h-64 sm:w-64 rounded-full bg-gray-700/20 blur-3xl pointer-events-none select-none" />

      <div className="w-full max-w-6xl relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-white mb-4">
            Staylth<span className="text-gray-400">GPT</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            A unified space powered by Google's models where you can seamlessly
            switch between different creative modes - from precise coding
            assistance to expressive writing and image generation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="bg-gray-900/80 border-gray-800 backdrop-blur-sm hover:border-gray-600 transition-all duration-300 hover:scale-105">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <div className="w-3 h-3 rounded-full bg-gray-400 mr-2"></div>
                Coding Mode
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-400">
                Precise debugging, code generation, and technical assistance
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/80 border-gray-800 backdrop-blur-sm hover:border-gray-600 transition-all duration-300 hover:scale-105">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <div className="w-3 h-3 rounded-full bg-gray-400 mr-2"></div>
                Creative Mode
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-400">
                Expressive writing, storytelling, and creative content
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/80 border-gray-800 backdrop-blur-sm hover:border-gray-600 transition-all duration-300 hover:scale-105">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <div className="w-3 h-3 rounded-full bg-gray-400 mr-2"></div>
                Doubt Mode
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-400">
                Research assistance and web-powered answers
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/80 border-gray-800 backdrop-blur-sm hover:border-gray-600 transition-all duration-300 hover:scale-105">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <div className="w-3 h-3 rounded-full bg-gray-400 mr-2"></div>
                Image Mode
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-400">
                AI-powered image generation and visual creativity
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <SignInButton mode="modal">
            <Button
              size="lg"
              className="group relative overflow-hidden bg-gray-800 text-white px-8 py-4 text-base font-medium hover:bg-gray-700 transition-all duration-300 border border-gray-700 hover:scale-105"
            >
              <Zap className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
              Get Started
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </SignInButton>
        </div>
      </div>
    </main>
  );
}
