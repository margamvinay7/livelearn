"use client"
import { useState } from "react";
import {
  BookOpen,
  Clock,
  DollarSign,
  Upload,
  X,
  Save,
  Loader2,
  Image as ImageIcon,
} from "lucide-react";
import Image from "next/image";
import { useCreateCourseMutation } from "@/store/api/courseApi"; // Import the mutation
import { useRouter } from 'next/navigation';

const categories = [
  "Programming",
  "Data Science",
  "Design",
  "Marketing",
  "Business",
  "Other"
];
const levels = ["Beginner", "Intermediate", "Advanced"];
const statuses = ["Draft", "Published"];

export default function CreateCoursePage() {
  const router = useRouter();
  const [createCourse, { isLoading: isSubmitting }] = useCreateCourseMutation(); // Use the mutation

  const [form, setForm] = useState({
    title: "",
    category: "",
    level: "",
    instructor: "", // This will be the instructor's ID
    duration: "",
    price: "",
    description: "",
    poster: null as File | null,
    posterPreview: null as string | null,
    status: "Draft",
  });
  // const [editingChapterIndex, setEditingChapterIndex] = useState<number | null>(null);
  // const [chapterForm, setChapterForm] = useState({
  //   title: "",
  //   video: null as File | null,
  //   videoPreview: null as string | null
  // });

  // Course poster upload
  const handlePosterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm((prev) => ({ ...prev, poster: file }));
      const reader = new FileReader();
      reader.onload = (ev) => setForm((prev) => ({ ...prev, posterPreview: ev.target?.result as string }));
      reader.readAsDataURL(file);
    }
  };
  const removePoster = () => {
    setForm((prev) => ({ ...prev, poster: null, posterPreview: null }));
  };

  // Chapter video upload
  // const handleChapterVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     setChapterForm((prev) => ({ ...prev, video: file }));
  //     const reader = new FileReader();
  //     reader.onload = (ev) => setChapterForm((prev) => ({ ...prev, videoPreview: ev.target?.result as string }));
  //     reader.readAsDataURL(file);
  //   }
  // };
  // const removeChapterVideo = () => {
  //   setChapterForm((prev) => ({ ...prev, video: null, videoPreview: null }));
  // };

  // Add or edit chapter
  // const handleAddOrEditChapter = () => {
  //   if (!chapterForm.title || !chapterForm.video) return;
  //   if (editingChapterIndex !== null) {
  //     // Edit
  //     setForm((prev) => {
  //       const chapters = [...prev.chapters];
  //       chapters[editingChapterIndex] = { ...chapterForm };
  //       return { ...prev, chapters };
  //     });
  //     setEditingChapterIndex(null);
  //   } else {
  //     // Add
  //     setForm((prev) => ({ ...prev, chapters: [...prev.chapters, { ...chapterForm }] }));
  //   }
  //   setChapterForm({ title: "", video: null, videoPreview: null });
  // };
  // const handleEditChapter = (idx: number) => {
  //   setEditingChapterIndex(idx);
  //   setChapterForm({ ...form.chapters[idx] });
  // };
  // const handleDeleteChapter = (idx: number) => {
  //   setForm((prev) => ({ ...prev, chapters: prev.chapters.filter((_, i) => i !== idx) }));
  //   if (editingChapterIndex === idx) setEditingChapterIndex(null);
  // };

  // Course field change
  const handleChange = (field: string, value: string | unknown) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // Simulate course delete
  // const handleDeleteCourse = () => {
  //   if (window.confirm("Are you sure you want to delete this course?")) {
  //     // Simulate delete
  //     alert("Course deleted (simulation)");
  //     // Reset form
  //     setForm({
  //       title: "",
  //       category: "",
  //       level: "",
  //       instructor: "",
  //       duration: "",
  //       price: "",
  //       description: "",
  //       poster: null,
  //       posterPreview: null,
  //       status: "Draft",
  //       chapters: []
  //     });
  //   }
  // };

  // Simulate course edit (just alert for now)
  // const handleEditCourse = () => {
  //   alert("Edit course functionality (simulation)");
  // };

  // Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('description', form.description);
      formData.append('price', form.price);
      formData.append('instructorId', form.instructor);
      // Always append categories as array
      if (Array.isArray(form.category)) {
        form.category.forEach(cat => formData.append('categories[]', cat));
      } else if (form.category) {
        formData.append('categories[]', form.category);
      }
      formData.append('isPublished', form.status === 'Published' ? 'true' : 'false');
      if (form.poster) {
        formData.append('poster', form.poster);
      }
      // form.chapters.forEach((chapter, index) => {
      //   formData.append(`chapters[${index}][title]`, chapter.title);
      //   formData.append(`chapters[${index}][position]`, String(index + 1));
      //   if (chapter.video) {
      //     formData.append(`chapters[${index}][video]`, chapter.video);
      //   }
      // });

      const result = await createCourse(formData).unwrap();
      alert("Course created successfully!");
      router.push(`/admin/courses/addchapter?courseId=${result.course.id}`);
    } catch (error) {
      console.error("Failed to create course:", error);
      alert("Failed to create course. See console for details.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-blue-700 mb-1 flex items-center gap-2">
            <BookOpen className="w-8 h-8 text-blue-600" /> Create/Edit Course
          </h1>
          <p className="text-gray-600">Design and launch a new course for your learners</p>
        </div>
      </div>

      {/* Form Card */}
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden animate-fadeIn"
      >
        <div className="p-8 space-y-8">
          {/* Poster Upload */}
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-32 h-24 rounded-lg bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
                {form.posterPreview ? (
                  <div className="relative w-full h-full">
                    <Image src={form.posterPreview} alt="Course Poster" fill={true} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <ImageIcon className="w-8 h-8 text-gray-400" />
                )}
              </div>
              <button
                type="button"
                onClick={() => document.getElementById("course-poster-upload")?.click()}
                className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
              >
                <Upload className="w-4 h-4" />
              </button>
              {form.posterPreview && (
                <button
                  type="button"
                  onClick={removePoster}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
              <input
                id="course-poster-upload"
                type="file"
                accept="image/*"
                onChange={handlePosterChange}
                className="hidden"
              />
            </div>
            <div>
              <h3 className="font-medium text-blue-700 mb-1">Course Poster</h3>
              <p className="text-sm text-gray-600">Upload a poster/banner for the course</p>
            </div>
          </div>

          {/* Main Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Course Title *</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => handleChange("title", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter course title"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
              <select
                value={form.category}
                onChange={(e) => handleChange("category", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Level *</label>
              <select
                value={form.level}
                onChange={(e) => handleChange("level", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
              >
                <option value="">Select level</option>
                {levels.map((level) => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Instructor *</label>
              <input
                type="text"
                value={form.instructor}
                onChange={(e) => handleChange("instructor", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter instructor name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Duration *</label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  value={form.duration}
                  onChange={(e) => handleChange("duration", e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="e.g. 12 hours"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price *</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  value={form.price}
                  onChange={(e) => handleChange("price", e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="$99"
                  required
                />
              </div>
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

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
            <textarea
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
              rows={5}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Describe the course, its objectives, and what students will learn..."
              required
            />
          </div>
        </div>
        {/* Actions */}
        <div className="px-8 py-6 bg-gray-50 border-t border-gray-200 flex items-center justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 shadow"
          >
            {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            <span>{isSubmitting ? "Saving..." : "Save Course"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
