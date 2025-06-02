"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Facebook, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#111] text-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {/* Logo + Tagline */}
        <div>
          <h2 className="text-2xl font-bold tracking-tight mb-2">Local Bite</h2>
          <p className="text-sm text-gray-400">
            Bringing the best local meals right to your doorstep. Fresh, fast, and community-driven.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-col gap-2 text-sm">
          <h3 className="text-lg font-semibold mb-2">Explore</h3>
          <Link href="/" className="hover:text-green-400 transition">Home</Link>
          <Link href="/menu" className="hover:text-green-400 transition">Menu</Link>
          <Link href="/about" className="hover:text-green-400 transition">About</Link>
          <Link href="/contact" className="hover:text-green-400 transition">Contact</Link>
        </div>

        {/* Social + Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Connect</h3>
          <div className="flex gap-4 mb-4">
            <Link href="https://facebook.com" target="_blank" className="hover:text-green-400">
              <Facebook size={20} />
            </Link>
            <Link href="https://twitter.com" target="_blank" className="hover:text-green-400">
              <Twitter size={20} />
            </Link>
            <Link href="https://instagram.com" target="_blank" className="hover:text-green-400">
              <Instagram size={20} />
            </Link>
          </div>
          <p className="text-sm text-gray-400">support@localbite.com</p>
        </div>
      </motion.div>

      <div className="text-center text-xs text-gray-500 py-4 border-t border-gray-800">
        &copy; {new Date().getFullYear()} Local Bite. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
