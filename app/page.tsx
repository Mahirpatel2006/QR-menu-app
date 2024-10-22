"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function LandingPage() {
  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen bg-[#f0f4f8] overflow-hidden">
      
      {/* Floating Decorative Circles */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-[#ff6f61] opacity-30 rounded-full animate-float" />
      <div className="absolute bottom-10 right-10 w-24 h-24 bg-[#6a8eae] opacity-30 rounded-full animate-float delay-2000" />
      
      <section className="text-center p-8 backdrop-blur-lg bg-white/60 rounded-2xl shadow-lg">
        <motion.h1 
          className="text-5xl font-extrabold text-[#2c3e50]" 
          initial={{ opacity: 0, y: -50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1 }}
        >
          Welcome to Click2Menu
        </motion.h1>
        <motion.p 
          className="mt-4 text-lg text-[#34495e]" 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 1, delay: 0.5 }}
        >
          Streamline your restaurant with a QR-based menu system!
        </motion.p>
        <motion.a 
          href="/register" 
          className="mt-6 inline-block px-6 py-3 text-white bg-[#ff6f61] rounded-full shadow hover:bg-[#ff4d3a] transition transform hover:scale-105"
        >
          Get Started
        </motion.a>
      </section>
      
      {/* Features with Interactive Cards */}
      <section className="mt-12 p-8 w-full">
        <h2 className="text-3xl font-semibold text-[#2c3e50] text-center">Features</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Quick Setup", description: "Create and update your restaurant’s menu in minutes." },
            { title: "Contactless Experience", description: "Provide your customers with a seamless and safe dining experience." },
            { title: "Easy Payments", description: "Pay securely using Stripe to activate your menu and generate a QR code." },
          ].map((feature, index) => (
            <motion.div 
              key={index} 
              className="p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:rotate-2 hover:scale-105"
              initial={{ opacity: 0, y: 50 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <h3 className="text-xl font-semibold text-[#2c3e50]">{feature.title}</h3>
              <p className="mt-2 text-[#7f8c8d]">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="mt-12 p-8 w-full">
        <h2 className="text-3xl font-semibold text-[#2c3e50] text-center">Join Us Today!</h2>
        <motion.a 
          href="/register" 
          className="mt-6 inline-block px-6 py-3 text-white bg-[#6a8eae] rounded-full shadow hover:bg-[#5b8cb1] transition transform hover:scale-105"
        >
          Sign Up Now
        </motion.a>
      </section>
    </main>
  );
}