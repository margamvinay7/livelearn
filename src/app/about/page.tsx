"use client"
import Link from "next/link";
import { motion } from "framer-motion";
import { GraduationCap, Users, Info, Heart } from "lucide-react";

export default function AboutPage() {
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
          <Link href="/about" className="text-blue-600 font-bold transition-colors">About</Link>
          <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">Contact</Link>
          <Link href="/signin" className="px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow hover:scale-105 transition-transform">Sign In</Link>
        </div>
      </nav>

      {/* About Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-16 md:py-32 relative overflow-hidden">
        <motion.h1
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-700 via-purple-600 to-blue-500 bg-clip-text text-transparent mb-6 drop-shadow-lg text-center"
        >
          About Live Learn
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-700 mb-8 text-center max-w-2xl"
        >
          Live Learn is dedicated to transforming education by making learning interactive, accessible, and community-driven. Our mission is to empower learners and educators worldwide.
        </motion.p>
      </main>

      {/* Mission & Team Section */}
      <section className="max-w-5xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10 relative z-10">
        <motion.div
          initial={{ x: -30, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center border-t-4 border-blue-500"
        >
          <Info className="w-10 h-10 text-blue-600 mb-4" />
          <h3 className="text-xl font-bold mb-2 text-blue-900">Our Mission</h3>
          <p className="text-blue-700">To make high-quality education accessible to everyone, everywhere, and to foster a love for lifelong learning through innovative technology and passionate educators.</p>
        </motion.div>
        <motion.div
          initial={{ x: 30, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center border-t-4 border-purple-500"
        >
          <Heart className="w-10 h-10 text-purple-600 mb-4" />
          <h3 className="text-xl font-bold mb-2 text-purple-900">Our Values</h3>
          <p className="text-blue-700">Community, innovation, inclusivity, and a relentless pursuit of excellence are at the heart of everything we do at Live Learn.</p>
        </motion.div>
      </section>

      {/* Team Section */}
      <section className="max-w-5xl mx-auto px-4 pb-16">
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-10 bg-gradient-to-r from-blue-700 via-purple-600 to-blue-500 bg-clip-text text-transparent"
        >
          Meet Our Team
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[1,2,3].map((id) => (
            <motion.div
              key={id}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.1 * id }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center border-t-4 border-blue-400"
            >
              <Users className="w-10 h-10 text-blue-500 mb-4" />
              <h4 className="text-lg font-bold mb-1 text-blue-900">Team Member {id}</h4>
              <p className="text-blue-700">Role/Position</p>
            </motion.div>
          ))}
        </div>
      </section>

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