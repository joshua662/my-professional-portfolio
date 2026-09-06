import React from "react";
import GooeyTextReveal from "./GooeyTextReveal";
import { HexagonBackground } from "./animate-ui/components/backgrounds/hexagon";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white px-4 py-16 text-black transition-colors duration-300 dark:bg-black dark:text-white"
    >
      <HexagonBackground className="absolute inset-0" />

      <div className="relative z-10 w-full max-w-7xl text-center">
        <GooeyTextReveal
          mode="scroll"
          start="top 95%"
          end="bottom 80%"
          delay={0.05}
          duration={0.9}
          blurAmount={0.35}
        >
          <div className="mb-6 text-[clamp(3rem,8vw,12rem)] font-black uppercase tracking-[-0.06em] leading-[0.8]">
            <div className="text-gray-300">JOSHUA</div>
            <div className="text-white">SIMPAS</div>
          </div>
        </GooeyTextReveal>

        <GooeyTextReveal
          mode="scroll"
          start="top 95%"
          end="bottom 80%"
          delay={0.15}
          duration={0.9}
          blurAmount={0.35}
        >
          <div className="mb-8 font-mono text-[clamp(0.9rem,1.6vw,1.8rem)] font-medium tracking-[0.06em] text-white/90">
            &lt; Computer Engineer /&gt;
          </div>
        </GooeyTextReveal>

        <GooeyTextReveal
          mode="scroll"
          start="top 95%"
          end="bottom 80%"
          delay={0.25}
          duration={0.9}
          blurAmount={0.35}
        >
          <h2 className="mb-10 text-[clamp(1.1rem,2.2vw,2.6rem)] font-black uppercase tracking-[0.05em] text-white">
            Integrated systems &amp; software engineering
          </h2>
        </GooeyTextReveal>

        <GooeyTextReveal
          mode="scroll"
          start="top 95%"
          end="bottom 80%"
          delay={0.35}
          duration={0.9}
          blurAmount={0.35}
        >
          <button
            type="button"
            className="inline-flex items-center gap-3 border border-white/20 bg-white/5 px-5 py-3 font-mono text-xs font-medium uppercase tracking-[0.2em] text-white transition-all duration-300 hover:border-white/40 hover:bg-white/10"
          >
            <span className="text-lg">&gt;</span>
            <span>sudo make it work</span>
            <span className="inline-block h-4 w-[2px] bg-white/80 animate-pulse" />
          </button>
        </GooeyTextReveal>
      </div>
    </section>
  );
}
