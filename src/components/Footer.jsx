"use client";

import { useEffect } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";

export default function Footer() {
  const year = new Date().getFullYear();

  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true,
      easing: "ease-in-out",
      offset: 50,
    });
  }, []);

  return (
    <footer
      data-ocid="footer"
      className="bg-gray-900 text-gray-400 overflow-hidden"
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 py-10 md:py-10 xl:py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-10 xl:gap-16">
          {/* BRAND */}
          <div className="sm:col-span-2 xl:pr-20" data-aos="fade-right">
            {/* LOGO */}
            <Link
              href="/"
              className="mb-5"
              data-aos="zoom-in"
              data-aos-delay="100"
            >
              <img
                src="/rf.png"
                alt="Rani Feeds"
                className="
                  w-[170px]
                  md:w-[210px]
                  object-contain
                  hover:scale-105
                  transition-all
                  duration-500
                "
              />
            </Link>

            {/* DESCRIPTION */}
            <p
              data-aos="fade-up"
              data-aos-delay="200"
              className="text-gray-400 leading-relaxed max-w-md xl:max-w-lg text-md md:text-base mt-5"
            >
              Dedicated to delivering high-performance fish feed that enhances
              growth, strengthens immunity, and improves farm productivity
              across the region.
            </p>

            {/* SOCIAL ICONS */}
            <div
              className="mt-5 sm:mt-3 flex items-center gap-4"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              {/* FACEBOOK */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group
                  w-11 h-11 rounded-full
                  bg-gray-800
                  flex items-center justify-center
                  transition-all duration-500
                  hover:scale-110
                  hover:bg-[#1877F2]
                  shadow-lg
                "
              >
                <FaFacebookF className="text-white text-[16px] transition-transform duration-500" />
              </a>

              {/* INSTAGRAM */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group
                  relative
                  w-11 h-11 rounded-full
                  overflow-hidden
                  flex items-center justify-center
                  bg-gray-800
                  transition-all duration-500
                  hover:scale-110
                  shadow-lg
                "
              >
                {/* GRADIENT */}
                <div
                  className="
                    absolute inset-0
                    opacity-0
                    group-hover:opacity-100
                    transition-opacity duration-500
                    bg-gradient-to-tr
                    from-pink-500
                    via-red-500
                    to-yellow-500
                  "
                />

                <FaInstagram className="relative z-10 text-white text-[18px] transition-transform duration-500" />
              </a>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div data-aos="fade-up" data-aos-delay="200">
            <h4 className="text-white font-semibold mb-5 tracking-wide uppercase text-md md:text-base">
              Quick Links
            </h4>

            <ul className="space-y-3">
              {[
                { name: "Home", link: "/" },
                { name: "About Us", link: "/about" },
                { name: "Products", link: "/products" },
                { name: "Gallery", link: "/gallery" },
                { name: "Blog", link: "/blog" },
                { name: "Contact", link: "/contact" },
              ].map((item, index) => (
                <li
                  key={item.link}
                  data-aos="fade-up"
                  data-aos-delay={300 + index * 80}
                >
                  <a
                    href={item.link}
                    className="
    text-gray-400
    hover:text-green-400
    transition-all duration-300
    text-md md:text-base
    flex items-center gap-2
    hover:translate-x-1
  "
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-green-600 inline-block" />
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div data-aos="fade-left" data-aos-delay="300">
            <h4 className="text-white font-semibold mb-5 tracking-wide uppercase text-md md:text-base">
              Contact
            </h4>

            <ul className="space-y-4">
              <li
                className="flex items-start gap-3"
                data-aos="fade-up"
                data-aos-delay="350"
              >
                <MapPin className="w-4.5 h-4.5 text-green-500 mt-0.5 shrink-0" />

                <span className="text-md md:text-base leading-relaxed">
                  Baguiati, Kolkata, West Bengal - 700059
                </span>
              </li>

              <li
                className="flex items-center gap-3"
                data-aos="fade-up"
                data-aos-delay="450"
              >
                <Phone className="w-4 h-4 text-green-500 shrink-0" />

                <a
                  href="tel:+919073558447"
                  className="text-md md:text-base hover:text-green-400 transition-colors"
                >
                  +91 9073558447
                </a>
              </li>

              <li
                className="flex items-center gap-3"
                data-aos="fade-up"
                data-aos-delay="550"
              >
                <Mail className="w-4 h-4 text-green-500 shrink-0" />

                <a
                  href="mailto:info@ranifeeds.in"
                  className="text-md md:text-base hover:text-green-400 transition-colors"
                >
                  info@ranifeeds.in
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div
          className="mt-6 pt-6 md:pt-8 border-t border-gray-800 flex items-center justify-center"
          data-aos="fade-up"
          data-aos-delay="600"
        >
          <p className="text-lg text-gray-500 text-center w-full">
            &copy; {year} Rani Feeds. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
