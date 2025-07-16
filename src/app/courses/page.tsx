"use client"
import Link from "next/link";
import { motion } from "framer-motion";
import { GraduationCap, User, Star } from "lucide-react";
import Image from "next/image";

const courses = [
  {
    id: 1,
    title: "React for Beginners",
    instructor: "Jane Doe",
    image: "/public/globe.svg",
    rating: 4.8,
    description: "Learn the basics of React and build interactive UIs.",
  },
  {
    id: 2,
    title: "Advanced Python",
    instructor: "John Smith",
    image: "/public/window.svg",
    rating: 4.7,
    description: "Master advanced Python concepts and best practices.",
  },
  {
    id: 3,
    title: "UI/UX Design Essentials",
    instructor: "Emily Clark",
    image: "/public/file.svg",
    rating: 4.9,
    description: "Design stunning user interfaces and experiences.",
  },
];

export default function CoursesPage() {
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
          <Link href="/courses" className="text-blue-600 font-bold transition-colors">Courses</Link>
          <Link href="/about" className="text-gray-700 hover:text-blue-600 transition-colors">About</Link>
          <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">Contact</Link>
          <Link href="/signin" className="px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow hover:scale-105 transition-transform">Sign In</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="text-center py-16 md:py-24 relative">
        <motion.h1
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-700 via-purple-600 to-blue-500 bg-clip-text text-transparent mb-4 drop-shadow-lg"
        >
          Explore Our Courses
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-700 mb-8"
        >
          Find the perfect course to boost your skills and career.
        </motion.p>
      </header>

      {/* Courses Grid */}
      <section className="max-w-6xl mx-auto px-4 pb-16 grid gap-10 md:grid-cols-3">
        {courses.map((course, idx) => (
          <motion.div
            key={course.id}
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.1 * idx }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center border-t-4 border-blue-400 hover:scale-105 hover:shadow-2xl transition-transform duration-300"
          >
            <div className="relative w-24 h-24">
            <Image src={course.image} alt={course.title} fill={true} className=" object-contain mb-4 rounded-xl bg-gray-50 border" />
            </div>
            <h3 className="text-2xl font-bold mb-2 text-blue-900">{course.title}</h3>
            <p className="text-blue-700 mb-2">{course.description}</p>
            <div className="flex items-center justify-center gap-2 mb-2">
              <User className="w-4 h-4 text-purple-700" />
              <span className="text-blue-900 font-medium">{course.instructor}</span>
            </div>
            <div className="flex items-center gap-1 mb-4">
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="text-blue-900 font-semibold">{course.rating}</span>
            </div>
            <Link href={`/courses/${course.id}`} className="mt-auto px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow hover:scale-105 transition-transform font-semibold">View Details</Link>
          </motion.div>
        ))}
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