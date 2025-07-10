"use client"

import { 

  Calendar,
  Clock,
  Users,
  MapPin,

  Award,
  TrendingUp,

  Upload,
  Eye,
  Edit,
  
} from 'lucide-react'
import CalendarPage from '@/components/Calendar'

export default function SchedulePage() {


  // Mock data
  const events = [
    {
      id: 1,
      title: "React Development Workshop",
      type: "workshop",
      instructor: "John Doe",
      date: new Date(2024, 1, 15, 10, 0),
      duration: 120,
      students: 25,
      location: "Room A-101",
      status: "upcoming",
      description: "Advanced React concepts and hands-on coding session",
      category: "Programming",
      maxStudents: 30,
      price: "$99"
    },
    {
      id: 2,
      title: "Python Data Analysis",
      type: "lecture",
      instructor: "Sarah Wilson",
      date: new Date(2024, 1, 16, 14, 30),
      duration: 90,
      students: 18,
      location: "Online",
      status: "upcoming",
      description: "Introduction to data analysis with Python",
      category: "Data Science",
      maxStudents: 25,
      price: "$79"
    },
    {
      id: 3,
      title: "UI/UX Design Review",
      type: "review",
      instructor: "Mike Johnson",
      date: new Date(2024, 1, 17, 9, 0),
      duration: 60,
      students: 12,
      location: "Room B-205",
      status: "completed",
      description: "Portfolio review and feedback session",
      category: "Design",
      maxStudents: 15,
      price: "$59"
    }
  ]

  const stats = [
    {
      title: "Total Events",
      value: events.length.toString(),
      change: "+2",
      changeType: "positive",
      icon: Calendar,
      color: "bg-blue-500"
    },
    {
      title: "Active Students",
      value: "105",
      change: "+8%",
      changeType: "positive",
      icon: Users,
      color: "bg-green-500"
    },
    {
      title: "Upcoming Sessions",
      value: "4",
      change: "+1",
      changeType: "positive",
      icon: Clock,
      color: "bg-purple-500"
    },
    {
      title: "Completion Rate",
      value: "92%",
      change: "+3%",
      changeType: "positive",
      icon: Award,
      color: "bg-orange-500"
    }
  ]

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'workshop':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'lecture':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'review':
        return 'bg-purple-100 text-purple-800 border-purple-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-yellow-100 text-yellow-800'
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    })
  }

  





  

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Schedule & Calendar</h1>
            <p className="text-gray-600">Manage your learning sessions and events</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all duration-200 transform hover:scale-105">
              <Upload className="w-4 h-4" />
              <span>Import Events</span>
            </button>
            {/* <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 transform hover:scale-105">
              <Plus className="w-4 h-4" />
              <span>Add Event</span>
            </button> */}
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

      <CalendarPage/>

      {/* Upcoming Events */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Upcoming Events</h2>
          <div className="space-y-4">
            {events
              .filter(event => event.status === 'upcoming')
              .slice(0, 5)
              .map((event) => (
                <div
                  key={event.id}
                  className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200 transform hover:scale-[1.02] cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getEventTypeColor(event.type)}`}>
                          {event.type}
                        </span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(event.status)}`}>
                          {event.status}
                        </span>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-1">{event.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{formatTime(event.date)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-3 h-3" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="w-3 h-3" />
                          <span>{event.students}/{event.maxStudents}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-green-600 hover:bg-green-50 rounded">
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          {/* <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-all duration-200 transform hover:scale-105">
                <Calendar className="w-4 h-4" />
                <span>Schedule New Event</span>
              </button>
              <button className="w-full flex items-center justify-center space-x-2 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-all duration-200 transform hover:scale-105">
                <Users className="w-4 h-4" />
                <span>Invite Students</span>
              </button>
              <button className="w-full flex items-center justify-center space-x-2 bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-all duration-200 transform hover:scale-105">
                <Download className="w-4 h-4" />
                <span>Export Schedule</span>
              </button>
            </div>
          </div> */}

          {/* Event Statistics */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Event Statistics</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Workshops</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '40%' }}></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">2</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Lectures</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">3</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Reviews</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: '20%' }}></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">1</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
