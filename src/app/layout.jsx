import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GoogleTranslate from "@/components/GoogleTranslate";
import ScrollToTop from "@/components/ScrollToTop";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Poppins, Noto_Sans_Bengali } from "next/font/google";
import { Toaster } from "react-hot-toast";
import ScrollToTopOnRouteChange from "@/components/ScrollToTopOnRouteChange";

export const metadata = {
  title: {
    default: "Rani Feeds | Scientifically Formulated Fish Feed Manufacturer",
    template: "%s | Rani Feeds",
  },

  description:
    "Premium fish feed manufacturer providing quality aquaculture solutions.",
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const notoBengali = Noto_Sans_Bengali({
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} ${notoBengali.className} bg-white text-gray-900`}
      >
        <ScrollToTopOnRouteChange />

        {/* Hidden Google Translate */}
        <GoogleTranslate />

        {/* NAVBAR */}
        <Navbar />

        {/* MAIN CONTENT */}
        <main>{children}</main>

        {/* FOOTER */}
        <Footer />

        <WhatsAppButton />

        <ScrollToTop />

        <Toaster
          position="top-center"
          containerStyle={{
            top: 100,
          }}
          toastOptions={{
            duration: 4000,
            style: {
              background: "#061539",
              color: "#fff",
              border: "1px solid #16a34a",
            },
            success: {
              iconTheme: {
                primary: "#16a34a",
                secondary: "#fff",
              },
            },
            error: {
              iconTheme: {
                primary: "#ef4444",
                secondary: "#fff",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
