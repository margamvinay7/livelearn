"use client"
import { useState } from "react";
import {
  Award,
  User,
  BookOpen,
  Calendar,
  CheckCircle,
  Download,
  Plus,
  Eye
} from "lucide-react";

const mockCertifications = [
  {
    id: "CERT-2024-001",
    title: "React Developer Certificate",
    student: "Sarah Wilson",
    course: "React Development Masterclass",
    dateIssued: "2024-07-10",
    status: "Active",
    url: "#"
  },
  {
    id: "CERT-2024-002",
    title: "Python Data Science Certificate",
    student: "Mike Johnson",
    course: "Python for Data Science",
    dateIssued: "2024-07-08",
    status: "Active",
    url: "#"
  },
  {
    id: "CERT-2024-003",
    title: "UI/UX Design Certificate",
    student: "Emily Brown",
    course: "UI/UX Design Fundamentals",
    dateIssued: "2024-07-05",
    status: "Revoked",
    url: "#"
  },
  {
    id: "CERT-2024-004",
    title: "Machine Learning Certificate",
    student: "David Chen",
    course: "Machine Learning Basics",
    dateIssued: "2024-07-01",
    status: "Active",
    url: "#"
  }
];

function getStatusBadge(status: string) {
  switch (status) {
    case "Active":
      return <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Active</span>;
    case "Revoked":
      return <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">Revoked</span>;
    default:
      return <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">Unknown</span>;
  }
}

export default function CertificationsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>("grid");

  return (
    <div className="min-h-screen bg-gray-50 p-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1 flex items-center gap-2">
            <Award className="w-8 h-8 text-yellow-500" /> Certifications
          </h1>
          <p className="text-gray-600">Manage and view all issued certifications</p>
        </div>
        <div className="flex items-center gap-2">
          <button className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`} onClick={() => setViewMode('grid')}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>
          </button>
          <button className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`} onClick={() => setViewMode('list')}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="4" rx="1"/><rect x="3" y="10" width="18" height="4" rx="1"/><rect x="3" y="15" width="18" height="4" rx="1"/></svg>
          </button>
          <button className="ml-4 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow">
            <Plus className="w-4 h-4" />
            <span>Issue Certification</span>
          </button>
        </div>
      </div>

      {/* Certifications List/Grid */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' : 'space-y-6'}>
        {mockCertifications.map((cert) => (
          <div
            key={cert.id}
            className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300 transform hover:scale-[1.02] ${viewMode === 'list' ? 'flex' : ''}`}
          >
            {/* Certification Content */}
            <div className={`p-6 flex flex-col justify-between ${viewMode === 'list' ? 'flex-1' : ''}`}>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 text-xs rounded-lg border font-medium bg-yellow-50 text-yellow-700 border-yellow-200 flex items-center gap-1"><Award className="w-4 h-4" /> {cert.title}</span>
                  {getStatusBadge(cert.status)}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <User className="w-4 h-4" /> {cert.student}
                  <span>•</span>
                  <BookOpen className="w-4 h-4" /> {cert.course}
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                  <Calendar className="w-4 h-4" /> Issued: <span className="text-gray-700 font-medium">{new Date(cert.dateIssued).toLocaleDateString()}</span>
                  <span>•</span>
                  <span className="font-mono">{cert.id}</span>
                </div>
              </div>
              {/* Actions */}
              <div className="flex items-center gap-2 mt-4">
                <a href={cert.url} className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium" target="_blank" rel="noopener noreferrer">
                  <Eye className="w-4 h-4" /> View
                </a>
                <a href={cert.url} download className="flex items-center gap-1 px-3 py-1.5 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium">
                  <Download className="w-4 h-4" /> Download
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
