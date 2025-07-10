"use client"
import { useState } from "react";
import {
  BookOpen,
  Plus,
  Search,
  Users,
  Star,
  DollarSign,
  Eye,
  Edit,
  Trash2,
  XCircle
} from "lucide-react";

const mockCourses = [
  {
    id: 1,
    title: "React Masterclass",
    status: "Published",
    students: 234,
    rating: 4.8,
    earnings: "$1,250",
    description: "Comprehensive React course covering hooks, state, and more."
  },
  {
    id: 2,
    title: "Python Basics",
    status: "Draft",
    students: 0,
    rating: 0,
    earnings: "$0",
    description: "Beginner-friendly Python programming course."
  },
  {
    id: 3,
    title: "UI/UX Design",
    status: "Published",
    students: 156,
    rating: 4.9,
    earnings: "$820",
    description: "Learn the fundamentals of UI/UX design."
  },
  {
    id: 4,
    title: "JavaScript Essentials",
    status: "Published",
    students: 189,
    rating: 4.7,
    earnings: "$980",
    description: "Essential JavaScript concepts for web development."
  }
];

const statusColors:Record<string, string> = {
  Published: "bg-green-100 text-green-700",
  Draft: "bg-yellow-100 text-yellow-700"
};

export default function InstructorCoursesPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [courses, setCourses] = useState(mockCourses);
  const [addCourse, setAddCourse] = useState({
    title: "",
    description: "",
    status: "Draft"
  });

  const filteredCourses = courses.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || c.status === filter;
    return matchesSearch && matchesFilter;
  });

  function handleAddCourse() {
    setCourses((prev) => [
      ...prev,
      {
        id: Date.now(),
        title: addCourse.title,
        description: addCourse.description,
        status: addCourse.status,
        students: 0,
        rating: 0,
        earnings: "$0"
      }
    ]);
    setShowModal(false);
    setAddCourse({ title: "", description: "", status: "Draft" });
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Courses</h1>
          <p className="text-gray-600">Manage your courses, track performance, and add new content.</p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow transition-colors"
          onClick={() => setShowModal(true)}
        >
          <Plus className="w-5 h-5" /> Add Course
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
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
            <option value="Published">Published</option>
            <option value="Draft">Draft</option>
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
                <h2 className="font-semibold text-gray-900 text-lg truncate">{course.title}</h2>
                <span className={`inline-block mt-1 px-2 py-1 rounded-full text-xs font-medium ${statusColors[course.status as keyof typeof statusColors]}`}>{course.status}</span>
              </div>
            </div>
            <p className="text-gray-600 text-sm flex-1">{course.description}</p>
            <div className="flex items-center gap-4 text-xs text-gray-500 mt-2">
              <Users className="w-4 h-4" /> {course.students} students
              <Star className="w-4 h-4 text-yellow-400 ml-2" /> {course.rating}
              <DollarSign className="w-4 h-4 text-green-500 ml-2" /> {course.earnings}
            </div>
            <div className="flex gap-2 mt-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Eye className="w-5 h-5 text-blue-500" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Edit className="w-5 h-5 text-green-500" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Trash2 className="w-5 h-5 text-red-500" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Course Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 animate-fade-in">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative animate-fade-in-up">
            <button
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
              onClick={() => setShowModal(false)}
            >
              <span className="sr-only">Close</span>
              <XCircle className="w-6 h-6 text-gray-400" />
            </button>
            <h2 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              <Plus className="w-6 h-6 text-blue-500" /> Add Course
            </h2>
            <form
              className="space-y-4 mt-4"
              onSubmit={e => {
                e.preventDefault();
                handleAddCourse();
              }}
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={addCourse.title}
                  onChange={e => setAddCourse(a => ({ ...a, title: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  required
                  value={addCourse.description}
                  onChange={e => setAddCourse(a => ({ ...a, description: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={addCourse.status}
                  onChange={e => setAddCourse(a => ({ ...a, status: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                >
                  <option value="Published">Published</option>
                  <option value="Draft">Draft</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow transition-colors"
              >
                <Plus className="w-4 h-4" /> Add Course
              </button>
            </form>
          </div>
        </div>
      )}

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
