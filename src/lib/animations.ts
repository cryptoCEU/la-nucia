import type { Variants, Transition } from "framer-motion";

// ─── Shared easing ───
type Easing4 = [number, number, number, number];
const ease: Easing4 = [0.25, 0.1, 0.25, 1];
const easeOut: Easing4 = [0.16, 1, 0.3, 1];

// ─── Reusable transition presets ───
export const smoothTransition: Transition = {
  duration: 0.9,
  ease: easeOut,
};

export const slowTransition: Transition = {
  duration: 1.3,
  ease: easeOut,
};

export const gentleTransition: Transition = {
  duration: 0.8,
  ease: ease,
};

// ─── Variant factories ───
// All defaults now have larger displacement and longer durations for more presence

export const fadeUp = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: easeOut, delay },
  },
});

export const fadeIn = (delay = 0): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1.1, ease: easeOut, delay },
  },
});

export const scaleIn = (delay = 0): Variants => ({
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.1, ease: easeOut, delay },
  },
});

export const slideLeft = (delay = 0): Variants => ({
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1.2, ease: easeOut, delay },
  },
});

export const slideRight = (delay = 0): Variants => ({
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1.2, ease: easeOut, delay },
  },
});

export const staggerContainer = (staggerDelay = 0.14, startDelay = 0.2): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: startDelay,
    },
  },
});

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: easeOut },
  },
};

export const heroText = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.3, ease: easeOut, delay },
  },
});

export const viewportOnce = { once: true, margin: "-60px" as const };
export const viewportOnceNear = { once: true, margin: "-30px" as const };

// ─── Clip-path image reveal ───
export const clipReveal = (delay = 0): Variants => ({
  hidden: { clipPath: "inset(0 100% 0 0)" },
  visible: {
    clipPath: "inset(0 0% 0 0)",
    transition: { duration: 1.4, ease: easeOut, delay },
  },
});

export const clipRevealUp = (delay = 0): Variants => ({
  hidden: { clipPath: "inset(100% 0 0 0)" },
  visible: {
    clipPath: "inset(0% 0 0 0)",
    transition: { duration: 1.2, ease: easeOut, delay },
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

// ─── Rotate in — for icons ───
export const rotateIn = (delay = 0): Variants => ({
  hidden: { opacity: 0, rotate: -15, scale: 0.85 },
  visible: {
    opacity: 1,
    rotate: 0,
    scale: 1,
    transition: { duration: 0.8, ease: easeOut, delay },
  },
});

// ─── Blur in — elegant text entrance ───
export const blurIn = (delay = 0): Variants => ({
  hidden: { opacity: 0, filter: "blur(8px)", y: 20 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 1, ease: easeOut, delay },
  },
});
