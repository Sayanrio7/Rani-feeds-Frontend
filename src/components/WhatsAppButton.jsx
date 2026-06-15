"use client";

import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false);

  const phoneNumber = "919073558447";

  const message =
    "Hello Rani Feeds, I would like to know more about your products.";

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className={`
        fixed
        bottom-26
        sm:bottom-24
        right-4
        sm:right-8
        z-50
        w-14
        h-14
        rounded-full
        bg-gradient-to-b
        from-green-400
        to-green-600
        text-white
        flex
        items-center
        justify-center
        cursor-pointer
        transition-all
        duration-500
        hover:scale-110
        hover:rotate-6
        animate-[float_3s_ease-in-out_infinite] 
        ${
          visible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
        }
      `}
    >
      <FaWhatsapp size={30} />
    </a>
  );
}