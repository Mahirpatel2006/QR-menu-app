// app/landing/page.js
import React from 'react';

export default function LandingPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <section className="text-center p-8">
        <h1 className="text-4xl font-bold text-gray-800">Welcome to QR Menu Platform</h1>
        <p className="mt-4 text-lg text-gray-600">Streamline your restaurant with a QR-based menu system!</p>
        <a href="/register" className="mt-6 inline-block px-6 py-3 text-white bg-orange-500 rounded-md shadow hover:bg-orange-600 transition">
          Get Started
        </a>
      </section>
      
      <section className="mt-12 p-8">
        <h2 className="text-3xl font-semibold text-gray-800">Features</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-white rounded-lg shadow">
            <h3 className="text-xl font-semibold">Quick Setup</h3>
            <p className="mt-2 text-gray-600">Create and update your restaurant’s menu in minutes.</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow">
            <h3 className="text-xl font-semibold">Contactless Experience</h3>
            <p className="mt-2 text-gray-600">Provide your customers with a seamless and safe dining experience.</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow">
            <h3 className="text-xl font-semibold">Easy Payments</h3>
            <p className="mt-2 text-gray-600">Pay securely using Stripe to activate your menu and generate a QR code.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
