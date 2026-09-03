import React, { useEffect, useState } from "react";
import { SkillCard } from "./Skills";

function ModalItem({ item, expanded = false }) {
  const asset = (path) =>
    path ? (path.startsWith("/") ? path : `/${path}`) : "";

  return (
    <article
      className={`flex flex-col gap-6 ${
        expanded
          ? "md:flex-row items-start"
          : "rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:flex-row md:items-center transition-all duration-300 hover:shadow-md"
      }`}
    >
      {/* Media container: video or image */}
      <div className="flex min-h-52 w-full items-center justify-center overflow-hidden rounded-xl bg-gray-50 p-2 md:w-1/2">
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

      {/* Details container */}
      <div className="w-full md:w-1/2 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-900 leading-snug">
            {item.title}
          </h3>
          {(item.provider || item.type) && (
            <p className="mt-1 text-xs font-bold uppercase tracking-wider text-gray-500">
              {item.provider || item.type}
            </p>
          )}
          <p className="mt-4 text-sm leading-relaxed text-gray-600">
            {item.description}
          </p>
        </div>

        {item.technologies && item.technologies.length > 0 && (
          <div className="mt-6 border-t border-gray-100 pt-4">
            <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
              Technologies Used
            </span>
            <div className="flex flex-wrap gap-2">
              {item.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-lg bg-gray-100 px-3 py-1 text-xs font-bold text-gray-700 border border-gray-200 transition-colors hover:bg-gray-200"
                >
                  {tech}
                </span>
              ))}
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

  const { item, items, title, skills } = activeModal;

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
        className={`relative max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl transition-all duration-300 sm:p-8 ${
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
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-all duration-300 hover:bg-gray-900 hover:text-white hover:rotate-90 focus:outline-none shadow-sm"
          aria-label="Close dialog"
        >
          <i className="fas fa-times text-lg" />
        </button>

        {/* Modal Title */}
        {title && (
          <h2 className="mb-6 pr-10 text-2xl font-bold text-gray-900 border-b border-gray-100 pb-3">
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
        ) : items ? (
          /* Render Multiple Items (e.g. Certificates list) */
          <div className="space-y-6">
            {items.map((entry) => (
              <ModalItem key={entry.id} item={entry} />
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
