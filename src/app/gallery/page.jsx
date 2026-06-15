"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Loader from "@/components/Loader";
import { useEffect, useState } from "react";
import axios from "axios";

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 60,
  },

  show: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.8,
    },
  },
};

export default function GalleryPage() {
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/gallery/get-all")
      .then((res) => {
        setGalleryImages(res.data.data || []);
      })
      .catch((err) => {
        console.log(err);
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
        <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4">
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="text-center"
          >
            {/* BREADCRUMB */}
            <div className="flex items-center justify-center gap-3 text-sm sm:text-base font-semibold uppercase tracking-[2px]">
              <Link
                href="/"
                className="text-white hover:text-orange-400 transition duration-300"
              >
                Home
              </Link>

              <span className="text-white/60">›</span>

              <span className="text-orange-400">Gallery</span>
            </div>

            {/* TITLE */}
            <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight">
              OUR GALLERY
            </h1>
          </motion.div>
        </div>
      </section>

      {/* ================= GALLERY SECTION ================= */}
      <section className="py-16 sm:py-20">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-10">
          {/* GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {galleryImages.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.08,
                }}
                className="group relative overflow-hidden bg-white shadow-[0_20px_80px_rgba(0,0,0,0.10)] hover:-translate-y-2 transition-all duration-700"
              >
                {/* IMAGE */}
                <div className="relative overflow-hidden h-[250px]">
                  <img
                    src={
                      item.images?.[0]?.startsWith("http")
                        ? item.images?.[0]
                        : `http://localhost:5000${item.images?.[0]}`
                    }
                    alt={item.title || "Gallery Image"}
                    loading="lazy"
                    className="w-full h-full object-cover transition-all duration-[1200ms] group-hover:scale-110"
                  />

                  {/* OVERLAY */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90"></div>

                  {/* NOISE */}
                  <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay"></div>

                  {/* CATEGORY */}
                  <div className="absolute top-5 left-5">
                    {/* <span className="px-5 py-2.5 rounded-sm bg-white/10 backdrop-blur-md border border-white/20 text-white text-[11px] uppercase tracking-[2px] font-semibold">
                      {item.category || "Rani Feeds"}
                    </span> */}
                  </div>

                  {/* CONTENT */}
                  <div className="absolute bottom-0 left-0 w-full p-7 md:p-9 text-white">
                    {/* <h3 className="text-[26px] md:text-[32px] font-bold leading-tight">
                      {item.title || "Rani Feeds Gallery"}
                    </h3> */}

                    {/* <p className="mt-4 text-white/80 text-sm leading-relaxed">
                      {item.description ||
                        "Premium aquaculture nutrition and sustainable farming excellence."}
                    </p> */}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* EMPTY */}
          {galleryImages.length === 0 && (
            <div className="text-center py-32">
              <h3 className="text-3xl font-bold text-gray-700">
                No Gallery Images Found
              </h3>

              <p className="mt-4 text-gray-500 text-lg">
                Upload gallery images from admin panel.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
