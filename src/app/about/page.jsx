"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Loader from "@/components/Loader";
import {
  FlaskConical,
  Leaf,
  ShieldCheck,
  TrendingUp,
  Factory,
  Microscope,
  PackageCheck,
  Truck,
  Award,
  Users,
  BarChart3,
  Sprout,
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function AboutPage() {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/about/get`)
      .then((res) => {
        setAboutData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const imgSrc = aboutData?.image?.startsWith("http")
    ? aboutData.image
    : aboutData?.image
      ? `http://localhost:5000${aboutData.image}`
      : "/feedbags1.png";

  const coreValues = [
    {
      icon: <FlaskConical className="w-7 h-7" />,
      title: "Scientific Formulation",
      desc: "Every batch is crafted using research-backed nutritional science to maximise fish health and growth rates.",
      color: "text-green-700",
      bg: "bg-green-50",
      border: "border-green-200",
    },
    {
      icon: <Leaf className="w-7 h-7" />,
      title: "Eco-Friendly Practices",
      desc: "We reduce environmental impact through sustainable sourcing, minimal waste production, and biodegradable packaging.",
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-200",
    },
    {
      icon: <ShieldCheck className="w-7 h-7" />,
      title: "Quality Assurance",
      desc: "Stringent quality checks at every stage of production ensure consistent nutrition and zero compromise on standards.",
      color: "text-orange-500",
      bg: "bg-orange-50",
      border: "border-orange-200",
    },
    {
      icon: <TrendingUp className="w-7 h-7" />,
      title: "Proven Results",
      desc: "Trusted by 250+ fish farmers across India with documented improvements in FCR, survival rates, and harvest yields.",
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-200",
    },
    {
      icon: <Users className="w-7 h-7" />,
      title: "Farmer-First Support",
      desc: "Our field experts work directly with farmers to provide on-site guidance, training, and after-sale support.",
      color: "text-green-700",
      bg: "bg-green-50",
      border: "border-green-200",
    },
    {
      icon: <Sprout className="w-7 h-7" />,
      title: "Continuous Innovation",
      desc: "Our R&D team continuously develops next-generation feed technology that adapts to evolving aquaculture needs.",
      color: "text-orange-500",
      bg: "bg-orange-50",
      border: "border-orange-200",
    },
  ];

  const productionProcess = [
    {
      icon: <Microscope className="w-8 h-8" />,
      step: "01",
      title: "Research & Development",
      desc: "In-house nutritionists analyse species-specific dietary requirements and formulate optimal feed compositions.",
    },
    {
      icon: <Factory className="w-8 h-8" />,
      step: "02",
      title: "Premium Ingredient Sourcing",
      desc: "We source high-grade protein meals, vitamins, and minerals from verified, sustainable supply chains.",
    },
    {
      icon: <PackageCheck className="w-8 h-8" />,
      step: "03",
      title: "Precision Manufacturing",
      desc: "State-of-the-art extrusion and pelletizing technology ensures uniform size, density, and nutritional consistency.",
    },
    {
      icon: <Truck className="w-8 h-8" />,
      step: "04",
      title: "Quality-Checked Delivery",
      desc: "Every shipment passes final lab testing and is delivered farm-fresh with traceability documentation.",
    },
  ];

  const stats = [
    {
      value: "250+",
      label: "Trusted Fish Farmers",
      color: "bg-green-700",
      icon: <Users className="w-6 h-6 text-white" />,
    },
    {
      value: "100%",
      label: "Quality Assured",
      color: "bg-orange-500",
      icon: <Award className="w-6 h-6 text-white" />,
    },
    {
      value: "High FCR",
      label: "Feed Conversion Ratio",
      color: "bg-[#061539]",
      icon: <BarChart3 className="w-6 h-6 text-white" />,
    },
    {
      value: "Eco",
      label: "Sustainable Farming",
      color: "bg-emerald-600",
      icon: <Leaf className="w-6 h-6 text-white" />,
    },
  ];

  useEffect(() => {
    AOS.init({
      duration: 1200,
      offset: 80,
      once: true,
      easing: "ease-in-out",
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

        {/* GLOW EFFECTS */}
        <div className="absolute top-[-120px] left-[-120px] w-[250px] h-[250px] bg-green-500/20 blur-3xl rounded-full"></div>

        <div className="absolute bottom-[-120px] right-[-120px] w-[300px] h-[300px] bg-orange-500/20 blur-3xl rounded-full"></div>

        {/* CONTENT */}
        <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4">
          <div data-aos="fade-up" className="text-center">
            {/* BREADCRUMB */}
            <div className="flex items-center justify-center gap-3 text-sm sm:text-base font-semibold uppercase tracking-[2px]">
              <Link
                href="/"
                className="text-white hover:text-orange-400 transition duration-300"
              >
                Home
              </Link>

              <span className="text-white/60">›</span>

              <span className="text-orange-400">About</span>
            </div>

            {/* TITLE */}
            <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight">
              ABOUT US
            </h1>
          </div>
        </div>
      </section>

      {/* ================= ABOUT SECTION ================= */}
      <section className="py-16 sm:py-20 md:py-24 bg-white">
        <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">
            <div data-aos="fade-right" className="relative">
              <div className="relative overflow-hidden rounded-sm shadow-[0_30px_80px_rgba(0,0,0,0.15)]">
                <img
                  src={imgSrc}
                  alt="About Rani Feeds"
                  className="w-full h-[320px] sm:h-[460px] md:h-[700px] object-cover transition duration-700 hover:scale-105"
                />
              </div>
              <div
                className="absolute -bottom-6 -right-6 w-32 h-32 opacity-20 hidden lg:block"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, #16a34a 1.5px, transparent 1.5px)",
                  backgroundSize: "12px 12px",
                }}
              />
            </div>

            <div data-aos="fade-left">
              <span className="inline-block uppercase tracking-[4px] text-orange-500 font-bold text-md sm:text-md border-b-2 border-orange-400 pb-1">
                About Rani Feeds
              </span>
              <h2 className="mt-5 text-[28px] sm:text-4xl md:text-[2.75rem] font-black text-[#061539] leading-tight">
                Premium Nutrition For
                <br />
                <span className="text-green-700">Sustainable Aquaculture</span>
              </h2>

              <div className="mt-6 space-y-5 text-gray-600 text-base sm:text-[17px] leading-[1.95]">
                <p>
                  <span className="font-semibold text-3xl text-green-700">
                    Rani Feeds{" "}
                  </span>{" "}
                  is a trusted aquaculture nutrition brand committed to
                  delivering premium-quality fish feed solutions designed for
                  modern fish farming and sustainable aquaculture development.
                </p>
                <blockquote className="border-l-4 border-orange-500 pl-6 py-3 bg-gradient-to-r from-orange-50 to-transparent rounded-r-lg">
                  <p className="text-[17px] italic font-semibold text-[#061539] leading-relaxed">
                    "Healthy aquaculture begins with balanced nutrition,
                    responsible farming, and continuous innovation."
                  </p>
                </blockquote>
                <p>
                  We believe proper nutrition plays a vital role in ensuring
                  faster fish growth, stronger immunity, improved survival
                  rates, and higher farm productivity.
                </p>
                <p>
                  Over the years, Rani Feeds has earned the trust of modern fish
                  farmers through dependable product quality, transparent
                  service, and farmer-focused support across India.
                </p>
              </div>

              <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
                {stats.map((s, i) => (
                  <div
                    key={i}
                    data-aos="fade-up"
                    data-aos-delay={i * 120}
                    className="bg-white border border-gray-100 rounded-sm shadow-md overflow-hidden"
                  >
                    <div
                      className={`${s.color} w-full flex items-center justify-center py-2`}
                    >
                      {s.icon}
                    </div>
                    <div className="p-3 text-center">
                      <p className="text-xl font-black text-[#061539]">
                        {s.value}
                      </p>
                      <p className="text-[11px] text-gray-500 mt-0.5 leading-tight">
                        {s.label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= MISSION & VISION ================= */}
      <section className="py-16 sm:py-20 bg-[#061539] relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
        <div className="relative max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="text-center mb-12">
            <span className="inline-block uppercase tracking-[4px] text-orange-500 font-bold text-md sm:text-md border-b-2 border-orange-400 pb-1">
              Our Foundation
            </span>
            <h2 className="mt-4 text-4xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
              Mission &amp; Vision
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div
              data-aos="fade-up"
              data-aos-delay="100"
              className="bg-white/5 border border-white/10 rounded-sm p-8 sm:p-10 backdrop-blur-sm"
            >
              <div className="w-14 h-14 rounded-sm bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center mb-6">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-black text-white mb-4">
                Our Mission
              </h3>
              <p className="text-white/70 text-base sm:text-lg leading-[1.9]">
                To provide modern fish farmers with scientifically superior,
                affordable, and sustainable feed solutions that maximise
                productivity, improve fish health, and contribute to a thriving
                aquaculture ecosystem across India.
              </p>
            </div>
            <div
              data-aos="fade-up"
              data-aos-delay="250"
              className="bg-white/5 border border-white/10 rounded-sm p-8 sm:p-10 backdrop-blur-sm"
            >
              <div className="w-14 h-14 rounded-sm bg-gradient-to-r from-green-600 to-green-700 flex items-center justify-center mb-6">
                <Leaf className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-black text-white mb-4">
                Our Vision
              </h3>
              <p className="text-white/70 text-base sm:text-lg leading-[1.9]">
                To be India's most trusted aquaculture nutrition partner —
                recognised for innovation-driven quality, eco-conscious
                manufacturing, and measurable impact on the livelihoods of fish
                farming communities nationwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="py-16 sm:py-20 md:py-24 bg-[#f7faf7]">
        <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block uppercase tracking-[4px] text-orange-500 font-bold text-md sm:text-md border-b-2 border-orange-400 pb-1">
              Why Farmers Trust Us
            </span>
            <h2 className="mt-4 text-4xl sm:text-4xl md:text-5xl font-black text-[#061539] leading-tight">
              The Rani Feeds
              <span className="text-green-700"> Advantage</span>
            </h2>
            <p className="mt-5 text-gray-600 text-base sm:text-lg leading-relaxed">
              Six pillars that define our commitment to excellence in
              aquaculture nutrition.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {coreValues.map((val, i) => (
              <div
                key={i}
                data-aos="zoom-in-up"
                data-aos-delay={i * 120}
                className={`group bg-white border ${val.border} rounded-sm p-7 hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
              >
                <div
                  className={`w-16 h-16 sm:w-14 sm:h-14 rounded-sm ${val.bg} ${val.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
                >
                  {val.icon}
                </div>
                <h3 className="text-2xl sm:text-lg font-black text-[#061539] mb-3">
                  {val.title}
                </h3>
                <p className="text-gray-600 text-base leading-[1.85]">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= OUR PROCESS ================= */}
      <section className="py-16 sm:py-20 md:py-24 bg-white overflow-hidden">
        <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-10">
          {/* SECTION HEADING */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block uppercase tracking-[4px] text-orange-500 font-bold text-md sm:text-md border-b-2 border-orange-400 pb-1">
              From Lab To Farm
            </span>

            <h2 className="mt-4 text-4xl sm:text-5xl font-black text-[#061539] leading-tight">
              Our Production
              <span className="text-green-700"> Process</span>
            </h2>

            <p className="mt-6 text-gray-600 text-base sm:text-lg md:text-xl leading-relaxed">
              A rigorous four-stage production system ensuring every bag of Rani
              Feeds delivers premium nutrition, consistency, and superior
              aquaculture performance.
            </p>
          </div>

          {/* PROCESS GRID */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-7 lg:gap-8">
            {productionProcess.map((step, i) => (
              <div
                key={i}
                data-aos="fade-up"
                data-aos-delay={i * 150}
                className="relative group h-full"
              >
                {/* CONNECTOR */}
                {i < productionProcess.length - 1 && (
                  <div className="hidden lg:block absolute top-[82px] left-full w-8 h-[3px] bg-gradient-to-r from-green-500 to-orange-400 z-10"></div>
                )}

                {/* CARD */}
                <div className="relative h-full min-h-[360px] bg-white border border-green-100 rounded-sm overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.06)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.12)] transition-all duration-500 hover:-translate-y-2">
                  {/* TOP ACCENT */}
                  <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-green-700 via-green-500 to-orange-500"></div>

                  {/* BACKGROUND GLOW */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-green-50/50 via-transparent to-orange-50/40"></div>

                  {/* STEP NUMBER */}
                  <span className="absolute top-8 right-5 text-[50px] font-black text-gray-300 leading-none select-none">
                    {step.step}
                  </span>

                  {/* CONTENT */}
                  <div className="relative z-10 p-7 flex flex-col h-full">
                    {/* ICON */}
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-sm bg-gradient-to-r from-green-600 to-green-800 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition duration-500">
                      <div className="scale-110">{step.icon}</div>
                    </div>

                    {/* TITLE */}
                    <h3 className="mt-7 text-2xl sm:text-[22px] font-black text-[#061539] leading-[1.25]">
                      {step.title}
                    </h3>

                    {/* DESCRIPTION */}
                    <p className="mt-5 text-gray-600 text-base leading-[2]">
                      {step.desc}
                    </p>

                    {/* BOTTOM BAR */}
                    <div className="mt-auto pt-7">
                      <div className="w-16 h-[4px] rounded-full bg-gradient-to-r from-green-600 to-orange-500"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= IMAGE STORY SECTION ================= */}
      <section className="py-16 sm:py-20 md:py-24 bg-[#f7faf7]">
        <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block uppercase tracking-[4px] text-orange-500 font-bold text-md sm:text-md border-b-2 border-orange-400 pb-1">
              Our Journey
            </span>
            <h2 className="mt-4 text-4xl sm:text-4xl md:text-5xl font-black text-[#061539] leading-tight">
              Empowering Modern
              <span className="text-green-700"> Aquaculture</span>
            </h2>
            <p className="mt-5 text-gray-600 text-base sm:text-lg md:text-xl leading-relaxed">
              From premium fish nutrition to sustainable farming support, Rani
              Feeds continues to build trust through quality, innovation, and
              performance.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                src: imgSrc,
                alt: "Fish Farming",
                title: "Sustainable Farming",
                desc: "Supporting healthier aquaculture ecosystems.",
                tag: "Environment",
                delay: 0,
              },
              {
                src: "/feedbags1.png",
                alt: "Fish Feed",
                title: "Premium Nutrition",
                desc: "Scientifically balanced feed solutions.",
                tag: "Product",
                delay: 0.15,
              },
              {
                src: "/banner600.jpg",
                alt: "Aquaculture",
                title: "Farmer Success",
                desc: "Trusted by modern fish farmers nationwide.",
                tag: "Community",
                delay: 0.3,
              },
            ].map((item, i) => (
              <div
                key={i}
                data-aos="fade-up"
                data-aos-delay={i * 150}
                className="group relative overflow-hidden rounded-sm shadow-[0_20px_60px_rgba(0,0,0,0.13)]"
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-[300px] sm:h-[340px] object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                <span className="absolute top-4 left-4 bg-gradient-to-r from-green-600 to-green-800 text-white text-sm font-bold px-3 py-1 rounded-full tracking-wider">
                  {item.tag}
                </span>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-2xl font-black">{item.title}</h3>
                  <p className="mt-2 text-white/75 text-sm sm:text-base opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="relative overflow-hidden py-28 px-6 bg-gradient-to-r from-green-800 via-green-700 to-green-600 text-white">
        {/* BACKGROUND CIRCLES */}
        <div className="absolute -left-24 bottom-0 w-72 h-72 bg-white/5 rounded-full"></div>

        <div className="absolute -right-24 top-0 w-80 h-80 bg-white/5 rounded-full"></div>

        {/* GLOW EFFECTS */}
        <div className="absolute top-[-120px] left-[-120px] w-[260px] h-[260px] bg-green-300/10 blur-3xl rounded-full"></div>

        <div className="absolute bottom-[-120px] right-[-120px] w-[320px] h-[320px] bg-orange-400/10 blur-3xl rounded-full"></div>

        {/* CONTENT */}
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
            Partner With Us
          </p>

          {/* HEADING */}
          <h2
            data-aos="fade-up"
            data-aos-delay="200"
            className="text-4xl md:text-6xl font-extrabold leading-tight"
          >
            Ready to Elevate Your
            <br />
            Fish Farm?
          </h2>

          {/* DESCRIPTION */}
          <p
            data-aos="fade-up"
            data-aos-delay="300"
            className="mt-6 text-lg md:text-2xl text-white/85 max-w-3xl mx-auto leading-relaxed"
          >
            Join 250+ fish farmers who trust Rani Feeds for premium nutrition
            solutions. Our team is ready to help you choose the right feed for
            your farm and species.
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
    </main>
  );
}
