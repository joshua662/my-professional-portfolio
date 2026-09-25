import React, { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { certificates, seminarCertificates } from "../data/portfolioData";
import GooeyTextReveal from "./GooeyTextReveal";
import GooeyElementReveal from "./GooeyElementReveal";

function CertificateCard({
  certificate,
  category,
  index,
  totalCertificates,
  progress,
}) {
  const [isActive, setIsActive] = useState(index === 0);
  const segment = 1 / Math.max(totalCertificates, 1);
  const transition = Math.min(segment * 0.26, 0.07);
  const start = index * segment;
  const end = (index + 1) * segment;
  const isFirst = index === 0;
  const isLast = index === totalCertificates - 1;
  const inputRanges = isFirst
    ? [0, end - transition, end + transition, 1]
    : isLast
      ? [0, start - transition, start + transition, 1]
      : [
          0,
          start - transition,
          start + transition,
          end - transition,
          end + transition,
          1,
        ];
  const opacityRanges = isFirst
    ? [1, 1, 0, 0]
    : isLast
      ? [0, 0, 1, 1]
      : [0, 0, 1, 1, 0, 0];
  const xRanges = isFirst
    ? [0, 0, -90, -90]
    : isLast
      ? [90, 90, 0, 0]
      : [90, 90, 0, 0, -90, -90];
  const scaleRanges = isFirst
    ? [1, 1, 0.94, 0.94]
    : isLast
      ? [0.94, 0.94, 1, 1]
      : [0.94, 0.94, 1, 1, 0.94, 0.94];
  const opacity = useTransform(progress, inputRanges, opacityRanges);
  const x = useTransform(progress, inputRanges, xRanges);
  const scale = useTransform(progress, inputRanges, scaleRanges);

  useMotionValueEvent(opacity, "change", (latest) => {
    if (latest >= 0.2 && !isActive) setIsActive(true);
    if (latest < 0.1 && isActive) setIsActive(false);
  });

  return (
    <div
      className={`absolute inset-0 flex items-center justify-center ${
        isActive ? "pointer-events-auto z-10" : "pointer-events-none z-0"
      }`}
    >
      <motion.div
        style={{ opacity, x, scale, transformOrigin: "center center" }}
        className="w-full"
      >
        <GooeyElementReveal
          key={`certificate-${isActive}`}
          mode={isActive ? "immediate" : "none"}
          yFrom={20}
          blurAmount={6}
        >
          <div className="group relative overflow-y-auto max-h-[calc(100vh-10rem)] sm:max-h-[calc(100vh-12rem)] rounded-[2.5rem] border border-gray-200/90 bg-white p-6 shadow-xl transition-all duration-500 hover:shadow-2xl dark:border-gray-800 dark:bg-black sm:p-8 lg:p-10">
            <span className="pointer-events-none absolute left-4 top-4 font-mono text-sm text-gray-300 select-none dark:text-gray-700">
              ┌
            </span>
            <span className="pointer-events-none absolute right-4 top-4 font-mono text-sm text-gray-300 select-none dark:text-gray-700">
              ┐
            </span>
            <span className="pointer-events-none absolute bottom-4 left-4 font-mono text-sm text-gray-300 select-none dark:text-gray-700">
              └
            </span>
            <span className="pointer-events-none absolute bottom-4 right-4 font-mono text-sm text-gray-300 select-none dark:text-gray-700">
              ┘
            </span>

            <div className="grid items-center gap-8 lg:grid-cols-12">
              <div className="flex h-full flex-col justify-between lg:col-span-7">
                <div>
                  <div className="mb-5 flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 rounded-md border border-gray-300 bg-gray-100 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gray-900 dark:bg-white" />
                      {category}
                    </span>
                    <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-500">
                      {index + 1} / {totalCertificates}
                    </span>
                  </div>

                  <GooeyTextReveal
                    key={`title-${isActive}`}
                    mode={isActive ? "immediate" : "none"}
                  >
                    <h3 className="mb-4 text-3xl font-black leading-[1.15] tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
                      {certificate.title}
                    </h3>
                  </GooeyTextReveal>

                  <p className="mb-2 font-mono text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-500">
                    {certificate.provider}
                  </p>
                  <p className="mb-6 max-w-2xl text-sm leading-relaxed text-gray-600 dark:text-gray-300 md:text-base">
                    {certificate.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {certificate.technologies.map((technology) => (
                      <span
                        key={technology}
                        className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-mono font-semibold text-gray-700 dark:border-gray-800 dark:bg-gray-800/80 dark:text-gray-200"
                      >
                        {technology}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="w-full lg:col-span-5">
                <div className="relative flex h-48 w-full items-center justify-center overflow-hidden rounded-2xl border border-gray-200/80 bg-gray-50 p-4 shadow-inner transition-colors group-hover:bg-gray-100/70 dark:border-gray-800 dark:bg-gray-800/60 dark:group-hover:bg-gray-800/90 sm:h-64 sm:p-6 lg:h-[380px]">
                  <img
                    src={certificate.image}
                    alt={certificate.title}
                    className="h-full w-full rounded-xl object-contain shadow-md transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </GooeyElementReveal>
      </motion.div>
    </div>
  );
}

export default function Certificates() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const groups = [
    {
      title: "LinkedIn Credentials",
      provider: "LinkedIn Learning",
      items: certificates,
      icon: "fab fa-linkedin-in",
    },
    {
      title: "Online Seminars",
      provider: "Online Seminar",
      items: seminarCertificates.slice(0, 2),
      icon: "fas fa-laptop-code",
    },
    {
      title: "Seminar Certificates",
      provider: "CHED RAISE & Professional Events",
      items: seminarCertificates.slice(2),
      icon: "fas fa-certificate",
    },
  ];
  const certificateSlides = groups.flatMap((group) =>
    group.items.map((certificate) => ({
      certificate,
      category: group.title,
    })),
  );

  return (
    <section
      id="blog"
      ref={containerRef}
      className="relative bg-white dark:bg-black"
      style={{ height: `${Math.max(certificateSlides.length, 1) * 100}vh` }}
    >
      <div className="sticky top-0 z-20 flex h-screen flex-col overflow-hidden bg-white dark:bg-black">
        <div className="container mx-auto max-w-7xl shrink-0 px-4 pb-3 pt-20 sm:px-6 sm:pb-4 sm:pt-24">
          <div className="section-heading mb-0">
            <h2 className="text-2xl sm:text-3xl md:text-4xl">Certificates</h2>
            <span />
          </div>
          <p className="-mt-1 text-xs text-gray-600 dark:text-gray-400 sm:text-sm md:text-base">
            Credentials, continuing education, and recognized achievements.
          </p>
        </div>

        <div className="relative min-h-0 flex-1 overflow-y-auto">
          <div className="absolute inset-0 container mx-auto max-w-7xl px-4 pb-6 sm:px-6 sm:pb-8">
            {certificateSlides.map(({ certificate, category }, index) => (
              <CertificateCard
                key={certificate.id}
                certificate={certificate}
                category={category}
                index={index}
                totalCertificates={certificateSlides.length}
                progress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
