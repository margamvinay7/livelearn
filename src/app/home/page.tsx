"use client"
import Link from "next/link";
import { motion } from "framer-motion";
import { GraduationCap, BookOpen, User, Info, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useGetUserQuery } from "@/store/api/authApi";

export default function HomePage() {
const {data:user,isLoading:loading}=useGetUserQuery()
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      if (user.role === "ADMIN") router.replace("/admin/dashboard");
      else if (user.role === "INSTRUCTOR") router.replace("/instructor/dashboard");
      else if (user.role === "STUDENT") router.replace("/learner/dashboard");
    }
  }, [user, loading, router]);

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
          <Link href="/signin" className="px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow hover:scale-105 transition-transform">Sign In</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-16 md:py-32 relative overflow-hidden">
        {/* Animated Background Circles */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.15 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-gradient-to-br from-blue-400 to-purple-400 rounded-full blur-3xl z-0"
        />
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.12 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-gradient-to-br from-purple-400 to-blue-400 rounded-full blur-3xl z-0"
        />

        {/* Hero Content */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative z-10 text-center max-w-2xl"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-700 via-purple-600 to-blue-500 bg-clip-text text-transparent mb-6 drop-shadow-lg animate-fadeIn">
            Welcome to <span className="inline-block">Live Learn</span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-900 mb-8 animate-fadeIn2">
            Empowering your journey with interactive, live, and engaging learning experiences. <br />
            Join a vibrant community of learners and instructors, explore top courses, and unlock your potential.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-8 animate-fadeIn3">
            <Link href="/courses" className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl text-lg font-semibold shadow-lg hover:scale-105 transition-transform flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Explore Courses
            </Link>
            <Link href="/signup" className="px-8 py-4 bg-white border border-blue-200 text-blue-700 rounded-xl text-lg font-semibold shadow hover:bg-blue-50 hover:scale-105 transition-transform flex items-center gap-2">
              <User className="w-5 h-5" />
              Get Started
            </Link>
          </div>
        </motion.div>
      </main>

      {/* Info Section */}
      <section className="max-w-5xl mx-auto px-4 py-16 grid md:grid-cols-3  gap-10 relative z-10">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center border-t-4 border-blue-500"
        >
          <BookOpen className="w-10 h-10 text-blue-600 mb-4" />
          <h3 className="text-xl font-bold mb-2 text-blue-900">Diverse Courses</h3>
          <p className="text-blue-900">Choose from a wide range of live and self-paced courses designed by top instructors to fit your learning style and goals.</p>
        </motion.div>
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center border-t-4 border-purple-500"
        >
          <GraduationCap className="w-10 h-10 text-purple-600 mb-4" />
          <h3 className="text-xl font-bold mb-2 text-purple-900">Expert Instructors</h3>
          <p className="text-purple-900">Learn from industry leaders and passionate educators who bring real-world experience and interactive teaching to every class.</p>
        </motion.div>
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center border-t-4 border-blue-400"
        >
          <Info className="w-10 h-10 text-blue-400 mb-4" />
          <h3 className="text-xl font-bold mb-2 text-blue-900">24/7 Support</h3>
          <p className="text-blue-900">Our support team is always here to help you with any questions, so you can focus on learning and growing.</p>
        </motion.div>
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
          <div className="flex items-center gap-2 justify-center">
            <Mail className="w-5 h-5" />
            <span>support@livelearn.com</span>
          </div>
        </div>
        <div className="mt-4 text-sm text-white/70">&copy; {new Date().getFullYear()} Live Learn. All rights reserved.</div>
      </footer>
    </div>
  );
} 