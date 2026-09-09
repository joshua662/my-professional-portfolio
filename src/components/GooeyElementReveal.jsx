import React, { useId, useMemo, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function resolveScroller(scroller) {
  const node =
    typeof scroller === "string"
      ? document.querySelector(scroller)
      : scroller instanceof HTMLElement
        ? scroller
        : (scroller?.current ?? null);

  return node instanceof HTMLElement && node.isConnected ? node : undefined;
}

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
  scroller,
  once = false,
  className = "",
  stagger = 0,
  gooey = true,
  playOnVisible = true,
  onComplete,
  ...props
}) {
  const containerRef = useRef(null);
  const reactId = useId();
  const filterId = useMemo(
    () => `gooey-elem-reveal-${reactId.replace(/:/g, "")}`,
    [reactId],
  );

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container || mode === "none") return;

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reducedMotion) return;

      const targets =
        stagger > 0 && container.children.length > 0
          ? Array.from(container.children)
          : [container];

      const fromFilter = gooey
        ? `url(#${filterId}) blur(${blurAmount}px)`
        : `blur(${blurAmount}px)`;
      const toFilter = gooey ? `url(#${filterId}) blur(0px)` : "blur(0px)";

      gsap.set(targets, {
        autoAlpha: 0,
        y: yFrom,
        scale: scaleFrom,
        filter: fromFilter,
        willChange: "transform, opacity, filter",
      });

      const animation = {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        filter: toFilter,
        duration,
        ease,
        delay,
        overwrite: true,
        stagger: stagger > 0 ? stagger : undefined,
        onComplete: () => {
          gsap.set(targets, { clearProps: "willChange" });
          if (onComplete) onComplete();
        },
      };

      const resolvedScroller = resolveScroller(scroller);

      if (mode === "scroll") {
        animation.scrollTrigger = {
          trigger: container,
          start,
          toggleActions: once
            ? "play none none none"
            : "play reverse play reverse",
          invalidateOnRefresh: true,
          scroller: resolvedScroller,
        };
      } else if (mode === "scrub") {
        animation.scrollTrigger = {
          trigger: container,
          start,
          end,
          scrub: true,
          invalidateOnRefresh: true,
          scroller: resolvedScroller,
        };
      }

      const tween = gsap.to(targets, animation);

      const playIfVisible = window.requestAnimationFrame(() => {
        if (!playOnVisible) return;

        if (mode === "immediate") {
          tween.play();
          return;
        }

        if (mode === "scrub" || tween.progress() > 0) return;

        const view = resolvedScroller?.getBoundingClientRect() ?? {
          top: 0,
          bottom: window.innerHeight,
        };
        const rect = container.getBoundingClientRect();
        const isVisible = rect.bottom > view.top && rect.top < view.bottom;
        if (isVisible) tween.play();
      });

      return () => {
        window.cancelAnimationFrame(playIfVisible);
        try {
          tween?.scrollTrigger?.kill();
          tween?.kill();
        } catch {
          // Ignore teardown races while React unmounts the overlay.
        }
        gsap.set(targets, {
          clearProps:
            "opacity,visibility,autoAlpha,y,scale,filter,willChange,transform",
        });
      };
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
        scroller,
        once,
        stagger,
        gooey,
        playOnVisible,
        filterId,
      ],
    },
  );

  return (
    <>
      <div ref={containerRef} className={className} {...props}>
        {children}
      </div>

      {gooey ? (
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
      ) : null}
    </>
  );
}

export default GooeyElementReveal;
