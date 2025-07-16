"use client"
import { useState } from "react";
import {
  Award,
  Upload,
  X,
  Save,
  Loader2,
  FileText,
  AlertCircle
} from "lucide-react";
import Image from "next/image";

// Mock data for students and courses
const students = [
  "Sarah Wilson",
  "Mike Johnson",
  "Emily Brown",
  "David Chen"
];
const courses = [
  "React Development Masterclass",
  "Python for Data Science",
  "UI/UX Design Fundamentals",
  "Machine Learning Basics"
];
const statuses = ["Active", "Revoked"];

function generateCertId() {
  return `CERT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
}

export default function IssueCertificationPage() {
  const [form, setForm] = useState({
    title: "",
    student: "",
    course: "",
    dateIssued: new Date().toISOString().slice(0, 10),
    certId: generateCertId(),
    status: "Active",
    file: null as File | null,
    description: ""
  });
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (field: string, value: string | unknown) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm((prev) => ({ ...prev, file }));
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (ev) => setFilePreview(ev.target?.result as string);
        reader.readAsDataURL(file);
      } else {
        setFilePreview(null);
      }
    }
  };

  const removeFile = () => {
    setForm((prev) => ({ ...prev, file: null }));
    setFilePreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!form.title || !form.student || !form.course || !form.dateIssued || !form.certId || !form.status) {
      setError("Please fill in all required fields.");
      return;
    }
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((res) => setTimeout(res, 1500));
    setIsSubmitting(false);
    // TODO: Show success or redirect
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-blue-700 mb-1 flex items-center gap-2">
            <Award className="w-8 h-8 text-yellow-500" /> Issue Certification
          </h1>
          <p className="text-gray-600">Fill out the form to issue a new certification</p>
        </div>
      </div>

      {/* Form Card */}
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden animate-fadeIn"
      >
        <div className="p-8 space-y-8">
          {/* File Upload */}
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-32 h-24 rounded-lg bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
                {filePreview ? (
                  <div className="w-full h-full relative">
                    <Image src={filePreview} alt="Certificate Preview" fill={true} className="object-cover" />
                  </div>
                ) : (
                  <FileText className="w-8 h-8 text-gray-400" />
                )}
              </div>
              <button
                type="button"
                onClick={() => document.getElementById("cert-file-upload")?.click()}
                className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
              >
                <Upload className="w-4 h-4" />
              </button>
              {form.file && (
                <button
                  type="button"
                  onClick={removeFile}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
              <input
                id="cert-file-upload"
                type="file"
                accept="image/*,application/pdf"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
            <div>
              <h3 className="font-medium text-blue-700 mb-1">Certificate File</h3>
              <p className="text-sm text-gray-600">Upload a certificate image or PDF (optional)</p>
            </div>
          </div>

          {/* Main Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Certificate Title *</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => handleChange("title", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter certificate title"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Student *</label>
              <select
                value={form.student}
                onChange={(e) => handleChange("student", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
              >
                <option value="">Select student</option>
                {students.map((student) => (
                  <option key={student} value={student}>{student}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Course *</label>
              <select
                value={form.course}
                onChange={(e) => handleChange("course", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
              >
                <option value="">Select course</option>
                {courses.map((course) => (
                  <option key={course} value={course}>{course}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date Issued *</label>
              <input
                type="date"
                value={form.dateIssued}
                onChange={(e) => handleChange("dateIssued", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Certificate ID *</label>
              <input
                type="text"
                value={form.certId}
                onChange={(e) => handleChange("certId", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 font-mono"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status *</label>
              <select
                value={form.status}
                onChange={(e) => handleChange("status", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Description/Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description / Notes</label>
            <textarea
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Add any notes or description for this certification..."
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          )}
        </div>
        {/* Actions */}
        <div className="px-8 py-6 bg-gray-50 border-t border-gray-200 flex items-center justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 shadow"
          >
            {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            <span>{isSubmitting ? "Issuing..." : "Issue Certification"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
