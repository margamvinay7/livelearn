"use client";
import React, { useState } from "react";

import { useCreateChapterMutation } from "@/store/api/chapterApi";

export default function AddChapterPage() {



  const [createChapter, { isLoading }] = useCreateChapterMutation();
  const [form, setForm] = useState({
    title: "",
    position: 1,
    video: null as File | null,
    videoPreview: null as string | null,
  });

  const handleChange = (field: string, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm((prev) => ({ ...prev, video: file }));
      const reader = new FileReader();
      reader.onload = (ev) => setForm((prev) => ({ ...prev, videoPreview: ev.target?.result as string }));
      reader.readAsDataURL(file);
    }
  };

  const removeVideo = () => {
    setForm((prev) => ({ ...prev, video: null, videoPreview: null }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.video ) {
      alert("Please fill all fields and select a video.");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("position", String(form.position));
      // formData.append("courseId", courseId);
      formData.append("video", form.video);
      await createChapter(formData).unwrap();
      alert("Chapter created successfully!");
      setForm({ title: "", position: form.position + 1, video: null, videoPreview: null });
    } catch (error) {
      console.error("Failed to create chapter:", error);
      alert("Failed to create chapter. See console for details.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <h1 className="text-2xl font-bold mb-6 text-blue-700">Add Chapter</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Chapter Title *</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              placeholder="Enter chapter title"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Position *</label>
            <input
              type="number"
              value={form.position}
              min={1}
              onChange={(e) => handleChange("position", Number(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Video *</label>
            <input
              type="file"
              accept="video/*"
              onChange={handleVideoChange}
              className="block"
              required={!form.video}
            />
            {form.videoPreview && (
              <div className="mt-2">
                <video src={form.videoPreview} controls className="w-64 h-32 rounded" />
                <button
                  type="button"
                  onClick={removeVideo}
                  className="ml-2 px-2 py-1 bg-red-500 text-white rounded"
                >
                  Remove
                </button>
              </div>
            )}
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            {isLoading ? "Saving..." : "Add Chapter"}
          </button>
        </form>
      </div>
    </div>
  );
} 