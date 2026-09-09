import React, { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { timelineItems } from "../data/portfolioData";
import GooeyTextReveal from "./GooeyTextReveal";
import GooeyElementReveal from "./GooeyElementReveal";

export default function About() {
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const closeTimerRef = useRef(null);
  const aboutModalRef = useRef(null);

  const education = timelineItems.find((item) => item.title.startsWith("BS "));
  const focusTags = [
    "Web Design and Development",
    "Software Design",
    "Computer Network and Security",
    "Microprocessor Systems",
    "Data Structures and Algorithms",
    "Object-Oriented Programming",
    "Logic Circuit and Design",
    "Data and Digital Communications",
    "Feedback and Control Systems",
    "Database Design and Development",
    "Embedded Systems",
    "Digital Signal Processing",
    "Internet of Things",
    "Computer Architecture and Organization",
    "Machine Learning",
  ];

  const handleOpenAboutModal = () => {
    window.clearTimeout(closeTimerRef.current);
    setIsClosing(false);
    setIsAboutModalOpen(true);
  };

  const handleCloseAboutModal = () => {
    if (isClosing) return;

    setIsClosing(true);
    document.body.style.overflow = "";
    closeTimerRef.current = window.setTimeout(() => {
      setIsClosing(false);
      setIsAboutModalOpen(false);
    }, 260);
  };

  useEffect(() => {
    if (!isAboutModalOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        handleCloseAboutModal();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    const refreshTriggers = window.setTimeout(() => {
      ScrollTrigger.refresh();
    }, 50);

    return () => {
      window.clearTimeout(refreshTriggers);
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isAboutModalOpen]);

  useEffect(() => {
    return () => window.clearTimeout(closeTimerRef.current);
  }, []);

  return (
    <section
      id="about"
      className="bg-white text-black dark:bg-black dark:text-white"
    >
      <div className="flex min-h-screen items-center justify-center px-6 py-24">
        <div className="w-full max-w-6xl text-center">
          <GooeyTextReveal
            mode="scrub"
            start="top 90%"
            end="bottom 65%"
            duration={0.9}
            blurAmount={0.35}
          >
            <span className="mb-14 inline-flex rounded-full border border-gray-200 bg-gray-50 px-5 py-2 font-mono text-xs uppercase tracking-[0.18em] text-gray-500 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400">
              Why I do this
            </span>
          </GooeyTextReveal>

          <GooeyTextReveal
            mode="scrub"
            start="top 90%"
            end="bottom 65%"
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
            mode="scrub"
            start="top 90%"
            end="bottom 65%"
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
            mode="scrub"
            start="top 85%"
            end="bottom 45%"
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

          <GooeyElementReveal mode="scrub" start="top 85%" end="bottom 45%">
            <div className="mt-12 text-center">
              <button
                type="button"
                onClick={handleOpenAboutModal}
                className="inline-flex items-center gap-3 rounded-full bg-black px-8 py-4 text-sm font-bold uppercase tracking-wide text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:bg-white dark:text-black"
              >
                <span>Learn more</span>
                <i className="fas fa-arrow-right" aria-hidden="true" />
              </button>
            </div>
          </GooeyElementReveal>
        </div>
      </div>

      {isAboutModalOpen && (
        <div
          className={`fixed inset-0 z-[100] flex flex-col bg-white text-black transition-opacity duration-300 dark:bg-black dark:text-white ${
            isClosing
              ? "pointer-events-none opacity-0"
              : "pointer-events-auto opacity-100"
          }`}
          role="presentation"
        >
          <div
            className="flex min-h-0 flex-1 flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="About Me"
          >
            <header className="z-30 flex h-14 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-6 text-sm dark:border-gray-800 dark:bg-black sm:px-8">
              <button
                type="button"
                onClick={handleCloseAboutModal}
                className="relative z-40 inline-flex cursor-pointer items-center gap-2 text-gray-600 transition-colors hover:text-black dark:text-gray-400 dark:hover:text-white"
                aria-label="Back to About"
              >
                <i className="fas fa-arrow-left" aria-hidden="true" />
                Back
              </button>
            </header>

            <div ref={aboutModalRef} className="min-h-0 flex-1 overflow-y-auto">
              <section className="relative z-0 isolate overflow-hidden bg-white dark:bg-black">
                <div
                  id="about-details"
                  className="mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-7xl items-center px-6 py-8 sm:px-10 lg:px-16"
                >
                  <div className="grid w-full items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
                    <div>
                      <GooeyTextReveal
                        mode="scroll"
                        scroller={aboutModalRef}
                        start="top 88%"
                        delay={0.05}
                        duration={0.9}
                        blurAmount={0.35}
                      >
                        <h2 className="max-w-3xl text-[clamp(3rem,8vw,7rem)] font-black uppercase leading-[0.82] tracking-[-0.07em]">
                          <span className="block">Joshua</span>
                          <span className="block text-gray-400 dark:text-gray-600">
                            Simpas
                          </span>
                        </h2>
                      </GooeyTextReveal>

                      <GooeyTextReveal
                        mode="scroll"
                        scroller={aboutModalRef}
                        start="top 88%"
                        delay={0.12}
                        duration={0.9}
                        blurAmount={0.35}
                      >
                        <p className="mt-6 max-w-2xl border-l border-black pl-6 text-base leading-relaxed text-gray-600 dark:border-white dark:text-gray-300 sm:text-xl">
                          I am a Computer Engineering student who enjoys
                          building at the intersection of software and hardware.
                          I create full-stack web applications, design circuits,
                          and program microcontrollers to connect physical
                          devices with useful digital systems.
                        </p>
                      </GooeyTextReveal>

                      <GooeyElementReveal
                        className="overflow-hidden"
                        mode="scroll"
                        scroller={aboutModalRef}
                        start="top 88%"
                        delay={0.2}
                        duration={0.9}
                        yFrom={12}
                        scaleFrom={0.98}
                        gooey={false}
                      >
                        <div className="mt-8 flex flex-wrap gap-3">
                          <a
                            href="mailto:joshuasimpas36@gmail.com"
                            className="inline-flex items-center gap-3 rounded-full bg-black px-6 py-3 text-sm font-bold text-white transition-transform hover:-translate-y-1 dark:bg-white dark:text-black"
                          >
                            <i className="far fa-envelope" aria-hidden="true" />
                            Contact Me
                          </a>
                          <a
                            href="https://github.com/joshua662"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-3 rounded-full border border-gray-200 px-6 py-3 text-sm font-semibold transition-colors hover:border-black dark:border-gray-700 dark:hover:border-white"
                          >
                            <i className="fab fa-github" aria-hidden="true" />
                            GitHub
                          </a>
                          <a
                            href="https://www.linkedin.com"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-3 rounded-full border border-gray-200 px-6 py-3 text-sm font-semibold transition-colors hover:border-black dark:border-gray-700 dark:hover:border-white"
                          >
                            <i
                              className="fab fa-linkedin-in"
                              aria-hidden="true"
                            />
                            LinkedIn
                          </a>
                        </div>
                      </GooeyElementReveal>
                    </div>

                    <GooeyElementReveal
                      key={isAboutModalOpen ? "profile-open" : "profile-closed"}
                      mode="immediate"
                      delay={0.12}
                      duration={0.9}
                      yFrom={16}
                      scaleFrom={0.98}
                      gooey={false}
                    >
                      <div className="relative mx-auto w-full max-w-[28rem] overflow-hidden rounded-[2rem] border border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900">
                        <img
                          src="/image/Profile2.jpg"
                          alt="Joshua Simpas"
                          className="block h-[min(32rem,65vh)] w-full object-cover object-top"
                        />
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/5 bg-gradient-to-t from-white/80 to-transparent dark:from-black/80" />
                      </div>
                    </GooeyElementReveal>
                  </div>
                </div>
              </section>

              <section className="relative z-10 isolate overflow-hidden bg-white dark:bg-black">
                <div className="mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-7xl items-center px-6 py-8 sm:px-10 lg:px-16">
                  <div className="grid w-full items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
                    <div>
                      <GooeyTextReveal
                        mode="scroll"
                        scroller={aboutModalRef}
                        start="top 88%"
                        split={false}
                        duration={0.9}
                        blurAmount={0.35}
                      >
                        <div className="mb-6 flex items-center gap-3">
                          <i
                            className="fas fa-graduation-cap text-2xl"
                            aria-hidden="true"
                          />
                          <h3 className="text-[clamp(2rem,4vw,3rem)] font-black tracking-[-0.03em]">
                            Education
                          </h3>
                        </div>
                      </GooeyTextReveal>

                      <div className="relative border-l-2 border-gray-300 pl-8 dark:border-gray-700">
                        <EducationEntry
                          year="2022 — 2026"
                          school="Filamer Christian University"
                          degree="Bachelor of Science in Information Technology"
                          tags={focusTags}
                          scroller={aboutModalRef}
                        />
                        <EducationEntry
                          year="2020 — 2022"
                          school="Cuartero National High School"
                          degree="ABM"
                          tags={[]}
                          scroller={aboutModalRef}
                        />
                      </div>
                    </div>

                    <GooeyElementReveal
                      className="overflow-hidden"
                      mode="immediate"
                      delay={0.08}
                      duration={0.9}
                      yFrom={16}
                      scaleFrom={0.98}
                      gooey={false}
                    >
                      <div className="mx-auto w-full max-w-[28rem] rounded-[2rem] border border-gray-200 bg-white px-6 py-7 shadow-[0_20px_45px_rgba(0,0,0,0.08)] dark:border-gray-800 dark:bg-gray-950 dark:shadow-[0_20px_45px_rgba(0,0,0,0.35)] sm:px-8">
                        <h3 className="mb-5 text-lg font-black tracking-[-0.02em]">
                          Contact Information
                        </h3>

                        <div className="space-y-4">
                          <div className="flex items-center gap-4">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gray-200 text-base text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                              <i
                                className="far fa-envelope"
                                aria-hidden="true"
                              />
                            </div>
                            <div className="min-w-0">
                              <p className="mb-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-gray-500 dark:text-gray-400">
                                Email
                              </p>
                              <a
                                href="mailto:joshuasimpas36@gmail.com"
                                className="break-all text-base text-black transition-colors hover:text-gray-500 dark:text-white dark:hover:text-gray-400"
                              >
                                joshuasimpas36@gmail.com
                              </a>
                            </div>
                          </div>

                          <div className="h-px bg-gray-200 dark:bg-gray-800" />

                          <div className="flex items-center gap-4">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gray-200 text-base text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                              <i
                                className="fas fa-phone-alt"
                                aria-hidden="true"
                              />
                            </div>
                            <div className="min-w-0">
                              <p className="mb-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-gray-500 dark:text-gray-400">
                                Phone
                              </p>
                              <a
                                href="tel:+639666504091"
                                className="text-base text-black transition-colors hover:text-gray-500 dark:text-white dark:hover:text-gray-400"
                              >
                                +639095924269
                              </a>
                            </div>
                          </div>

                          <div className="h-px bg-gray-200 dark:bg-gray-800" />

                          <div className="flex items-center gap-4">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gray-200 text-base text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                              <i
                                className="fas fa-map-marker-alt"
                                aria-hidden="true"
                              />
                            </div>
                            <div className="min-w-0">
                              <p className="mb-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-gray-500 dark:text-gray-400">
                                Location
                              </p>
                              <p className="text-base text-black dark:text-white">
                                Roxas City, Capiz, Philippines
                              </p>
                            </div>
                          </div>
                        </div>

                        <a
                          href="/RESUME AND LETTER.pdf"
                          download
                          className="mt-6 flex w-full items-center justify-center gap-3 rounded-full border border-gray-200 bg-gray-50 px-6 py-3 text-sm font-bold transition-all hover:border-black hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:hover:border-white dark:hover:bg-gray-800"
                        >
                          <i className="fas fa-download" aria-hidden="true" />
                          Download Resume
                        </a>
                      </div>
                    </GooeyElementReveal>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function EducationEntry({ year, school, degree, tags, badge, scroller }) {
  return (
    <div className="relative pb-6 last:pb-0">
      <span className="absolute -left-[2.35rem] top-1.5 h-2.5 w-2.5 rounded-full bg-black ring-4 ring-white dark:bg-white dark:ring-black" />
      <GooeyTextReveal
        mode="scroll"
        scroller={scroller}
        start="top 88%"
        duration={0.9}
        blurAmount={0.35}
      >
        <p className="font-mono text-xs italic tracking-[0.12em] text-gray-500 dark:text-gray-400">
          {year}
        </p>
        <h4 className="mt-1.5 text-xl font-black tracking-[-0.04em] sm:text-2xl">
          {school}
        </h4>
        <p className="mt-1 text-sm font-light text-gray-600 dark:text-gray-300 sm:text-base">
          {degree}
        </p>
      </GooeyTextReveal>

      {tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {tags.map((tag, index) => (
            <GooeyTextReveal
              key={tag}
              mode="scroll"
              scroller={scroller}
              start="top 90%"
              once={false}
              split={false}
              delay={0.06 + index * 0.035}
              duration={0.7}
              blurAmount={0.35}
            >
              <span className="inline-flex rounded-full border border-gray-300 bg-gray-100 px-2.5 py-1 text-[11px] text-gray-700 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300">
                {tag}
              </span>
            </GooeyTextReveal>
          ))}
        </div>
      )}

      {badge && (
        <GooeyTextReveal
          mode="scroll"
          scroller={scroller}
          start="top 90%"
          once={false}
          split={false}
          delay={0.08}
          duration={0.9}
          blurAmount={0.35}
        >
          <span className="mt-3 inline-flex items-center gap-2 rounded-full border border-gray-300 bg-gray-100 px-3 py-1 text-xs font-medium dark:border-gray-700 dark:bg-gray-900">
            <span className="h-1.5 w-1.5 rounded-full bg-black dark:bg-white" />
            {badge}
          </span>
        </GooeyTextReveal>
      )}
    </div>
  );
}

function ContactRow({ icon, label, children }) {
  return (
    <GooeyTextReveal mode="immediate" duration={0.9} blurAmount={0.35}>
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gray-200 text-lg text-gray-800 dark:bg-gray-800 dark:text-gray-200">
          <i className={icon} aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.16em] text-gray-500 dark:text-gray-400">
            {label}
          </p>
          <div className="text-lg text-black dark:text-white">{children}</div>
        </div>
      </div>
    </GooeyTextReveal>
  );
}

function InfoCard({ label, value }) {
  return (
    <div className="rounded-[1.75rem] border border-gray-200 bg-white px-8 py-8 shadow-[0_20px_45px_rgba(0,0,0,0.12)] dark:border-gray-800 dark:bg-gray-950 dark:shadow-[0_20px_45px_rgba(0,0,0,0.35)] sm:px-10 sm:py-9">
      <GooeyTextReveal
        mode="scrub"
        start="top 90%"
        end="bottom 65%"
        duration={0.9}
        blurAmount={0.35}
      >
        <p className="mb-5 font-mono text-xs uppercase tracking-[0.16em] text-gray-500 dark:text-gray-400">
          <span className="mr-2 text-black dark:text-white">•</span>
          {label}
        </p>
      </GooeyTextReveal>
      <GooeyTextReveal
        mode="scrub"
        start="top 90%"
        end="bottom 65%"
        duration={0.9}
        blurAmount={0.35}
      >
        <p className="text-2xl font-bold tracking-[-0.03em] text-black dark:text-white sm:text-3xl">
          {value}
        </p>
      </GooeyTextReveal>
    </div>
  );
}
