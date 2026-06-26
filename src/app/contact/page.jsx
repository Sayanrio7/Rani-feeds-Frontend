"use client";

import axios from "axios";
import Link from "next/link";
import Loader from "@/components/Loader";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock3, Send, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";

export default function ContactPage() {
  const [products, setProducts] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    subject: "",
    productId: "",
    location: "",
    message: "",
  });

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/products/get-all`)
      .then((res) => setProducts(res.data.data))
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitLoading(true);

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/enquiry/create`,
        form,
      );

      toast.success(res.data.message);

      setForm({
        name: "",
        phone: "",
        subject: "",
        productId: "",
        location: "",
        message: "",
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setSubmitLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 1100);

    return () => clearTimeout(timer);
  }, []);

  if (pageLoading) {
    return <Loader />;
  }

  const infoCards = (
    <>
      <div className="group flex items-start gap-5 bg-white rounded-sm border border-green-100 p-6 shadow-sm hover:shadow-xl transition-all duration-500">
        <div className="w-14 h-14 rounded-sm bg-gradient-to-r from-orange-500 to-orange-700 text-white flex items-center justify-center shrink-0">
          <MapPin className="w-6 h-6" />
        </div>

        <div>
          <h3 className="text-xl font-black text-[#061539]">Our Location</h3>

          <p className="mt-2 text-gray-600 leading-[1.8]">
            Baguiati, Kolkata, West Bengal
          </p>
        </div>
      </div>

      <div className="group flex items-start gap-5 bg-white rounded-sm border border-green-100 p-6 shadow-sm hover:shadow-xl transition-all duration-500">
        <div className="w-14 h-14 rounded-sm bg-gradient-to-r from-orange-500 to-orange-700 text-white flex items-center justify-center shrink-0">
          <Phone className="w-6 h-6" />
        </div>

        <div>
          <h3 className="text-xl font-black text-[#061539]">Call Us</h3>

          <p className="mt-2 text-gray-600 leading-[1.8]">+91 9073558447</p>
        </div>
      </div>

      <div className="group flex items-start gap-5 bg-white rounded-sm border border-green-100 p-6 shadow-sm hover:shadow-xl transition-all duration-500">
        <div className="w-14 h-14 rounded-sm bg-gradient-to-r from-orange-500 to-orange-700 text-white flex items-center justify-center shrink-0">
          <Mail className="w-6 h-6" />
        </div>

        <div>
          <h3 className="text-xl font-black text-[#061539]">Email Address</h3>

          <p className="mt-2 text-gray-600 leading-[1.8]">
            info@ranifeeds.in
          </p>
        </div>
      </div>

      <div className="group flex items-start gap-5 bg-white rounded-sm border border-green-100 p-6 shadow-sm hover:shadow-xl transition-all duration-500">
        <div className="w-14 h-14 rounded-sm bg-gradient-to-r from-orange-500 to-orange-700 text-white flex items-center justify-center shrink-0">
          <Clock3 className="w-6 h-6" />
        </div>

        <div>
          <h3 className="text-xl font-black text-[#061539]">Availability</h3>

          <p className="mt-2 text-gray-600 leading-[1.8]">
            Everyday (8:00 AM - 11:00 PM)
          </p>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* ================= BANNER ================= */}
      <section className="relative pt-[90px] md:pt-[110px] h-[360px] sm:h-[420px] md:h-[440px] overflow-hidden">
        {/* BG */}
        <img
          src="/contact-banner.jpg"
          alt="Contact Banner"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#02140a]/90 via-black/70 to-[#2f1400]/80"></div>

        {/* GLOW */}
        <div className="absolute top-[-120px] left-[-120px] w-[250px] h-[250px] bg-green-500/20 blur-3xl rounded-full"></div>

        <div className="absolute bottom-[-120px] right-[-120px] w-[300px] h-[300px] bg-orange-500/20 blur-3xl rounded-full"></div>

        {/* CONTENT */}
        <div className="relative z-20 h-full flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 70 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center text-white"
          >
            {/* BREADCRUMB */}
            <div className="flex items-center justify-center gap-2 text-sm font-semibold uppercase tracking-[2px]">
              <Link href="/" className="hover:text-orange-400 transition">
                Home
              </Link>

              <span className="text-white/60">›</span>

              <span className="text-orange-400">Contact</span>
            </div>

            {/* TITLE */}
            <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight">
              CONTACT US
            </h1>
          </motion.div>
        </div>
      </section>

      {/* ================= CONTACT SECTION ================= */}
      <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-white to-[#f7faf7] overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 xl:gap-16">
            {/* LEFT INFO */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="order-1 lg:order-1"
            >
              <span className="inline-block uppercase tracking-[4px] text-orange-500 font-bold text-md sm:text-md border-b-2 border-orange-400 pb-1">
                Get In Touch
              </span>

              <h2 className="mt-4 text-4xl sm:text-5xl font-black text-[#061539] leading-tight">
                Let’s Grow
                <span className="text-green-700"> Together</span>
              </h2>

              <p className="mt-6 text-gray-600 text-md sm:text-lg leading-[2]">
                Contact Rani Feeds for premium aquaculture nutrition solutions,
                bulk orders, dealership enquiries, and expert guidance for your
                fish farming business.
              </p>

              {/* DESKTOP ONLY INFO CARDS */}
              <div className="hidden lg:block mt-10 space-y-5">{infoCards}</div>
            </motion.div>

            <div className="block lg:hidden order-3 mt-8 space-y-5">
              {infoCards}
            </div>

            {/* RIGHT FORM */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="order-2 lg:order-2"
            >
              {/* GLOW */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-200/20 to-orange-200/20 blur-3xl rounded-sm"></div>

              {/* FORM CARD */}
              <div className="relative p-[3.5px] rounded-sm overflow-hidden">
                {/* MOVING BORDER */}
                <div className="absolute inset-0 animated-border"></div>

                {/* FORM CARD */}
                <div className="relative bg-white rounded-sm shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-6 sm:p-8 md:p-10 overflow-hidden z-10">
                  {/* TOP ACCENT */}
                  {/* <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-green-700 via-green-500 to-orange-500"></div> */}

                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-14 h-14 rounded-sm bg-gradient-to-r from-green-600 to-green-800 text-white flex items-center justify-center">
                      <Zap className="w-7 h-7" />
                    </div>

                    <div>
                      <h3 className="text-3xl font-black text-[#061539]">
                        Send Enquiry
                      </h3>

                      <p className="text-gray-500 mt-1">
                        We’ll get back to you shortly
                      </p>
                    </div>
                  </div>

                  {/* FORM */}
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* NAME */}
                    <div>
                      <label className="block mb-2 font-semibold text-[#061539]">
                        Name
                      </label>

                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="Enter your full name"
                        className="w-full h-14 px-5 rounded-sm border text-gray-900 border-gray-200 focus:outline-none focus:border-green-600 text-lg"
                      />
                    </div>

                    {/* PHONE */}
                    <div>
                      <label className="block mb-2 font-semibold text-[#061539]">
                        Phone Number
                      </label>

                      <input
                        type="text"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        required
                        placeholder="Enter your phone number"
                        className="w-full h-14 px-5 rounded-sm border text-gray-900 border-gray-200 focus:outline-none focus:border-green-600 text-lg"
                      />
                    </div>

                    {/* SUBJECT */}
                    <div>
                      <label className="block mb-2 font-semibold text-[#061539]">
                        Subject
                      </label>

                      <select
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        required
                        className="w-full h-14 px-5 rounded-sm border text-gray-500 border-gray-200 focus:outline-none focus:border-green-600 text-lg bg-white"
                      >
                        <option value="">Select Subject</option>

                        <option>General Inquiry</option>

                        <option>Product Inquiry</option>

                        <option>Order / Bulk Order</option>

                        <option>Dealership</option>
                      </select>
                    </div>

                    {/* PRODUCT */}
                    {(form.subject === "Product Inquiry" ||
                      form.subject === "Order / Bulk Order") && (
                      <div>
                        <label className="block mb-2 font-semibold text-[#061539]">
                          Select Product
                        </label>

                        <select
                          name="productId"
                          value={form.productId}
                          onChange={handleChange}
                          required
                          className="w-full h-14 px-5 rounded-sm border text-gray-500 border-gray-200 focus:outline-none focus:border-green-600 text-lg bg-white"
                        >
                          <option value="">Select Product</option>

                          {products.map((p) => (
                            <option key={p._id} value={p._id}>
                              {p.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    {/* LOCATION */}
                    <div>
                      <label className="block mb-2 font-semibold text-[#061539]">
                        Location
                      </label>

                      <input
                        type="text"
                        name="location"
                        value={form.location}
                        onChange={handleChange}
                        placeholder="Your city and district"
                        className="w-full h-14 px-5 rounded-sm border text-gray-900 border-gray-200 focus:outline-none focus:border-green-600 text-lg"
                      />
                    </div>

                    {/* MESSAGE */}
                    <div>
                      <label className="block mb-2 font-semibold text-[#061539]">
                        Message (Optional)
                      </label>

                      <textarea
                        rows="5"
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Write your message..."
                        className="w-full px-5 py-4 rounded-sm border text-gray-900 border-gray-200 focus:outline-none focus:border-green-600 text-lg resize-none"
                      ></textarea>
                    </div>

                    {/* BUTTON */}
                    <button
                      type="submit"
                      disabled={submitLoading}
                      className="group relative w-full inline-flex items-center justify-center overflow-hidden bg-gradient-to-r from-green-600 to-green-800 text-white font-bold text-lg px-8 py-4 rounded-sm transition-all duration-300 shadow-xl hover:scale-[1.01] cursor-pointer"
                    >
                      <span className="absolute inset-0 w-0 bg-gradient-to-r from-orange-500 to-orange-700 transition-all duration-500 ease-out group-hover:w-full"></span>

                      <span className="relative z-10 flex items-center gap-3">
                        {submitLoading ? "Submitting..." : "Submit"}

                        <Send className="w-5 h-5" />
                      </span>
                    </button>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= MAP SECTION ================= */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-10">
          {/* HEADING */}
          <div className="text-center mb-12">
            <span className="inline-block uppercase tracking-[4px] text-orange-500 font-bold text-sm border-b-2 border-orange-400 pb-1">
              Visit Us
            </span>

            <h2 className="mt-4 text-4xl sm:text-5xl font-black text-[#061539]">
              Find Our
              <span className="text-green-700"> Location</span>
            </h2>

            <p className="mt-5 text-gray-600 text-md sm:text-lg max-w-3xl mx-auto leading-[1.9]">
              Visit our office in Baguiati, Kolkata. We are always ready to help
              fish farmers, dealers, distributors, and aquaculture businesses
              with premium nutrition solutions.
            </p>
          </div>

          {/* MAP CARD */}
          <div className="overflow-hidden rounded-sm border border-green-100 shadow-[0_20px_60px_rgba(0,0,0,0.02)]">
            <iframe
              src="https://www.google.com/maps?q=Baguiati,Kolkata&output=embed"
              width="100%"
              height="500"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
            />
          </div>

          {/* LOCATION CARD */}
          <div className="mt-8 bg-white border border-green-100 rounded-sm p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h3 className="text-2xl font-black text-[#061539] flex items-center gap-3">
                  <MapPin className="w-7 h-7 text-orange-500" />
                  Baguiati, Kolkata
                </h3>

                <p className="mt-3 text-gray-600 text-lg leading-[1.8]">
                  Baguiati, Kolkata, West Bengal, India
                </p>
              </div>

              <a
                href="https://maps.google.com/?q=Baguiati,Kolkata"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center overflow-hidden bg-gradient-to-r from-orange-500 to-orange-700 px-6 py-4 rounded-sm text-lg font-semibold text-white shadow-xl transition-all duration-300 hover:scale-105"
              >
                <span className="absolute inset-0 w-0 bg-white/10 transition-all duration-500 ease-out group-hover:w-full"></span>

                <span className="relative z-10 flex items-center gap-2">
                  Open In Google Maps
                  <span className="group-hover:translate-x-1 transition duration-300">
                    →
                  </span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
