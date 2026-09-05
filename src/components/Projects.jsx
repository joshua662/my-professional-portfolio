import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { projects } from "../data/portfolioData";
import GooeyTextReveal from "./GooeyTextReveal";
import GooeyElementReveal from "./GooeyElementReveal";

function Card({ project, index, totalProjects, progress, onOpenProjectModal }) {
  const cardRef = useRef(null);

  // Divide overall section scroll range into totalProjects equal windows with hold & fade windows
  const step = 1 / totalProjects;
  const fadeWindow = 0.35 * step;

  const peakStart = index * step;
  const peakEnd = (index + 1) * step - fadeWindow;
  const exitEnd = (index + 1) * step;

  let inputRanges;
  let opacityRanges;
  let scaleRanges;
  let yRanges;

  if (index === 0) {
    // Project 1: Starts 100% visible, holds steady, then cross-fades out
    inputRanges = [0, peakEnd, exitEnd, 1];
    opacityRanges = [1, 1, 0, 0];
    scaleRanges = [1, 1, 0.95, 0.95];
    yRanges = [0, 0, -25, -25];
  } else if (index === totalProjects - 1) {
    // Last project: cross-fades in from entryStart to peakStart, then holds steady to section end
    const entryStart = peakStart - fadeWindow;
    inputRanges = [0, entryStart, peakStart, 1];
    opacityRanges = [0, 0, 1, 1];
    scaleRanges = [0.95, 0.95, 1, 1];
    yRanges = [25, 25, 0, 0];
  } else {
    // Middle projects: cross-fade in, hold steady, then cross-fade out
    const entryStart = peakStart - fadeWindow;
    inputRanges = [0, entryStart, peakStart, peakEnd, exitEnd, 1];
    opacityRanges = [0, 0, 1, 1, 0, 0];
    scaleRanges = [0.95, 0.95, 1, 1, 0.95, 0.95];
    yRanges = [25, 25, 0, 0, -25, -25];
  }

  const opacity = useTransform(progress, inputRanges, opacityRanges);
  const scale = useTransform(progress, inputRanges, scaleRanges);
  const y = useTransform(progress, inputRanges, yRanges);

  return (
    <div
      ref={cardRef}
      className="sticky flex items-center justify-center transition-all duration-300"
      style={{
        top: "210px",
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
          <div className="relative rounded-[2.5rem] bg-white border border-gray-200/90 p-6 sm:p-8 lg:p-10 shadow-xl hover:shadow-2xl transition-shadow duration-500 group overflow-hidden">
            {/* Technical Corner Bracket Accents */}
            <span className="absolute top-4 left-4 text-gray-300 font-mono text-sm pointer-events-none select-none">
              ┌
            </span>
            <span className="absolute top-4 right-4 text-gray-300 font-mono text-sm pointer-events-none select-none">
              ┐
            </span>
            <span className="absolute bottom-4 left-4 text-gray-300 font-mono text-sm pointer-events-none select-none">
              └
            </span>
            <span className="absolute bottom-4 right-4 text-gray-300 font-mono text-sm pointer-events-none select-none">
              ┘
            </span>

            <div className="grid gap-8 lg:grid-cols-12 items-center">
              {/* Left Column: Case Study Details */}
              <div className="lg:col-span-6 flex flex-col justify-between h-full">
                <div>
                  {/* Top Badges Bar */}
                  <div className="flex flex-wrap items-center gap-3 mb-5">
                    {project.badge && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-gray-100 border border-gray-300 text-[11px] font-bold uppercase tracking-wider text-gray-900 shadow-2xs">
                        <span className="h-1.5 w-1.5 rounded-full bg-gray-900 animate-pulse" />
                        {project.badge}
                      </span>
                    )}
                    {project.date && (
                      <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-gray-400">
                        {project.date}
                      </span>
                    )}
                    {project.subtitle && (
                      <span className="text-[11px] font-mono font-semibold uppercase tracking-widest text-gray-400 hidden sm:inline-block">
                        • {project.subtitle}
                      </span>
                    )}
                  </div>

                  {/* Main Large Title */}
                  <GooeyTextReveal mode="scroll" start="top 90%" once={true}>
                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight leading-[1.15] mb-4">
                      {project.title}
                    </h3>
                  </GooeyTextReveal>

                  {/* Description Paragraph */}
                  <GooeyTextReveal mode="scroll" start="top 90%" once={true} delay={0}>
                    <p className="text-sm md:text-base leading-relaxed text-gray-600 font-normal mb-6">
                      {project.description}
                    </p>
                  </GooeyTextReveal>

                  {/* Key Features Bullet Grid */}
                  {project.keyFeatures && (
                    <div className="mb-6">
                      <h4 className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-3">
                        KEY FEATURES
                      </h4>
                      <ul className="grid gap-2 sm:grid-cols-2 text-xs md:text-sm text-gray-700 font-medium">
                        {project.keyFeatures.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-gray-900 font-bold">•</span>
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
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100 mb-6">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-lg border border-gray-200 bg-gray-50 text-xs font-mono font-semibold text-gray-700"
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
                    className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-gray-900 group-hover:text-gray-600 transition-colors cursor-pointer focus:outline-none"
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
                  <div className="relative h-64 sm:h-80 lg:h-[380px] w-full rounded-2xl bg-gray-50 border border-gray-200/80 p-4 sm:p-6 flex items-center justify-center overflow-hidden shadow-inner group-hover:bg-gray-100/70 transition-colors">
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
    <section id="portfolio" ref={containerRef} className="section-muted relative">
      <div className="container mx-auto max-w-7xl px-6">
        {/* Fixed / Sticky Projects Section Header (Positioned cleanly below sticky Navbar z-50) */}
        <div className="sticky top-[80px] z-40 bg-gray-50/95 backdrop-blur-md pt-4 pb-4 mb-8 border-b border-gray-200/40">
          <div className="section-heading mb-0">
            <GooeyTextReveal mode="scroll" start="top 90%" once={true}>
              <h2 className="mb-0">Projects</h2>
            </GooeyTextReveal>
            <span className="mt-2" />
          </div>
          <GooeyTextReveal mode="scroll" start="top 90%" once={true} delay={0}>
            <p className="mt-2 text-gray-600 text-sm md:text-base max-w-2xl">
              A snapshot of recent web apps, hardware IoT integrations, and academic systems.
            </p>
          </GooeyTextReveal>
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
