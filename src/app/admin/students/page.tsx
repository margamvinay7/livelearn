"use client"
import { useState, useMemo } from 'react'
import { 
  Plus, 
  Search, 

  MoreHorizontal, 
  Eye, 
  Edit, 
 
  Users,
  User,

  Award,
  TrendingUp,
  Grid,
  List,

  Upload,
  
  Target,
  
  MessageCircle,
  
} from 'lucide-react'
import Image from 'next/image'
import { useGetAllStudentsQuery } from '@/store/api/studentApi'


export default function StudentsPage() {

  const { data: studentProfiles = [] } = useGetAllStudentsQuery();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('name')

  const students = useMemo(() => {
    if (!studentProfiles) return [];
    return studentProfiles.map((profile, index) => ({
      id: profile.id,
      name: profile.user.name,
      email: profile.user.email,
      phone: profile.phone || "+1 (555) 000-0000",
      avatar: profile.avatar || `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face`,
      status: ["active", "inactive", "pending"][index % 3],
      enrollmentDate: "2024-01-15",
      courses: 5,
      completedCourses: 3,
      progress: 85,
      grade: "A+",
      location: profile.city && profile.state ? `${profile.city}, ${profile.state}` : "New York, NY",
      lastActive: "2 hours ago",
      totalHours: 124,
      certificates: 2,
      achievements: ["Top Performer", "Perfect Attendance"],
      interests: ["Data Science", "Machine Learning", "Python"],
      notes: "Excellent student with strong analytical skills"
    }));
  }, [studentProfiles]);

  const stats = [
    {
      title: "Total Students",
      value: students.length.toString(),
      change: "+12",
      changeType: "positive",
      icon: Users,
      color: "bg-blue-500"
    },
    {
      title: "Active Students",
      value: students.filter(s => s?.status === 'active').length.toString(),
      change: "+8%",
      changeType: "positive",
      icon: User,
      color: "bg-green-500"
    },
    {
      title: "Avg. Progress",
      value: "72%",
      change: "+5%",
      changeType: "positive",
      icon: Target,
      color: "bg-purple-500"
    },
    {
      title: "Completion Rate",
      value: "89%",
      change: "+3%",
      changeType: "positive",
      icon: Award,
      color: "bg-orange-500"
    }
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Active</span>
      case 'inactive':
        return <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">Inactive</span>
      case 'pending':
        return <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">Pending</span>
      default:
        return <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">Unknown</span>
    }
  }

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A+':
        return 'text-green-600 bg-green-100'
      case 'A':
        return 'text-green-600 bg-green-100'
      case 'A-':
        return 'text-green-600 bg-green-100'
      case 'B+':
        return 'text-blue-600 bg-blue-100'
      case 'B':
        return 'text-blue-600 bg-blue-100'
      case 'B-':
        return 'text-blue-600 bg-blue-100'
      case 'C+':
        return 'text-yellow-600 bg-yellow-100'
      case 'C':
        return 'text-yellow-600 bg-yellow-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  // const formatDate = (dateString: string) => {
  //   return new Date(dateString).toLocaleDateString('en-US', {
  //     year: 'numeric',
  //     month: 'short',
  //     day: 'numeric'
  //   })
  // }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-blue-700 mb-2">Student Management</h1>
            <p className="text-gray-600">Manage and track your student progress and performance</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all duration-200 transform hover:scale-105">
              <Upload className="w-4 h-4" />
              <span>Import Students</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 transform hover:scale-105">
              <Plus className="w-4 h-4" />
              <span>Add Student</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-blue-700 mt-1">{stat.value}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium text-green-600 ml-1">{stat.change}</span>
                  <span className="text-sm text-gray-500 ml-1">from last month</span>
                </div>
              </div>
              <div className={`${stat.color} p-3 rounded-lg transform transition-all duration-300 hover:scale-110`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search students..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64"
              />
            </div>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>

            {/* Sort By */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="name">Sort by Name</option>
              <option value="progress">Sort by Progress</option>
              <option value="grade">Sort by Grade</option>
              <option value="enrollment">Sort by Enrollment</option>
            </select>
          </div>

          {/* View Toggle */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Students Grid/List */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
        {students.map((student) => (
          <div key={student.id} className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300 transform hover:scale-[1.02] ${
            viewMode === 'list' ? 'flex' : ''
          }`}>
            {/* Student Header */}
            <div className={`p-6 ${viewMode === 'list' ? 'flex items-center space-x-4 flex-1' : ''}`}>
              <div className={`flex items-center space-x-4 ${viewMode === 'list' ? 'flex-1' : 'mb-4'}`}>
                <div className="relative w-16 h-16">
                  <Image
                    src={student.avatar}
                    alt={student.name || "student"}
                    fill={true}
                    className="rounded-full object-cover border-4 border-gray-100"
                  />
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                    student.status === 'active' ? 'bg-green-500' : 
                    student.status === 'inactive' ? 'bg-gray-400' : 'bg-yellow-500'
                  }`}></div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-blue-700">{student.name}</h3>
                    <button className="p-1 text-gray-400 hover:text-gray-600 rounded">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    {getStatusBadge(student.status)}
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getGradeColor(student.grade)}`}>
                      {student.grade}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{student.email}</p>
                  <p className="text-xs text-gray-500">{student.location}</p>
                </div>
              </div>

              {/* Progress Section */}
              <div className={`${viewMode === 'list' ? 'w-64' : ''}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Progress</span>
                  <span className="text-sm font-bold text-blue-600">{student.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${student.progress}%` }}
                  ></div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-2 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-blue-700">{student.courses}</div>
                    <div className="text-xs text-gray-600">Courses</div>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-green-600">{student.completedCourses}</div>
                    <div className="text-xs text-gray-600">Completed</div>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-purple-600">{student.totalHours}</div>
                    <div className="text-xs text-gray-600">Hours</div>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-orange-600">{student.certificates}</div>
                    <div className="text-xs text-gray-600">Certificates</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Achievements */}
            {student.achievements.length > 0 && (
              <div className="px-6 pb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Award className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm font-medium text-gray-700">Achievements</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {student.achievements.map((achievement, index) => (
                    <span key={index} className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                      {achievement}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="px-6 py-4 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                    <MessageCircle className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-xs text-gray-500">
                  Last active: {student.lastActive}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Showing 1-6 of {students.length} students
        </div>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-2 text-sm text-gray-600 hover:text-blue-700 disabled:opacity-50 disabled:cursor-not-allowed">
            Previous
          </button>
          <button className="px-3 py-2 text-sm bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg">1</button>
          <button className="px-3 py-2 text-sm text-gray-600 hover:text-blue-700">2</button>
          <button className="px-3 py-2 text-sm text-gray-600 hover:text-blue-700">3</button>
          <button className="px-3 py-2 text-sm text-gray-600 hover:text-blue-700">
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
