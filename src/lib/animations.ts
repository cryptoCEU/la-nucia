import type { Variants, Transition } from "framer-motion";

// ─── Shared easing ───
type Easing4 = [number, number, number, number];
const ease: Easing4 = [0.25, 0.1, 0.25, 1];
const easeOut: Easing4 = [0.16, 1, 0.3, 1];

// ─── Reusable transition presets ───
export const smoothTransition: Transition = {
  duration: 0.8,
  ease: easeOut,
};

export const slowTransition: Transition = {
  duration: 1.1,
  ease: easeOut,
};

export const gentleTransition: Transition = {
  duration: 0.7,
  ease: ease,
};

// ─── Variant factories ───

export const fadeUp = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeOut, delay },
  },
});

export const fadeIn = (delay = 0): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.9, ease: easeOut, delay },
  },
});

export const scaleIn = (delay = 0): Variants => ({
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1, ease: easeOut, delay },
  },
});

export const slideLeft = (delay = 0): Variants => ({
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1.1, ease: easeOut, delay },
  },
});

export const slideRight = (delay = 0): Variants => ({
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1.1, ease: easeOut, delay },
  },
});

export const staggerContainer = (staggerDelay = 0.12, startDelay = 0): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: startDelay,
    },
  },
});

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOut },
  },
};

export const heroText = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: easeOut, delay },
  },
});

export const viewportOnce = { once: true, margin: "-80px" as const };
export const viewportOnceNear = { once: true, margin: "-40px" as const };

// ─── Clip-path image reveal ───
export const clipReveal = (delay = 0): Variants => ({
  hidden: { clipPath: "inset(0 100% 0 0)" },
  visible: {
    clipPath: "inset(0 0% 0 0)",
    transition: { duration: 1.2, ease: easeOut, delay },
  },
});

export const clipRevealUp = (delay = 0): Variants => ({
  hidden: { clipPath: "inset(100% 0 0 0)" },
  visible: {
    clipPath: "inset(0% 0 0 0)",
    transition: { duration: 1, ease: easeOut, delay },
  },
});

// ─── Soft float for decorative layers ───
export const softFloat: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: [0, -6, 0],
    transition: {
      opacity: { duration: 0.8, ease: easeOut },
      y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
    },
  },
};

