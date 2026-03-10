import React from "react";
import rafe from "../images/rafe2.jpg";

const Navbar = () => {
  return (
    <nav className="w-full bg-linear-to-r from-black via-[#1a0a05] to-black text-white flex items-center justify-between px-10 py-4 relative z-20">

      {/* Left Section - Logo + Name */}
      <div className="flex items-center gap-3">
        <img className="h-12 w-12 rounded-full object-cover" src={rafe} alt="rafe" />
        <div className="leading-tight">
          <h1 className="text-lg font-semibold">Shah Rafe Alam</h1>
          <p className="text-[15px] text-gray-400">Content Creator</p>
        </div>
      </div>

      {/* Center Section - Menu */}
      <div className="bg-[#111]/80 backdrop-blur-md border border-gray-700/50 rounded-xl px-6 py-3">
        <ul className="flex gap-10 text-gray-300 font-medium">
          <li className="text-white cursor-pointer">Home</li>
          <li className="hover:text-white cursor-pointer transition duration-300">Work</li>
          <li className="hover:text-white cursor-pointer transition duration-300">Order</li>
          <li className="hover:text-white cursor-pointer transition duration-300">About Me</li>
        </ul>
      </div>

      {/* Right Section - Contact */}
      <div>
        <button className="hover:text-gray-300 transition duration-300">
          Contact Us
        </button>
      </div>

    </nav>
  );
};

export default Navbar;