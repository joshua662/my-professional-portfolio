import React, { useState } from "react";

export function HexagonBackground({ className = "" }) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handlePointerMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 40;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 40;
    setOffset({ x, y });
  };

  return (
    <div
      aria-hidden="true"
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setOffset({ x: 0, y: 0 })}
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`.trim()}
    >
      <div
        className="absolute inset-[-10%] transition-transform duration-200 ease-out"
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px) scale(1.08)`,
        }}
      >
        <svg
          className="h-full w-full text-slate-900/10 dark:text-white/10"
          viewBox="0 0 1200 900"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="hexagon-grid"
              width="110"
              height="96"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M55 8L97 30V74L55 96L13 74V30L55 8Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.1"
                vectorEffect="non-scaling-stroke"
              />
            </pattern>
          </defs>
          <rect width="1200" height="900" fill="url(#hexagon-grid)" />
        </svg>
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.22),transparent_48%)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04),transparent_55%)]" />
    </div>
  );
}

export default HexagonBackground;
