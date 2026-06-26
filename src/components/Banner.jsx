"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Banner() {
  const [current, setCurrent] = useState(0);

  const banners = [
    {
      image: "/banner200.jpg",
      title: "Welcome to the\nRani Feeds",
      description:
        "Delivering high-performance fish feed solutions designed for healthier growth, stronger immunity, and sustainable aquaculture success.",
    },

    {
      image: "/banner300.jpg",
      title: "Boost Fish Growth\nWith Better Nutrition",
      description:
        "Advanced feed formulations crafted with premium ingredients to maximize productivity and improve fish health naturally.",
    },

    {
      image: "/banner1000.jpg",
      title: "Healthy Fish\nBetter Harvest",
      description:
        "Trusted by aquaculture farms for superior feed conversion, reduced waste, and consistent farming performance.",
    },

    {
      image: "/banner700.jpg",
      title: "Smart Feeding\nFor Sustainable Farming",
      description:
        "Eco-friendly fish feed solutions helping farmers achieve long-term growth and sustainable aquaculture practices.",
    },
  ];

  const total = banners.length;

  const next = () => {
    setCurrent((prev) => (prev + 1) % total);
  };

  const prev = () => {
    setCurrent((prev) => (prev - 1 + total) % total);
  };

  useEffect(() => {
    const interval = setInterval(next, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[550px] sm:h-[700px] md:h-[850px] xl:h-screen overflow-hidden">
      {/* SLIDES */}
      {banners.map((banner, index) => {
        const active = current === index;

        return (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-[2000ms] ease-in-out ${
              active ? "opacity-100 scale-100 z-20" : "opacity-0 scale-105 z-0"
            }`}
          >
            {/* IMAGE */}
            <img
              src={banner.image}
              alt=""
              className={`w-full h-full object-cover transition-transform duration-[10000ms] ease-linear ${
                active ? "scale-110" : "scale-100"
              }`}
            />

            {/* CINEMATIC OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/70"></div>

            {/* SHINY MIRROR EFFECT */}
            {active && (
              <div className="absolute inset-0 overflow-hidden">
                <div className="shine"></div>
              </div>
            )}
          </div>
        );
      })}

      {/* CONTENT */}
      <div className="absolute inset-0 z-30 flex items-center justify-center pt-18 sm:pt-0">
        <div className="text-center text-white px-5 sm:px-6 max-w-4xl mx-auto">
          {/* TITLE */}
          <h1
            key={current}
            className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-extrabold leading-[1.2] drop-shadow-2xl"
          >
            {banners[current].title.split("\n").map((line, i) => (
              <span
                key={i}
                className="block opacity-0 animate-[slideUp_1s_ease_forwards]"
                style={{
                  animationDelay: `${i * 0.2}s`,
                }}
              >
                {line}
              </span>
            ))}
          </h1>

          {/* DESCRIPTION */}
          <p
            key={current + "-desc"}
            className="mt-7 sm:mt-8 text-md sm:text-base md:text-lg xl:text-xl text-gray-200 leading-relaxed max-w-3xl mx-auto opacity-0 animate-[fadeUp_1.2s_ease_forwards]"
            style={{
              animationDelay: "0.5s",
            }}
          >
            {banners[current].description}
          </p>

          {/* BUTTONS */}
          <div
            key={current + "-btn"}
            className="mt-12 sm:mt-10 flex flex-wrap items-center justify-center gap-4 opacity-0 animate-[fadeUp_1.2s_ease_forwards]"
            style={{
              animationDelay: "0.7s",
            }}
          >
            {/* PRODUCTS BUTTON */}
            <a
              href="/products"
              className="group relative inline-flex items-center justify-center overflow-hidden bg-gradient-to-r from-orange-500 to-orange-700 px-5 sm:px-7 md:px-8 py-3 sm:py-4 rounded-sm text-sm sm:text-base md:text-lg font-semibold text-white shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer min-w-[190px]"
            >
              {/* HOVER OVERLAY */}
              <span className="absolute inset-0 w-0 bg-white/10 transition-all duration-500 ease-out group-hover:w-full"></span>

              {/* TEXT */}
              <span className="relative z-10 flex items-center gap-2">
                Explore Products
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </a>

            {/* CONTACT BUTTON */}
            <a
              href="/contact"
              className="group relative inline-flex items-center justify-center overflow-hidden border border-white/30 bg-white/10 backdrop-blur-md hover:bg-white/20 px-5 sm:px-7 md:px-8 py-3 sm:py-4 rounded-sm text-sm sm:text-base md:text-lg font-semibold text-white shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer min-w-[190px]"
            >
              {/* HOVER OVERLAY */}
              <span className="absolute inset-0 w-0 bg-white/10 transition-all duration-500 ease-out group-hover:w-full"></span>

              {/* TEXT */}
              <span className="relative z-10 flex items-center gap-2">
                Contact Us
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* LEFT ARROW DESKTOP */}
      <button
        onClick={prev}
        className="hidden sm:flex absolute left-6 top-1/2 -translate-y-1/2 z-40 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-2xl hover:bg-white/20 transition duration-300 hover:scale-110 cursor-pointer items-center justify-center"
      >
        ⮜
      </button>

      {/* LEFT ARROW MOBILE */}
      <button
        onClick={prev}
        className="sm:hidden absolute left-4 top-[62%] -translate-y-1/2 z-40 w-10 h-10 rounded-full bg-black/20 backdrop-blur-md border border-white/30 text-white text-xl flex items-center justify-center"
      >
        ←
      </button>

      {/* RIGHT ARROW DESKTOP */}
      <button
        onClick={next}
        className="hidden sm:flex absolute right-6 top-1/2 -translate-y-1/2 z-40 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-2xl hover:bg-white/20 transition duration-300 hover:scale-110 cursor-pointer items-center justify-center"
      >
        ⮞
      </button>

      {/* RIGHT ARROW MOBILE */}
      <button
        onClick={next}
        className="sm:hidden absolute right-4 top-[62%] -translate-y-1/2 z-40 w-10 h-10 rounded-full bg-black/20 backdrop-blur-md border border-white/30 text-white text-xl flex items-center justify-center"
      >
        →
      </button>

      {/* DOTS */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 flex gap-4">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`transition-all duration-500 rounded-full cursor-pointer ${
              current === index
                ? "w-12 h-3 bg-white"
                : "w-3 h-3 bg-white/50 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
