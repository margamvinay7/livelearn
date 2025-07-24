// components/SidebarClient.tsx
"use client";

import Sidebar from "./Sidebar";
import { useGetUserQuery } from "@/store/api/authApi";

export default function SidebarClient() {
  const { data: user } = useGetUserQuery();

  if (!user) return null;

  return (
    <div className="w-64 shrink-0 transition-all duration-300">
      <Sidebar />
    </div>
  );
}
