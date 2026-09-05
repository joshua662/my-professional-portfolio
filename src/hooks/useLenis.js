import { useEffect, useRef, useCallback } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function useLenis() {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      autoResize: true,
    });

    lenisRef.current = lenis;

    // Update GSAP ScrollTrigger on Lenis scroll event
    lenis.on("scroll", ScrollTrigger.update);

    // Drive Lenis RAF loop through GSAP Ticker for 60fps synchronization
    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollToTarget = useCallback((target, options = {}) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, options);
    } else {
      const el = typeof target === "string" ? document.querySelector(target) : target;
      if (el) {
        const offset = options.offset || 0;
        const top = el.getBoundingClientRect().top + window.pageYOffset + offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }
  }, []);

  return { lenisRef, scrollToTarget };
}

export default useLenis;