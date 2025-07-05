"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { 
  LayoutDashboard, 
  BarChart3, 
  BookOpen, 
  Calendar, 
  ChevronDown,
  ChevronRight,
  Settings,
  LogOut,
  User,
  Bell,
  Search,
  Home,
  GraduationCap,
  Users,
  FileText,
  Award,
  HelpCircle,
  Plus,
  UserPlus,
  UserCheck,
  CalendarDays
} from 'lucide-react'

export default function Sidebar(){
    const pathname = usePathname()
    const [expandedItems, setExpandedItems] = useState<string[]>([])

    const list=[
        {
            name:"Dashboard",
            path:"/admin/dashboard",
            icon: LayoutDashboard
        },
        {
            name:"Analytics",
            path:"/admin/analytics",
            icon: BarChart3
        },
        {
            name:"Courses",
            path:"/admin/courses",
            icon: BookOpen,
            children: [
                {
                    name: "All Courses",
                    path: "/admin/courses",
                    icon: GraduationCap
                },
                {
                    name: "Create Course",
                    path: "/admin/courses/create",
                    icon: Plus
                },
                {
                    name: "Categories",
                    path: "/admin/courses/categories",
                    icon: FileText
                }
            ]
        },
        {
            name:"Students",
            path:"/admin/students",
            icon: Users,
            children: [
                {
                    name: "All Students",
                    path: "/admin/students",
                    icon: Users
                },
                {
                    name: "Add Student",
                    path: "/admin/students/add",
                    icon: UserPlus
                },
                {
                    name: "Student Groups",
                    path: "/admin/students/groups",
                    icon: UserCheck
                }
            ]
        },
        {
            name:"Schedule",
            path:"/admin/schedule",
            icon: Calendar,
            children: [
                {
                    name: "Calendar",
                    path: "/admin/schedule/calendar",
                    icon: Calendar
                },
                {
                    name: "Events",
                    path: "/admin/schedule/events",
                    icon: CalendarDays
                }
            ]
        },
        {
            name:"Certificates",
            path:"/admin/certificates",
            icon: Award
        },
        {
            name:"Help & Support",
            path:"/admin/support",
            icon: HelpCircle
        }
    ]

    const toggleExpanded = (itemName: string) => {
        setExpandedItems(prev => 
            prev.includes(itemName) 
                ? prev.filter(name => name !== itemName)
                : [...prev, itemName]
        )
    }

    const isActive = (path: string) => pathname === path
    const hasActiveChild = (children: any[]) => children?.some(child => isActive(child.path))

    // Mock user data
    const user = {
        name: "John Doe",
        email: "john.doe@example.com",
        role: "Administrator",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    }

    return(
        <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col">
            {/* Logo/Brand Section */}
            <div className="p-6 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                        <GraduationCap className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">LMS Admin</h1>
                        <p className="text-xs text-gray-500">Learning Management</p>
                    </div>
                </div>
            </div>

            {/* Search Bar */}
            <div className="p-4 border-b border-gray-200">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                </div>
            </div>

            {/* Navigation Menu */}
            <div className="flex-1 overflow-y-auto py-4">
                <nav className="px-4 space-y-2">
                    {list.map((item) => (
                        <div key={item.name}>
                            {item.children ? (
                                // Item with children - dropdown
                                <div>
                                    <button
                                        onClick={() => toggleExpanded(item.name)}
                                        className={`w-full text-left px-4 py-3 rounded-lg flex items-center justify-between transition-all duration-200 group ${
                                            isActive(item.path) || hasActiveChild(item.children)
                                                ? "bg-blue-50 text-blue-700 border border-blue-200"
                                                : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                                        }`}
                                    >
                                        <div className="flex items-center space-x-3">
                                            <item.icon className={`w-5 h-5 ${
                                                isActive(item.path) || hasActiveChild(item.children)
                                                    ? "text-blue-600"
                                                    : "text-gray-500 group-hover:text-gray-700"
                                            }`} />
                                            <span className="font-medium">{item.name}</span>
                                        </div>
                                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                                            expandedItems.includes(item.name) ? "rotate-180" : ""
                                        }`} />
                                    </button>
                                    {expandedItems.includes(item.name) && (
                                        <div className="ml-4 mt-2 space-y-1">
                                            {item.children.map((child) => (
                                                <Link
                                                    key={child.name}
                                                    href={child.path}
                                                    className={`block px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-3 ${
                                                        isActive(child.path)
                                                            ? "bg-blue-100 text-blue-700 font-medium"
                                                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                                    }`}
                                                >
                                                    <child.icon className="w-4 h-4" />
                                                    <span className="text-sm">{child.name}</span>
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                // Item without children - simple link
                                <Link
                                    href={item.path}
                                    className={`block px-4 py-3 rounded-lg transition-all duration-200 flex items-center space-x-3 ${
                                        isActive(item.path)
                                            ? "bg-blue-50 text-blue-700 border border-blue-200 font-medium"
                                            : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                                    }`}
                                >
                                    <item.icon className={`w-5 h-5 ${
                                        isActive(item.path) ? "text-blue-600" : "text-gray-500"
                                    }`} />
                                    <span className="font-medium">{item.name}</span>
                                </Link>
                            )}
                        </div>
                    ))}
                </nav>
            </div>

            {/* User Profile Section */}
            <div className="border-t border-gray-200 p-4">
                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                    <div className="relative">
                        <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
                        />
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                        <p className="text-xs text-gray-500 truncate">{user.role}</p>
                    </div>
                    <div className="flex items-center space-x-1">
                        <button className="p-1 text-gray-400 hover:text-gray-600 rounded">
                            <Bell className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-gray-600 rounded">
                            <Settings className="w-4 h-4" />
                        </button>
                    </div>
                </div>
                
                {/* Quick Actions */}
                <div className="mt-3 pt-3 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                        <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                            <User className="w-4 h-4" />
                            <span>Profile</span>
                        </button>
                        <button className="flex items-center space-x-2 text-sm text-red-600 hover:text-red-700 transition-colors">
                            <LogOut className="w-4 h-4" />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}