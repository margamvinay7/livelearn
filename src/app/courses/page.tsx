"use client";
import { useRouter } from "next/navigation";

export default function CoursesPage() {
  const router = useRouter();
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Courses</h2>
      {/* List of courses can be mapped here */}
      <div className="border p-4 rounded mb-4">
        <h3 className="font-semibold">React for Beginners</h3>
        <button
          className="bg-green-600 text-white px-3 py-1 rounded mt-2"
          onClick={() => router.push("/signup")}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
} 