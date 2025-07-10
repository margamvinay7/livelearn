"use client"

import { 
  Users, 
  BookOpen, 
  Calendar, 
  TrendingUp, 
  DollarSign, 
  Award,
  Clock,
  CheckCircle,

  Plus,
  Search,
  Filter,

  Eye,
  Edit,
  Trash2
} from 'lucide-react'

export default function AdminDashboard() {

  // Mock data - replace with real data from your API
  const stats = [
    {
      title: "Total Students",
      value: "2,847",
      change: "+12%",
      changeType: "positive",
      icon: Users,
      color: "bg-blue-500"
    },
    {
      title: "Active Courses",
      value: "156",
      change: "+8%",
      changeType: "positive",
      icon: BookOpen,
      color: "bg-green-500"
    },
    {
      title: "Total Revenue",
      value: "$45,289",
      change: "+23%",
      changeType: "positive",
      icon: DollarSign,
      color: "bg-purple-500"
    },
    {
      title: "Completion Rate",
      value: "89%",
      change: "+5%",
      changeType: "positive",
      icon: Award,
      color: "bg-orange-500"
    }
  ]

  const recentActivities = [
    {
      id: 1,
      type: "course_created",
      title: "New Course Created",
      description: "Advanced React Development course was created by John Doe",
      time: "2 hours ago",
      status: "completed"
    },
    {
      id: 2,
      type: "student_enrolled",
      title: "Student Enrollment",
      description: "Sarah Wilson enrolled in Python for Beginners",
      time: "4 hours ago",
      status: "completed"
    },
    {
      id: 3,
      type: "payment_received",
      title: "Payment Received",
      description: "Payment of $299 received for Data Science Course",
      time: "6 hours ago",
      status: "completed"
    },
    {
      id: 4,
      type: "course_completed",
      title: "Course Completed",
      description: "Mike Johnson completed JavaScript Fundamentals",
      time: "1 day ago",
      status: "completed"
    }
  ]

  const topCourses = [
    {
      id: 1,
      title: "React Development Masterclass",
      instructor: "John Doe",
      students: 234,
      revenue: "$12,450",
      rating: 4.8
    },
    {
      id: 2,
      title: "Python for Data Science",
      instructor: "Sarah Wilson",
      students: 189,
      revenue: "$9,870",
      rating: 4.9
    },
    {
      id: 3,
      title: "UI/UX Design Fundamentals",
      instructor: "Mike Johnson",
      students: 156,
      revenue: "$8,230",
      rating: 4.7
    },
    {
      id: 4,
      title: "Machine Learning Basics",
      instructor: "Emily Brown",
      students: 142,
      revenue: "$7,890",
      rating: 4.6
    }
  ]

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'course_created':
        return <BookOpen className="w-4 h-4 text-blue-500" />
      case 'student_enrolled':
        return <Users className="w-4 h-4 text-green-500" />
      case 'payment_received':
        return <DollarSign className="w-4 h-4 text-purple-500" />
      case 'course_completed':
        return <Award className="w-4 h-4 text-orange-500" />
      default:
        return <Clock className="w-4 h-4 text-gray-500" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Welcome back! Heres whats happening with your learning platform.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className={`w-4 h-4 ${stat.changeType === 'positive' ? 'text-green-500' : 'text-red-500'}`} />
                  <span className={`text-sm font-medium ml-1 ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">from last month</span>
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
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Recent Activities</h2>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex-shrink-0 mt-1">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                    <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                <Plus className="w-4 h-4" />
                <span>Create New Course</span>
              </button>
              <button className="w-full flex items-center justify-center space-x-2 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors">
                <Users className="w-4 h-4" />
                <span>Add Student</span>
              </button>
              <button className="w-full flex items-center justify-center space-x-2 bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors">
                <Calendar className="w-4 h-4" />
                <span>Schedule Event</span>
              </button>
            </div>
          </div>

          {/* System Status */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">System Status</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Server Status</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-green-600">Online</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Database</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-green-600">Connected</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Storage</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm font-medium text-yellow-600">75% Used</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Performing Courses */}
      <div className="mt-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Top Performing Courses</h2>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Filter className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Course</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Instructor</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Students</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Revenue</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Rating</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {topCourses.map((course) => (
                  <tr key={course.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium text-gray-900">{course.title}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{course.instructor}</td>
                    <td className="py-3 px-4 text-gray-600">{course.students}</td>
                    <td className="py-3 px-4 text-gray-600">{course.revenue}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <span className="text-yellow-500">★</span>
                        <span className="ml-1 text-gray-600">{course.rating}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-green-600 hover:bg-green-50 rounded">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-red-600 hover:bg-red-50 rounded">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
