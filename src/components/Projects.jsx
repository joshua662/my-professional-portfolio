import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { projects } from "../data/portfolioData";
import GooeyTextReveal from "./GooeyTextReveal";
import GooeyElementReveal from "./GooeyElementReveal";

function Card({ project, index, totalProjects, progress, onOpenProjectModal }) {
  const cardRef = useRef(null);

  // Divide scroll range into 4 distinct phases with synchronized crossover fade-in / fade-out
  let inputRanges;
  let opacityRanges;
  let scaleRanges;
  let yRanges;

  if (index === 0) {
    // Project 1: Starts 100% visible -> holds -> slowly fades out to Project 2
    inputRanges = [0, 0.18, 0.28, 1];
    opacityRanges = [1, 1, 0, 0];
    scaleRanges = [1, 1, 0.92, 0.92];
    yRanges = [0, 0, -40, -40];
  } else if (index === 1) {
    // Project 2: Slowly fades in as Project 1 fades out -> holds 100% -> slowly fades out as Project 3 fades in
    inputRanges = [0, 0.18, 0.28, 0.43, 0.53, 1];
    opacityRanges = [0, 0, 1, 1, 0, 0];
    scaleRanges = [0.92, 0.92, 1, 1, 0.92, 0.92];
    yRanges = [40, 40, 0, 0, -40, -40];
  } else if (index === 2) {
    // Project 3: Slowly fades in as Project 2 fades out -> holds 100% -> slowly fades out as Project 4 fades in
    inputRanges = [0, 0.43, 0.53, 0.68, 0.78, 1];
    opacityRanges = [0, 0, 1, 1, 0, 0];
    scaleRanges = [0.92, 0.92, 1, 1, 0.92, 0.92];
    yRanges = [40, 40, 0, 0, -40, -40];
  } else {
    // Project 4: Slowly fades in as Project 3 fades out -> holds 100% to section end
    inputRanges = [0, 0.68, 0.78, 1];
    opacityRanges = [0, 0, 1, 1];
    scaleRanges = [0.92, 0.92, 1, 1];
    yRanges = [40, 40, 0, 0];
  }

  const opacity = useTransform(progress, inputRanges, opacityRanges);
  const scale = useTransform(progress, inputRanges, scaleRanges);
  const y = useTransform(progress, inputRanges, yRanges);

  return (
    <div
      ref={cardRef}
      className="sticky flex items-center justify-center transition-all duration-300"
      style={{
        top: "140px",
        zIndex: (index + 1) * 10,
      }}
    >
      <motion.div
        style={{
          opacity,
          scale,
          y,
          transformOrigin: "center center",
        }}
        className="w-full"
      >
        <GooeyElementReveal mode="scroll" start="top 90%" once={true} yFrom={20} blurAmount={6}>
          <div className="relative rounded-[2.5rem] bg-white dark:bg-black border border-gray-200/90 dark:border-gray-800 p-6 sm:p-8 lg:p-10 shadow-xl hover:shadow-2xl transition-all duration-500 group overflow-hidden">
            {/* Technical Corner Bracket Accents */}
            <span className="absolute top-4 left-4 text-gray-300 dark:text-gray-700 font-mono text-sm pointer-events-none select-none">
              ┌
            </span>
            <span className="absolute top-4 right-4 text-gray-300 dark:text-gray-700 font-mono text-sm pointer-events-none select-none">
              ┐
            </span>
            <span className="absolute bottom-4 left-4 text-gray-300 dark:text-gray-700 font-mono text-sm pointer-events-none select-none">
              └
            </span>
            <span className="absolute bottom-4 right-4 text-gray-300 dark:text-gray-700 font-mono text-sm pointer-events-none select-none">
              ┘
            </span>

            <div className="grid gap-8 lg:grid-cols-12 items-center">
              {/* Left Column: Case Study Details */}
              <div className="lg:col-span-6 flex flex-col justify-between h-full">
                <div>
                  {/* Top Badges Bar */}
                  <div className="flex flex-wrap items-center gap-3 mb-5">
                    {project.badge && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-[11px] font-bold uppercase tracking-wider text-gray-900 dark:text-white shadow-2xs">
                        <span className="h-1.5 w-1.5 rounded-full bg-gray-900 dark:bg-white animate-pulse" />
                        {project.badge}
                      </span>
                    )}
                    {project.date && (
                      <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                        {project.date}
                      </span>
                    )}
                    {project.subtitle && (
                      <span className="text-[11px] font-mono font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 hidden sm:inline-block">
                        • {project.subtitle}
                      </span>
                    )}
                  </div>

                  {/* Main Large Title */}
                  <GooeyTextReveal mode="scroll" start="top 90%" once={true}>
                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white tracking-tight leading-[1.15] mb-4">
                      {project.title}
                    </h3>
                  </GooeyTextReveal>

                  {/* Description Paragraph */}
                  <GooeyTextReveal mode="scroll" start="top 90%" once={true} delay={0}>
                    <p className="text-sm md:text-base leading-relaxed text-gray-600 dark:text-gray-300 font-normal mb-6">
                      {project.description}
                    </p>
                  </GooeyTextReveal>

                  {/* Key Features Bullet Grid */}
                  {project.keyFeatures && (
                    <div className="mb-6">
                      <h4 className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 mb-3">
                        KEY FEATURES
                      </h4>
                      <ul className="grid gap-2 sm:grid-cols-2 text-xs md:text-sm text-gray-700 dark:text-gray-300 font-medium">
                        {project.keyFeatures.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-gray-900 dark:text-white font-bold">•</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div>
                  {/* Tech Stack Badges */}
                  {project.technologies && (
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100 dark:border-gray-800 mb-6">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/80 text-xs font-mono font-semibold text-gray-700 dark:text-gray-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Case Study CTA Button */}
                  <button
                    type="button"
                    onClick={() => onOpenProjectModal(project)}
                    className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-gray-900 dark:text-white group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors cursor-pointer focus:outline-none"
                  >
                    VIEW CASE STUDY{" "}
                    <i className="fas fa-arrow-up-right-from-square text-xs group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Right Column: Case Study Mockup Frame */}
              <div className="lg:col-span-6">
                <button
                  type="button"
                  onClick={() => onOpenProjectModal(project)}
                  className="w-full text-left cursor-pointer focus:outline-none"
                >
                  <div className="relative h-64 sm:h-80 lg:h-[380px] w-full rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200/80 dark:border-gray-800 p-4 sm:p-6 flex items-center justify-center overflow-hidden shadow-inner group-hover:bg-gray-100/70 dark:group-hover:bg-gray-800/90 transition-colors">
                    <img
                      src={project.image || project.poster}
                      alt={project.title}
                      className="h-full w-full object-contain rounded-xl shadow-md transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </GooeyElementReveal>
      </motion.div>
    </div>
  );
}

export default function Projects({ onOpenProjectModal }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section id="portfolio" ref={containerRef} className="section-muted relative pt-8 pb-32">
      <div className="container mx-auto max-w-7xl px-6">
        {/* Sticky Section Heading (Pins at top during scroll) */}
        <div className="sticky top-16 z-40 bg-white/90 dark:bg-black/90 backdrop-blur-md pt-4 pb-4 mb-8">
          <div className="section-heading mb-0">
            <GooeyTextReveal mode="scroll" start="top 85%">
              <h2>Projects</h2>
            </GooeyTextReveal>
            <span />
          </div>
        </div>

        {/* Stacked Case Study Cards Container */}
        <div className="space-y-24 md:space-y-32 pb-32">
          {projects.map((project, index) => (
            <Card
              key={project.id}
              project={project}
              index={index}
              totalProjects={projects.length}
              progress={scrollYProgress}
              onOpenProjectModal={onOpenProjectModal}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
