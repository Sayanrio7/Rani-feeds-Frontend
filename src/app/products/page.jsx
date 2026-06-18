"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import Loader from "@/components/Loader";
import { motion } from "framer-motion";
import TranslateSafeLink from "@/components/TranslateSafeLink";

export default function ProductsPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/category/get-all`)
      .then((res) => setCategories(res.data.data))
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1100);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <main className="bg-[#f7faf7] overflow-x-hidden">
      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-[90px] md:pt-[110px] h-[360px] sm:h-[420px] md:h-[440px] overflow-hidden">
        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black"></div>

        {/* GLOW */}
        <div className="absolute top-[-120px] left-[-120px] w-[250px] h-[250px] bg-green-500/20 blur-3xl rounded-full"></div>

        <div className="absolute bottom-[-120px] right-[-120px] w-[300px] h-[300px] bg-orange-500/20 blur-3xl rounded-full"></div>

        {/* CONTENT */}
        <div className="relative z-20 h-full flex items-center justify-center px-4">
          <div data-aos="fade-up" className="text-center">
            {/* BREADCRUMB */}
            <div className="flex items-center justify-center gap-3 text-sm sm:text-base font-semibold uppercase tracking-[2px]">
              <Link
                href="/"
                className="text-white hover:text-orange-400 transition duration-300"
              >
                HOME
              </Link>

              <span className="text-white/70">›</span>

              <span className="text-orange-400 font-semibold">PRODUCTS</span>
            </div>

            {/* TITLE */}
            <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight">
              CATEGORY
            </h1>
          </div>
        </div>
      </section>

      {/* ================= PRODUCTS SECTION ================= */}
      <section className="py-14 sm:py-16 md:py-20">
        <div className="max-w-full sm:max-w-[96%] mx-auto px-4 sm:px-6 lg:px-10">
          {/* GRID */}
          <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-10">
            {categories.map((cat, index) => (
              <TranslateSafeLink
                href={`/products/category/${cat._id}`}
                key={cat._id}
              >
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.05 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.05,
                    ease: "easeOut",
                  }}
                  whileHover={{
                    y: -15,
                    transition: { duration: 0.3 },
                  }}
                  className="
    group
    relative
    overflow-hidden
    rounded-sm
    shadow-[0_15px_60px_rgba(0,0,0,0.12)]
    cursor-pointer
    bg-white
    transition-all
    duration-700
    hover:-translate-y-4
    hover:shadow-[0_25px_80px_rgba(0,0,0,0.20)]
  "
                >
                  {/* IMAGE */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.35,
                      ease: "easeOut",
                    }}
                    className="relative overflow-hidden h-[280px] sm:h-[360px] md:h-[360px]"
                  >
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="
              w-full
              h-full
              object-cover
              transition-all
              duration-[2500ms]
              ease-out
              group-hover:scale-110
              group-hover:rotate-1
            "
                    />

                    {/* DARK OVERLAY */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>

                    {/* GLOW EFFECT */}
                    <div
                      className="
              absolute
              -bottom-24
              -right-24
              w-[220px]
              h-[220px]
              bg-orange-500/30
              blur-3xl
              rounded-full
              opacity-0
              group-hover:opacity-100
              transition-all
              duration-700
            "
                    ></div>

                    {/* SHINE EFFECT */}
                    <div
                      className="
              absolute
              inset-0
              overflow-hidden
            "
                    >
                      <div
                        className="
                absolute
                top-0
                left-[-120%]
                w-[70%]
                h-full
                bg-gradient-to-r
                from-transparent
                via-white/30
                to-transparent
                skew-x-[-25deg]
                group-hover:left-[150%]
                transition-all
                duration-[1800ms]
              "
                      ></div>
                    </div>

                    {/* CONTENT */}
                    <div
                      className="
              absolute
              bottom-0
              left-0
              p-6 sm:p-8
              text-white
              z-10
              transition-all
              duration-500
              group-hover:translate-y-[-8px]
            "
                    >
                      {/* CATEGORY NAME */}
                      <h2
                        className="
                text-2xl
                sm:text-3xl
                font-bold
                leading-tight
                transition-all
                duration-500
                group-hover:text-gray-300
              "
                      >
                        {cat.name}
                      </h2>

                      {/* DESCRIPTION */}
                      <p
                        className="
                mt-3
                text-white/80
                text-sm
                sm:text-base
                leading-relaxed
                line-clamp-2
                transition-all
                duration-500
                group-hover:text-white
              "
                      >
                        {cat.description}
                      </p>

                      {/* BUTTON */}
                      <div
                        className="
    mt-6
    relative
    overflow-hidden
    inline-flex
    items-center
    gap-2
    rounded-sm
    px-5
    py-3
    font-semibold
    shadow-xl
    transition-all
    duration-500
    bg-gradient-to-r
    from-green-600
    to-green-900
    text-white
    group-hover:gap-5
    group-hover:scale-105
  "
                      >
                        {/* HOVER OVERLAY */}
                        <span className="absolute inset-0 w-0 bg-white/5 transition-all duration-500 ease-out group-hover:w-full"></span>

                        {/* CONTENT */}
                        <span className="relative z-10 flex items-center gap-2">
                          Explore Category
                          <span className="transition-transform duration-500 group-hover:translate-x-2">
                            →
                          </span>
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </TranslateSafeLink>
            ))}
          </div>

          {/* EMPTY */}
          {categories.length === 0 && (
            <div className="text-center py-24">
              <h3 className="text-3xl font-bold text-gray-700">
                No Categories Found
              </h3>

              <p className="mt-4 text-gray-500 text-lg">
                Add categories from admin panel.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
