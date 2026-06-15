"use client";

import axios from "axios";
import { useEffect, useState, use } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

export default function CategoryProducts({ params }) {
  const { id } = use(params);
  const searchParams = useSearchParams();
  const selectedProductId = searchParams.get("product");
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/category/${id}`)
      .then((res) => {
        setProducts(res.data.data);

        if (res.data.data.length > 0) {
          setCategory(res.data.data[0].category);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  useEffect(() => {
    if (!selectedProductId || products.length === 0) return;

    const timer = setTimeout(() => {
      const element = document.getElementById(`product-${selectedProductId}`);

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [products, selectedProductId]);

  return (
    <>
      {category && (
        <section className="relative pt-[90px] md:pt-[110px] h-[360px] sm:h-[420px] md:h-[500px] overflow-hidden">
          {/* OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#02140a]/90 via-black/70 to-[#2f1400]/80"></div>

          {/* GLOW */}
          <div className="absolute top-[-120px] left-[-120px] w-[250px] h-[250px] bg-green-500/20 blur-3xl rounded-full"></div>

          <div className="absolute bottom-[-120px] right-[-120px] w-[300px] h-[300px] bg-orange-500/20 blur-3xl rounded-full"></div>

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
                  href="/products"
                  className="text-white hover:text-orange-400 transition"
                >
                  Category
                </Link>

                <span className="text-white/60">›</span>

                <span className="text-orange-400">Products</span>
              </div>

              {/* TITLE */}
              <h1 className="mt-6 text-3xl sm:text-5xl md:text-6xl font-black text-white leading-tight">
                {category.name}
              </h1>
              <p className="text-gray-400 text-lg md:text-xl mt-5">
                {category.description}
              </p>
            </div>
          </div>
        </section>
      )}
      <section className="min-h-screen bg-[#f7faf7] py-20">
        {/* PRODUCTS */}
        <div className="max-w-7xl mx-auto px-6 space-y-24">
          {products.map((product, index) => (
            <div
              key={product._id}
              id={`product-${product._id}`}
              className={`bg-white rounded-sm overflow-hidden shadow-xl border transition-all duration-700 ${
                selectedProductId === product._id
                  ? "border-green-600 ring-4 ring-green-200"
                  : "border-gray-100"
              }`}
            >
              <div
                className={`grid lg:grid-cols-2 gap-10 items-center ${
                  index % 2 !== 0 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* IMAGE SECTION */}
                <div className="relative h-full min-h-[450px] overflow-hidden group cursor-zoom-in">
                  <div className="hidden md:block">
                    {/* DEFAULT IMAGE */}
                    <img
                      src={product.images?.[0]}
                      alt={product.name}
                      className="absolute inset-0 w-full h-full object-cover transition-all duration-700 opacity-100 scale-100 group-hover:opacity-0 group-hover:scale-125"
                    />

                    {/* HOVER IMAGE */}
                    <img
                      src={product.images?.[1]}
                      alt={product.name}
                      className="absolute inset-0 w-full h-full object-cover transition-all duration-700 opacity-0 scale-100 group-hover:opacity-100 group-hover:scale-125"
                    />
                  </div>

                  {/* MOBILE IMAGE */}
                  <div className="block md:hidden pt-10">
                    <Swiper
                      slidesPerView={1}
                      pagination={{ clickable: true }}
                      modules={[Pagination]}
                    >
                      {product.images?.map((img, index) => (
                        <SwiperSlide key={index}>
                          <img
                            src={img}
                            alt={product.name}
                            className="w-full h-[450px] object-cover"
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>

                  {/* MAGNIFY GLASS ICON */}
                  <div className="absolute top-6 right-6 z-20 opacity-0 group-hover:opacity-100 transition duration-500">
                    <div className="bg-white/90 backdrop-blur-md p-3 rounded-full shadow-xl border border-gray-200">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-gray-800"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* BAG */}
                  <div className="absolute top-6 left-6 bg-gradient-to-r from-green-500 to-green-800 text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg z-10">
                    {product.bagWeight}
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-8 md:p-12">
                  {/* TITLE */}
                  <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
                    {product.name}
                  </h2>

                  {/* DESCRIPTION */}
                  <p className="mt-6 text-gray-600 leading-8 text-xl">
                    {product.description}
                  </p>

                  {/* BENEFITS */}
                  {product.benefits?.length > 0 && (
                    <div className="mt-10">
                      <h3 className="text-2xl font-bold text-gray-900 mb-5">
                        Key Benefits
                      </h3>

                      <div className="grid sm:grid-cols-2 gap-4">
                        {product.benefits.map((item, i) => (
                          <div
                            key={i}
                            className="bg-gray-50 border border-gray-100 rounded-sm p-4 flex gap-3"
                          >
                            <div className="w-2.5 h-2.5 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>

                            <p className="text-gray-700 leading-7">{item}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* INGREDIENTS */}
                  {product.ingredients?.length > 0 && (
                    <div className="mt-10">
                      <h3 className="text-2xl font-bold text-gray-900 mb-5">
                        Ingredients
                      </h3>

                      <div className="flex flex-wrap gap-3">
                        {product.ingredients.map((item, i) => (
                          <span
                            key={i}
                            className="px-5 py-2 rounded-full bg-orange-100 text-orange-700 text-md font-semibold"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* SIZE CARDS */}
              {product.sizeCards?.length > 0 && (
                <div className="px-6 md:px-12 pb-14">
                  <div className="border-t border-gray-200 pt-12">
                    <div className="mb-10">
                      <h3 className="text-3xl font-bold text-gray-900">
                        Available Die Sizes
                      </h3>

                      <p className="mt-2 text-gray-500 text-[17px]">
                        Select feed pellet size according to fish growth stage
                      </p>
                    </div>

                    {/* CARDS */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      {product.sizeCards.map((card, i) => (
                        <div
                          key={i}
                          className="group bg-white rounded-sm overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 border border-gray-100 hover:-translate-y-2"
                        >
                          {/* IMAGE */}
                          <div className="relative h-56 overflow-hidden">
                            <img
                              src={card.image}
                              alt={card.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                            />
                          </div>

                          {/* CONTENT */}
                          <div className="p-5 text-center">
                            <h4 className="text-2xl font-bold text-gray-900">
                              {card.title}
                            </h4>

                            <p className="text-lg text-gray-500 mt-2">
                              Premium floating fish feed
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {/* NUTRITION CHART */}
              <div className="px-6 md:px-12 pb-14">
                <div className="border-t border-gray-200 pt-12">
                  <h3 className="text-3xl font-bold text-gray-900 mb-8">
                    Nutritional Analysis
                  </h3>

                  <div className="overflow-x-auto rounded-sm border border-red-100 shadow-lg">
                    <table className="w-full border-collapse bg-white text-center">
                      <thead>
                        <tr className="bg-orange-600 text-white">
                          <th className="px-10 sm:px-5 py-5 text-md whitespace-nowrap font-bold border border-red-200">
                            BAG WEIGHT (KG)
                          </th>

                          {product.bagWeight !== "35kg" &&
                            product.bagWeight !== "20kg" && (
                              <th className="px-10 sm:px-5 py-5 text-md whitespace-nowrap font-bold border border-red-200">
                                FEED TYPE
                              </th>
                            )}

                          <th className="px-10 sm:px-5 py-5 text-md whitespace-nowrap font-bold border border-red-200">
                            DIE SIZE
                          </th>

                          <th className="px-10 sm:px-5 py-5 text-md whitespace-nowrap font-bold border border-red-200">
                            CRUDE PROTEIN (% min)
                          </th>

                          <th className="px-10 sm:px-5 py-5 text-md whitespace-nowrap font-bold border border-red-200">
                            CRUDE FAT (% min)
                          </th>

                          <th className="px-10 sm:px-5 py-5 text-md whitespace-nowrap font-bold border border-red-200">
                            MOISTURE (% max)
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {(product.bagWeight === "35kg"
                          ? [
                              {
                                size: "3 mm",
                                protein: 28,
                                fat: 5,
                                moisture: 11.5,
                              },
                              {
                                size: "3 mm",
                                protein: 24,
                                fat: 5,
                                moisture: 11.5,
                              },
                              {
                                size: "3 mm",
                                protein: 20,
                                fat: 5,
                                moisture: 11.5,
                              },
                              {
                                size: "4 mm",
                                protein: 28,
                                fat: 5,
                                moisture: 11.5,
                              },
                              {
                                size: "4 mm",
                                protein: 24,
                                fat: 5,
                                moisture: 11.5,
                              },
                              {
                                size: "4 mm",
                                protein: 20,
                                fat: 4,
                                moisture: 11.5,
                              },
                              {
                                size: "4 mm",
                                protein: 18,
                                fat: 3,
                                moisture: 11.5,
                              },
                            ]
                          : product.bagWeight === "20kg"
                            ? [
                                {
                                  size: "DUST",
                                  protein: 42,
                                  fat: 6,
                                  moisture: 11.5,
                                },
                                {
                                  size: "1 mm",
                                  protein: 40,
                                  fat: 6,
                                  moisture: 11.5,
                                },
                                {
                                  size: "1.5 mm",
                                  protein: 32,
                                  fat: 6,
                                  moisture: 11.5,
                                },
                                {
                                  size: "2 mm",
                                  protein: 32,
                                  fat: 6,
                                  moisture: 11.5,
                                },
                                {
                                  size: "2 mm",
                                  protein: 28,
                                  fat: 5,
                                  moisture: 11.5,
                                },
                              ]
                            : [
                                {
                                  size: "1 mm",
                                  protein: 28,
                                  fat: 4,
                                  moisture: 11,
                                  feedtype: "Poly Sinking",
                                },
                                {
                                  size: "1.8 mm",
                                  protein: 26,
                                  fat: 4,
                                  moisture: 11,
                                  feedtype: "Poly Sinking",
                                },
                                {
                                  size: "1.8 mm",
                                  protein: 22,
                                  fat: 4,
                                  moisture: 11,
                                  feedtype: "Sinking",
                                },
                                {
                                  size: "1.8 mm",
                                  protein: 20,
                                  fat: 3,
                                  moisture: 11,
                                  feedtype: "Sinking",
                                },
                                {
                                  size: "2.2 mm",
                                  protein: 26,
                                  fat: 4,
                                  moisture: 11,
                                  feedtype: "Poly Sinking",
                                },
                                {
                                  size: "2.2 mm",
                                  protein: 22,
                                  fat: 3,
                                  moisture: 11,
                                  feedtype: "Sinking",
                                },
                                {
                                  size: "2.2 mm",
                                  protein: 20,
                                  fat: 3,
                                  moisture: 11,
                                  feedtype: "Sinking",
                                },
                              ]
                        ).map((item, i) => (
                          <tr
                            key={i}
                            className="hover:bg-orange-50 transition duration-300"
                          >
                            <td className="px-10 sm:px-5 py-5 whitespace-nowrap border border-red-100 font-semibold text-gray-800">
                              {product.bagWeight.replace("kg", "")}
                            </td>

                            {product.bagWeight !== "35kg" &&
                              product.bagWeight !== "20kg" && (
                                <td className="px-10 sm:px-5 py-5 whitespace-nowrap border border-red-100 text-gray-700 font-medium">
                                  {item.feedtype}
                                </td>
                              )}

                            <td className="px-10 sm:px-5 py-5 whitespace-nowrap border border-red-100 font-semibold text-orange-600">
                              {item.size}
                            </td>

                            <td className="px-10 sm:px-5 py-5 whitespace-nowrap border border-red-100 text-gray-700 font-medium">
                              {item.protein}
                            </td>

                            <td className="px-10 sm:px-5 py-5 whitespace-nowrap border border-red-100 text-gray-700 font-medium">
                              {item.fat}
                            </td>

                            <td className="px-10 sm:px-5 py-5 whitespace-nowrap border border-red-100 text-gray-700 font-medium">
                              {item.moisture}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* ENQUIRE BUTTON */}
                  <div className="mt-10">
                    <Link
                      href="/contact"
                      className="group relative inline-flex items-center justify-center overflow-hidden bg-gradient-to-r from-orange-500 to-orange-700 px-5 sm:px-7 md:px-10 py-3 sm:py-4 rounded-sm text-md sm:text-base md:text-lg lg:text-xl font-semibold text-white shadow-2xl transition-all duration-300 hover:scale-105 min-w-[190px]"
                    >
                      <span className="absolute inset-0 w-0 bg-white/10 transition-all duration-500 ease-out group-hover:w-full"></span>

                      {/* TEXT */}
                      <span className="relative z-10 flex items-center gap-2">
                        Enquire Now
                        <span className="transition-transform duration-300 group-hover:translate-x-1">
                          →
                        </span>
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
