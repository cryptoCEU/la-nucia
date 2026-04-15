import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

const DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const DIGIT_HEIGHT = 1.2; // em

const SlotDigit = ({ digit, delay }: { digit: string; delay: number }) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setActive(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  const isNum = /^\d$/.test(digit);
  if (!isNum) return <span>{digit}</span>;

  const idx = Number(digit);

  return (
    <span
      style={{
        display: "inline-block",
        overflow: "hidden",
        height: `${DIGIT_HEIGHT}em`,
        verticalAlign: "bottom",
      }}
    >
      <span
        style={{
          display: "flex",
          flexDirection: "column",
          transform: active ? `translateY(-${idx * DIGIT_HEIGHT}em)` : "translateY(0)",
          transition: active ? "transform 0.8s cubic-bezier(0.16,1,0.3,1)" : "none",
        }}
      >
        {DIGITS.map((d) => (
          <span
            key={d}
            style={{
              height: `${DIGIT_HEIGHT}em`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {d}
          </span>
        ))}
      </span>
    </span>
  );
};

interface AnimatedCounterProps {
  value: string;
  className?: string;
  /** Extra ms before the first digit starts rolling (use to sync with parent stagger) */
  baseDelay?: number;
}

const AnimatedCounter = ({ value, className = "", baseDelay = 600 }: AnimatedCounterProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const chars = value.split("");

  return (
    <span
      ref={ref}
      className={className}
      style={{ display: "inline-flex", alignItems: "baseline" }}
    >
      {chars.map((ch, i) => (
        <SlotDigit key={i} digit={ch} delay={isInView ? baseDelay + i * 80 : 99999} />
      ))}
    </span>
  );
};

export default AnimatedCounter;
