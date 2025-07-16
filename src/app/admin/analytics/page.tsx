"use client"
import { useState } from 'react'
import { 
  TrendingUp, 

  Users, 
 
  DollarSign, 
  Award,
 
  Clock,
 
  Download,
  
  


  Target,

  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal
} from 'lucide-react'

export default function AnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('month')
  

  // Mock data - replace with real data from your API
  const overviewStats = [
    {
      title: "Total Revenue",
      value: "$124,563",
      change: "+12.5%",
      changeType: "positive",
      icon: DollarSign,
      color: "bg-green-500",
      trend: "up"
    },
    {
      title: "Active Students",
      value: "2,847",
      change: "+8.2%",
      changeType: "positive",
      icon: Users,
      color: "bg-blue-500",
      trend: "up"
    },
    {
      title: "Course Completion",
      value: "89.2%",
      change: "+3.1%",
      changeType: "positive",
      icon: Award,
      color: "bg-purple-500",
      trend: "up"
    },
    {
      title: "Avg. Session Time",
      value: "24m 32s",
      change: "-2.4%",
      changeType: "negative",
      icon: Clock,
      color: "bg-orange-500",
      trend: "down"
    }
  ]

  const chartData = {
    revenue: [
      { month: 'Jan', value: 12500 },
      { month: 'Feb', value: 15800 },
      { month: 'Mar', value: 14200 },
      { month: 'Apr', value: 18900 },
      { month: 'May', value: 22100 },
      { month: 'Jun', value: 25600 }
    ],
    enrollments: [
      { month: 'Jan', value: 450 },
      { month: 'Feb', value: 520 },
      { month: 'Mar', value: 480 },
      { month: 'Apr', value: 610 },
      { month: 'May', value: 680 },
      { month: 'Jun', value: 720 }
    ]
  }

  const topPerformingCourses = [
    {
      id: 1,
      title: "React Development Masterclass",
      instructor: "John Doe",
      revenue: "$12,450",
      enrollments: 234,
      completionRate: 92,
      rating: 4.8
    },
    {
      id: 2,
      title: "Python for Data Science",
      instructor: "Sarah Wilson",
      revenue: "$9,870",
      enrollments: 189,
      completionRate: 88,
      rating: 4.9
    },
    {
      id: 3,
      title: "UI/UX Design Fundamentals",
      instructor: "Mike Johnson",
      revenue: "$8,230",
      enrollments: 156,
      completionRate: 85,
      rating: 4.7
    },
    {
      id: 4,
      title: "Machine Learning Basics",
      instructor: "Emily Brown",
      revenue: "$7,890",
      enrollments: 142,
      completionRate: 90,
      rating: 4.6
    }
  ]

  const studentDemographics = [
    { age: "18-24", count: 1250, percentage: 35 },
    { age: "25-34", count: 980, percentage: 28 },
    { age: "35-44", count: 720, percentage: 20 },
    { age: "45+", count: 580, percentage: 17 }
  ]

  const deviceUsage = [
    { device: "Desktop", count: 1850, percentage: 52 },
    { device: "Mobile", count: 1200, percentage: 34 },
    { device: "Tablet", count: 520, percentage: 14 }
  ]

  const getTrendIcon = (trend: string) => {
    return trend === "up" ? 
      <ArrowUpRight className="w-4 h-4 text-green-500" /> : 
      <ArrowDownRight className="w-4 h-4 text-red-500" />
  }

  const getBarHeight = (value: number, max: number) => {
    return `${(value / max) * 100}%`
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-blue-700 mb-2">Analytics Dashboard</h1>
            <p className="text-gray-600">Comprehensive insights into your learning platform performance</p>
          </div>
          <div className="flex items-center space-x-3">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="quarter">Last Quarter</option>
              <option value="year">Last Year</option>
            </select>
            <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Download className="w-4 h-4" />
              <span>Export Report</span>
            </button>
          </div>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {overviewStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-blue-700 mt-1">{stat.value}</p>
                <div className="flex items-center mt-2">
                  {getTrendIcon(stat.trend)}
                  <span className={`text-sm font-medium ml-1 ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">vs last period</span>
                </div>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Revenue Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-blue-700">Revenue Trend</h2>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="h-64 flex items-end justify-between space-x-2">
            {chartData.revenue.map((item, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="w-full bg-gray-200 rounded-t-lg relative" style={{ height: '200px' }}>
                <div 
                    className="bg-gradient-to-t from-blue-600 to-blue-400 absolute bottom-0  w-full  rounded-t-lg transition-all duration-500"
                    style={{ height: getBarHeight(item.value, 30000) }}
                  ></div>
                </div>
                <span className="text-xs text-gray-600 mt-2">{item.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Enrollments Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-blue-700">Student Enrollments</h2>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="h-64 flex items-end justify-between space-x-2">
            {chartData.enrollments.map((item, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="w-full bg-gray-200 rounded-t-lg relative" style={{ height: '200px' }}>
                  <div 
                    className="bg-gradient-to-t from-green-600 to-green-400 absolute bottom-0 w-full rounded-t-lg transition-all duration-500"
                    style={{ height: getBarHeight(item.value, 800) }}
                  ></div>
                </div>
                <span className="text-xs text-gray-600 mt-2">{item.month}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Top Performing Courses */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-blue-700">Top Performing Courses</h2>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View All
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-blue-700">Course</th>
                    <th className="text-left py-3 px-4 font-medium text-blue-700">Revenue</th>
                    <th className="text-left py-3 px-4 font-medium text-blue-700">Enrollments</th>
                    <th className="text-left py-3 px-4 font-medium text-blue-700">Completion</th>
                    <th className="text-left py-3 px-4 font-medium text-blue-700">Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {topPerformingCourses.map((course) => (
                    <tr key={course.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium text-blue-700">{course.title}</p>
                          <p className="text-sm text-gray-600">{course.instructor}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-600 font-medium">{course.revenue}</td>
                      <td className="py-3 px-4 text-gray-600">{course.enrollments}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full" 
                              style={{ width: `${course.completionRate}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600">{course.completionRate}%</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <span className="text-yellow-500">★</span>
                          <span className="ml-1 text-gray-600">{course.rating}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Demographics & Device Usage */}
        <div className="space-y-6">
          {/* Student Demographics */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-blue-700 mb-4">Student Demographics</h2>
            <div className="space-y-4">
              {studentDemographics.map((demo, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{demo.age}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${demo.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-blue-700 w-8">{demo.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Device Usage */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-blue-700 mb-4">Device Usage</h2>
            <div className="space-y-4">
              {deviceUsage.map((device, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{device.device}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-purple-500 h-2 rounded-full" 
                        style={{ width: `${device.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-blue-700 w-8">{device.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Insights */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-blue-700 mb-4">Quick Insights</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-green-800">Revenue up 12.5%</p>
                  <p className="text-xs text-green-600">Compared to last month</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <Users className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-800">New enrollments</p>
                  <p className="text-xs text-blue-600">156 students this week</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                  <Target className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-orange-800">Goal achieved</p>
                  <p className="text-xs text-orange-600">89% completion rate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
