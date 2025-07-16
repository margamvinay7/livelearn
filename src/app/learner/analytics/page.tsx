"use client"
import { useState } from "react";
import {
  BookOpen,
  CheckCircle,
  FileText,
  Award,
  Star,

  Clock
} from "lucide-react";

const summaryStats = [
  {
    title: "Courses Enrolled",
    value: "5",
    icon: BookOpen,
    color: "bg-blue-500"
  },
  {
    title: "Lessons Completed",
    value: "32",
    icon: CheckCircle,
    color: "bg-green-500"
  },
  {
    title: "Quizzes Taken",
    value: "12",
    icon: FileText,
    color: "bg-purple-500"
  },
  {
    title: "Certificates",
    value: "2",
    icon: Award,
    color: "bg-orange-500"
  }
];

const progressData = [
  { label: "Mon", value: 3 },
  { label: "Tue", value: 5 },
  { label: "Wed", value: 2 },
  { label: "Thu", value: 6 },
  { label: "Fri", value: 4 },
  { label: "Sat", value: 1 },
  { label: "Sun", value: 3 }
];

const topCourses = [
  {
    id: 1,
    title: "React Masterclass",
    progress: 80,
    rating: 4.8
  },
  {
    id: 2,
    title: "Python Basics",
    progress: 60,
    rating: 4.7
  },
  {
    id: 3,
    title: "UI/UX Design Fundamentals",
    progress: 95,
    rating: 4.9
  }
];

const recentActivity = [
  {
    id: 1,
    type: "lesson_completed",
    title: "Lesson Completed",
    description: "Hooks in React (React Masterclass)",
    time: "1 hour ago"
  },
  {
    id: 2,
    type: "quiz_taken",
    title: "Quiz Taken",
    description: "Module 2 Quiz (Python Basics)",
    time: "3 hours ago"
  },
  {
    id: 3,
    type: "certificate_earned",
    title: "Certificate Earned",
    description: "UI/UX Design Fundamentals",
    time: "1 day ago"
  },
  {
    id: 4,
    type: "lesson_completed",
    title: "Lesson Completed",
    description: "Flexbox & Grid (UI/UX Design)",
    time: "2 days ago"
  }
];

export default function LearnerAnalyticsPage() {
  const [period, setPeriod] = useState("week");
  const maxValue = Math.max(...progressData.map((d) => d.value));

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "lesson_completed":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "quiz_taken":
        return <FileText className="w-4 h-4 text-blue-500" />;
      case "certificate_earned":
        return <Award className="w-4 h-4 text-orange-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-blue-700 mb-2">Analytics</h1>
          <p className="text-gray-600">Track your learning progress and achievements.</p>
        </div>
        <div className="flex gap-2">
          <button
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${period === "week" ? "btn-primary" : "bg-gray-100 text-gray-700 hover:bg-blue-50"}`}
            onClick={() => setPeriod("week")}
          >
            This Week
          </button>
          <button
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${period === "month" ? "btn-primary" : "bg-gray-100 text-gray-700 hover:bg-blue-50"}`}
            onClick={() => setPeriod("month")}
          >
            This Month
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {summaryStats.map((stat, idx) => (
          <div key={stat.title} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex items-center justify-between animate-fade-in" style={{ animationDelay: `${idx * 60}ms` }}>
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <p className="text-2xl font-bold text-blue-700 mt-1">{stat.value}</p>
            </div>
            <div className={`${stat.color} p-3 rounded-lg`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Progress Trend Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-fade-in-up">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-blue-700">Lessons Completed ({period === "week" ? "This Week" : "This Month"})</h2>
          </div>
          {/* Animated Bar Chart */}
          <div className="flex items-end gap-4 h-48 w-full mt-8">
            {progressData.map((d, idx) => (
              <div key={d.label} className="flex flex-col items-center flex-1 animate-fade-in-up" style={{ animationDelay: `${idx * 60}ms` }}>
                <div
                  className="w-8 rounded-t-lg bg-blue-500 transition-all duration-700"
                  style={{ height: `${(d.value / maxValue) * 100}%`, minHeight: 12 }}
                ></div>
                <span className="mt-2 text-xs text-gray-500">{d.label}</span>
                <span className="text-xs text-gray-700 font-semibold">{d.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Courses */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-fade-in-up">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-blue-700">Top Courses</h2>
          </div>
          <div className="space-y-4">
            {topCourses.map((course, idx) => (
              <div key={course.id} className="flex flex-col gap-2 p-3 rounded-lg hover:bg-blue-50 transition-colors animate-fade-in-up" style={{ animationDelay: `${idx * 40}ms` }}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-blue-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-blue-700 truncate">{course.title}</h3>
                    <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                      <Star className="w-4 h-4 text-yellow-400 ml-2" /> {course.rating}
                    </div>
                  </div>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 mt-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-700"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-8 animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-blue-700">Recent Activity</h2>
        </div>
        <div className="space-y-4">
          {recentActivity.map((activity, idx) => (
            <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors animate-fade-in-up" style={{ animationDelay: `${idx * 40}ms` }}>
              <div className="flex-shrink-0 mt-1">{getActivityIcon(activity.type)}</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-blue-700">{activity.title}</p>
                <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
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
