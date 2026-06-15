"use client";

export default function Loader() {
  return (
    <div className="fixed inset-0 z-[99999] overflow-hidden bg-[#f8faf8] flex items-center justify-center px-4">
      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-orange-50"></div>

      {/* FLOATING BLURS */}
      <div className="absolute top-[-80px] left-[-80px] w-[180px] sm:w-[250px] md:w-[350px] h-[180px] sm:h-[250px] md:h-[350px] bg-green-300/30 rounded-full blur-3xl animate-blob"></div>

      <div className="absolute bottom-[-100px] right-[-100px] w-[220px] sm:w-[300px] md:w-[400px] h-[220px] sm:h-[300px] md:h-[400px] bg-orange-300/30 rounded-full blur-3xl animate-blob animation-delay-2000"></div>

      {/* CENTER */}
      <div className="relative flex items-center justify-center">
        {/* OUTER GLOW */}
        <div className="absolute w-56 h-56 bg-green-400/25 rounded-full blur-[90px] animate-pulse"></div>

        <div className="absolute w-64 h-64 bg-orange-400/20 rounded-full blur-[90px] animate-pulse"></div>

        {/* FAST ROTATING RING */}
        <div className="absolute w-62 h-62 rounded-full border-[5px] border-transparent border-t-green-600 border-r-orange-500 animate-[spin_0.8s_linear_infinite] shadow-[0_0_35px_rgba(34,197,94,0.7)]"></div>

        {/* SECOND GLOW RING */}
        <div className="absolute w-56 h-56 rounded-full border border-white/50 animate-pulse"></div>

        {/* ROUND GLASS CARD */}
        <div className="relative w-50 h-50 rounded-full backdrop-blur-xl bg-white/40 border border-white/40 shadow-[0_20px_60px_rgba(0,0,0,0.15)] flex flex-col items-center justify-center">
          {/* LOGO */}
          <img
            src="/rf.png"
            alt="Rani Feeds"
            className="w-40 object-contain animate-floatLogo drop-shadow-xl"
          />
        </div>
      </div>
    </div>
  );
}
