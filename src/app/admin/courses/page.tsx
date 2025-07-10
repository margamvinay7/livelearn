"use client"
import { useState } from 'react'
import { 
  Plus, 
  Search, 
 
  MoreHorizontal, 
  Eye, 
  Edit, 
  Trash2, 

  Clock,
  Users,
  Star,
  BookOpen,

  DollarSign,

  TrendingUp,
  Grid,
  List,

  Upload,

  User,
 

} from 'lucide-react'
import Image from 'next/image'

export default function CoursesPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Mock data - replace with real data from your API
  const courses = [
    {
      id: 1,
      title: "React Development Masterclass",
      instructor: "John Doe",
      category: "Programming",
      level: "Advanced",
      duration: "12 hours",
      students: 234,
      price: "$99",
      rating: 4.8,
      reviews: 156,
      status: "published",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop",
      description: "Master React development with hands-on projects and real-world applications.",
      lastUpdated: "2 days ago",
      completionRate: 92,
      revenue: "$12,450"
    },
    {
      id: 2,
      title: "Python for Data Science",
      instructor: "Sarah Wilson",
      category: "Data Science",
      level: "Intermediate",
      duration: "8 hours",
      students: 189,
      price: "$79",
      rating: 4.9,
      reviews: 98,
      status: "published",
      image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=250&fit=crop",
      description: "Learn Python programming for data analysis and machine learning.",
      lastUpdated: "1 week ago",
      completionRate: 88,
      revenue: "$9,870"
    },
    {
      id: 3,
      title: "UI/UX Design Fundamentals",
      instructor: "Mike Johnson",
      category: "Design",
      level: "Beginner",
      duration: "6 hours",
      students: 156,
      price: "$69",
      rating: 4.7,
      reviews: 87,
      status: "draft",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop",
      description: "Learn the fundamentals of user interface and user experience design.",
      lastUpdated: "3 days ago",
      completionRate: 85,
      revenue: "$8,230"
    },
    {
      id: 4,
      title: "Machine Learning Basics",
      instructor: "Emily Brown",
      category: "Data Science",
      level: "Advanced",
      duration: "15 hours",
      students: 142,
      price: "$129",
      rating: 4.6,
      reviews: 76,
      status: "published",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop",
      description: "Introduction to machine learning algorithms and applications.",
      lastUpdated: "5 days ago",
      completionRate: 90,
      revenue: "$7,890"
    },
    {
      id: 5,
      title: "JavaScript Fundamentals",
      instructor: "David Chen",
      category: "Programming",
      level: "Beginner",
      duration: "10 hours",
      students: 298,
      price: "$59",
      rating: 4.5,
      reviews: 134,
      status: "published",
      image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=250&fit=crop",
      description: "Master JavaScript from basics to advanced concepts.",
      lastUpdated: "1 week ago",
      completionRate: 87,
      revenue: "$11,230"
    },
    {
      id: 6,
      title: "Digital Marketing Strategy",
      instructor: "Lisa Anderson",
      category: "Marketing",
      level: "Intermediate",
      duration: "7 hours",
      students: 167,
      price: "$89",
      rating: 4.4,
      reviews: 92,
      status: "published",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
      description: "Learn effective digital marketing strategies for business growth.",
      lastUpdated: "4 days ago",
      completionRate: 83,
      revenue: "$6,450"
    }
  ]

  const categories = [
    { id: 'all', name: 'All Categories', count: courses.length },
    { id: 'programming', name: 'Programming', count: 2 },
    { id: 'data-science', name: 'Data Science', count: 2 },
    { id: 'design', name: 'Design', count: 1 },
    { id: 'marketing', name: 'Marketing', count: 1 }
  ]

  const stats = [
    {
      title: "Total Courses",
      value: courses.length.toString(),
      change: "+3",
      changeType: "positive",
      icon: BookOpen,
      color: "bg-blue-500"
    },
    {
      title: "Active Students",
      value: "1,186",
      change: "+12%",
      changeType: "positive",
      icon: Users,
      color: "bg-green-500"
    },
    {
      title: "Total Revenue",
      value: "$55,120",
      change: "+18%",
      changeType: "positive",
      icon: DollarSign,
      color: "bg-purple-500"
    },
    {
      title: "Avg. Rating",
      value: "4.7",
      change: "+0.2",
      changeType: "positive",
      icon: Star,
      color: "bg-orange-500"
    }
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Published</span>
      case 'draft':
        return <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">Draft</span>
      default:
        return <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">Unknown</span>
    }
  }

  const getLevelBadge = (level: string) => {
    switch (level) {
      case 'beginner':
        return <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">Beginner</span>
      case 'intermediate':
        return <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">Intermediate</span>
      case 'advanced':
        return <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">Advanced</span>
      default:
        return <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">Unknown</span>
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Course Management</h1>
            <p className="text-gray-600">Manage and organize your learning content</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
              <Upload className="w-4 h-4" />
              <span>Import</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Plus className="w-4 h-4" />
              <span>Create Course</span>
            </button>
          </div>
        </div>
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
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium text-green-600 ml-1">{stat.change}</span>
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

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name} ({category.count})
                </option>
              ))}
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

      {/* Courses Grid/List */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
        {courses.map((course) => (
          <div key={course.id} className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow ${
            viewMode === 'list' ? 'flex' : ''
          }`}>
            {/* Course Image */}
            <div className={viewMode === 'list' ? 'w-48 h-32 flex-shrink-0' : 'h-48'}>
              <Image
                src={course.image}
                alt={course.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Course Content */}
            <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{course.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{course.description}</p>
                </div>
                <button className="p-1 text-gray-400 hover:text-gray-600 rounded">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>

              {/* Course Meta */}
              <div className="flex items-center space-x-2 mb-3">
                <User className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">{course.instructor}</span>
              </div>

              {/* Badges */}
              <div className="flex items-center space-x-2 mb-4">
                {getStatusBadge(course.status)}
                {getLevelBadge(course.level)}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{course.duration}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{course.students} students</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm text-gray-600">{course.rating} ({course.reviews})</span>
                </div>
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium text-green-600">{course.price}</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                  <span>Completion Rate</span>
                  <span>{course.completionRate}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${course.completionRate}%` }}
                  ></div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-xs text-gray-500">
                  Updated {course.lastUpdated}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Showing 1-6 of {courses.length} courses
        </div>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed">
            Previous
          </button>
          <button className="px-3 py-2 text-sm bg-blue-600 text-white rounded-lg">1</button>
          <button className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900">2</button>
          <button className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900">3</button>
          <button className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900">
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
