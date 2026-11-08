import { useState, useEffect } from 'react';

/**
 * Custom hook to animate numbers smoothly when triggered into view.
 * @param {number} end - Final number to reach
 * @param {number} duration - Duration in milliseconds (default 1200ms)
 * @param {boolean} trigger - When true, starts counting up
 * @param {number} decimals - Number of decimal places (default 0)
 */
export function useAnimatedCounter(end, duration = 1200, trigger = true, decimals = 0) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!trigger || typeof end !== 'number' || isNaN(end)) return;

    let start = 0;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing: ease-out-expo (fast start, silky deceleration)
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = start + (end - start) * easeProgress;

      setValue(decimals === 0 ? Math.round(current) : parseFloat(current.toFixed(decimals)));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setValue(end);
      }
    };

    const frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [end, duration, trigger, decimals]);

  return value;
}
