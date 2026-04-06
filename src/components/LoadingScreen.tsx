import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LoadingScreen = () => {
  const [visible, setVisible] = useState(() => {
    try {
      return !sessionStorage.getItem("ln_loaded");
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (!visible) return;
    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => {
      setVisible(false);
      try { sessionStorage.setItem("ln_loaded", "1"); } catch {}
      document.body.style.overflow = "";
    }, 2000);
    return () => { clearTimeout(timer); document.body.style.overflow = ""; };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center"
          style={{ backgroundColor: "hsl(var(--primary))" }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.img
            src="/favicon.png"
            alt=""
            className="w-16 h-16 object-contain"
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="mt-6 w-48 h-0.5 rounded-full overflow-hidden" style={{ backgroundColor: "hsl(var(--accent) / 0.2)" }}>
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: "hsl(var(--accent))" }}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
