import React, { useEffect, useState } from "react";
import { SkillCard } from "./Skills";

function CaseStudyView({ caseStudy }) {
  const asset = (path) =>
    path ? (path.startsWith("/") ? path : `/${path}`) : "";

  return (
    <div className="space-y-12 py-2">
      {/* 1. Header Section (Image 1) */}
      <div className="space-y-6">
        {caseStudy.tags && caseStudy.tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            {caseStudy.tags.map((tag, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 rounded-full border border-gray-300 dark:border-gray-700 bg-gray-100/80 dark:bg-gray-800/80 px-3.5 py-1 font-mono text-[11px] font-semibold tracking-wider text-gray-700 dark:text-gray-300"
              >
                {idx === 0 && <i className="far fa-calendar-alt text-xs" />}
                {idx === 1 && <i className="fas fa-tag text-xs" />}
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-gray-900 dark:text-white leading-[1.1]">
            {caseStudy.heroTitle}
          </h1>
          <p className="text-base sm:text-lg leading-relaxed text-gray-600 dark:text-gray-400 font-normal max-w-4xl">
            {caseStudy.heroSubtitle}
          </p>
        </div>
      </div>

      {/* 2. Hero Mockup Image (Image 2) */}
      {caseStudy.heroImage && (
        <div className="w-full overflow-hidden rounded-3xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 p-3 sm:p-6 shadow-sm">
          <img
            src={asset(caseStudy.heroImage)}
            alt={caseStudy.heroTitle}
            className="w-full h-auto object-contain rounded-2xl shadow-md"
          />
        </div>
      )}

      {/* 3. Challenge / Solution & Technologies Sidebar (Image 3) */}
      <div className="grid gap-10 lg:grid-cols-12 items-start">
        {/* Left Column: Challenge & Solution */}
        <div className="space-y-10 lg:col-span-8">
          {/* The Challenge */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-6 h-0.5 bg-gray-900 dark:bg-white rounded-full"></span>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                The Challenge
              </h2>
            </div>
            <p className="text-base leading-relaxed text-gray-600 dark:text-gray-300 font-normal">
              {caseStudy.challenge}
            </p>
          </div>

          {/* The Solution */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-6 h-0.5 bg-gray-900 dark:bg-white rounded-full"></span>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                The Solution
              </h2>
            </div>
            <p className="text-base leading-relaxed text-gray-600 dark:text-gray-300 font-normal">
              {caseStudy.solution}
            </p>
          </div>
        </div>

        {/* Right Column: Technologies & Info Card */}
        <div className="lg:col-span-4 rounded-3xl border border-gray-200 dark:border-gray-800 bg-gray-50/60 dark:bg-gray-900/60 p-6 sm:p-7 space-y-7 shadow-xs">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <i className="fas fa-microchip text-base text-gray-700 dark:text-gray-300" />
              <h3 className="text-base font-bold text-gray-900 dark:text-white">
                Technologies
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {caseStudy.technologies?.map((tech) => (
                <span
                  key={tech}
                  className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-1 font-mono text-xs font-medium text-gray-700 dark:text-gray-200 shadow-2xs"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {caseStudy.timeline && (
            <div className="border-t border-gray-200 dark:border-gray-800 pt-5">
              <span className="block font-mono text-[11px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1">
                TIMELINE
              </span>
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                {caseStudy.timeline}
              </span>
            </div>
          )}

          {caseStudy.role && (
            <div className="border-t border-gray-200 dark:border-gray-800 pt-5">
              <span className="block font-mono text-[11px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1">
                ROLE
              </span>
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                {caseStudy.role}
              </span>
            </div>
          )}

          {caseStudy.projectLink && (
            <div className="pt-2">
              <a
                href={caseStudy.projectLink}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-between rounded-xl bg-black dark:bg-white text-white dark:text-black font-semibold text-sm px-5 py-3 hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors shadow-sm"
              >
                <span>Visit Project</span>
                <i className="fas fa-external-link-alt text-xs" />
              </a>
            </div>
          )}
        </div>
      </div>

      {/* 4. Key Features Grid (Image 4) */}
      {caseStudy.keyFeatures && caseStudy.keyFeatures.length > 0 && (
        <div className="space-y-6 pt-4 border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <i className="fas fa-layer-group text-lg text-gray-800 dark:text-gray-200" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
              Key Features
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {caseStudy.keyFeatures.map((feat, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 rounded-2xl border border-gray-200 dark:border-gray-800/80 bg-gray-50/50 dark:bg-gray-900/40 p-4 transition-all hover:bg-gray-100/60 dark:hover:bg-gray-800/50"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-200/80 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                  <i className="far fa-check-circle text-base" />
                </div>
                <span className="text-sm font-medium text-gray-800 dark:text-gray-200 leading-snug">
                  {feat}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ModalItem({ item, expanded = false }) {
  const asset = (path) =>
    path ? (path.startsWith("/") ? path : `/${path}`) : "";

  if (item.caseStudy) {
    return <CaseStudyView caseStudy={item.caseStudy} />;
  }

  return (
    <article
      className={`flex flex-col gap-6 ${
        expanded
          ? "md:flex-row-reverse items-start"
          : "rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black p-5 shadow-sm md:flex-row-reverse md:items-center transition-all duration-300 hover:shadow-md"
      }`}
    >
      {/* Media container: video or image (displayed on the right side on desktop) */}
      <div className="flex min-h-52 w-full items-center justify-center overflow-hidden rounded-xl bg-gray-50 dark:bg-gray-800/80 p-2 md:w-1/2">
        {item.video ? (
          <video
            className="max-h-[500px] w-full rounded-lg object-contain shadow-sm"
            controls
            poster={asset(item.poster)}
          >
            <source src={asset(item.video)} type="video/mp4" />
            Your browser does not support HTML5 video.
          </video>
        ) : (
          <img
            src={asset(item.image)}
            alt={item.title}
            className="max-h-[500px] w-full rounded-lg object-contain shadow-sm transition-transform duration-500 hover:scale-102"
            loading="lazy"
          />
        )}
      </div>

      {/* Details container (displayed on the left side on desktop) */}
      <div className="w-full md:w-1/2 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-snug">
            {item.title}
          </h3>
          {(item.provider || item.type) && (
            <p className="mt-1 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              {item.provider || item.type}
            </p>
          )}
          <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
            {item.description}
          </p>
        </div>

        {item.technologies && item.technologies.length > 0 && (
          <div className="mt-6 border-t border-gray-100 dark:border-gray-800 pt-4">
            <span className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
              Technologies Used
            </span>
            <div className="flex flex-wrap gap-2">
              {item.technologies.map((tech) => {
                const isObj = typeof tech === 'object';
                const techName = isObj ? tech.name : tech;
                const techIcon = isObj ? tech.icon : null;
                return (
                  <span
                    key={techName}
                    title={techName}
                    className="inline-flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 px-3 py-1 text-xs font-bold text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    {techIcon ? (
                      <img src={techIcon} alt={techName} className="w-5 h-5 object-contain" />
                    ) : (
                      techName
                    )}
                  </span>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}

export default function Modal({ activeModal, onClose }) {
  const [isClosing, setIsClosing] = useState(false);

  const handleDismiss = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 250);
  };

  useEffect(() => {
    if (!activeModal) return;

    // Lock body scroll while modal is active
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        handleDismiss();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeModal]);

  if (!activeModal) return null;

  const { item, title, skills } = activeModal;

  return (
    <div
      className={`portfolio-modal fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-sm transition-all duration-300 ${
        isClosing
          ? "opacity-0 bg-black/0 pointer-events-none"
          : "modal-open opacity-100 bg-black/75 pointer-events-auto"
      }`}
      onClick={handleDismiss}
      role="presentation"
    >
      <div
        className={`relative max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-3xl bg-white dark:bg-black border border-gray-200 dark:border-gray-800 p-6 shadow-2xl transition-all duration-300 sm:p-8 ${
          isClosing
            ? "scale-95 translate-y-4 opacity-0"
            : "scale-100 translate-y-0 opacity-100 animate-scale-in"
        }`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={title || item?.title || "Modal Dialog"}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={handleDismiss}
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 transition-all duration-300 hover:bg-gray-900 dark:hover:bg-white hover:text-white dark:hover:text-gray-900 hover:rotate-90 focus:outline-none shadow-sm"
          aria-label="Close dialog"
        >
          <i className="fas fa-times text-lg" />
        </button>

        {/* Modal Title */}
        {title && !item?.caseStudy && (
          <h2 className="mb-6 pr-10 text-2xl font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-3">
            {title}
          </h2>
        )}

        {/* Render Skills Grid */}
        {skills ? (
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 justify-items-center py-4">
            {skills.map((skill) => (
              <SkillCard key={skill[0]} skill={skill} />
            ))}
          </div>
        ) : item ? (
          /* Render Single Item Detail (e.g. Project or Certificate detail) */
          <ModalItem item={item} expanded />
        ) : null}
      </div>
    </div>
  );
}
