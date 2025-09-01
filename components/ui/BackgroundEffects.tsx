// components/ui/BackgroundEffects.tsx
"use client";

export const BackgroundEffects = () => {
  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 pointer-events-none select-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] pointer-events-none select-none" />
      <div className="absolute left-1/4 top-1/4 h-40 w-40 sm:h-64 sm:w-64 rounded-full bg-gray-800/20 blur-3xl pointer-events-none select-none" />
      <div className="absolute right-1/4 bottom-1/4 h-40 w-40 sm:h-64 sm:w-64 rounded-full bg-gray-700/20 blur-3xl pointer-events-none select-none" />
    </>
  );
};
