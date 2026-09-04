import React, { useId, useMemo } from "react";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function MorphText({
  words = ["CREATE", "DESIGN", "DEVELOP"],
  interval = 2600,
  subtext,
  fontSize = "clamp(1.25rem, 4vw, 2rem)",
  fontFamily = "inherit",
  className,
  textClassName,
  subtextClassName,
}) {
  // Unique ID for scoped keyframes & SVG filter
  const uid = useId().replace(/:/g, "");
  const filterId = `morph-threshold-${uid}`;
  const animName = `morph-word-rotate-${uid}`;

  const count = words.length;
  const wordDuration = interval / 1000; // Duration per word in seconds
  const totalDuration = wordDuration * count; // Total cycle duration in seconds

  // Mathematically calculate precise keyframe percentages based on word count
  const slotPercent = 100 / count;
  const inEnd = (slotPercent * 0.18).toFixed(2);
  const holdEnd = (slotPercent * 0.78).toFixed(2);
  const outEnd = (slotPercent * 0.96).toFixed(2);

  const wordStyles = useMemo(
    () =>
      words.map((_, i) => ({
        animationDelay: `${i * wordDuration}s`,
        animationDuration: `${totalDuration}s`,
      })),
    [words, wordDuration, totalDuration]
  );

  return (
    <div className={cn("morph-text-root relative flex flex-col items-center md:items-start", className)}>
      {/* ── SVG Threshold Filter ────────────────────────────────── */}
      <svg
        aria-hidden="true"
        focusable="false"
        style={{ position: "absolute", width: 0, height: 0, pointerEvents: "none" }}
      >
        <defs>
          <filter id={filterId}>
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -9"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* ── Morphing Word Container ─────────────────────────────── */}
      <div
        className={cn("morph-text-container relative select-none", textClassName)}
        style={{
          fontSize,
          fontWeight: 700,
          filter: `url(#${filterId})`,
          fontFamily,
        }}
      >
        <div
          className="morph-word-rotator relative flex items-center justify-start"
          style={{ height: "1.3em", minWidth: "22ch" }}
        >
          {words.map((word, i) => (
            <span
              key={`${word}-${i}`}
              className="morph-word absolute text-gray-900 border-b-2 border-gray-900"
              style={{
                top: "50%",
                left: "0",
                transform: "translateY(-50%)",
                opacity: 0,
                whiteSpace: "nowrap",
                animationName: animName,
                animationTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                animationIterationCount: "infinite",
                animationFillMode: "both",
                ...wordStyles[i],
              }}
            >
              {word}
            </span>
          ))}
        </div>
      </div>

      {/* ── Optional Subtext ────────────────────────────────────── */}
      {subtext && (
        <p
          className={cn(
            "morph-subtext mt-8 uppercase tracking-[0.2em] text-[#888]",
            subtextClassName
          )}
          style={{
            fontSize: "1.2rem",
            opacity: 0,
            animation: "morph-fade-up 1s ease-out 1s forwards",
            fontFamily,
          }}
        >
          {subtext}
        </p>
      )}

      {/* ── Scoped Dynamic Keyframes ───────────────────────────── */}
      <style>{`
        @keyframes ${animName} {
          0% {
            opacity: 0;
            filter: blur(14px);
            transform: translateY(-50%) scale(0.92);
          }
          ${inEnd}% {
            opacity: 1;
            filter: blur(0px);
            transform: translateY(-50%) scale(1);
          }
          ${holdEnd}% {
            opacity: 1;
            filter: blur(0px);
            transform: translateY(-50%) scale(1);
          }
          ${outEnd}% {
            opacity: 0;
            filter: blur(14px);
            transform: translateY(-50%) scale(1.08);
          }
          ${slotPercent.toFixed(2)}%, 100% {
            opacity: 0;
            filter: blur(20px);
            transform: translateY(-50%) scale(1.08);
          }
        }

        @keyframes morph-fade-up {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default MorphText;
