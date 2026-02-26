import { useEffect, useRef, useState } from "react";

export function useSlideInParallax(offset: number = 80) {
  const ref = useRef<HTMLDivElement>(null);
  const [translateY, setTranslateY] = useState(offset);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const ratio = entry.intersectionRatio;
        const newTranslate = offset * (1 - ratio);
        setTranslateY(newTranslate);
      },
      {
        threshold: Array.from({ length: 101 }, (_, i) => i / 100),
      },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [offset]);

  return { ref, translateY,};
}
