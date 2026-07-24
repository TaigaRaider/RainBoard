import { useState, useRef, useEffect } from "react";

export function useCountUp(target, duration = 1000) {
  const num = Number(target);
  const safeNum = isNaN(num) ? 0 : num;
  const [value, setValue] = useState(safeNum);
  const rafRef = useRef(null);
  const prevRef = useRef(safeNum);

  useEffect(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    const from = prevRef.current;
    const to = safeNum;
    prevRef.current = to;

    if (from === to) return;

    const start = performance.now();

    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      setValue(Math.round(from + (to - from) * progress));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [safeNum, duration]);

  return value;
}
