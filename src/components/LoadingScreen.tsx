import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

const LoadingScreen = () => {
  const location = useLocation();
  const [visible, setVisible] = useState(true);
  const [key, setKey] = useState(location.pathname);

  useEffect(() => {
    setVisible(true);
    setKey(location.pathname);
    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = "";
    }, 1400);
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, [location.pathname]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key={key}
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
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
