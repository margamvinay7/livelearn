"use client"
import Link from "next/link";
import { motion } from "framer-motion";
import { GraduationCap, Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-white flex flex-col">
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between px-8 py-6 bg-white/80 backdrop-blur border-b border-gray-200 shadow-sm sticky top-0 z-10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-blue-700 tracking-tight">Live Learn</span>
        </div>
        <div className="flex items-center space-x-8 text-lg font-medium">
          <Link href="/courses" className="text-gray-700 hover:text-blue-600 transition-colors">Courses</Link>
          <Link href="/about" className="text-gray-700 hover:text-blue-600 transition-colors">About</Link>
          <Link href="/contact" className="text-blue-600 font-bold transition-colors">Contact</Link>
          <Link href="/signin" className="px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow hover:scale-105 transition-transform">Sign In</Link>
        </div>
      </nav>

      {/* Contact Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-16 md:py-32 relative overflow-hidden">
        <motion.h1
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-700 via-purple-600 to-blue-500 bg-clip-text text-transparent mb-6 drop-shadow-lg text-center"
        >
          Contact Us
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-700 mb-8 text-center max-w-2xl"
        >
          Have questions or need help? Reach out to our team and we’ll get back to you as soon as possible.
        </motion.p>
        <div className="grid md:grid-cols-2 gap-12 w-full max-w-4xl mt-8">
          {/* Contact Info */}
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-6 border-t-4 border-blue-500"
          >
            <div className="flex items-center gap-3">
              <Mail className="w-6 h-6 text-blue-600" />
              <span className="text-blue-900 font-medium">support@livelearn.com</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-6 h-6 text-blue-600" />
              <span className="text-blue-900 font-medium">+1 234 567 8900</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-6 h-6 text-blue-600" />
              <span className="text-blue-900 font-medium">123 Main St, City, Country</span>
            </div>
          </motion.div>
          {/* Contact Form */}
          <motion.form
            initial={{ x: 30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-6 border-t-4 border-purple-500"
          >
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-blue-900"
              required
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-blue-900"
              required
            />
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows={5}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-blue-900"
              required
            />
            <motion.button
              whileTap={{ scale: 0.97 }}
              whileHover={{ scale: 1.03 }}
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-lg font-semibold shadow hover:scale-105 transition-transform"
            >
              {submitted ? "Message Sent!" : "Send Message"}
            </motion.button>
          </motion.form>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center mt-auto">
        <div className="flex flex-col md:flex-row items-center justify-between max-w-5xl mx-auto gap-4">
          <div className="flex items-center gap-2 justify-center">
            <GraduationCap className="w-6 h-6" />
            <span className="font-bold text-lg">Live Learn</span>
          </div>
          <div className="flex gap-6 text-white/90 text-base font-medium">
            <Link href="/courses" className="hover:underline">Courses</Link>
            <Link href="/about" className="hover:underline">About</Link>
            <Link href="/contact" className="hover:underline">Contact</Link>
            <Link href="/signin" className="hover:underline">Sign In</Link>
          </div>
        </div>
        <div className="mt-4 text-sm text-white/70">&copy; {new Date().getFullYear()} Live Learn. All rights reserved.</div>
      </footer>
    </div>
  );
} 