"use client"
import Link from "next/link";
import { motion } from "framer-motion";
import { GraduationCap, Lock, Mail } from "lucide-react";
import { useState } from "react";

export default function SignInPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2000);
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
          <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">Contact</Link>
          <Link href="/signin" className="px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow hover:scale-105 transition-transform font-bold">Sign In</Link>
        </div>
      </nav>

      {/* Sign In Form */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-16 md:py-32 relative overflow-hidden">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-2xl shadow-lg p-10 max-w-md w-full border-t-4 border-blue-500"
        >
          <h1 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-blue-700 via-purple-600 to-blue-500 bg-clip-text text-transparent">Sign In to Live Learn</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-400" />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-blue-900"
                  placeholder="Enter your email"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-400" />
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-blue-900"
                  placeholder="Enter your password"
                />
              </div>
            </div>
            <motion.button
              whileTap={{ scale: 0.97 }}
              whileHover={{ scale: 1.03 }}
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-lg font-semibold shadow hover:scale-105 transition-transform"
            >
              {submitted ? "Signing In..." : "Sign In"}
            </motion.button>
          </form>
          <div className="mt-6 text-center text-gray-600">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-blue-600 hover:underline font-semibold">Sign Up</Link>
          </div>
        </motion.div>
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