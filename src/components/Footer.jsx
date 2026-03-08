// src/components/Footer.jsx
import React from "react";

const CONTACT_INFO = {
  email: "support@evoting.com",
  phone: "+254 700 123 456",
  address: "123 Nairobi St, Nairobi, Kenya",
};

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-200 py-8 mt-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-6">

        {/* Left: Brand */}
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold">E-Voting System</h2>
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} E-Voting. All rights reserved.
          </p>
        </div>

        {/* Center: Quick Election Links */}
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold mb-2">Quick Links</h3>
          <a href="/elections/active" className="hover:text-white text-sm">Active Elections</a>
          <a href="/elections/upcoming" className="hover:text-white text-sm">Upcoming Elections</a>
          <a href="/elections/closed" className="hover:text-white text-sm">Closed Elections</a>
        </div>

        {/* Right: Contact Info */}
        <div className="flex flex-col gap-1 text-sm text-gray-300">
          <h3 className="font-semibold mb-2">Contact Us</h3>
          <span>Email: <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-white">{CONTACT_INFO.email}</a></span>
          <span>Phone: <a href={`tel:${CONTACT_INFO.phone}`} className="hover:text-white">{CONTACT_INFO.phone}</a></span>
          <span>Address: {CONTACT_INFO.address}</span>
        </div>

      </div>
    </footer>
  );
}