import { useRef } from "react";
import { useScroll, useTransform, useReducedMotion, type MotionValue } from "framer-motion";

interface UseParallaxOptions {
  speed?: number; // 0 = no movement, 1 = full scroll, negative = opposite
  offset?: [string, string];
}

export function useParallax({ speed = 0.3, offset = ["start end", "end start"] }: UseParallaxOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset as any,
  });

  const range = 100 * speed;
  const y = useTransform(scrollYProgress, [0, 1], [range, -range]);
  const safeY = prefersReduced ? 0 : y;

  return { ref, y: safeY as MotionValue<number> | number };
}

export function useHeroParallax() {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  if (prefersReduced) {
    return { ref, bgY: "0%", textY: "0%", opacity: 1 };
  }

  return { ref, bgY, textY, opacity };
}
