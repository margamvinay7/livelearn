"use client"
import { useState } from "react";
import {
  Tag,
  BookOpen,
  Edit,
  Trash2,
  Plus
} from "lucide-react";

const mockCategories = [
  { id: "programming", name: "Programming", count: 5 },
  { id: "data-science", name: "Data Science", count: 3 },
  { id: "design", name: "Design", count: 2 },
  { id: "marketing", name: "Marketing", count: 1 },
  { id: "business", name: "Business", count: 1 }
];

export default function CourseCategoriesPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>("grid");

  return (
    <div className="min-h-screen bg-gray-50 p-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1 flex items-center gap-2">
            <Tag className="w-8 h-8 text-blue-600" /> Course Categories
          </h1>
          <p className="text-gray-600">Manage and organize your course categories</p>
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
            <span>Add Category</span>
          </button>
        </div>
      </div>

      {/* Categories List/Grid */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' : 'space-y-6'}>
        {mockCategories.map((cat) => (
          <div
            key={cat.id}
            className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300 transform hover:scale-[1.02] ${viewMode === 'list' ? 'flex' : ''}`}
          >
            {/* Category Content */}
            <div className={`p-6 flex flex-col justify-between ${viewMode === 'list' ? 'flex-1' : ''}`}>
              <div className="flex items-center gap-3 mb-2">
                <Tag className="w-6 h-6 text-blue-500" />
                <span className="text-lg font-bold text-gray-900">{cat.name}</span>
                <span className="text-xs font-mono text-gray-400 bg-gray-100 px-2 py-1 rounded">{cat.id}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                <BookOpen className="w-4 h-4" /> {cat.count} {cat.count === 1 ? "course" : "courses"}
              </div>
              {/* Actions */}
              <div className="flex items-center gap-2 mt-4">
                <button className="flex items-center gap-1 px-3 py-1.5 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium">
                  <Edit className="w-4 h-4" /> Edit
                </button>
                <button className="flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium">
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
