"use client"

import {
  Users,
  BookOpen,
  Calendar,
  TrendingUp,
  DollarSign,

  Clock,
  CheckCircle,

  MessageCircle,
  Star
} from "lucide-react";

export default function InstructorDashboard() {


  // Mock data
  const stats = [
    {
      title: "Total Students",
      value: "1,245",
      change: "+8%",
      changeType: "positive",
      icon: Users,
      color: "bg-blue-500"
    },
    {
      title: "Active Courses",
      value: "7",
      change: "+1",
      changeType: "positive",
      icon: BookOpen,
      color: "bg-green-500"
    },
    {
      title: "Upcoming Classes",
      value: "3",
      change: "-1",
      changeType: "negative",
      icon: Calendar,
      color: "bg-purple-500"
    },
    {
      title: "Earnings",
      value: "$3,450",
      change: "+12%",
      changeType: "positive",
      icon: DollarSign,
      color: "bg-orange-500"
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: "student_enrolled",
      title: "New Student Enrolled",
      description: "Priya Singh enrolled in React Masterclass",
      time: "1 hour ago",
      status: "completed"
    },
    {
      id: 2,
      type: "assignment_submitted",
      title: "Assignment Submitted",
      description: "Alex Chen submitted Assignment 2 for Python Basics",
      time: "3 hours ago",
      status: "completed"
    },
    {
      id: 3,
      type: "feedback_received",
      title: "Feedback Received",
      description: "You received feedback from Sarah Wilson",
      time: "5 hours ago",
      status: "completed"
    },
    {
      id: 4,
      type: "class_scheduled",
      title: "Class Scheduled",
      description: "JavaScript Essentials class scheduled for tomorrow",
      time: "1 day ago",
      status: "completed"
    }
  ];

  const topCourses = [
    {
      id: 1,
      title: "React Masterclass",
      students: 234,
      rating: 4.8,
      earnings: "$1,250"
    },
    {
      id: 2,
      title: "Python Basics",
      students: 189,
      rating: 4.7,
      earnings: "$980"
    },
    {
      id: 3,
      title: "UI/UX Design",
      students: 156,
      rating: 4.9,
      earnings: "$820"
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "student_enrolled":
        return <Users className="w-4 h-4 text-blue-500" />;
      case "assignment_submitted":
        return <BookOpen className="w-4 h-4 text-green-500" />;
      case "feedback_received":
        return <MessageCircle className="w-4 h-4 text-purple-500" />;
      case "class_scheduled":
        return <Calendar className="w-4 h-4 text-orange-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Instructor Dashboard</h1>
        <p className="text-gray-600">Welcome back! Heres your teaching overview and recent activity.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className={`w-4 h-4 ${stat.changeType === 'positive' ? 'text-green-500' : 'text-red-500'}`} />
                  <span className={`text-sm font-medium ml-1 ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>{stat.change}</span>
                  <span className="text-sm text-gray-500 ml-1">from last week</span>
                </div>
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
        {/* Recent Activities */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-fade-in-up">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Recent Activities</h2>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All</button>
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors animate-fade-in-up">
                  <div className="flex-shrink-0 mt-1">{getActivityIcon(activity.type)}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                    <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Courses */}
        <div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-fade-in-up">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Top Courses</h2>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All</button>
            </div>
            <div className="space-y-4">
              {topCourses.map((course, idx) => (
                <div key={course.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-blue-50 transition-colors animate-fade-in-up" style={{ animationDelay: `${idx * 40}ms` }}>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-blue-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">{course.title}</h3>
                    <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                      <Users className="w-4 h-4" /> {course.students} students
                      <Star className="w-4 h-4 text-yellow-400 ml-2" /> {course.rating}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-blue-700 font-semibold">{course.earnings}</p>
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
