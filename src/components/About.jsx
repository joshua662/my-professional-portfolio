import React from "react";
import { timelineItems } from "../data/portfolioData";
import GooeyTextReveal from "./GooeyTextReveal";
import GooeyElementReveal from "./GooeyElementReveal";

export default function About() {
  const education = timelineItems.find((item) => item.title.startsWith("BS "));

  return (
    <section
      id="about"
      className="bg-white text-black dark:bg-black dark:text-white"
    >
      <div className="flex min-h-screen items-center justify-center px-6 py-24">
        <div className="w-full max-w-6xl text-center">
          <GooeyTextReveal
            mode="scroll"
            start="top 95%"
            end="bottom 80%"
            delay={0.05}
            duration={0.9}
            blurAmount={0.35}
          >
            <span className="mb-14 inline-flex rounded-full border border-gray-200 bg-gray-50 px-5 py-2 font-mono text-xs uppercase tracking-[0.18em] text-gray-500 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400">
              Why I do this
            </span>
          </GooeyTextReveal>

          <GooeyTextReveal
            mode="scroll"
            start="top 95%"
            end="bottom 80%"
            delay={0.15}
            duration={0.9}
            blurAmount={0.35}
          >
            <h2 className="text-4xl font-black leading-[1.08] tracking-[-0.04em] sm:text-6xl lg:text-8xl">
              There&apos;s something about taking two
              <br className="hidden sm:block" /> completely different worlds
              <br className="hidden sm:block" />
              <span className="text-gray-400 dark:text-gray-500">
                and bridging them into one functioning
              </span>{" "}
              system.
            </h2>
          </GooeyTextReveal>

          <GooeyTextReveal
            mode="scroll"
            start="top 95%"
            end="bottom 80%"
            delay={0.25}
            duration={0.9}
            blurAmount={0.35}
          >
            <div className="mx-auto my-12 h-px w-24 bg-gray-300 dark:bg-gray-700" />
            <p className="text-2xl font-medium text-gray-500 dark:text-gray-400 sm:text-4xl">
              That&apos;s why I chose this field.
              <br />
              <span className="text-black dark:text-white">
                That&apos;s what keeps me building.
              </span>
            </p>
          </GooeyTextReveal>
        </div>
      </div>

      <div className="flex min-h-screen items-center justify-center border-t border-gray-100 px-6 py-24 dark:border-gray-900">
        <div className="w-full max-w-7xl">
          <GooeyElementReveal
            mode="scroll"
            start="top 85%"
            end="bottom 20%"
            stagger={0.1}
          >
            <div className="grid gap-8 md:grid-cols-2">
              <InfoCard
                label="Education"
                value={education?.detail ?? "Information Technology"}
              />
              <InfoCard
                label="Degree"
                value={education?.title ?? "BS Information Technology"}
              />
              <InfoCard label="Focus" value="Software Development" />
              <InfoCard
                label="Timeline"
                value={education?.year ?? "2023 - Present"}
              />
            </div>
          </GooeyElementReveal>

          <GooeyElementReveal
            mode="scroll"
            start="top 85%"
            end="bottom 20%"
            delay={0.35}
          >
            <div className="mt-12 text-center">
              <a
                href="#resume"
                className="inline-flex items-center gap-3 rounded-full bg-black px-8 py-4 text-sm font-bold uppercase tracking-wide text-white transition-transform duration-300 hover:-translate-y-1 dark:bg-white dark:text-black"
              >
                Learn more
                <i className="fas fa-arrow-right" aria-hidden="true" />
              </a>
            </div>
          </GooeyElementReveal>
        </div>
      </div>
    </section>
  );
}

function InfoCard({ label, value }) {
  return (
    <div className="rounded-[1.75rem] border border-gray-200 bg-white px-8 py-8 shadow-[0_20px_45px_rgba(0,0,0,0.12)] dark:border-gray-800 dark:bg-gray-950 dark:shadow-[0_20px_45px_rgba(0,0,0,0.35)] sm:px-10 sm:py-9">
      <p className="mb-5 font-mono text-xs uppercase tracking-[0.16em] text-gray-500 dark:text-gray-400">
        <span className="mr-2 text-black dark:text-white">•</span>
        {label}
      </p>
      <p className="text-2xl font-bold tracking-[-0.03em] text-black dark:text-white sm:text-3xl">
        {value}
      </p>
    </div>
  );
}
