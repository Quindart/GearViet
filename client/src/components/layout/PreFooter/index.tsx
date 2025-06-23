"use client";
import React, { useState } from "react";
import { FaEnvelope, FaFacebookF, FaYoutube } from "react-icons/fa";

const PreFooter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Newsletter subscription:", email);
    setEmail("");
  };

  return (
    <div className="bg-[#202020] py-4 border-b border-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center flex-wrap gap-4 justify-between">
          {/* Left: Newsletter Title */}
          <div className="flex items-center gap-24">
            <div className="flex-shrink-0">
              <h3 className="text-green-500 text-lg font-semibold">
                ĐĂNG KÝ NHẬN TIN
              </h3>
            </div>

            {/* Center: Email Form */}
            <div className="flex-1 max-w-md">
              <form onSubmit={handleSubmit} className="flex">
                <div className="flex-1 relative">
                  <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-6 py-3 font-semibold hover:bg-green-600 transition-colors duration-200 flex items-center gap-2"
                >
                  <FaEnvelope className="text-sm" />
                  ĐĂNG KÝ
                </button>
              </form>
            </div>
          </div>

          {/* Right: Social Media Icons */}
          <div className="flex items-center gap-3">
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600 text-white w-10 h-10 rounded flex items-center justify-center hover:bg-red-700 transition-colors duration-200"
              aria-label="YouTube"
            >
              <FaYoutube className="text-lg" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 text-white w-10 h-10 rounded flex items-center justify-center hover:bg-blue-700 transition-colors duration-200"
              aria-label="Facebook"
            >
              <FaFacebookF className="text-lg" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreFooter;
