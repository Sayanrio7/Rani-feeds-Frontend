"use client";

import axios from "axios";
import Link from "next/link";
import TranslateSafeLink from "@/components/TranslateSafeLink";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import AOS from "aos";
import "aos/dist/aos.css";
import { CalendarDays, ArrowRight } from "lucide-react";

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true,
      easing: "ease-in-out",
    });

    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/blogs/get-all`)
      .then((res) => setBlogs(res.data.data))
      .catch(() => {});
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
    <>
      {/* ================= HERO ================= */}
      <section className="relative pt-[90px] md:pt-[110px] h-[360px] sm:h-[420px] md:h-[440px] overflow-hidden">
        {/* BACKGROUND */}
        <img
          src="/blog-banner.jpg"
          alt="Blog Banner"
          className="absolute inset-0 w-full h-full object-cover scale-105"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/65"></div>

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

              <span className="text-orange-400 font-semibold">BLOG</span>
            </div>

            {/* TITLE */}
            <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight">
              OUR BLOGS
            </h1>
          </div>
        </div>
      </section>

      {/* ================= BLOGS ================= */}
      <section className="py-16 sm:py-20 md:py-24 bg-[#f7faf7] overflow-hidden">
        <div className="max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-10">
          {/* BLOG GRID */}
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {blogs.map((blog, i) => (
              <TranslateSafeLink href={`/blog/${blog._id}`} key={blog._id}>
                <div
                  data-aos="fade-up"
                  data-aos-delay={i * 120}
                  className="group h-full bg-white rounded-sm overflow-hidden border border-gray-100 shadow-[0_12px_35px_rgba(0,0,0,0.05)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.12)] transition-all duration-500 hover:-translate-y-2"
                >
                  {/* IMAGE */}
                  <div className="relative overflow-hidden">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-[260px] object-cover transition duration-[2000ms] group-hover:scale-110"
                    />

                    {/* OVERLAY */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"></div>

                    {/* CATEGORY */}
                    <span className="absolute top-5 left-5 px-5 py-2 rounded-sm bg-white/10 backdrop-blur-md border border-white/20 text-white text-[11px] uppercase tracking-[2px] font-semibold">
                      {blog.category || "Fish Feed"}
                    </span>
                  </div>

                  {/* CONTENT */}
                  <div className="p-7">
                    {/* DATE */}
                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                      <CalendarDays className="w-4 h-4" />

                      {new Date(blog.createdAt).toLocaleDateString()}
                    </div>

                    {/* TITLE */}
                    <h3 className="text-2xl font-black text-[#061539] leading-snug group-hover:text-green-700 transition-colors duration-300 line-clamp-2">
                      {blog.title}
                    </h3>

                    {/* EXCERPT */}
                    <p className="mt-4 text-gray-600 text-[16px] leading-[1.9] line-clamp-3">
                      {blog.excerpt}
                    </p>

                    {/* BUTTON */}
                    <div className="mt-7 inline-flex items-center gap-2 text-green-700 font-bold text-lg group-hover:gap-4 transition-all duration-300">
                      Read More
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </TranslateSafeLink>
            ))}
          </div>

          {/* EMPTY */}
          {blogs.length === 0 && (
            <div className="text-center py-24">
              <h3 className="text-3xl font-bold text-[#061539]">
                No Blogs Found
              </h3>

              <p className="mt-4 text-gray-500 text-lg">
                Blogs will appear here once added from the admin panel.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
