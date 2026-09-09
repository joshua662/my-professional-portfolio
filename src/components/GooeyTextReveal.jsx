import React, { useId, useMemo, useRef, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

const LINE_EDGE_BLUR = 0.4;

function wrapLine(line) {
  const inner = document.createElement("span");
  inner.dataset.gooeyRevealInner = "";
  inner.style.display = "inline-block";
  inner.style.willChange = "filter";

  while (line.firstChild) {
    inner.appendChild(line.firstChild);
  }

  line.appendChild(inner);
  return inner;
}

function getRevealTargets(container) {
  const explicitTargets = Array.from(
    container.querySelectorAll("[data-gooey-reveal-item]"),
  );

  if (explicitTargets.length > 0) return explicitTargets;

  const directChildren = Array.from(container.children).filter(
    (child) => child instanceof HTMLElement,
  );

  return directChildren.length > 0 ? directChildren : [container];
}

function resolveScroller(scroller) {
  const node =
    typeof scroller === "string"
      ? document.querySelector(scroller)
      : scroller instanceof HTMLElement
        ? scroller
        : (scroller?.current ?? null);

  return node instanceof HTMLElement && node.isConnected ? node : undefined;
}

export const GooeyTextReveal = React.forwardRef(function GooeyTextReveal(
  {
    children,
    mode = "immediate",
    delay = 0,
    duration = 0.8,
    stagger = 0.04,
    blurAmount = 0.3,
    ease = "power2.out",
    start = "top 90%",
    end = "bottom 75%",
    scroller,
    once = false,
    split = true,
    disabled = false,
    onComplete,
    className = "",
    ...props
  },
  forwardedRef,
) {
  const containerRef = useRef(null);
  const reactId = useId();
  const filterId = useMemo(
    () => `gooey-text-reveal-${reactId.replace(/:/g, "")}`,
    [reactId],
  );

  const setContainerRef = useCallback(
    (node) => {
      containerRef.current = node;

      if (typeof forwardedRef === "function") {
        forwardedRef(node);
      } else if (forwardedRef) {
        forwardedRef.current = node;
      }
    },
    [forwardedRef],
  );

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container || disabled || mode === "none") return;

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reducedMotion) return;

      let splits = [];
      let tween = null;
      let animationFrame = 0;
      let measuredWidth = container.getBoundingClientRect().width;
      let disposed = false;

      const revert = () => {
        try {
          tween?.scrollTrigger?.kill();
          tween?.kill();
        } catch {
          // Ignore teardown races while React unmounts the overlay.
        }
        tween = null;

        splits.forEach((instance) => {
          try {
            instance.revert();
          } catch {
            // SplitText can already be gone if React replaced the DOM.
          }
        });
        splits = [];
      };

      const attachScrollTrigger = (animation) => {
        const resolvedScroller = resolveScroller(scroller);

        if (mode === "scrub") {
          animation.scrollTrigger = {
            trigger: container,
            start,
            end,
            scrub: true,
            invalidateOnRefresh: true,
            scroller: resolvedScroller,
          };
          return;
        }

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
        }
      };

      const animateTargets = (targets, extra = {}) => {
        gsap.set(targets, {
          filter: `blur(${blurAmount}em)`,
          opacity: 0,
          y: 6,
        });

        const animation = {
          filter: "blur(0em)",
          opacity: 1,
          y: 0,
          duration,
          ease,
          delay,
          ...extra,
          onComplete: () => {
            gsap.set(targets, { clearProps: "willChange" });
            if (onComplete) onComplete();
          },
        };

        attachScrollTrigger(animation);
        tween = gsap.to(targets, animation);

        if (mode !== "scrub") {
          window.requestAnimationFrame(() => {
            if (disposed || tween?.progress() > 0) return;
            const resolvedScroller = resolveScroller(scroller);
            const view = resolvedScroller?.getBoundingClientRect() ?? {
              top: 0,
              bottom: window.innerHeight,
            };
            const rect = container.getBoundingClientRect();
            if (rect.bottom > view.top && rect.top < view.bottom) {
              tween.play();
            }
          });
        }
      };

      const build = () => {
        if (disposed || !container.isConnected) return;
        revert();

        if (!split) {
          animateTargets(container);
          return;
        }

        const layers = [];

        getRevealTargets(container).forEach((target) => {
          try {
            const instance = SplitText.create(target, {
              type: "lines",
              linesClass: "gooey-text-reveal-line",
              aria: "auto",
            });

            (instance.lines || []).forEach((line) => {
              const lineElement = line;
              lineElement.style.display = "block";
              lineElement.style.filter = `url(#${filterId}) blur(${LINE_EDGE_BLUR}px)`;
              lineElement.style.willChange = "filter";
              layers.push(wrapLine(lineElement));
            });

            splits.push(instance);
          } catch {
            // Fall through to the container animation if a target cannot split.
          }
        });

        if (layers.length === 0) {
          animateTargets(container);
          return;
        }

        animateTargets(layers, { stagger, delay: mode === "immediate" ? delay : delay });
      };

      animationFrame = window.requestAnimationFrame(build);

      if (document.fonts && document.fonts.status !== "loaded") {
        document.fonts.ready.then(() => {
          if (!disposed) build();
        });
      }

      const resizeObserver = new ResizeObserver(([entry]) => {
        const nextWidth = entry.contentRect.width;
        if (Math.abs(nextWidth - measuredWidth) < 0.5) return;

        measuredWidth = nextWidth;
        window.cancelAnimationFrame(animationFrame);
        animationFrame = window.requestAnimationFrame(build);
      });

      resizeObserver.observe(container);

      return () => {
        disposed = true;
        resizeObserver.disconnect();
        window.cancelAnimationFrame(animationFrame);
        revert();
      };
    },
    {
      scope: containerRef,
      dependencies: [
        mode,
        delay,
        duration,
        stagger,
        blurAmount,
        ease,
        start,
        end,
        scroller,
        once,
        disabled,
        filterId,
        split,
      ],
    },
  );

  return (
    <>
      <div ref={setContainerRef} className={className} {...props}>
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
});

GooeyTextReveal.displayName = "GooeyTextReveal";

export default GooeyTextReveal;
