import { useEffect, useRef, useState } from "react";

export function useSlideInParallax(offset: number = 80) {
  const ref = useRef<HTMLDivElement>(null);
  const [translateY, setTranslateY] = useState(offset);
  const hasAnimatedIn = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Disable animation on mobile
    if (window.innerWidth < 768) {
      setTranslateY(0);
      hasAnimatedIn.current = true;
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (hasAnimatedIn.current) {
          setTranslateY(0);
          return;
        }

        if (entry.boundingClientRect.top < 0) {
          hasAnimatedIn.current = true;
          setTranslateY(0);
          return;
        }

        const ratio = entry.intersectionRatio;
        const newTranslate = offset * (1 - ratio);
        setTranslateY(newTranslate);

        if (newTranslate <= 0) {
          hasAnimatedIn.current = true;
        }
      },
      {
        threshold: Array.from({ length: 101 }, (_, i) => i / 100),
      },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [offset]);

  return { ref, translateY };
}
