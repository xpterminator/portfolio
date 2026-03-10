import React from "react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-black text-white overflow-hidden">
      
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-linear-to-r from-black via-[#1a0a05] to-black opacity-95" />
      
      {/* Orange Glow */}
      <div className="absolute w-150 h-150 bg-orange-600/20 blur-[150px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div className="relative z-10 text-center max-w-5xl px-6">

        <p className="text-orange-500 tracking-widest text-sm mb-6">
          LEARN. BUILD. GET PLACED.
        </p>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold leading-tight tracking-tight">
          Become The Software Engineer <br />
          That{" "}
          <span className="border border-orange-500 px-3 py-1">
            Companies
          </span>{" "}
          Want To Hire!
        </h1>

        <p className="text-gray-400 mt-8 text-lg md:text-xl max-w-3xl mx-auto">
          Join a growing community of students preparing for real-world tech
          careers at Sheryians.
        </p>

        <div className="mt-10">
          <button className="bg-orange-600 hover:bg-orange-700 transition-all duration-300 px-8 py-4 rounded-xl text-lg font-medium shadow-lg shadow-orange-600/30">
            Start Journey →
          </button>
        </div>

      </div>
    </section>
  );
}