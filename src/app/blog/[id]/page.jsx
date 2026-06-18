"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import AOS from "aos";
import "aos/dist/aos.css";
import { CalendarDays, User2 } from "lucide-react";

export default function BlogDetailsPage() {
  const params = useParams();

  const [blog, setBlog] = useState(null);

  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true,
      easing: "ease-in-out",
    });

    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/blogs/get/${params.id}`)
      .then((res) => setBlog(res.data.data))
      .catch((err) => {
        console.error(err);
      });
  }, [params.id]);

  if (!blog) return null;

  return (
    <>
      {/* ================= HERO ================= */}
      <section className="relative pt-[90px] md:pt-[110px] h-[360px] sm:h-[420px] md:h-[500px] overflow-hidden">
        {/* BG */}
        <img
          src={blog.image}
          alt={blog.title}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#02140a]/90 via-black/70 to-[#2f1400]/80"></div>

        {/* CONTENT */}
        <div className="relative z-20 h-full flex items-center justify-center text-center px-4">
          <div data-aos="fade-up" className="max-w-5xl">
            {/* BREADCRUMB */}
            <div className="flex items-center justify-center gap-3 text-sm sm:text-base font-semibold uppercase tracking-[2px]">
              <Link
                href="/"
                className="text-white hover:text-orange-400 transition"
              >
                Home
              </Link>

              <span className="text-white/60">›</span>

              <Link
                href="/blog"
                className="text-white hover:text-orange-400 transition"
              >
                Blog
              </Link>

              <span className="text-white/60">›</span>

              <span className="text-orange-400">Details</span>
            </div>

            {/* TITLE */}
            <h1 className="mt-6 text-3xl sm:text-5xl md:text-6xl font-black text-white leading-tight">
              {blog.title}
            </h1>
          </div>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="py-16 sm:py-20 md:py-24 bg-white overflow-hidden">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-10">
          {/* META */}
          <div
            data-aos="fade-up"
            className="flex flex-wrap items-center gap-6 text-gray-500 mb-10"
          >
            <div className="flex items-center gap-2">
              <CalendarDays className="w-5 h-5 text-green-700" />

              {new Date(blog.createdAt).toLocaleDateString()}
            </div>

            <div className="flex items-center gap-2">
              <User2 className="w-5 h-5 text-orange-500" />

              {blog.author || "Rani Feeds"}
            </div>

            <span className="bg-green-50 text-green-700 border border-green-100 px-4 py-2 rounded-sm text-sm font-semibold uppercase tracking-[2px]">
              {blog.category}
            </span>
          </div>

          {/* IMAGE */}
          <div
            data-aos="zoom-in"
            className="overflow-hidden rounded-sm shadow-[0_20px_60px_rgba(0,0,0,0.12)]"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-[260px] sm:h-[420px] md:h-[550px] object-cover"
            />
          </div>

          {/* CONTENT */}
          <div data-aos="fade-up" className="mt-14">
            <p className="text-xl text-gray-600 leading-[2] mb-10 font-medium">
              {blog.excerpt}
            </p>

            <div
              className="
    max-w-none

    [&_h1]:text-4xl
    [&_h1]:md:text-5xl
    [&_h1]:font-black
    [&_h1]:text-[#061539]
    [&_h1]:mb-8
    [&_h1]:mt-14

    [&_h2]:text-3xl
    [&_h2]:md:text-4xl
    [&_h2]:font-black
    [&_h2]:text-[#061539]
    [&_h2]:mt-14
    [&_h2]:mb-6
    [&_h2]:leading-tight

    [&_h3]:text-2xl
    [&_h3]:font-black
    [&_h3]:text-[#061539]
    [&_h3]:mt-12
    [&_h3]:mb-5

    [&_p]:text-gray-700
    [&_p]:text-[18px]
    [&_p]:leading-[2]
    [&_p]:mb-7

    [&_ul]:my-8
    [&_ul]:pl-6
    [&_ul]:list-disc

    [&_li]:text-gray-700
    [&_li]:text-[18px]
    [&_li]:leading-[2]
    [&_li]:mb-3

    [&_strong]:text-[#061539]
    [&_strong]:font-bold

    [&_a]:text-green-700
    [&_a]:font-semibold

    [&_img]:rounded-sm
    [&_img]:shadow-xl
    [&_img]:my-10
  "
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </div>
        </div>
      </section>
    </>
  );
}
