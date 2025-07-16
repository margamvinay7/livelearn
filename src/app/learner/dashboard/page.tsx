"use client"

import {
  BookOpen,
  CheckCircle,
  Award,
  TrendingUp,
  Clock,
  PlayCircle,
  FileText,
  Star
} from "lucide-react";

export default function LearnerDashboard() {
  // Mock data
  const stats = [
    {
      title: "Enrolled Courses",
      value: "5",
      icon: BookOpen,
      color: "bg-blue-500"
    },
    {
      title: "Completed Lessons",
      value: "32",
      icon: CheckCircle,
      color: "bg-green-500"
    },
    {
      title: "Certificates",
      value: "2",
      icon: Award,
      color: "bg-purple-500"
    },
    {
      title: "Progress",
      value: "68%",
      icon: TrendingUp,
      color: "bg-orange-500"
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

  const enrolledCourses = [
    {
      id: 1,
      title: "React Masterclass",
      progress: 80,
      nextLesson: "Redux Basics",
      lessons: 24,
      completed: 19,
      rating: 4.8
    },
    {
      id: 2,
      title: "Python Basics",
      progress: 60,
      nextLesson: "Functions & Loops",
      lessons: 18,
      completed: 11,
      rating: 4.7
    },
    {
      id: 3,
      title: "UI/UX Design Fundamentals",
      progress: 95,
      nextLesson: "Final Project",
      lessons: 20,
      completed: 19,
      rating: 4.9
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "lesson_completed":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "quiz_taken":
        return <FileText className="w-4 h-4 text-blue-500" />;
      case "certificate_earned":
        return <Award className="w-4 h-4 text-purple-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-700 mb-2">Learner Dashboard</h1>
        <p className="text-gray-600">Welcome back! Heres your learning progress and recent activity.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-blue-700 mt-1">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-fade-in-up">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-blue-700">Recent Activity</h2>
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors animate-fade-in-up">
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
        </div>

        {/* Enrolled Courses */}
        <div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-fade-in-up">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-blue-700">Enrolled Courses</h2>
            </div>
            <div className="space-y-4">
              {enrolledCourses.map((course, idx) => (
                <div key={course.id} className="flex flex-col gap-2 p-3 rounded-lg hover:bg-blue-50 transition-colors animate-fade-in-up" style={{ animationDelay: `${idx * 40}ms` }}>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-blue-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-blue-700 truncate">{course.title}</h3>
                      <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                        <Star className="w-4 h-4 text-yellow-400 ml-2" /> {course.rating}
                        <span className="ml-2">{course.completed}/{course.lessons} lessons</span>
                      </div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2 mt-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-700"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-xs text-blue-700 font-medium">
                    <PlayCircle className="w-4 h-4" /> Next: {course.nextLesson}
                  </div>
                </div>
              ))}
            </div>
          </div>
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
