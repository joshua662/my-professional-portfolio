import React, { useEffect, useState } from "react";
import GooeyTextReveal from "./GooeyTextReveal";

const terminalCommands = [
  "sudo make it work",
  "git commit -m 'Start where you are, Build want you want.'",
  "import { creativity } from 'mind';",
  "class Solution extends Problem { }",
  "async function buildFuture() { }",
  "while(true) { innovate(); }",
  "return <Innovation />;",
  "const engineer = ComputerEngineer.getInstance();",
];

function TypewriterTerminal() {
  const [commandIndex, setCommandIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const command = terminalCommands[commandIndex];
    const isComplete = text === command;
    const isEmpty = text === "";
    const delay = isComplete ? 1600 : isDeleting ? 32 : 68;

    const timer = window.setTimeout(() => {
      if (!isDeleting && !isComplete) {
        setText(command.slice(0, text.length + 1));
        return;
      }

      if (!isDeleting && isComplete) {
        setIsDeleting(true);
        return;
      }

      if (isDeleting && !isEmpty) {
        setText(command.slice(0, text.length - 1));
        return;
      }

      setIsDeleting(false);
      setCommandIndex(
        (currentIndex) => (currentIndex + 1) % terminalCommands.length,
      );
    }, delay);

    return () => window.clearTimeout(timer);
  }, [commandIndex, isDeleting, text]);

  return (
    <div
      className="inline-flex min-h-12 max-w-full items-center px-5 py-3 font-mono text-xs font-medium tracking-[0.12em] text-black/70 dark:text-white/65"
      aria-label={`Terminal command: ${terminalCommands[commandIndex]}`}
    >
      <span className="mr-2 text-black/80 dark:text-white/80">&gt;</span>
      <span className="break-all text-left">{text}</span>
      <span
        aria-hidden="true"
        className="typing-cursor ml-1 inline-block shrink-0 text-black/80 dark:text-white/80"
      >
        |
      </span>
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white px-4 py-16 text-black transition-colors duration-300 dark:bg-black dark:text-white"
    >
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
            <div className="font-light tracking-[0.02em] text-black dark:text-gray-300">
              JOSHUA
            </div>
            <div className="text-black dark:text-white">SIMPAS</div>
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
          <div className="mb-8 font-mono text-[clamp(0.9rem,1.6vw,1.8rem)] font-medium tracking-[0.06em] text-black/90 dark:text-white/90">
            &lt; Software Engineer /&gt;
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
          <h2 className="mb-10 text-[clamp(1.1rem,2.2vw,2.6rem)] font-black uppercase tracking-[0.05em] text-black dark:text-white">
            INTEGRETED SYSTEM &amp; SOFTWARE DEVELOPER
          </h2>
        </GooeyTextReveal>

        <GooeyTextReveal
          mode="scroll"
          start="top 95%"
          end="bottom 80%"
          delay={0.35}
          duration={0.9}
          blurAmount={0.35}
          split={false}
        >
          <TypewriterTerminal />
        </GooeyTextReveal>
      </div>
    </section>
  );
}
