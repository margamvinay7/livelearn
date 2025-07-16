"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ForwardRefExoticComponent, RefAttributes, useState } from "react"
import { 
  LayoutDashboard, 
  BarChart3, 
  BookOpen, 
  Calendar, 
  ChevronDown,
  Settings,
  LogOut,
  User,
  Bell,
  Search,
  GraduationCap,
  Users,
  FileText,
  Award,
  Plus,
  UserPlus,
  UserCheck,
  MessageSquare,
  MessagesSquare,
  IndianRupee,
  Signature,
  LucideProps
  
} from 'lucide-react'
import Image from "next/image"
// import { useAuth } from "@/context/AuthContext";

interface Children {
    name:string,
    path?: string,
    icon:ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
}

export default function Sidebar(){
    // const { user } = useAuth();
    const user={
        name:"hello",
        role:"learner",
        avatar:""
    }
    
    const pathname = usePathname()
    const [expandedItems, setExpandedItems] = useState<string[]>([])

    if (!user) return null;
    

    // Role-based path prefix
    const rolePrefix = user.role === "admin" ? "/admin" : user.role === "instructor" ? "/instructor" : "/learner";

    // List with role-based paths
    const list=[
        {
            name:"Dashboard",
            path:`${rolePrefix}/dashboard`,
            icon: LayoutDashboard
        },
        {
            name:"Analytics",
            path:`${rolePrefix}/analytics`,
            icon: BarChart3
        },
        {
            name:"Courses",
            path:`${rolePrefix}/courses`,
            icon: BookOpen,
            children: [
                {
                    name: "All Courses",
                    path: `${rolePrefix}/courses`,
                    icon: GraduationCap
                },
                {
                    name: "Create Course",
                    path: user.role === "admin" ? `${rolePrefix}/courses/createcourse` : undefined,
                    icon: Plus
                },
                {
                    name: "Categories",
                    path: user.role === "admin" ? `${rolePrefix}/courses/categories` : undefined,
                    icon: FileText
                }
            ].filter(child => child.path) // Remove undefined for non-admins
        },{
            name:"Instructors",
            path: user.role === "admin"  ? `${rolePrefix}/instructors` : undefined,
            icon: Users,
            children: [
                {
                    name: "All Instructors",
                    path: `${rolePrefix}/instructor`,
                    icon: Users
                },
                {
                    name: "Add Instructor",
                    path: user.role === "admin" ? `${rolePrefix}/instructors/addinstructor`:undefined,
                    icon: UserPlus
                },
            ]
        },
        {
            name:"Students",
            path: user.role === "admin" || user.role === "instructor" ? `${rolePrefix}/students` : undefined,
            icon: Users,
            children: [
                {
                    name: "All Students",
                    path: `${rolePrefix}/students`,
                    icon: Users
                },
                {
                    name: "Add Student",
                    path: user.role === "admin" ? `${rolePrefix}/students/addstudent`:undefined,
                    icon: UserPlus
                },
                {
                    name: "Student Groups",
                    path: `${rolePrefix}/students/studentgroups`,
                    icon: UserCheck
                }
            ].filter(child=>child.path)
        },
        // {
        //     name:"Schedule",
        //     path:`${rolePrefix}/schedule`,
        //     icon: Calendar,
        //     children: [
        //         {
        //             name: "Calendar",
        //             path: `${rolePrefix}/schedule`,
        //             icon: Calendar
        //         },
        //         {
        //             name: "Events",
        //             path: `${rolePrefix}/schedule/events`,
        //             icon: CalendarDays
        //         },
        //         {
        //             name: "Add Event",
        //             path: user.role === "admin" ? `${rolePrefix}/schedule/addevent` : undefined,
        //             icon: Plus
        //         },
        //     ].filter(child => child.path)
        // },
        {
            name:"Schedule",
            path:`${rolePrefix}/schedule`,
            icon: Calendar,
        },
        {
            name:"Certificates",
            path:`${rolePrefix}/certificates`,
            icon: Award,
            children:[
                {
                    name:"Certificates",
                    path:`${rolePrefix}/certificates`,
                    icon: Award,
                },
                {
                    name:"Issue Certificate",
                    path: user.role === "admin" ? `${rolePrefix}/certificates/issuecertificates`:undefined,
                    icon: Signature,
                },
            ].filter(child=>child.path)
        },
        {
            name:"Payments",
            path: `${rolePrefix}/payments`,
            icon: IndianRupee
        },
        {
            name:"Chat",
            path:"/chat",
            icon: MessageSquare 
        },
        {
            name:"Community",
            path:"/community",
            icon: MessagesSquare
        }
    ]

    // Filter out items with undefined path (for non-admin roles)
    const filteredList = list.filter(item => item.path);
    

    const toggleExpanded = (itemName: string) => {
        setExpandedItems(prev => 
            prev.includes(itemName) 
                ? prev.filter(name => name !== itemName)
                : [...prev, itemName]
        )
    }

    // Update isActive to handle undefined
    const isActive = (path?: string) => !!path && pathname === path;
    const hasActiveChild = (children: Children[]) => children?.some(child => isActive(child.path))

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
                    {filteredList.map((item) => (
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
                                    {expandedItems.includes(item.name) && item.children && (
                                        <div className="ml-4 mt-2 space-y-1">
                                            {item.children
                                                .filter((child): child is typeof child & { path: string } => typeof child.path === "string")
                                                .map((child) => (
                                                <Link
                                                    key={child.name}
                                                    href={`${child.path}`}
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
                                typeof item.path === 'string' && (
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
                                )
                            )}
                        </div>
                    ))}
                </nav>
            </div>

            {/* User Profile Section */}
            <div className="border-t border-gray-200 p-4">
                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                    <div className="relative w-10 h-10">
                        <Image
                            src={user?.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"}
                            alt={user.name}
                            fill={true}
                            className="rounded-full object-cover border-2 border-gray-200"
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