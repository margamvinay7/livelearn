"use client"
import { useState } from 'react'
import { 
  Plus, 
  Search, 
 
  MoreHorizontal, 
  Eye, 
  Edit, 

  Users,
  User,

  Calendar,

  BookOpen,
  Award,
  TrendingUp,
  Grid,
  List,

  Upload,
  
  GraduationCap,
  Target,
  
  
  MessageSquare,

} from 'lucide-react'
import Image from 'next/image'

export default function StudentGroupsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)


  // Mock data - replace with real data from your API
  const groups = [
    {
      id: 1,
      name: "Advanced React Developers",
      description: "A group for students working on advanced React projects and applications",
      category: "Programming",
      instructor: "John Doe",
      students: 24,
      maxStudents: 30,
      createdDate: "2024-01-15",
      lastActivity: "2 hours ago",
      status: "active",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop",
      tags: ["React", "JavaScript", "Frontend"],
      progress: 85,
      averageGrade: "A-",
      upcomingEvents: 3,
      completedProjects: 8,
      achievements: ["Best Project Award", "Perfect Attendance"],
      members: [
        { id: 1, name: "Sarah Wilson", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face", role: "leader" },
        { id: 2, name: "Mike Johnson", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face", role: "member" },
        { id: 3, name: "Emily Brown", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face", role: "member" }
      ]
    },
    {
      id: 2,
      name: "Data Science Enthusiasts",
      description: "Exploring machine learning, statistics, and data analysis techniques",
      category: "Data Science",
      instructor: "Sarah Wilson",
      students: 18,
      maxStudents: 25,
      createdDate: "2024-01-10",
      lastActivity: "1 day ago",
      status: "active",
      image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=250&fit=crop",
      tags: ["Python", "Machine Learning", "Statistics"],
      progress: 72,
      averageGrade: "B+",
      upcomingEvents: 2,
      completedProjects: 6,
      achievements: ["Data Analysis Competition Winner"],
      members: [
        { id: 4, name: "David Chen", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face", role: "leader" },
        { id: 5, name: "Lisa Anderson", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face", role: "member" }
      ]
    },
    {
      id: 3,
      name: "UI/UX Design Masters",
      description: "Creating beautiful and functional user interfaces and experiences",
      category: "Design",
      instructor: "Mike Johnson",
      students: 15,
      maxStudents: 20,
      createdDate: "2024-01-08",
      lastActivity: "3 days ago",
      status: "active",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop",
      tags: ["Figma", "Adobe Creative Suite", "Prototyping"],
      progress: 68,
      averageGrade: "B",
      upcomingEvents: 1,
      completedProjects: 5,
      achievements: ["Design Excellence Award"],
      members: [
        { id: 6, name: "Alex Thompson", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face", role: "leader" }
      ]
    },
    {
      id: 4,
      name: "Full Stack Developers",
      description: "Building complete web applications from frontend to backend",
      category: "Programming",
      instructor: "David Chen",
      students: 22,
      maxStudents: 28,
      createdDate: "2024-01-12",
      lastActivity: "5 hours ago",
      status: "active",
      image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=250&fit=crop",
      tags: ["Node.js", "React", "MongoDB", "Express"],
      progress: 91,
      averageGrade: "A",
      upcomingEvents: 4,
      completedProjects: 10,
      achievements: ["Full Stack Challenge Winner", "Best Team Collaboration"],
      members: [
        { id: 7, name: "Emma Davis", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face", role: "leader" },
        { id: 8, name: "James Wilson", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face", role: "member" }
      ]
    },
    {
      id: 5,
      name: "Digital Marketing Pros",
      description: "Learning modern digital marketing strategies and tools",
      category: "Marketing",
      instructor: "Lisa Anderson",
      students: 12,
      maxStudents: 15,
      createdDate: "2024-01-05",
      lastActivity: "1 week ago",
      status: "inactive",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
      tags: ["SEO", "Social Media", "Google Ads"],
      progress: 45,
      averageGrade: "C+",
      upcomingEvents: 0,
      completedProjects: 3,
      achievements: [],
      members: [
        { id: 9, name: "Maria Garcia", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face", role: "leader" }
      ]
    },
    {
      id: 6,
      name: "Cybersecurity Warriors",
      description: "Exploring ethical hacking, network security, and cyber defense",
      category: "Security",
      instructor: "Alex Thompson",
      students: 16,
      maxStudents: 20,
      createdDate: "2024-01-18",
      lastActivity: "30 minutes ago",
      status: "active",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=250&fit=crop",
      tags: ["Ethical Hacking", "Network Security", "Penetration Testing"],
      progress: 78,
      averageGrade: "A-",
      upcomingEvents: 2,
      completedProjects: 7,
      achievements: ["Security Challenge Winner"],
      members: [
        { id: 10, name: "Ryan Miller", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face", role: "leader" }
      ]
    }
  ]

  const stats = [
    {
      title: "Total Groups",
      value: groups.length.toString(),
      change: "+3",
      changeType: "positive",
      icon: Users,
      color: "bg-blue-500"
    },
    {
      title: "Active Groups",
      value: groups.filter(g => g.status === 'active').length.toString(),
      change: "+2",
      changeType: "positive",
      icon: User,
      color: "bg-green-500"
    },
    {
      title: "Total Students",
      value: groups.reduce((sum, group) => sum + group.students, 0).toString(),
      change: "+15%",
      changeType: "positive",
      icon: GraduationCap,
      color: "bg-purple-500"
    },
    {
      title: "Avg. Progress",
      value: "76%",
      change: "+8%",
      changeType: "positive",
      icon: Target,
      color: "bg-orange-500"
    }
  ]

  const categories = [
    { id: 'all', name: 'All Categories', count: groups.length },
    { id: 'programming', name: 'Programming', count: 2 },
    { id: 'data-science', name: 'Data Science', count: 1 },
    { id: 'design', name: 'Design', count: 1 },
    { id: 'marketing', name: 'Marketing', count: 1 },
    { id: 'security', name: 'Security', count: 1 }
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
      case 'A':
        return 'text-green-600 bg-green-100'
      case 'A-':
        return 'text-green-600 bg-green-100'
      case 'B+':
        return 'text-blue-600 bg-blue-100'
      case 'B':
        return 'text-blue-600 bg-blue-100'
      case 'C+':
        return 'text-yellow-600 bg-yellow-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Student Groups</h1>
            <p className="text-gray-600">Manage and organize student groups for collaborative learning</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all duration-200 transform hover:scale-105">
              <Upload className="w-4 h-4" />
              <span>Import Groups</span>
            </button>
            <button 
              onClick={() => setShowCreateModal(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 transform hover:scale-105"
            >
              <Plus className="w-4 h-4" />
              <span>Create Group</span>
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
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
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
                placeholder="Search groups..."
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

      {/* Groups Grid/List */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
        {groups.map((group) => (
          <div key={group.id} className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300 transform hover:scale-[1.02] ${
            viewMode === 'list' ? 'flex' : ''
          }`}>
            {/* Group Image */}
            <div className={`${viewMode === 'list' ? 'w-48 h-32 flex-shrink-0' : 'h-48'} relative w-full h-full`}>
              <Image
                src={group.image}
                alt={group.name}
                fill={true}
                className="object-cover"
              />
            </div>

            {/* Group Content */}
            <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{group.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{group.description}</p>
                </div>
                <button className="p-1 text-gray-400 hover:text-gray-600 rounded">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>

              {/* Group Meta */}
              <div className="flex items-center space-x-2 mb-3">
                <User className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">{group.instructor}</span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-4">
                {group.tags.map((tag, index) => (
                  <span key={index} className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{group.students}/{group.maxStudents}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{group.completedProjects} projects</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{group.upcomingEvents} events</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="w-4 h-4 text-gray-400" />
                  <span className={`text-sm font-medium ${getGradeColor(group.averageGrade)} px-2 py-1 rounded`}>
                    {group.averageGrade}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                  <span>Progress</span>
                  <span>{group.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500" 
                    style={{ width: `${group.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Status and Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {getStatusBadge(group.status)}
                  <span className="text-xs text-gray-500">Created {formatDate(group.createdDate)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                    <MessageSquare className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Showing 1-6 of {groups.length} groups
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

      {/* Create Group Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 transform transition-all duration-300">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Create New Group</h2>
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                >
                  <span className="sr-only">Close</span>
                  ×
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Group Name *</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter group name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Describe the group's purpose and goals..."
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="">Select category</option>
                      <option value="programming">Programming</option>
                      <option value="data-science">Data Science</option>
                      <option value="design">Design</option>
                      <option value="marketing">Marketing</option>
                      <option value="security">Security</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Max Students</label>
                    <input
                      type="number"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter max students"
                      min="1"
                      max="50"
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
                  <button 
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Create Group
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
