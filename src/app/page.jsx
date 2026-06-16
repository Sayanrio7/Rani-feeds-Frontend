"use client";

import Banner from "@/components/Banner";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import Loader from "@/components/Loader";
import Link from "next/link";
import TranslateSafeLink from "@/components/TranslateSafeLink";
import AOS from "aos";
import "aos/dist/aos.css";
import { ShieldCheck, TrendingUp, FishSymbol, Leaf } from "lucide-react";
export default function Home() {
  const [products, setProducts] = useState([]);
  const [gallery, setGallery] = useState([]);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const images = gallery.slice(0, 6).map((item) => item.images?.[0]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/products/get-all`)
      .then((res) => {
        setProducts(res.data.data.slice(0, 8));
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/gallery/get-all`)
      .then((res) => setGallery(res.data.data))
      .catch(() => {});
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1200,
      offset: 80,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.autoplay = true;

    const playVideo = async () => {
      try {
        await video.play();
        setIsPlaying(false);
        setTimeout(() => {
          setIsPlaying(true);
        }, 100);
      } catch (err) {
        console.log("Autoplay failed:", err);
        setIsPlaying(false);
      }
    };

    playVideo();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1150);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Banner />

      {/* ================= COMPANY OVERVIEW ================= */}
      <section className="py-16 sm:py-20 md:py-24 px-6 bg-gradient-to-b from-white to-gray-50 min-h-[700px] flex items-center">
        <div className="w-[1350px] sm:max-w-[95%] mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_1.4fr] gap-12 lg:gap-24 items-center h-full">
          {/* LEFT CONTENT */}
          <div data-aos="fade-right">
            <p
              data-aos="fade-up"
              className="inline-block uppercase tracking-[4px] text-orange-500 font-bold text-md sm:text-md border-b-2 border-orange-400 pb-1"
            >
              Company Overview
            </p>

            <h2
              data-aos="fade-up"
              data-aos-delay="150"
              className="mt-3 text-[34px] sm:text-[2.75rem] font-bold text-gray-900 leading-tight"
            >
              Feed the Future <br />
              with <span className="text-green-700">Rani Feeds</span>
            </h2>

            <div
              className="block lg:hidden mt-6 mb-6"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <img
                src="/feedbags1.png"
                alt="Rani Feeds Products"
                className="w-full max-h-[280px] object-contain mx-auto"
              />
            </div>

            <p
              data-aos="fade-up"
              data-aos-delay="250"
              className="mt-6 text-gray-600 text-md sm:text-lg leading-relaxed"
            >
              <span className="font-semibold text-4xl text-green-700">R</span>
              ani Feeds is dedicated to delivering high-performance fish feed
              that enhances growth, strengthens immunity, and improves farm
              productivity.
            </p>

            <p
              data-aos="fade-up"
              data-aos-delay="350"
              className="mt-4 text-gray-600 text-md sm:text-lg leading-relaxed"
            >
              Our advanced formulations ensure optimal nutrition, reduced waste,
              and sustainable aquaculture practices trusted by farmers.
            </p>

            {/* FEATURES */}
            <div className="mt-8 space-y-4">
              <div
                data-aos="fade-right"
                data-aos-delay="200"
                className="flex items-center gap-3"
              >
                <span className="w-5 sm:w-7 h-5 sm:h-7 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                  <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-600" />
                </span>
                <p className="text-gray-700 text-[16px] sm:text-lg font-medium">
                  Scientifically balanced nutrition formulas
                </p>
              </div>

              <div
                data-aos="fade-right"
                data-aos-delay="300"
                className="flex items-center gap-3"
              >
                <span className="w-5 sm:w-7 h-5 sm:h-7 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                  <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-600" />
                </span>
                <p className="text-gray-700 text-[16px] sm:text-lg font-medium">
                  Faster growth & significantly better yield
                </p>
              </div>

              <div
                data-aos="fade-right"
                data-aos-delay="400"
                className="flex items-center gap-3"
              >
                <span className="w-5 sm:w-7 h-5 sm:h-7 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                  <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-600" />
                </span>
                <p className="text-gray-700 text-[16px] sm:text-lg font-medium">
                  Trusted by 250+ fish farmers nationwide
                </p>
              </div>
            </div>

            <Link
              data-aos="zoom-in"
              data-aos-delay="450"
              href="/about"
              className="group relative inline-flex items-center justify-center overflow-hidden mt-10 bg-gradient-to-r from-green-600 to-green-800 px-6 sm:px-8 py-3 sm:py-4 rounded-sm font-semibold text-xl text-white shadow-xl transition duration-300 hover:scale-105"
            >
              {/* HOVER OVERLAY */}
              <span className="absolute inset-0 w-0 bg-gradient-to-r from-orange-500 to-orange-700 transition-all duration-500 ease-out group-hover:w-full"></span>

              {/* TEXT */}
              <span className="relative z-10 text-lg sm:text-xl flex items-center gap-3">
                Learn More
                <span className="transition-transform duration-300 group-hover:translate-x-2">
                  →
                </span>
              </span>
            </Link>
          </div>

          {/* RIGHT IMAGE */}
          <div
            className="hidden lg:flex relative group h-full items-center justify-center"
            data-aos="fade-left"
          >
            <img
              src="/feedbags1.png"
              alt="Rani Feeds Products"
              className="w-full h-full max-h-[350px] sm:max-h-[500px] md:max-h-[700px] xl:max-h-[900px] object-contain drop-shadow-2xl transition duration-500 group-hover:scale-105 animate-float-slow"
            />
          </div>
        </div>
      </section>

      {/* ================= OUR APPROACH ================= */}
      <section className="py-16 sm:py-20 md:py-24 bg-white border-t border-gray-100 sm:border-gray-200 overflow-hidden">
        <div className="w-full sm:w-[95%] mx-auto px-6">
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-20 items-center">
            {/* LEFT IMAGE */}
            <div data-aos="fade-right" className="relative group">
              {/* GLOW */}
              <div className="absolute inset-0 bg-green-200/20 blur-[120px] rounded-full"></div>

              {/* IMAGE */}
              <div className="relative overflow-hidden rounded-sm shadow-[0_25px_80px_rgba(0,0,0,0.18)]">
                <img
                  src="/our-approach.png"
                  alt="Our Approach"
                  className="w-full h-[350px] sm:h-[500px] md:h-[650px] xl:h-[820px] object-cover transition duration-500 scale-105 group-hover:scale-110 animate-float-slow"
                />
              </div>
            </div>

            {/* RIGHT CONTENT */}
            <div data-aos="fade-left">
              <p
                data-aos="fade-up"
                data-aos-delay="100"
                className="inline-block uppercase tracking-[4px] text-orange-500 font-bold text-md sm:text-md border-b-2 border-orange-400 pb-1"
              >
                Our Approach
              </p>

              <h2
                data-aos="fade-up"
                data-aos-delay="200"
                className="mt-3 text-[34px] sm:text-[2.75rem] font-extrabold text-[#061539] leading-[1.15]"
              >
                Smart Nutrition For
                <span className="text-green-700"> Sustainable Growth</span>
              </h2>

              <p
                data-aos="fade-up"
                data-aos-delay="300"
                className="mt-4 sm:mt-8 text-md sm:text-lg leading-[1.9] text-[#667085]"
              >
                At Rani Feeds, we focus on delivering scientifically balanced
                fish nutrition that improves growth performance, strengthens
                immunity, and ensures long-term aquaculture sustainability.
              </p>

              {/* POINTS */}
              <div className="mt-12 space-y-8">
                {/* POINT 1 */}
                <div
                  data-aos="fade-right"
                  data-aos-delay="100"
                  className="flex items-start gap-5 group"
                >
                  <div className="flex items-center justify-center">
                    <span className="text-2xl sm:text-4xl text-green-700">
                      ✓
                    </span>
                  </div>

                  <div>
                    <h3
                      data-aos="fade-up"
                      data-aos-delay="150"
                      className="text-xl sm:text-2xl font-bold text-[#061539]"
                    >
                      Advanced Feed Formulation
                    </h3>

                    <p className="mt-3 text-md sm:text-lg leading-[1.8] text-gray-600">
                      Developed with premium ingredients and modern nutrition
                      science for healthier fish growth.
                    </p>
                  </div>
                </div>

                {/* POINT 2 */}
                <div
                  data-aos="fade-right"
                  data-aos-delay="200"
                  className="flex items-start gap-5 group"
                >
                  <div className="flex items-center justify-center">
                    <span className="text-2xl sm:text-4xl text-green-700">
                      ✓
                    </span>
                  </div>

                  <div>
                    <h3
                      data-aos="fade-up"
                      data-aos-delay="150"
                      className="text-xl sm:text-2xl font-bold text-[#061539]"
                    >
                      Better Farm Productivity
                    </h3>

                    <p className="mt-3 text-md sm:text-lg leading-[1.8] text-gray-600">
                      High feed conversion efficiency and reduced wastage help
                      maximize profitability for fish farmers.
                    </p>
                  </div>
                </div>

                {/* POINT 3 */}
                <div
                  data-aos="fade-right"
                  data-aos-delay="300"
                  className="flex items-start gap-5 group"
                >
                  <div className="flex items-center justify-center">
                    <span className="text-2xl sm:text-4xl text-green-700">
                      ✓
                    </span>
                  </div>

                  <div>
                    <h3
                      data-aos="fade-up"
                      data-aos-delay="150"
                      className="text-xl sm:text-2xl font-bold text-[#061539]"
                    >
                      Sustainable Aquaculture
                    </h3>

                    <p className="mt-3 text-md sm:text-lg leading-[1.8] text-gray-600">
                      Eco-friendly feed solutions designed to support long-term
                      aquaculture sustainability and fish health.
                    </p>
                  </div>
                </div>
              </div>

              {/* BUTTON */}
              <Link
                data-aos="zoom-in"
                data-aos-delay="500"
                href="/about"
                className="group relative inline-flex items-center justify-center overflow-hidden mt-10 bg-gradient-to-r from-green-600 to-green-800 px-6 sm:px-8 py-3 sm:py-4 rounded-sm text-xl font-semibold text-white shadow-xl transition duration-300 hover:scale-105"
              >
                {/* HOVER OVERLAY */}
                <span className="absolute inset-0 w-0 bg-gradient-to-r from-orange-500 to-orange-700 transition-all duration-500 ease-out group-hover:w-full"></span>

                {/* TEXT */}
                <span className="relative z-10 text-lg sm:text-xl flex items-center gap-3">
                  Learn More
                  <span className="transition-transform duration-300 group-hover:translate-x-2">
                    →
                  </span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PRODUCTS ================= */}
      <section className="py-16 sm:py-20 md:py-24 bg-white border-t border-gray-100 sm:border-gray-200 overflow-hidden">
        <div className="w-full sm:w-[95%] mx-auto px-4 sm:px-6">
          {/* HEADING */}
          <div className="text-center max-w-5xl mx-auto mb-16">
            <p
              data-aos="fade-up"
              className="inline-block uppercase tracking-[4px] text-orange-500 font-bold text-md sm:text-md border-b-2 border-orange-400 pb-1"
            >
              Premium Nutrition
            </p>

            <h2
              data-aos="fade-up"
              data-aos-delay="100"
              className="mt-3 text-4xl md:text-6xl font-extrabold text-[#061539]"
            >
              Our Best <span className="text-green-700">Products</span>
            </h2>

            <p
              data-aos="fade-up"
              data-aos-delay="200"
              className="mt-6 text-base sm:text-lg md:text-xl leading-[1.8] text-[#667085] max-w-4xl mx-auto"
            >
              Premium quality fish feed solutions designed for healthier growth,
              better immunity, and sustainable aquaculture success.
            </p>
          </div>

          {/* PRODUCT WRAPPER */}
          <div className="relative">
            {/* PRODUCTS */}
            <div
              id="productSlider"
              className="
    flex
    lg:grid
    lg:grid-cols-3
    gap-6 lg:gap-10
    overflow-x-auto
    overflow-y-hidden
    lg:overflow-visible
    scroll-smooth
    no-scrollbar
    snap-x
    snap-mandatory
    touch-pan-x
    px-[calc(50vw-140px)]
    sm:px-[calc(50vw-160px)]
    lg:px-0
  "
            >
              {products.map((p, index) => (
                <TranslateSafeLink
                  href={`/products/category/${p.category._id}?product=${p._id}`}
                  key={p._id}
                  className="
    snap-center
    shrink-0
    w-full
    max-w-[300px]
    sm:max-w-[320px]
    lg:max-w-full
    mx-auto
    group
  "
                >
                  <div
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                    className="text-center"
                  >
                    {/* IMAGE */}
                    <div className="overflow-hidden rounded-sm">
                      <img
                        src={p.images?.[0]}
                        alt={p.name}
                        className="w-full h-[400px] sm:h-[560px] object-cover transition duration-700 group-hover:scale-105"
                      />
                    </div>

                    {/* TEXT */}
                    <div className="mt-5">
                      <h3 className="text-[23.5px] sm:text-[26px] font-bold text-[#061539] group-hover:text-green-700 transition duration-300">
                        {p.name}
                      </h3>
                    </div>
                  </div>
                </TranslateSafeLink>
              ))}
            </div>
          </div>

          {/* BUTTON */}
          <div className="text-center mt-10">
            <Link
              href="/products"
              className="group relative inline-flex items-center justify-center overflow-hidden bg-gradient-to-r from-green-600 to-green-800 px-6 sm:px-8 py-3 sm:py-4 rounded-sm text-xl font-semibold text-white shadow-xl transition duration-300 hover:scale-105"
            >
              <span className="absolute inset-0 w-0 bg-gradient-to-r from-orange-500 to-orange-700 transition-all duration-500 ease-out group-hover:w-full"></span>

              <span className="relative z-10 text-lg sm:text-xl flex items-center gap-3">
                View All Products
                <span className="transition-transform duration-300 group-hover:translate-x-2">
                  →
                </span>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ================= GALLERY ================= */}
      <section className="py-16 sm:py-20 md:py-24 bg-white border-t border-gray-100 sm:border-gray-200 overflow-hidden">
        <div className="w-full sm:w-[95%] mx-auto px-6">
          {/* HEADING */}
          <div className="text-center max-w-5xl mx-auto mb-20">
            <p
              data-aos="fade-up"
              data-aos-delay="100"
              className="inline-block uppercase tracking-[4px] text-orange-500 font-bold text-md sm:text-md border-b-2 border-orange-400 pb-1"
            >
              Our Gallery
            </p>

            <h2
              data-aos="fade-up"
              data-aos-delay="200"
              className="mt-3 text-[34px] sm:text-[2.75rem] font-extrabold text-[#061539] leading-[1.1]"
            >
              <span className="text-green-700">Farm & Feed</span> Moments
            </h2>

            <p
              data-aos="fade-up"
              data-aos-delay="300"
              className="mt-8 text-base sm:text-lg md:text-xl leading-[1.8] text-[#667085] max-w-4xl mx-auto"
            >
              Explore our premium fish feed products, fish farming activities,
              and successful aquaculture environments.
            </p>
          </div>

          {/* GALLERY GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {images.map((image, index) => (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 120}
                onClick={() => setSelectedIndex(index)}
                className="group relative overflow-hidden shadow-lg h-[240px] sm:h-[280px] md:h-[320px] cursor-pointer"
              >
                <img
                  src={image}
                  alt="Gallery"
                  className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
              </div>
            ))}
          </div>

          {selectedIndex !== null && (
            <div
              onClick={() => setSelectedIndex(null)}
              className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            >
              {/* Previous */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedIndex(
                    selectedIndex === 0 ? images.length - 1 : selectedIndex - 1,
                  );
                }}
                className="absolute left-2 sm:left-6 text-white text-4xl sm:text-6xl cursor-pointer hover:text-orange-500 transition"
              >
                ❮
              </button>

              {/* Image */}
              <img
                src={images[selectedIndex]}
                alt="Preview"
                className="max-w-[90vw] max-h-[90vh] object-contain rounded-sm"
                onClick={(e) => e.stopPropagation()}
              />

              {/* Next */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedIndex(
                    selectedIndex === images.length - 1 ? 0 : selectedIndex + 1,
                  );
                }}
                className="absolute right-2 sm:right-6 text-white text-4xl sm:text-6xl cursor-pointer hover:text-orange-500 transition"
              >
                ❯
              </button>

              {/* Close */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedIndex(null);
                }}
                className="absolute top-4 right-5 text-white text-5xl cursor-pointer hover:text-orange-500 transition"
              >
                ×
              </button>

              {/* Image Counter */}
              <div className="absolute bottom-5 text-white text-sm sm:text-base">
                {selectedIndex + 1} / {images.length}
              </div>
            </div>
          )}

          {/* BUTTON */}
          <div className="text-center mt-16">
            <Link
              data-aos="fade-up"
              data-aos-delay="250"
              href="/gallery"
              className="group relative inline-flex items-center justify-center overflow-hidden bg-gradient-to-r from-green-600 to-green-800 px-6 sm:px-8 py-3 sm:py-4 rounded-sm text-xl font-semibold text-white shadow-xl transition duration-300 hover:scale-105"
            >
              {/* HOVER OVERLAY */}
              <span className="absolute inset-0 w-0 bg-gradient-to-r from-orange-500 to-orange-700 transition-all duration-500 ease-out group-hover:w-full"></span>

              {/* TEXT */}
              <span className="relative z-10 text-lg sm:text-xl flex items-center gap-3">
                View Full Gallery
                <span className="transition-transform duration-300 group-hover:translate-x-2">
                  →
                </span>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ================= VIDEO SECTION ================= */}
      <section className="py-16 sm:py-20 md:py-24 px-6 md:px-8 bg-white border-t border-gray-100 sm:border-gray-200 overflow-hidden">
        <div className="w-full sm:w-[95%] mx-auto">
          {/* HEADING */}
          <div data-aos="fade-up" className="text-center mb-20">
            <p
              data-aos="fade-up"
              data-aos-delay="100"
              className="inline-block uppercase tracking-[4px] text-orange-500 font-bold text-md sm:text-md border-b-2 border-orange-400 pb-1"
            >
              Watch Our Journey
            </p>

            <h2
              data-aos="fade-up"
              data-aos-delay="200"
              className="mt-3 text-[34px] sm:text-[2.75rem] font-bold text-black"
            >
              Inside <span className="text-green-700">Rani Feeds</span>
            </h2>

            <p
              data-aos="fade-up"
              data-aos-delay="300"
              className="mt-5 text-gray-600 max-w-4xl mx-auto text-md sm:text-lg leading-relaxed"
            >
              Discover our premium fish feed production, aquaculture practices,
              and successful farming environments trusted by modern fish
              farmers.
            </p>
          </div>

          {/* VIDEO WRAPPER */}
          <div
            data-aos="zoom-in-up"
            className="relative rounded-sm overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.15)] sm:shadow-[0_25px_80px_rgba(0,0,0,0.25)] group"
          >
            {/* VIDEO */}
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="w-full h-[350px] md:h-[850px] object-cover transition duration-[3000ms] group-hover:scale-105"
              controls={false}
            >
              <source src="/rani-video.mp4" type="video/mp4" />
            </video>

            {/* DARK OVERLAY */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* PLAY / PAUSE BUTTON */}
            <button
              onClick={async () => {
                const video = videoRef.current;

                try {
                  if (isPlaying) {
                    video.pause();
                  } else {
                    await video.play();
                  }

                  setIsPlaying(!isPlaying);
                } catch (err) {
                  console.log(err);
                }
              }}
              className="absolute top-6 right-6 z-30 bg-white/20 backdrop-blur-md border border-white/30 text-white w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-xl sm:text-2xl hover:scale-110 transition duration-300 cursor-pointer"
            >
              {isPlaying ? "❚❚" : "▶"}
            </button>

            {/* CONTENT */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-20">
              <h3
                data-aos="fade-up"
                data-aos-delay="400"
                className="text-white text-xl md:text-7xl font-extrabold leading-tight drop-shadow-2xl"
              >
                Premium Nutrition <br />
                For Better Fish Growth
              </h3>

              <p
                data-aos="fade-up"
                data-aos-delay="400"
                className="mt-20 sm:mt-8 text-white/90 text-md md:text-2xl max-w-4xl leading-relaxed"
              >
                Scientifically formulated fish feed trusted by modern
                aquaculture farms for superior growth, health, and
                sustainability.
              </p>

              {/* BUTTONS */}
              {/* <div
                data-aos="fade-up"
                data-aos-delay="600"
                className="mt-12 flex gap-5 flex-wrap justify-center"
              >
                <Link
                  href="/products"
                  className="bg-green-700 hover:bg-green-800 text-white px-10 py-4 rounded-2xl text-lg font-semibold shadow-xl transition hover:scale-105"
                >
                  Explore Products →
                </Link>

                <Link
                  href="/contact"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-2xl text-lg font-semibold shadow-xl transition hover:scale-105"
                >
                  Contact Us
                </Link>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE RANI FEEDS ================= */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-white border-gray-100 sm:border-gray-200 overflow-hidden">
        <div className="w-full px-6 xl:px-12">
          {/* HEADING */}
          <div className="text-center mb-20" data-aos="fade-up">
            <p
              data-aos="fade-up"
              data-aos-delay="100"
              className="inline-block uppercase tracking-[4px] text-orange-500 font-bold text-md sm:text-md border-b-2 border-orange-400 pb-1"
            >
              Why Choose Us
            </p>

            <h2
              data-aos="fade-up"
              data-aos-delay="200"
              className="mt-3 text-[34px] sm:text-[2.75rem] font-bold text-black leading-tight"
            >
              Why Choose <span className="text-green-700">Rani Feeds</span>?
            </h2>

            <p
              data-aos="fade-up"
              data-aos-delay="300"
              className="mt-6 text-gray-600 mx-auto text-md sm:text-lg leading-relaxed"
            >
              Our commitment to quality, innovation, and sustainable aquaculture
              nutrition makes us the trusted choice for fish farmers across
              regions.
            </p>
          </div>

          {/* FEATURE CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {/* CARD 1 */}
            <div
              data-aos="fade-up"
              data-aos-delay="100"
              className="group bg-white rounded-sm px-10 py-12 shadow-[0_10px_35px_rgba(0,0,0,0.12)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.20)] transition duration-500 border border-gray-100 text-center hover:shadow-xl"
            >
              <div className="w-27 h-27 mx-auto rounded-[28px] bg-green-50 flex items-center justify-center group-hover:scale-110 transition duration-500">
                <ShieldCheck
                  className="w-12 h-12 text-green-700"
                  strokeWidth={2}
                />
              </div>

              <h3
                data-aos="fade-up"
                data-aos-delay="200"
                className="mt-8 text-[28px] font-bold text-black leading-tight"
              >
                Premium Quality
              </h3>

              <p
                data-aos="fade-up"
                data-aos-delay="300"
                className="mt-5 text-gray-600 leading-relaxed text-[18px]"
              >
                Our feeds are manufactured using high-quality ingredients to
                ensure optimal fish nutrition and healthier growth.
              </p>
            </div>

            {/* CARD 2 */}
            <div
              data-aos="fade-up"
              data-aos-delay="200"
              className="group bg-white rounded-sm px-10 py-12 shadow-[0_10px_35px_rgba(0,0,0,0.12)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.20)] transition duration-500 border border-gray-100 text-center hover:shadow-xl"
            >
              <div className="w-27 h-27 mx-auto rounded-[28px] bg-orange-50 flex items-center justify-center group-hover:scale-110 transition duration-500">
                <TrendingUp
                  className="w-12 h-12 text-orange-500"
                  strokeWidth={2}
                />
              </div>

              <h3
                data-aos="fade-up"
                data-aos-delay="200"
                className="mt-8 text-[28px] font-bold text-black leading-tight"
              >
                Faster Growth
              </h3>

              <p
                data-aos="fade-up"
                data-aos-delay="300"
                className="mt-5 text-gray-600 leading-relaxed text-[18px]"
              >
                Scientifically balanced nutrition improves feed conversion, fish
                immunity, and overall aquaculture productivity.
              </p>
            </div>

            {/* CARD 3 */}
            <div
              data-aos="fade-up"
              data-aos-delay="300"
              className="group bg-white rounded-sm px-10 py-12 shadow-[0_10px_35px_rgba(0,0,0,0.12)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.20)] transition duration-500 border border-gray-100 text-center hover:shadow-xl"
            >
              <div className="w-27 h-27 mx-auto rounded-[28px] bg-green-50 flex items-center justify-center group-hover:scale-110 transition duration-500">
                <FishSymbol
                  className="w-12 h-12 text-green-700"
                  strokeWidth={2}
                />
              </div>

              <h3
                data-aos="fade-up"
                data-aos-delay="200"
                className="mt-8 text-[28px] font-bold text-black leading-tight"
              >
                Trusted Brand
              </h3>

              <p
                data-aos="fade-up"
                data-aos-delay="300"
                className="mt-5 text-gray-600 leading-relaxed text-[18px]"
              >
                Rani Feeds is trusted by modern fish farmers for consistent
                quality, sustainability, and reliable farm performance.
              </p>
            </div>

            {/* CARD 4 */}
            <div
              data-aos="fade-up"
              data-aos-delay="400"
              className="group bg-white rounded-sm px-10 py-12 shadow-[0_10px_35px_rgba(0,0,0,0.12)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.20)] transition duration-500 border border-gray-100 text-center hover:shadow-xl"
            >
              <div className="w-27 h-27 mx-auto rounded-[28px] bg-orange-50 flex items-center justify-center group-hover:scale-110 transition duration-500">
                <Leaf className="w-12 h-12 text-orange-500" strokeWidth={2} />
              </div>

              <h3
                data-aos="fade-up"
                data-aos-delay="200"
                className="mt-8 text-[28px] font-bold text-black leading-tight"
              >
                Sustainable Feed
              </h3>

              <p
                data-aos="fade-up"
                data-aos-delay="300"
                className="mt-5 text-gray-600 leading-relaxed text-[18px]"
              >
                Environmentally responsible feed solutions designed for
                long-term sustainable aquaculture practices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= HAPPY FISH FARMERS ================= */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-white border-t border-gray-100 sm:border-gray-200 overflow-hidden">
        <div className="w-full mx-auto px-4 sm:px-6">
          {/* HEADING */}
          <div className="text-center max-w-5xl mx-auto mb-14 sm:mb-20">
            <p
              data-aos="fade-up"
              data-aos-delay="100"
              className="inline-block uppercase tracking-[4px] text-orange-500 font-bold text-md sm:text-md border-b-2 border-orange-400 pb-1"
            >
              WHAT OUR CUSTOMERS SAY
            </p>

            <h2
              data-aos="fade-up"
              data-aos-delay="200"
              className="mt-3 text-[34px] sm:text-[2.75rem] font-bold text-black leading-tight"
            >
              Happy <span className="text-green-700">Fish Farmers</span>
            </h2>

            <p
              data-aos="fade-up"
              data-aos-delay="300"
              className="mt-6 text-gray-600 mx-auto text-md sm:text-lg leading-relaxed"
            >
              Trusted by fish farmers across regions for premium nutrition,
              better growth, and healthier aquaculture outcomes.
            </p>
          </div>

          {/* TESTIMONIAL SLIDER */}
          <div className="relative">
            {/* LEFT BUTTON */}
            {/* LEFT BUTTON DESKTOP */}
            <button
              onClick={() => {
                const slider = document.getElementById("testimonialSlider");

                if (slider.scrollLeft <= 0) {
                  slider.scrollTo({
                    left: slider.scrollWidth,
                    behavior: "smooth",
                  });
                } else {
                  slider.scrollBy({
                    left: -320,
                    behavior: "smooth",
                  });
                }
              }}
              className="
hidden sm:flex
absolute
left-3 lg:-left-6
top-1/2
-translate-y-1/2
z-20
w-13 h-13
lg:w-14 lg:h-14
rounded-full
bg-gradient-to-l from-green-600 to-green-800
sm:bg-white/95
backdrop-blur-md
border border-gray-200
shadow-[0_10px_30px_rgba(0,0,0,0.12)]
items-center justify-center
text-white
text-lg lg:text-2xl
hover:border-green-700
transition-all duration-300
cursor-pointer
"
            >
              ⮜
            </button>

            {/* LEFT BUTTON MOBILE */}
            <button
              onClick={() => {
                const slider = document.getElementById("testimonialSlider");

                if (slider.scrollLeft <= 0) {
                  slider.scrollTo({
                    left: slider.scrollWidth,
                    behavior: "smooth",
                  });
                } else {
                  slider.scrollBy({
                    left: -320,
                    behavior: "smooth",
                  });
                }
              }}
              className="
sm:hidden
absolute
left-4
top-1/2
-translate-y-1/2
z-20
w-10 h-10
rounded-full
bg-gradient-to-l from-green-600 to-green-800
sm:bg-white/95
backdrop-blur-md
border border-gray-200
shadow-[0_10px_30px_rgba(0,0,0,0.12)]
flex items-center justify-center
text-white text-xl
cursor-pointer
"
            >
              ←
            </button>

            {/* RIGHT BUTTON */}
            {/* RIGHT BUTTON DESKTOP */}
            <button
              onClick={() => {
                const slider = document.getElementById("testimonialSlider");

                if (
                  slider.scrollLeft + slider.clientWidth >=
                  slider.scrollWidth - 10
                ) {
                  slider.scrollTo({
                    left: 0,
                    behavior: "smooth",
                  });
                } else {
                  slider.scrollBy({
                    left: 320,
                    behavior: "smooth",
                  });
                }
              }}
              className="
hidden sm:flex
absolute
right-3 lg:-right-6
top-1/2
-translate-y-1/2
z-20
w-13 h-13
lg:w-14 lg:h-14
rounded-full
bg-gradient-to-r from-green-600 to-green-800
sm:bg-white/95
backdrop-blur-md
border border-gray-200
shadow-[0_10px_30px_rgba(0,0,0,0.12)]
items-center justify-center
text-white
text-lg lg:text-2xl
hover:border-green-700
transition-all duration-300
cursor-pointer
"
            >
              ⮞
            </button>

            {/* RIGHT BUTTON MOBILE */}
            <button
              onClick={() => {
                const slider = document.getElementById("testimonialSlider");

                if (
                  slider.scrollLeft + slider.clientWidth >=
                  slider.scrollWidth - 10
                ) {
                  slider.scrollTo({
                    left: 0,
                    behavior: "smooth",
                  });
                } else {
                  slider.scrollBy({
                    left: 320,
                    behavior: "smooth",
                  });
                }
              }}
              className="
sm:hidden
absolute
right-4
top-1/2
-translate-y-1/2
z-20
w-10 h-10
rounded-full
bg-gradient-to-r from-green-600 to-green-800
sm:bg-white/95
backdrop-blur-md
border border-gray-200
shadow-lg
shadow-[0_10px_30px_rgba(0,0,0,0.12)]
flex items-center justify-center
text-white text-xl
cursor-pointer
"
            >
              →
            </button>

            {/* SLIDER */}
            <div
              id="testimonialSlider"
              className="
          flex
          gap-5 sm:gap-7 lg:gap-8
          overflow-x-auto
          scroll-smooth
          no-scrollbar
          snap-x
          snap-mandatory
          px-[calc(50vw-150px)]
          sm:px-[calc(50vw-170px)]
          lg:px-0
          py-4
        "
            >
              {[
                {
                  image: "/farmer1.png",
                  name: "Rajesh Kumar",
                  role: "Fish Farmer, Hyderabad",
                  border: "border-green-700",
                  text: "Rani Feeds significantly improved fish growth and reduced feed waste on my farm. The quality is consistent and the results are excellent.",
                },
                {
                  image: "/farmer2.png",
                  name: "Suresh Reddy",
                  role: "Aquaculture Farmer, Vijayawada",
                  border: "border-orange-500",
                  text: "The feed quality is outstanding. My fish are healthier, growth rates are faster, and farm productivity has increased tremendously.",
                },
                {
                  image: "/farmer3.png",
                  name: "Anand Patel",
                  role: "Fish Farm Owner, Kolkata",
                  border: "border-green-700",
                  text: "Reliable feed, excellent support, and noticeable improvement in fish health. Rani Feeds has become our trusted aquaculture partner.",
                },
                {
                  image: "/farmer4.png",
                  name: "Vikram Singh",
                  role: "Fish Farmer, Odisha",
                  border: "border-orange-500",
                  text: "Consistent feed quality and excellent customer support from Rani Feeds.",
                },
                {
                  image: "/farmer5.png",
                  name: "Ramesh Das",
                  role: "Aquaculture Expert",
                  border: "border-green-700",
                  text: "My fish health and survival rate improved noticeably after switching to Rani Feeds.",
                },
                {
                  image: "/farmer6.png",
                  name: "Mohan Rao",
                  role: "Fish Farm Owner",
                  border: "border-orange-500",
                  text: "Excellent nutrition formulas with visible improvement in fish growth.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  data-aos="flip-up"
                  data-aos-delay={index * 100}
                  className="
              snap-center
              shrink-0
              w-[360px]
              sm:w-[380px]
              md:min-w-[420px]
              md:w-[32%]
              bg-white
              border
              border-gray-100
              shadow-lg
              hover:shadow-xl
              transition-all
              duration-500
              rounded-sm
              p-5 sm:p-7 md:p-10
            "
                >
                  {/* TOP */}
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
                    <img
                      src={item.image}
                      alt={item.name}
                      className={`w-19 h-19 sm:w-20 sm:h-20 rounded-full object-cover border-4 ${item.border} shrink-0`}
                    />

                    <div>
                      <h3 className="text-[22px] sm:text-[24px] md:text-[28px] font-bold text-[#061539] leading-tight">
                        {item.name}
                      </h3>

                      <p className="mt-1 text-gray-500 text-lg sm:text-base md:text-lg">
                        {item.role}
                      </p>

                      <div className="flex items-center justify-center sm:justify-start gap-1 mt-2 text-orange-500 text-2xl">
                        ★★★★★
                      </div>
                    </div>
                  </div>

                  {/* TEXT */}
                  <p className="mt-6 text-[18px] sm:text-[18px] md:text-[19px] leading-[1.9] text-gray-600 text-center sm:text-left">
                    “{item.text}”
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-white border-t border-gray-100 overflow-hidden">
        <div data-aos="fade-up">
          <div className="w-[90%] mx-auto grid md:grid-cols-3 gap-10 text-center">
            <div
              data-aos="fade-up"
              data-aos-delay="100"
              className="p-8 bg-gray-50 rounded-lg shadow-lg hover:shadow-xl transition duration-500 hover:-translate-y-2"
            >
              <h3
                data-aos="fade-up"
                data-aos-delay="100"
                className="text-2xl font-semibold text-green-700"
              >
                High Protein
              </h3>
              <p
                data-aos="fade-up"
                data-aos-delay="200"
                className="text-gray-600 mt-5"
              >
                Balanced nutrition for rapid fish growth
              </p>
            </div>

            <div
              data-aos="fade-up"
              data-aos-delay="200"
              className="p-8 bg-gray-50 rounded-lg shadow-lg hover:shadow-xl transition duration-500 hover:-translate-y-2"
            >
              <h3
                data-aos="fade-up"
                data-aos-delay="100"
                className="text-2xl font-semibold text-green-700"
              >
                Smart Feeding
              </h3>
              <p
                data-aos="fade-up"
                data-aos-delay="200"
                className="text-gray-600 mt-5"
              >
                Easy monitoring and reduced feed waste
              </p>
            </div>

            <div
              data-aos="fade-up"
              data-aos-delay="300"
              className="p-8 bg-gray-50 rounded-lg shadow-lg hover:shadow-xl transition duration-500 hover:-translate-y-2"
            >
              <h3
                data-aos="fade-up"
                data-aos-delay="100"
                className="text-2xl font-semibold text-green-700"
              >
                Healthy Fish
              </h3>
              <p
                data-aos="fade-up"
                data-aos-delay="200"
                className="text-gray-600 mt-5"
              >
                Improves immunity and survival rate
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="relative overflow-hidden py-28 px-6 bg-gradient-to-r from-green-800 via-green-700 to-green-600 text-white">
        {/* BACKGROUND CIRCLES */}
        <div className="absolute -left-24 bottom-0 w-72 h-72 bg-white/5 rounded-full"></div>
        <div className="absolute -right-24 top-0 w-80 h-80 bg-white/5 rounded-full"></div>

        <div
          className="max-w-5xl mx-auto text-center relative z-10"
          data-aos="fade-up"
        >
          {/* TOP TAG */}
          <p
            data-aos="fade-up"
            data-aos-delay="100"
            className="uppercase tracking-[6px] text-lg font-semibold text-white/90 mb-6"
          >
            Get Started Today
          </p>

          {/* HEADING */}
          <h2
            data-aos="fade-up"
            data-aos-delay="200"
            className="text-4xl md:text-6xl font-extrabold leading-tight"
          >
            Ready to Boost Your Fish Farm?
          </h2>

          {/* DESCRIPTION */}
          <p
            data-aos="fade-up"
            data-aos-delay="300"
            className="mt-6 text-lg md:text-2xl text-white/85 max-w-3xl mx-auto leading-relaxed"
          >
            Get premium quality feed and expert support. Join 250+ farmers who
            trust Rani Feeds.
          </p>

          {/* BUTTONS */}
          <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-5">
            {/* ENQUIRE BUTTON */}
            <Link
              data-aos="fade-up"
              data-aos-delay="350"
              href="/contact"
              className="group relative inline-flex items-center justify-center overflow-hidden bg-gradient-to-r from-orange-500 to-orange-700 px-5 sm:px-7 md:px-8 py-3 sm:py-4 rounded-sm text-md sm:text-base md:text-lg lg:text-xl font-semibold text-white shadow-2xl transition-all duration-300 hover:scale-105 min-w-[190px]"
            >
              {/* HOVER EFFECT */}
              <span className="absolute inset-0 w-0 bg-white/10 transition-all duration-500 ease-out group-hover:w-full"></span>

              {/* TEXT */}
              <span className="relative z-10 flex items-center gap-2">
                Enquire Now
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </Link>

            {/* PRODUCTS BUTTON */}
            <Link
              data-aos="fade-up"
              data-aos-delay="450"
              href="/products"
              className="group relative inline-flex items-center justify-center overflow-hidden border border-white/30 bg-white/10 backdrop-blur-md hover:bg-white/20 px-5 sm:px-7 md:px-8 py-3 sm:py-4 rounded-sm text-md sm:text-base md:text-lg lg:text-xl font-semibold text-white transition-all duration-300 hover:scale-105 min-w-[190px]"
            >
              {/* HOVER EFFECT */}
              <span className="absolute inset-0 w-0 bg-white/10 transition-all duration-500 ease-out group-hover:w-full"></span>

              {/* TEXT */}
              <span className="relative z-10 flex items-center gap-2">
                Browse Products
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
