"use client";

import { useEffect, useRef, useState } from "react";

export default function StatCounter({
  value,
  suffix = "",
  label,
  duration = 1500,
}: {
  value: number;
  suffix?: string;
  label: string;
  duration?: number;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;

        const start = performance.now();
        function tick(now: number) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.round(eased * value));
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <div className="text-center">
      <p ref={ref} className="font-heading text-3xl font-semibold text-onyx sm:text-4xl">
        {count.toLocaleString()}
        {suffix}
      </p>
      <p className="mt-1 text-xs uppercase tracking-widest-luxe text-muted-foreground">{label}</p>
    </div>
  );
}
