"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [targetProgress, setTargetProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;

      const height = document.documentElement.scrollHeight - window.innerHeight;

      const progress =
        height > 0 ? Math.min((scrollTop / height) * 100, 100) : 0;

      setTargetProgress(progress);
      setVisible(scrollTop > 300);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    let animation;

    const animate = () => {
      setScrollProgress((prev) => {
        const diff = targetProgress - prev;

        // stop tiny movements
        if (Math.abs(diff) < 0.1) {
          return targetProgress;
        }

        // easing speed
        return prev + diff * 0.12;
      });

      animation = requestAnimationFrame(animate);
    };

    animation = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animation);
  }, [targetProgress]);

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (scrollProgress / 100) * circumference;

  return (
    <button
      onClick={scrollTop}
      className={`
        fixed
        bottom-10
        sm:bottom-8
        right-4
        sm:right-8
        z-50
        w-14
        h-14
        flex
        items-center
        justify-center
        transition-all
        duration-500
        hover:scale-110
        cursor-pointer
        ${
          visible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
        }
      `}
      aria-label="Scroll to top"
    >
      {/* Progress Ring */}
      <svg className="absolute inset-0 -rotate-90" width="56" height="56">
        {/* Background circle */}
        <circle
          cx="28"
          cy="28"
          r={radius}
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="3"
          fill="transparent"
        />

        {/* Progress */}
        <circle
          cx="28"
          cy="28"
          r={radius}
          stroke="#FA5700"
          strokeWidth="3.5"
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>

      {/* Button */}
      <div
        className="
          w-12
          h-12
          rounded-full 
          bg-gradient-to-r
          from-orange-400
          to-orange-600
          text-white
          shadow-lg
          flex
          items-center
          justify-center
        "
      >
        <ArrowUp size={22} />
      </div>
    </button>
  );
}
