"use client"
import { useState } from "react";
import {
  BookOpen,
  CheckCircle,
  Star,
  PlayCircle,
  Eye,
  FileText
} from "lucide-react";

const mockCourses = [
  {
    id: 1,
    title: "React Masterclass",
    status: "In Progress",
    progress: 80,
    lessons: 24,
    completed: 19,
    rating: 4.8
  },
  {
    id: 2,
    title: "Python Basics",
    status: "Completed",
    progress: 100,
    lessons: 18,
    completed: 18,
    rating: 4.7
  },
  {
    id: 3,
    title: "UI/UX Design Fundamentals",
    status: "In Progress",
    progress: 95,
    lessons: 20,
    completed: 19,
    rating: 4.9
  },
  {
    id: 4,
    title: "JavaScript Essentials",
    status: "Not Started",
    progress: 0,
    lessons: 15,
    completed: 0,
    rating: 4.6
  }
];

type CourseStatus = "In Progress" | "Completed" | "Not Started";

const statusColors: Record<CourseStatus, string> = {
  "In Progress": "bg-blue-100 text-blue-700",
  Completed: "bg-green-100 text-green-700",
  "Not Started": "bg-gray-100 text-gray-700"
};

export default function LearnerCoursesPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [courses] = useState(mockCourses);

  const filteredCourses = courses.filter((c) => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || c.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-700 mb-2">My Courses</h1>
        <p className="text-gray-600">Browse your enrolled courses, track progress, and continue learning.</p>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <div className="relative">
            <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-64 pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="ml-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="All">All Statuses</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Not Started">Not Started</option>
          </select>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up">
        {filteredCourses.length === 0 && (
          <div className="col-span-full text-center text-gray-400 py-12">No courses found.</div>
        )}
        {filteredCourses.map((course, idx) => (
          <div
            key={course.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col gap-4 animate-fade-in-up hover:shadow-lg transition-all duration-200"
            style={{ animationDelay: `${idx * 40}ms` }}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-blue-500" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="font-semibold text-blue-700 text-lg truncate">{course.title}</h2>
                <span className={`inline-block mt-1 px-2 py-1 rounded-full text-xs font-medium ${statusColors[course.status as CourseStatus]}`}>{course.status}</span>
              </div>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2 mt-2">
              <div
                className={`h-2 rounded-full transition-all duration-700 ${course.progress === 100 ? "bg-green-500" : course.progress === 0 ? "bg-gray-300" : "bg-blue-500"}`}
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
            <div className="flex items-center gap-4 text-xs text-gray-500 mt-2">
              <CheckCircle className="w-4 h-4 text-green-500" /> {course.completed}/{course.lessons} lessons
              <Star className="w-4 h-4 text-yellow-400 ml-2" /> {course.rating}
            </div>
            <div className="flex gap-2 mt-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Eye className="w-5 h-5 text-blue-500" />
              </button>
              {course.status === "In Progress" && (
                <button className="p-2 hover:bg-blue-100 rounded-lg transition-colors bg-blue-500 text-white">
                  <PlayCircle className="w-5 h-5" /> Continue
                </button>
              )}
              {course.status === "Completed" && (
                <button className="p-2 hover:bg-green-100 rounded-lg transition-colors bg-green-500 text-white">
                  <CheckCircle className="w-5 h-5" /> Review
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Animations */}
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.5s both;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s both;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
