"use client";
import { Instructor, useGetInstructorsQuery } from '@/store/api/instructorApi';
import { GraduationCap, Mail, User } from "lucide-react";

export default function InstructorsPage() {
  const { data: instructors, isLoading, error } = useGetInstructorsQuery();

  if (isLoading) return <div className="p-8">Loading instructors...</div>;
  if (error) return <div className="p-8 text-red-500">Failed to load instructors.</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-white p-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
          <GraduationCap className="w-7 h-7 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-blue-700 mb-1">Instructors</h1>
          <p className="text-gray-500 text-sm">Meet our expert instructors</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {instructors && instructors.length > 0 ? (
          instructors.map((inst: Instructor) => (
            <div
              key={inst.id}
              className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center border-t-4 border-blue-400 hover:scale-105 hover:shadow-2xl transition-transform duration-300"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center mb-4">
                <User className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-1 text-blue-900">{inst.user?.name || '-'}</h3>
              <p className="text-blue-700 mb-2 flex items-center justify-center gap-1">
                <Mail className="w-4 h-4" /> {inst.user?.email || '-'}
              </p>
              <div className="flex items-center justify-center gap-2 mb-2">
                {/* <span className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-semibold">
                  {inst.user?.role || '-'}
                </span> */}
              </div>
              {/* <div className="text-xs text-gray-500 mb-2">
                Joined: {inst.user?.createdAt ? new Date(inst.user.createdAt).toLocaleDateString() : '-'}
              </div> */}
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-400 py-12">No instructors found.</div>
        )}
      </div>
    </div>
  );
}