"use client";

import axios from "axios";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function SearchModal({ onClose }) {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [blogs, setBlogs] = useState([]);

  const modalRef = useRef(null);

  // FETCH DATA
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/products/get-all`)
      .then((res) => setProducts(res.data.data || []))
      .catch(() => {});

    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/blogs/get-all`)
      .then((res) => setBlogs(res.data.data || []))
      .catch(() => {});
  }, []);

  // OUTSIDE CLICK
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  // ESC KEY
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEsc);

    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const filteredProducts = products.filter((item) =>
    item.name?.toLowerCase().includes(search.toLowerCase()),
  );

  const filteredBlogs = blogs.filter((item) =>
    item.title?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="fixed inset-0 z-[99999] bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
      <div
        ref={modalRef}
        className="
          relative
          w-full
          max-w-2xl
          h-[90vh]
          bg-white
          rounded-sm
          shadow-[0_30px_80px_rgba(0,0,0,0.35)]
          overflow-hidden
          flex
          flex-col
          animate-searchModal
        "
      >
        {/* SEARCH HEADER */}
        <div className="sticky top-0 z-20 bg-white border-b border-gray-100 p-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-sm bg-green-700 flex items-center justify-center shrink-0">
              <Search className="w-5 h-5 text-white" />
            </div>

            <input
              autoFocus
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products, blogs..."
              className="
                flex-1
                h-11
                px-4
                border
                border-gray-200
                rounded-sm
                outline-none
                text-[#061539]
                focus:border-green-600
              "
            />

            <button
              onClick={onClose}
              className="
                w-11
                h-11
                rounded-sm
                bg-orange-500
                text-white
                flex
                items-center
                justify-center
                transition-all
                duration-300
              "
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* RESULTS */}
        <div className="flex-1 overflow-y-auto">
          {/* PRODUCTS */}
          {filteredProducts.length > 0 && (
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[15px] font-black tracking-[2px] uppercase text-green-700">
                  Products
                </h3>

                <span className="text-sm text-gray-400">
                  {filteredProducts.length} Results
                </span>
              </div>

              <div className="space-y-3">
                {filteredProducts.slice(0, 8).map((item) => (
                  <Link
                    key={item._id}
                    href={`/products/${item._id}`}
                    onClick={onClose}
                    className="
                      flex
                      items-center
                      gap-4
                      p-3
                      bg-white
                      border
                      border-gray-100
                      rounded-sm
                      hover:bg-gray-50
                      hover:shadow-md
                      transition-all
                    "
                  >
                    <div className="w-24 h-27 shrink-0 bg-gray-50 rounded-sm overflow-hidden">
                      <img
                        src={item.images?.[0]}
                        alt={item.name}
                        className="w-full h-full object-contain p-2"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-[#061539] line-clamp-2 text-[15px]">
                        {item.name}
                      </h4>

                      <p className="mt-4 text-green-700 text-sm font-semibold">
                        View Product →
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* BLOGS */}
          {filteredBlogs.length > 0 && (
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[15px] font-black tracking-[2px] uppercase text-orange-500">
                  Blogs
                </h3>

                <span className="text-sm text-gray-400">
                  {filteredBlogs.length} Results
                </span>
              </div>

              <div className="space-y-3">
                {filteredBlogs.slice(0, 8).map((item) => (
                  <Link
                    key={item._id}
                    href={`/blog/${item._id}`}
                    onClick={onClose}
                    className="
                      flex
                      items-center
                      gap-4
                      p-3
                      bg-white
                      border
                      border-gray-100
                      rounded-sm
                      hover:bg-gray-50
                      hover:shadow-md
                      transition-all
                    "
                  >
                    <div className="w-24 h-27 shrink-0 overflow-hidden rounded-sm">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-[#061539] line-clamp-2 text-[15px]">
                        {item.title}
                      </h4>

                      <p className="mt-1 text-gray-500 text-sm line-clamp-2">
                        {item.excerpt}
                      </p>

                      <p className="mt-2 text-orange-500 text-sm font-semibold">
                        Read Article →
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* EMPTY STATE */}
          {search &&
            filteredProducts.length === 0 &&
            filteredBlogs.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center px-6">
                <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
                  <Search className="w-8 h-8 text-gray-300" />
                </div>

                <h3 className="mt-5 text-2xl font-black text-[#061539]">
                  No Results Found
                </h3>

                <p className="mt-3 text-gray-500 max-w-md">
                  Try searching with different keywords or product names.
                </p>
              </div>
            )}

          {/* {!search && (
            <div className="h-full flex flex-col items-center justify-center text-center px-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-600 to-orange-500 flex items-center justify-center">
                <Search className="w-7 h-7 text-white" />
              </div>

              <h3 className="mt-5 text-2xl font-black text-[#061539]">
                Search Products & Blogs
              </h3>

              <p className="mt-3 text-gray-500 max-w-md text-sm">
                Find fish feed products, farming tips, and aquaculture articles
                from Rani Feeds.
              </p>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
}