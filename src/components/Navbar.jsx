"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import axios from "axios";
import SearchModal from "@/components/SearchModal";
import { SendHorizontal, Send } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [language, setLanguage] = useState("en");

  const searchRef = useRef(null);

  const pathname = usePathname();

  const isHome = pathname === "/";
  const navItems = [
    { name: "Home", link: "/" },
    { name: "About Us", link: "/about" },
    { name: "Products", link: "/products" },
    { name: "Gallery", link: "/gallery" },
    { name: "Blog", link: "/blog" },
    { name: "Contact", link: "/contact" },
  ];

  // SCROLL EFFECT
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/products/get-all`)
      .then((res) => setProducts(res.data.data || []))
      .catch((err) => {
        console.error(err);
      });

    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/blogs/get-all`)
      .then((res) => setBlogs(res.data.data || []))
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
        setSearchTerm("");
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // NAVBAR STYLE
  const navbarStyle =
    isHome && !scrolled
      ? "bg-white lg:bg-transparent py-3 lg:py-5 border-transparent"
      : "bg-white/95 backdrop-blur-xl shadow-lg border-gray-200 py-3";

  // TEXT COLOR
  const textColor =
    isHome && !scrolled ? "lg:text-white text-[#061539]" : "text-[#061539]";

  const filteredProducts = products.filter((item) =>
    item.name?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const filteredBlogs = blogs.filter((item) =>
    item.title?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const toggleLanguage = () => {
    const select = document.querySelector(".goog-te-combo");

    if (!select) return;

    if (language === "en") {
      select.value = "bn";
      select.dispatchEvent(new Event("change", { bubbles: true }));

      localStorage.setItem("site-language", "bn");
      setLanguage("bn");
    } else {
      localStorage.removeItem("site-language");

      // Force English in all cookie scopes
      document.cookie = "googtrans=/en/en; path=/";
      document.cookie =
        "googtrans=/en/en; path=/; domain=" + window.location.hostname;
      document.cookie =
        "googtrans=/en/en; path=/; domain=." + window.location.hostname;

      setLanguage("en");

      // Full hard reload
      window.location.href = window.location.pathname;
    }
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem("site-language");

    if (savedLanguage !== "bn") {
      setLanguage("en");
      return;
    }

    setLanguage("bn");

    const timer = setInterval(() => {
      const select = document.querySelector(".goog-te-combo");

      if (select) {
        select.value = "bn";

        select.dispatchEvent(
          new Event("change", {
            bubbles: true,
          }),
        );

        clearInterval(timer);
      }
    }, 500);

    return () => clearInterval(timer);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 border-b transition-all duration-500 ${navbarStyle}`}
    >
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-10">
        <div className="relative flex items-center justify-between h-[80px] sm:h-[90px]">
          {/* LEFT */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden z-50 relative w-10 h-10 flex items-center justify-center"
              aria-label="Toggle Menu"
            >
              <span
                className={`absolute w-7 h-[3px] rounded-full transition-all duration-300 ease-in-out ${
                  open
                    ? "rotate-45 bg-orange-500"
                    : "-translate-y-2 bg-green-700"
                }`}
              />

              <span
                className={`absolute w-7 h-[3px] bg-green-700 rounded-full transition-all duration-300 ease-in-out ${
                  open ? "opacity-0 scale-0" : "opacity-100 scale-100"
                }`}
              />

              <span
                className={`absolute w-7 h-[3px] rounded-full transition-all duration-300 ease-in-out ${
                  open
                    ? "-rotate-45 bg-orange-500"
                    : "translate-y-2 bg-green-700"
                }`}
              />
            </button>

            {/* LOGO CENTER */}
            <Link
              href="/"
              className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0 flex items-center"
            >
              <img
                src="/rf.png"
                alt="Rani Feeds"
                className="h-17.5 sm:h-18 md:h-18 lg:h-24 w-auto object-contain transition-all duration-500"
              />
            </Link>
          </div>

          {/* MOBILE LANGUAGE TOGGLE */}
          <div className="lg:hidden flex items-center">
            <div
              onClick={toggleLanguage}
              className="
      notranslate
      relative
      flex
      items-center
      w-[88px]
      h-[40px]
      rounded-full
      bg-white
      border
      border-[#d9c9c0]
      cursor-pointer
      select-none
      shadow-sm
    "
            >
              {/* SLIDER */}
              <div
                className={`
        absolute
        w-[36px]
        h-[35px]
        rounded-full
        bg-gradient-to-r from-orange-500 to-orange-600
        transition-all
        duration-300
        ${language === "en" ? "left-[2px]" : "left-[48px]"}
      `}
              />

              {/* EN */}
              <div className="flex-1 text-center z-10">
                <span
                  translate="no"
                  className={`notranslate text-[14px] font-semibold ${
                    language === "en" ? "text-white" : "text-gray-600"
                  }`}
                >
                  EN
                </span>
              </div>

              {/* BN */}
              <div className="flex-1 text-center z-10">
                <span
                  translate="no"
                  className={`notranslate text-[14px] font-semibold ${
                    language === "bn" ? "text-white" : "text-gray-600"
                  }`}
                >
                  বাং
                </span>
              </div>
            </div>
          </div>

          {/* DESKTOP MENU */}
          <div
            className={`hidden xl:flex absolute left-1/2 -translate-x-1/2 items-center gap-8 xl:gap-12 text-lg xl:text-[16.5px] font-medium transition-all duration-300 ${textColor}`}
          >
            {navItems.map((item) => {
              const active = pathname === item.link;

              return (
                <Link
                  key={item.name}
                  href={item.link}
                  className={`relative transition-all duration-300 ${
                    active ? "text-orange-500" : "hover:text-orange-500"
                  }`}
                >
                  {item.name}

                  {/* ACTIVE LINE */}
                  <span
                    className={`absolute left-0 -bottom-2 h-[2px] bg-orange-500 transition-all duration-300 ${
                      active ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  ></span>
                </Link>
              );
            })}
          </div>

          {/* RIGHT ACTIONS */}
          <div className="hidden xl:flex items-center gap-4">
            {/* LIVE SEARCH */}
            <div ref={searchRef} className="relative flex items-center">
              <div
                className={`flex items-center overflow-hidden transition-all duration-500 ease-in-out ${
                  searchOpen ? "w-[350px]" : "w-11"
                }`}
              >
                {/* SEARCH CONTAINER */}
                <div
                  className={`
        relative
        group
        flex items-center
        h-11
        border
        backdrop-blur-xl
        transition-all duration-500
        overflow-hidden cursor-pointer
        ${
          isHome && !scrolled
            ? "bg-white/10 border-white/20"
            : "bg-gray-100 border-gray-200"
        }
        ${
          searchOpen
            ? "w-full px-4 rounded-sm"
            : "w-12 justify-center rounded-full"
        }
      `}
                >
                  {/* SHINE */}
                  <span className="absolute top-0 left-[-130%] w-[70%] h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 group-hover:left-[160%] transition-all duration-1000"></span>

                  {/* SEARCH BUTTON */}
                  <button
                    onClick={() => setSearchOpen(!searchOpen)}
                    className={`relative z-10 shrink-0 transition duration-300 cursor-pointer ${
                      isHome && !scrolled ? "text-white" : "text-[#061539]"
                    }`}
                  >
                    <Search className="w-5 h-5" />
                  </button>

                  {/* INPUT */}
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search Products & Blogs..."
                    className={`
          relative z-10
          bg-transparent
          outline-none
          border-none
          text-sm
          font-medium
          transition-all duration-500
          ${
            isHome && !scrolled
              ? "text-white placeholder:text-gray-300"
              : "text-[#061539] placeholder:text-gray-500"
          }
          ${searchOpen ? "w-full ml-3 opacity-100" : "w-0 ml-0 opacity-0"}
        `}
                  />
                </div>
              </div>

              {/* SEARCH RESULTS */}
              {searchOpen && searchTerm && (
                <div className="absolute top-16 right-0 w-[410px] bg-white border border-gray-100 rounded-sm shadow-[0_20px_60px_rgba(0,0,0,0.12)] overflow-hidden z-[999]">
                  <div className="max-h-[420px] overflow-y-auto">
                    {/* PRODUCTS */}
                    {filteredProducts.length > 0 && (
                      <div className="p-4 border-b border-gray-100">
                        <h4 className="text-xs font-bold uppercase tracking-[2px] text-green-700 mb-4">
                          Products
                        </h4>

                        <div className="space-y-2">
                          {filteredProducts.slice(0, 5).map((item) => (
                            <Link
                              key={item._id}
                              href={`/products/category/${item.category._id}?product=${item._id}`}
                              onClick={() => {
                                setSearchOpen(false);
                                setSearchTerm("");
                              }}
                              className="group flex items-center gap-3 p-2 rounded-sm hover:bg-gray-50 transition-all duration-300"
                            >
                              <img
                                src={item.images?.[0]}
                                alt={item.name}
                                className="w-14 h-14 rounded-sm object-cover group-hover:scale-105 transition duration-300"
                              />

                              <div>
                                <p className="font-semibold text-[#061539] group-hover:text-green-700 transition">
                                  {item.name}
                                </p>

                                <p className="text-xs text-gray-500">Product</p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* BLOGS */}
                    {filteredBlogs.length > 0 && (
                      <div className="p-4">
                        <h4 className="text-xs font-bold uppercase tracking-[2px] text-orange-500 mb-4">
                          Blogs
                        </h4>

                        <div className="space-y-2">
                          {filteredBlogs.slice(0, 5).map((item) => (
                            <Link
                              key={item._id}
                              href={`/blog/${item._id}`}
                              onClick={() => {
                                setSearchOpen(false);
                                setSearchTerm("");
                              }}
                              className="group flex items-center gap-3 p-2 rounded-sm hover:bg-gray-50 transition-all duration-300"
                            >
                              <img
                                src={item.image}
                                alt={item.title}
                                className="w-14 h-14 rounded-sm object-cover group-hover:scale-105 transition duration-300"
                              />

                              <div>
                                <p className="font-semibold text-[#061539] line-clamp-1 group-hover:text-orange-500 transition">
                                  {item.title}
                                </p>

                                <p className="text-xs text-gray-500">Blog</p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* EMPTY */}
                    {filteredProducts.length === 0 &&
                      filteredBlogs.length === 0 && (
                        <div className="p-8 text-center text-gray-500 text-sm">
                          No results found
                        </div>
                      )}
                  </div>
                </div>
              )}
            </div>

            <div
              translate="no"
              onClick={toggleLanguage}
              className="
    notranslate
    relative
    flex
    items-center
    w-[92px]
    h-[44px]
    rounded-full
    bg-orange-50
    border
    border-[#d9c9c0]
    cursor-pointer
    transition-all
    duration-300
    select-none
  "
            >
              {/* SLIDER */}
              <div
                className={`
      absolute
      w-[40px]
      h-[38px]
      rounded-full
      bg-gradient-to-r from-orange-500 to-orange-600
      transition-all
      duration-300
      ${language === "en" ? "left-[3px]" : "left-[47px]"}
    `}
              />

              {/* EN */}
              <div className="flex-1 text-center z-10">
                <span
                  translate="no"
                  className={`notranslate text-sm font-semibold transition-all duration-300 ${
                    language === "en" ? "text-white" : "text-gray-600"
                  }`}
                >
                  EN
                </span>
              </div>

              {/* BN */}
              <div className="flex-1 text-center z-10">
                <span
                  translate="no"
                  className={`notranslate text-sm font-semibold transition-all duration-300 ${
                    language === "bn" ? "text-white" : "text-gray-600"
                  }`}
                >
                  বাংলা
                </span>
              </div>
            </div>

            {/* ENQUIRE BUTTON */}
            <Link
              href="/contact"
              className="group relative inline-flex items-center justify-center overflow-hidden bg-gradient-to-r from-orange-500 to-orange-700 text-white px-6 py-3 rounded-sm text-sm font-semibold shadow-xl transition-all duration-300 hover:scale-105"
            >
              {/* HOVER OVERLAY */}
              <span className="absolute inset-0 w-0 bg-white/10 transition-all duration-500 ease-out group-hover:w-full"></span>

              {/* TEXT */}
              <span className="relative z-10 flex items-center gap-2">
                ENQUIRE
                <SendHorizontal
                  size={18}
                  strokeWidth={1.75}
                  className="
      transition-all 
      duration-500 
      ease-in-out 
      group-hover:translate-x-1.5
    "
                />
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`lg:hidden absolute top-full left-0 w-full overflow-hidden transition-all duration-500 ease-in-out ${
          open ? "max-h-[700px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white shadow-2xl border-t border-gray-100">
          <div className="flex flex-col px-6 py-6">
            {/* MENU ITEMS */}
            {navItems.map((item, index) => {
              const active = pathname === item.link;

              return (
                <Link
                  key={item.name}
                  href={item.link}
                  onClick={() => setOpen(false)}
                  className={`group py-4 border-b border-gray-100 text-lg font-medium transition-all duration-500 ${
                    pathname === item.link
                      ? "text-orange-500"
                      : "text-[#061539] hover:text-orange-500"
                  } ${
                    open
                      ? "translate-x-0 opacity-100"
                      : "-translate-x-10 opacity-0"
                  }`}
                  style={{
                    transitionDelay: `${index * 100}ms`,
                  }}
                >
                  <span className="flex items-center gap-3">
                    {/* DOT */}
                    <span className="w-2 h-2 rounded-full bg-gradient-to-r from-green-500 to-green-700 group-hover:bg-orange-500 transition duration-300"></span>

                    {item.name}
                  </span>
                </Link>
              );
            })}

            {/* SEARCH BUTTON */}
            <button
              onClick={() => {
                setOpen(false);

                setTimeout(() => {
                  setMobileSearchOpen(true);
                }, 300);
              }}
              className={`mt-6 flex items-center justify-center gap-3 border border-gray-200 bg-gray-50 hover:bg-gray-100 text-[#061539] py-4 rounded-sm text-md font-semibold transition-all duration-700 ${
                open ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
              style={{
                transitionDelay: "450ms",
              }}
            >
              <Search className="w-5 h-5" />
              Search Products & Blogs...
            </button>

            {/* CTA BUTTON */}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className={`group mt-8 flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-orange-700 text-white tracking-[2px] py-4 rounded-sm text-md shadow-lg transition-all duration-700 ${
                open ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
              style={{
                transitionDelay: "500ms",
              }}
            >
              ENQUIRE NOW
              <Send
                size={20}
                strokeWidth={2.2}
                className="transition-transform duration-300 ease-out group-hover:translate-x-1.5"
              />
            </Link>
          </div>
        </div>
      </div>
      {/* Mobile Search Modal */}
      {mobileSearchOpen && (
        <SearchModal
          onClose={() => setMobileSearchOpen(false)}
          products={products}
          blogs={blogs}
        />
      )}
    </nav>
  );
}
