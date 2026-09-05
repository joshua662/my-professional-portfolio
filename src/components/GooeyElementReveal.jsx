import React, { useId, useMemo, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function GooeyElementReveal({
  children,
  mode = "scroll",
  delay = 0,
  duration = 0.8,
  blurAmount = 6,
  scaleFrom = 0.96,
  yFrom = 20,
  ease = "power2.out",
  start = "top 90%",
  end = "bottom 75%",
  once = true,
  className = "",
  stagger = 0,
  onComplete,
  ...props
}) {
  const containerRef = useRef(null);
  const reactId = useId();
  const filterId = useMemo(
    () => `gooey-elem-reveal-${reactId.replace(/:/g, "")}`,
    [reactId]
  );

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (reducedMotion) return;

      const targets =
        stagger > 0 && container.children.length > 0
          ? Array.from(container.children)
          : [container];

      gsap.set(targets, {
        opacity: 0,
        y: yFrom,
        scale: scaleFrom,
        filter: `url(#${filterId}) blur(${blurAmount}px)`,
        willChange: "transform, opacity, filter",
      });

      const animation = {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: `url(#${filterId}) blur(0px)`,
        duration,
        ease,
        delay,
        stagger: stagger > 0 ? stagger : undefined,
        onComplete: () => {
          gsap.set(targets, { clearProps: "filter,willChange,transform" });
          if (onComplete) onComplete();
        },
      };

      if (mode === "scroll") {
        animation.scrollTrigger = {
          trigger: container,
          start,
          once,
          toggleActions: once
            ? "play none none none"
            : "play reverse play reverse",
          invalidateOnRefresh: true,
        };
      } else if (mode === "scrub") {
        animation.scrollTrigger = {
          trigger: container,
          start,
          end,
          scrub: true,
          invalidateOnRefresh: true,
        };
      }

      gsap.to(targets, animation);
    },
    {
      scope: containerRef,
      dependencies: [
        mode,
        delay,
        duration,
        blurAmount,
        scaleFrom,
        yFrom,
        ease,
        start,
        end,
        once,
        stagger,
        filterId,
      ],
    }
  );

  return (
    <>
      <div ref={containerRef} className={className} {...props}>
        {children}
      </div>

      <svg
        aria-hidden="true"
        focusable="false"
        width="0"
        height="0"
        style={{ position: "absolute", pointerEvents: "none" }}
      >
        <defs>
          <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 255 -140"
            />
          </filter>
        </defs>
      </svg>
    </>
  );
}

export default GooeyElementReveal;
