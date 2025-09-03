import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { LandingTerminal } from "@/components/ui/LandingTerminal";
import { Spotlight } from "@/components/ui/Spotlight";
import { BackgroundEffects } from "@/components/ui/BackgroundEffects";
import { TransparentNavbar } from "@/components/navbar";
import { TestimonialsSection } from "@/components/ui/AnimatedTestimonials ";

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      <TransparentNavbar />

      {/* Spotlight Effects */}
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <Spotlight className="top-10 left-full w-[50vw] h-[80vh]" fill="gray" />

      {/* Background Elements */}
      <BackgroundEffects />

      {/* Floating Elements */}
      <div className="absolute left-1/4 top-1/4 h-40 w-40 sm:h-64 sm:w-64 rounded-full bg-gray-800/20 blur-3xl pointer-events-none select-none" />
      <div className="absolute right-1/4 bottom-1/4 h-40 w-40 sm:h-64 sm:w-64 rounded-full bg-gray-700/20 blur-3xl pointer-events-none select-none" />

      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10 pt-20">
        {/* Added top padding to push content down */}
        <div className="pt-16 md:pt-24">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Left Column - Brand & Description */}
            <div className="flex-1 max-w-2xl space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-neutral-900 via-neutral-950 to-neutral-900 border border-neutral-800/70 px-4 py-1.5 shadow-md shadow-black/20">
                  {/* Dot */}
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_2px_rgba(52,211,153,0.5)]"></div>

                  {/* Text */}
                  <span className="text-sm font-medium tracking-wide text-neutral-200">
                    AI-Powered Tool Suite
                  </span>
                </div>

                {/* Added margin-top to push the title down */}
                <div className="mt-8">
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold">
                    Tone<span className="text-gray-400">pekar</span>
                  </h1>
                </div>

                <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                  One idea, many voices. Show AI your tones -professional,
                  witty, or serious and get text that matches your style every
                  time.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <SignInButton mode="modal">
                  <InteractiveHoverButton>Get Started</InteractiveHoverButton>
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
              </div>
            </div>

            <div className="flex-1 max-w-2xl">
              <LandingTerminal />
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <TestimonialsSection />

        {/* Bottom CTA */}
        <div className="text-center mt-24 border-t border-gray-800 pt-16 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Find your perfect tone.</h2>
          <SignInButton mode="modal">
            <InteractiveHoverButton>
              Start with Tunepekar
            </InteractiveHoverButton>
          </SignInButton>
        </div>
      </div>
    </main>
  );
}
